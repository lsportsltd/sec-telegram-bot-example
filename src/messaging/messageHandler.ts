import { Fixture } from "../interfaces";

import {
  clearSession,
  getHighlightedFixturesFromState,
  getSession,
  newSession,
  updateHighlightedFixtures,
  updateSession,
} from "../state";

import {
  getHighlightedFixtures,
  sendChatMessage,
} from "../sports-expert-chat/secHandler";
import { Context, NarrowedContext, Telegraf } from "telegraf";
import { Update, Message } from "telegraf/types";
import { message } from "telegraf/filters";
// sdas

let BOT_TOKEN = process.env.BOT_TOKEN;
let BOT_PATH = "/telegram/" + BOT_TOKEN;
let WEBHOOK_DOMAIN = process.env.WEBHOOK_DOMAIN;
let bot: Telegraf | null = null;

export async function init(app: any, _: any, done: any) {
  BOT_TOKEN = process.env.BOT_TOKEN;
  WEBHOOK_DOMAIN = process.env.WEBHOOK_DOMAIN;
  BOT_PATH = "/telegram/" + BOT_TOKEN;

  if (!BOT_TOKEN || !WEBHOOK_DOMAIN || !BOT_PATH)
    throw new Error("Missing parameters!");

  if (bot) return;

  bot = new Telegraf(BOT_TOKEN);
  const webhook = await bot.createWebhook({
    domain: WEBHOOK_DOMAIN,
    path: BOT_PATH,
  });

  app.post(BOT_PATH, webhook);

  bot.command("restart", async (ctx) => {
    clearSession(ctx.chat.id);
    const response = await handleMessage(ctx);
    await ctx.reply(response);
  });

  bot.on(message("text"), async (ctx) => {
    const response = await handleMessage(ctx);
    await ctx.reply(response);
  });

  bot.launch();
  done();
}

export function buildRandomFixturesMsg(fixtures: Fixture[]) {
  const fixturesMsg = fixtures.map(
    (fixture, i) =>
      `${i + 1}. ${fixture.participants[0].name} vs ${
        fixture.participants[1].name
      },at ${new Date(fixture.date).toString()}`
  );

  return (
    `Please select the fixture you want to bet on by replying with the number of the fixture\n` +
    fixturesMsg.join("\n")
  );
}

export async function handleMessage(
  ctx: NarrowedContext<
    Context<Update>,
    {
      message: Update.New & Update.NonChannel & Message.TextMessage;
      update_id: number;
    }
  >
) {
  const msg = ctx.message.text;
  const userFirstName = ctx.message.from.first_name;
  // const username = ctx.message.from.username;
  // const userId = ctx.message.from.id;
  const chatId = ctx.message.chat.id;

  let response = `Hello ${userFirstName}, please select a fixture by replying with the number of the fixture, or press "#" to restart the session`;
  let currentSession = getSession(chatId);
  let fixtures = getHighlightedFixturesFromState();

  // if there are no fixtures, get some from the API
  if (!fixtures.length) {
    const randomFixtures = await getHighlightedFixtures();
    fixtures = updateHighlightedFixtures(randomFixtures.fixtures);
  }

  // if the user is new, create a new session for them and send them the fixtures
  if (!currentSession || ctx.message.text === "#") {
    currentSession = newSession(chatId);
    return buildRandomFixturesMsg(fixtures);
  }

  // we already have a selected fixture, lets talk with the LLM
  if (currentSession?.selectedFixture) {
    const chatResponse = await sendChatMessage(
      msg,
      currentSession.selectedFixture,
      currentSession.history
    );

    currentSession.history = chatResponse.history;

    return `${chatResponse.message.text}`;
  }

  // if the user has not selected a fixture, parse the message and select the fixture
  if (parseInt(msg) > 0 && parseInt(msg) <= fixtures.length) {
    const selectedFixture = fixtures[parseInt(msg)];
    currentSession = updateSession(chatId, { selectedFixture });
    response = `You have selected ${selectedFixture.participants[0].name} vs ${selectedFixture.participants[1].name}, at ${new Date(selectedFixture.date).toString()}.\nAsk me any question about the fixture, for example "Which team will win?" or "How many goals will be scored?"\nYou can always return to the fixture selection list by pressing "#"`;
  } else {
    return `Invalid selection. Please select a fixture by replying with the number of the fixture, or press "#" to restart the session`;
  }

  if (!currentSession.selectedFixture) {
    return buildRandomFixturesMsg(fixtures);
  }

  return response;
}
