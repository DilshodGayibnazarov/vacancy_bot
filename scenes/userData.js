const { Scenes, Markup } = require("telegraf");
const phoneValidator = require("../helper/phoneValidator");
const { experience, language_level, martial_status, mime_types } = require("../helper/constants")
const makeSendingMessage = require("./functions/makeSendingMessage")

// Step 1: Ask for the applicant's name
const step1 = async (ctx) => {
    try {
        console.log("entering step 1");

        const userInput = ctx.message?.text;
        if (userInput) {
            ctx.session.applicant.full_name = userInput;
            ctx.wizard.next();
            ctx.message.text = ""
            return ctx.wizard.steps[ctx.wizard.cursor](ctx)
        }

        return ctx.reply(ctx.i18n.__("get_full_name"));

    } catch (err) {
        console.error("step 1  ", err);
    }
};

// Step 2: Ask for the applicant's date of birth
const step2 = async (ctx) => {
    try {
        console.log("entering step 2");

        const userInput = ctx.message?.text;
        if (userInput) {
            ctx.session.applicant.date_of_birth = userInput;
            ctx.wizard.next();
            ctx.message.text = ""
            return ctx.wizard.steps[ctx.wizard.cursor](ctx)
        }

        return ctx.reply(ctx.i18n.__("date_of_birth"));

    } catch (err) {
        console.error("step 2  ", err);
    }
};

// Step 3: Ask for the applicant's experience
const step3 = async (ctx) => {
    try {
        console.log("entering step 3");

        const userInput = ctx?.callbackQuery?.data;

        if (userInput) {
            if (userInput.startsWith("exp")) {
                ctx.session.applicant.experience = userInput.substring(3);
                ctx.wizard.next();

                if (ctx?.update?.callback_query?.message?.message_id) {
                    ctx.telegram.deleteMessage(
                        ctx.chat.id,
                        ctx?.update?.callback_query?.message?.message_id
                    );
                }

                return ctx.wizard.steps[ctx.wizard.cursor](ctx)
            }
        }

        return ctx.reply(
            "enter experience",
            Markup.inlineKeyboard(experience, { columns: 2 }).resize()
        )

    } catch (err) {
        console.error("step 3  ", err);
    }
};

// Step 4: Ask for the applicant's russian language level
const step4 = async (ctx) => {
    try {
        console.log("entering step 4");

        const userInput = ctx?.callbackQuery?.data;

        if (userInput) {
            if (userInput.startsWith("rulang")) {
                ctx.session.applicant.russian_level = userInput.substring(6);
                ctx.wizard.next();

                if (ctx?.update?.callback_query?.message?.message_id) {
                    ctx.telegram.deleteMessage(
                        ctx.chat.id,
                        ctx?.update?.callback_query?.message?.message_id
                    );
                }

                return ctx.wizard.steps[ctx.wizard.cursor](ctx)
            }

        }
        const langKeyboard = []

        for (lang of language_level) {
            langKeyboard.push({
                text: lang,
                callback_data: "rulang" + lang
            })
        }
        return ctx.reply(
            "russian language level",
            Markup.inlineKeyboard(langKeyboard, { columns: 2 }).resize()
        )

    } catch (err) {
        console.error("step 4  ", err);
    }
};

// Step 5: Ask for the applicant's english language level
const step5 = async (ctx) => {
    try {
        console.log("entering step 5");

        const userInput = ctx?.callbackQuery?.data;

        if (userInput) {
            if (userInput.startsWith("enlang")) {
                ctx.session.applicant.english_level = userInput.substring(6);
                ctx.wizard.next();

                if (ctx?.update?.callback_query?.message?.message_id) {
                    ctx.telegram.deleteMessage(
                        ctx.chat.id,
                        ctx?.update?.callback_query?.message?.message_id
                    );
                }

                return ctx.wizard.steps[ctx.wizard.cursor](ctx)
            }
        }

        const langKeyboard = []

        for (lang of language_level) {
            langKeyboard.push({
                text: lang,
                callback_data: "enlang" + lang
            })
        }

        return ctx.reply(
            "english language level",
            Markup.inlineKeyboard(langKeyboard, { columns: 2 }).resize()
        )

    } catch (err) {
        console.error("step 5  ", err);
    }
};

