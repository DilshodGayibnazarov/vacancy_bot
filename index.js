require("dotenv").config();
const {telegramToken,redisUrl} = require("./config");
const { Telegraf, session } = require("telegraf");
const { Redis } = require("@telegraf/session/redis");
const i18n = require("./locales/i18n");
const stage = require("./scenes/index")

async function main() {
	const store = Redis({
		url: redisUrl,
	});

	const bot = new Telegraf(telegramToken);
	bot.use(session({ store }))

	bot.catch((err, ctx) => {
		if (
			err.code === 400 &&
			err.response &&
			err.response.description &&
			err.response.description.startsWith(
				"Bad Request: message is not modified"
			)
		) {
			return;
		}
		console.error("BOT CATCH", err);
		return ctx.reply(
			`Bot yangilandi, Iltimos botni qaytadan ishga tushiring /start`
		);
	});

	bot.use(async (ctx, next) => {
		if (
			ctx.update &&
			ctx.update.my_chat_member &&
			ctx.update.my_chat_member.new_chat_member.status === "kicked"
		) {
			return;
		}

		if (ctx.chat && ctx.chat.type === "private") {
			return next();
		}

		return;
	});

	// Set up i18n middleware
	bot.use((ctx, next) => {
		ctx.i18n = {}
		i18n.init(ctx.i18n);
		return next();
	});

	bot.use(stage.middleware());

	bot.start((ctx) => {
		return ctx.scene.enter("choose-language");
	});

	await bot.launch().then(() => {
		console.log(`Bot running is running locally`);
	});

}

main();

process.addListener("uncaughtException", (e) => {
	console.error("Custom Unhandled Exception", e);
	// sendError(`${e?.message}\n\n${e?.stack}`);
});

process.addListener("unhandledRejection", (e) => {
	console.error("Custom Unhandled Rejection", e);
	// sendError(`${e?.message}\n\n${e?.stack}`);
});
