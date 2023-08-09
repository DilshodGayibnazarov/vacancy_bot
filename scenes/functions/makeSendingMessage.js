const { telegramId } = require("../../config/index")

async function makeSendingMessage(ctx, fileId) {
    let message = `#${ctx.session.department} #${ctx.session.technology} #${ctx.session.degree}\n`
    message += 
    `\nИмя: ${ctx.session.applicant.full_name}
    \nДата рождения: ${ctx.session.applicant.date_of_birth}
    \nСтаж работы: ${ctx.session.applicant.experience}
    \nУровен русского: ${ctx.session.applicant.russian_level}
    \nУровен англиского: ${ctx.session.applicant.english_level}
    \nУровен кандидата: ${ctx.session.degree}
    \nСемейное положение: ${ctx.session.applicant.martial_status}
    \nМесто проживания: ${ctx.session.applicant.residence}
    \nКонтактные данные: ${ctx.session.applicant.contacts}
    \nОжидаемая зарплата: ${ctx.session.applicant.salary_expectation}
    \nДополнительная информация: ${ctx.session.applicant.additional_data}`

    if (fileId) {
        await ctx.telegram.sendDocument(telegramId, fileId, {
            caption: message,
        }).catch(err => {
            console.error("error sending",err)
            return message
        })
    }
    return message
}

module.exports = makeSendingMessage