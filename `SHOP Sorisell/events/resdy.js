const client = require("../index");

client.on("ready", () => {
    console.log(`[Ready] ${client.user.tag}`);
});