require("dotenv").config();
const cors = require("@koa/cors");
const { koaBody } = require("koa-body");

const Koa = require("koa");
const Router = require("koa-router");

const app = new Koa();

app.use(cors());
app.use(koaBody());

const Public = new Router();
app.use(Public.routes());
app.use(Public.allowedMethods());

app.on("error", (err, ctx) => {
  console.log({ hasError: "I guess yes", status: err, route: ctx });
});

app.listen(process.env.PORT, () => {
  console.log(`App Lister to ${process.env.PORT}`);
});

const Fan = async (ctx) => {
  try {
    ctx.response.status = 200;
    return (ctx.body = {
      message: "Alive",
    });
  } catch (err) {
    ctx.response.status = 400;
    return (ctx.body = { status: ctx.status, message: e.message });
  }
};

Public.get("/", Fan);

const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(process.env.DISCORD_TOKEN);
