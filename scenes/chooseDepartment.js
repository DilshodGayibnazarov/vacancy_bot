const { Scenes, Markup } = require("telegraf");
const { departaments, technology, degrees } = require("../helper/constants")

module.exports = new Scenes.BaseScene("choose-department")
    .enter(async (ctx) => {
        try {
            ctx.telegram.deleteMessage(
                ctx.chat.id,
                ctx?.update?.callback_query?.message?.message_id
            );
            const keyboard = Markup.inlineKeyboard(departaments, { columns: 2 }).resize()
            return ctx.reply(ctx.i18n.__("choose_department"), keyboard)
        } catch (err) {
            console.error("auth enter chooseLanguage", err);
        }
    })

    .action(/dep_+/, async (ctx) => {
        try {
            const department = ctx?.update?.callback_query?.data.substring(4)

            if (technology[department] !== undefined) {
                console.log("entering", technology[department])
                const techKeyboard = []

                for (tech of technology[department]) {
                    techKeyboard.push({
                        text: tech,
                        callback_data: "tech_" + tech
                    })
                }
                ctx.telegram.deleteMessage(
                    ctx.chat.id,
                    ctx?.update?.callback_query?.message?.message_id
                );

                ctx.session.department = department

                return ctx.reply(ctx.i18n.__("choose_department"),
                    Markup.inlineKeyboard(techKeyboard, { columns: 2 }).resize()
                )
            }

        } catch (err) {
            console.error("auth on chooseLanguage", err);
        }
    })

    .action(/tech_+/, async (ctx) => {
        try {
            const technology = ctx?.update?.callback_query?.data.substring(5)

            console.log("auth enter", technology)

            ctx.telegram.deleteMessage(
                ctx.chat.id,
                ctx?.update?.callback_query?.message?.message_id
            );

            ctx.session.technology = technology

            return ctx.reply(
                ctx.i18n.__("choose_department"),
                Markup.inlineKeyboard(degrees, { columns: 1 }).resize()
            )

        } catch (err) {
            console.error("auth on chooseLanguage", err);
        }
    })

    .action(/deg_+/, async (ctx) => {
        try {
            const degree = ctx?.update?.callback_query?.data.substring(4)

            console.log("auth degree", degree)

            ctx.telegram.deleteMessage(
                ctx.chat.id,
                ctx?.update?.callback_query?.message?.message_id
            );

            ctx.session.degree = degree
            ctx.session.applicant = {}
            return ctx.scene.enter("vacancy-candidate")

        } catch (err) {
            console.error("auth on chooseLanguage", err);
        }
    })