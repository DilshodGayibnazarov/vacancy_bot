const config = {
    environment: getConf("NODE_ENV", ""),
    telegramId: getConf("TELEGRAM_ID", "-1001942967380"),
    telegramToken: getConf("TG_BOT_TOKEN", "Write your bot Token"),
    redisUrl: getConf("REDIS_URL", ""),
    webhookUrl : getConf("WEBHOOK_URL", ""),
}

function getConf(name, def = "") {
    if (process.env[name]) {
        return process.env[name];
    }
    return def;
}

module.exports = config;