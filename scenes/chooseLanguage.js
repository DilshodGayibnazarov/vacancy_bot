const { Scenes, Markup } = require("telegraf");
const { message } = require("telegraf/filters");
const { languages } = require("../helper/constants")

module.exports = new Scenes.BaseScene("choose-language")
	.enter(async (ctx) => {
		try {
			const keyboard = Markup.inlineKeyboard(languages).resize()

			return ctx.reply(ctx.i18n.__("greeting"), keyboard)

		} catch (err) {
			console.error("auth enter chooseLanguage", err);
		}
	})

	.action(/lang_+/, async (ctx) => {
		try {
			const choice = ctx?.update?.callback_query?.data.substring(5);
			console.log(choice);
			// if (!choice) return ctx.reply(ctx.i18n.__("choose"))
		

			ctx.i18n.setLocale(choice);
			ctx.session.lang = choice;

			return ctx.scene.enter("choose-department");

		} catch (err) {
			console.error("auth on chooseLanguage", err);
		}
	})