// Step 6: Ask for the applicant's marital status
const step6 = async (ctx) => {
    try {
        console.log("entering step 6");

        const userInput = ctx?.callbackQuery?.data;

        if (userInput) {
            if (userInput.startsWith("sta")) {
                ctx.session.applicant.martial_status = userInput.substring(3);
                ctx.wizard.next();

                if (ctx?.update?.callback_query?.message?.message_id) {
                    ctx.telegram.deleteMessage(
                        ctx.chat.id,
                        ctx?.update?.callback_query?.message?.message_id
                    );
                }
                return ctx.wizard.steps[ctx.wizard.cursor](ctx)
            }
        }

        return ctx.reply(
            "marital status",
            Markup.inlineKeyboard(martial_status).resize()
        )

    } catch (err) {
        console.error("step 6  ", err);
    }
};

// Step 7: Ask for the applicant's residence
const step7 = async (ctx) => {
    try {
        console.log("entering step 7");

        const userInput = ctx.message?.text;
        if (userInput) {
            ctx.session.applicant.residence = userInput;
            ctx.wizard.next();
            ctx.message.text = ""
            return ctx.wizard.steps[ctx.wizard.cursor](ctx)
        }

        return ctx.reply("residence");

    } catch (err) {
        console.error("step 7  ", err);
    }
};


// Step 8: Ask for the applicant's contacts
const step8 = async (ctx) => {
    try {
        console.log("entering step 8");

        const userInput = ctx.message?.text;
        if (userInput) {
            ctx.session.applicant.contacts = userInput;
            ctx.wizard.next();
            ctx.message.text = ""
            return ctx.wizard.steps[ctx.wizard.cursor](ctx)
        }

        return ctx.reply(" enter contacts");

    } catch (err) {
        console.error("step 8  ", err);
    }
};

// Step 9: Ask for the applicant's salary expectation
const step9 = async (ctx) => {
    try {
        console.log("entering step 9");

        const userInput = ctx.message?.text;
        if (userInput) {
            ctx.session.applicant.salary_expectation = userInput;
            ctx.wizard.next();
            ctx.message.text = ""
            return ctx.wizard.steps[ctx.wizard.cursor](ctx)
        }

        return ctx.reply("enter salary expectation");

    } catch (err) {
        console.error("step 9  ", err);
    }
};

// Step 10: Ask for the applicant's additional data
const step10 = async (ctx) => {
    try {
        console.log("entering step 10");

        const userInput = ctx.message?.text;

        if (userInput) {
            ctx.session.applicant.additional_data = userInput;
            ctx.wizard.next();
            ctx.message.text = ""
            return ctx.wizard.steps[ctx.wizard.cursor](ctx)
        }

        return ctx.reply(" additional data");

    } catch (err) {
        console.error("step 10  ", err);
    }
};

// Step 11: Ask for the applicant's resume
const step11 = async (ctx) => {
    try {
        console.log("entering step 11");

        const userInputDocument = ctx?.update?.message?.document

        if (userInputDocument) {
            console.log("userInputDocument?.mime_type", userInputDocument?.mime_type)
            if (mime_types.includes(userInputDocument?.mime_type)) {
                const fileId = ctx.update?.message?.document?.file_id
                const currentDate = new Date();
                console.log("current date", currentDate)

                ctx.session.applicant.user_input_document = userInputDocument
                if (ctx.session?.sendingDate && ctx.session.sendingDate >= currentDate) {
                    return ctx.reply(" you already sent a resume");
                } else {
                    await makeSendingMessage(ctx, fileId).then((message) => {
                        ctx.session.sendingDate = currentDate.setDate(currentDate.getDate() + 1);
                        console.log("ctx.session.sendingDate ", ctx.session.sendingDate)
                        return ctx.reply(message);
                    }).catch((err) => {
                        console.error("error sending message", err)
                        return ctx.reply(" not ok");
                    })
                }

                console.log("ctx.session.sendingDate", ctx.session.sendingDate)
                // return ctx.scene.leave()
            } else {
                return ctx.reply(ctx.i18n.__("wrong_type"));
            }
        }

        return ctx.reply("resume");

    } catch (err) {
        console.error("step 11  ", err);
    }
};

module.exports = new Scenes.WizardScene(
    "vacancy-candidate",
    step1,
    step2,
    step3,
    step4,
    step5,
    step6,
    step7,
    step8,
    step9,
    step10,
    step11,
);
