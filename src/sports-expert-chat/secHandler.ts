import { ChatAnswer, Fixture, RandomFixtures, Tip } from "../interfaces";

let secApiToken = process.env.SEC_API_TOKEN;

export function init() {
  secApiToken = process.env.SEC_API_TOKEN;
}

export function buildTipsMessage(tips: Tip[], selectedFixture: Fixture) {
  const tipsMsg = tips.map((tip) => `${tip.tip}`);

  return (
    `The following tips are available for ${selectedFixture.participants[0].name} vs ${selectedFixture.participants[1].name}:\n` +
    tipsMsg.join("\n")
  );
}

export async function getHighlightedFixtures(): Promise<RandomFixtures> {
  const body = JSON.stringify({
  });

  const response = await fetch(
    "https://sec-gw.lsports.eu/fixtures/api/v1/fixtures",
    {
      headers: {
        authorization: `Bearer ${secApiToken}`,
        "content-type": "application/json",
      },
      method: "POST",
      body,
    }
  );

  return response.json() as Promise<RandomFixtures>;
}

export async function sendChatMessage(
  msg: string,
  fixture: Fixture,
  history: Record<string, string[]>
): Promise<ChatAnswer> {
  const body = JSON.stringify({ Prompt: msg, Fixture: fixture, History: history  });
  const response = await fetch("https://sec-gw.lsports.eu/chat/api/v2/chat", {
    headers: {
      authorization: `Bearer ${secApiToken}`,
      "content-type": "application/json",
      language: "en",
    },
    method: "POST",
    body,
  });

  return response.json() as Promise<ChatAnswer>;
}

export async function getTipsForFixtures(
  fixtures: Fixture[]
): Promise<{ tips: Tip[]; errors: any }> {
  const response = await fetch(`https://sec-gw.lsports.eu/tips/api/v1/tips`, {
    headers: {
      authorization: `Bearer ${secApiToken}`,
      "content-type": "application/json",
      language: "en",
    },
    method: "POST",
    body: JSON.stringify({ Fixtures: fixtures }),
  });

  return response.json() as Promise<{ tips: Tip[]; errors: any }>;
}
