const languages = [
    {
        text: "🇺🇿 O'zbek",
        callback_data: "lang_uz"
    },
    {
        text: "🇷🇺 Русский",
        callback_data: "lang_ru"
    },
    {
        text: "🇺🇸 English",
        callback_data: "lang_en"
    },
]

const departaments = [
    {
        text: "Backend",
        callback_data: "dep_backend"
    },
    {
        text: "Frontend",
        callback_data: "dep_frontend"
    },
    {
        text: "Mobile",
        callback_data: "dep_mobile"
    },
    {
        text: "DevOps",
        callback_data: "dep_devOps"
    },
    {
        text: "Product Manager",
        callback_data: "dep_product_manager"
    },
];

const degrees = [
    {
        text: "Junior",
        callback_data: "deg_junior"
    },
    {
        text: "Middle",
        callback_data: "deg_middle"
    },
    {
        text: "Senior",
        callback_data: "deg_senior"
    }
]

const technology = {
    backend: ["Golang", "NodeJs", "Python", "Java"],
    frontend: ["ReactJs", "VueJS"],
    Mobile: ["Android", "IOS", "Flutter"],
}

const experience = [
    {
        text: "> 1 year",
        callback_data:"exp> 1 year"
    },
    {
        text: "1-3 years",
        callback_data:"exp1-3 years"
    },
    {
        text: "3-5 years",
        callback_data:"exp3-5 years"
    },
    {
        text: "5< years",
        callback_data:"exp5< years"
    }
]

const language_level = ["A1-A2-Beginner","B1-B2-Intermediate","C1-C2-Advanced"]

const martial_status = [
    {
        text: "Married",
        callback_data:"stamarried"
    },
    {
        text: "Unmarried",
        callback_data:"staunmarried"
    },
]

const mime_types = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "file/docx","image/png", "image/jpg", "image/jpeg"]

module.exports = {
    languages,
    departaments,
    degrees,
    technology,
    experience,
    language_level,
    martial_status,
    mime_types
};
