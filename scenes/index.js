const { Scenes,  } = require("telegraf");
const { Stage } = Scenes;

const stage = new Stage([
	require("./chooseLanguage"),
	require("./chooseDepartment"),
	require("./userData"),
])
module.exports = stage
