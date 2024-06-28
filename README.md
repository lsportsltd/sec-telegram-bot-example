[![LSports](https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoiYXdlc29tZS10bHZcL2ZpbGVcL0p3S3dweU5Ub2pDQld3d3l5YTdkLnBuZyJ9:awesome-tlv:s5wJjkZJhYz_mhMs6SmsJeoRZWoxuvrOPGrNMUQP1tU?width=2400)](https://www.lsports.eu)
# Sports Expert Chat
## _Telegram Bot Example_

LSports is introducing a revolutionary AI-based large language model to the world of sports betting with SEC (Sports Expert Chat). Powered by technology similar to ChatGPT, SEC is a cutting-edge interactive chatbot and sports data hub designed to operate as a personal sports advisor for bettors. It's specifically crafted to assist sportsbooks in addressing the challenge of attracting new customers and increasing retention rates.

SEC provides actionable insights and guidance to bettors by offering data-driven tips, essential event details, live updates, weather forecasts, and comprehensive statistics. This empowers end-users to make informed decisions and enhances their loyalty to the platform, eventually leading to higher turnover rates for bookies.

[![LSports SEC](https://github.com/lsportsltd/sec-telegram-bot-example/blob/main/assets/example.png)](https://www.lsports.eu/sec/)

## Features

- ChatGPT like (LLM), most knowledgeable sports commentator based on AI.
- Prematch & Inplay generated AI based tips.
- Events hub, featuring formations, weather, lineups, news and more.
- Over 120+ languages
- 10 major supported sports

## Tech

This demo uses a number of open source projects to work properly:

- [Fastify] - fast and low overhead web framework
- [node.js] - evented I/O for the backend
- [ngrok] - local network tunneling
- [telegraf] - Telegram nodejs SDK

And [Telegram](https://telegram.org/) as the communication platform.

## Prerequisites

To use this demo, you need to create a Telegram bot token. Follow these steps:

1. Go to the [Telegram web](https://web.telegram.org/) and sign up for an account if you don't have one already.
2. Once you're logged in, search for @botfather.
3. Start a conversation with BotFather by clicking on the Start button.
4. Type /newbot, and follow the prompts to set up a new bot. The BotFather will give you a token that you will use to authenticate your bot and grant it access to the Telegram API.

*Note: Make sure you store the token securely. Anyone with your token access can easily manipulate your bot.*

You will also need a working Sports Expert Chat account, which you can get from our sales team here at LSports, contact them via sales@lsports.eu and ask for one.

## Installation

This demo requires [Node.js](https://nodejs.org/) v18+ to run.

Install the dependencies and devDependencies and start the server.

```bash
clone https://github.com/lsportsltd/sec-telegram-bot-example
cd sec-telegram-bot-example
npm i
```

## Development

Want to contribute? Great!

This demo uses nodemon + typescript compiler (tsc) for fast developing.
Make a change in your file and instantaneously see your updates!

Open your favorite Terminal and run these commands.

First Tab:

```bash
npm run dev
```

Second Tab:

```bash
npm run watch
```

Third Tab:

```bash
ngrok localhost 3006
```

Create a `.env` file in the root of the project, use the same keys you have in `.env.example` and put in them the values from ngrok, Telegram and LSports SEC.
Enjoy!

**Reach out to LSports today to start using SEC on your product today at sales@lsports.eu**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [Fastify]: <https://github.com/fastify/fastify>
   [node.js]: <http://nodejs.org>
   [Telegram]: <https://telegram.org>
   [Telegraf]: <https://github.com/telegraf/telegraf>
   [ngrok]: <https://ngrok.com>