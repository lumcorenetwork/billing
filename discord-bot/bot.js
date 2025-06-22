const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require("discord.js");
const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");

const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const API_URL = "http://localhost:3000/api/discord/command";

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

let allowedCommands = [];

async function fetchAllowedCommands() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    allowedCommands = data.commands || [];
  } catch {
    allowedCommands = [];
  }
}

async function registerSlashCommands() {
  const commands = [
    new SlashCommandBuilder().setName("commands").setDescription("List all available LumeCore Hosting commands"),
    new SlashCommandBuilder().setName("status").setDescription("Show the current hosting status"),
    new SlashCommandBuilder().setName("help").setDescription("Get help and support information"),
    new SlashCommandBuilder().setName("products").setDescription("List available hosting products"),
    new SlashCommandBuilder().setName("ticket").setDescription("Open a support ticket"),
    new SlashCommandBuilder().setName("uptime").setDescription("Show server uptime"),
    new SlashCommandBuilder().setName("staff").setDescription("Show staff contact information"),
    new SlashCommandBuilder().setName("panel").setDescription("Get the Pterodactyl panel link"),
    new SlashCommandBuilder().setName("docs").setDescription("Get documentation and SOP links"),
  ].map(cmd => cmd.toJSON());

  const rest = new REST({ version: "10" }).setToken(BOT_TOKEN);
  try {
    await rest.put(
      Routes.applicationCommands(CLIENT_ID),
      { body: commands }
    );
    console.log("Registered all slash commands.");
  } catch (error) {
    console.error("Failed to register slash commands:", error);
  }
}

function logError(error) {
  const logPath = path.join(__dirname, "bot-error.log");
  const msg = `[${new Date().toISOString()}] ${error.stack || error}\n`;
  fs.appendFileSync(logPath, msg);
}

client.once("ready", () => {
  console.log(`Discord bot logged in as ${client.user.tag}`);
  fetchAllowedCommands();
  setInterval(fetchAllowedCommands, 60 * 1000);
  registerSlashCommands();
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  for (const cmd of allowedCommands) {
    if (message.content.startsWith(cmd)) {
      if (cmd === "!help") {
        message.reply("LumeCore Hosting Help: Visit https://lumecore.com or open a ticket.");
      } else if (cmd === "!status") {
        message.reply("All systems operational.");
      } else {
        message.reply(`Command ${cmd} received.`);
      }
      break;
    }
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  switch (interaction.commandName) {
    case "commands":
      if (allowedCommands.length === 0) {
        await interaction.reply("No commands are currently available.");
      } else {
        await interaction.reply(
          `Available commands:\n${allowedCommands.map(c => `\`${c}\``).join(", ")}`
        );
      }
      break;
    case "status":
      await interaction.reply("All LumeCore Hosting systems are operational.");
      break;
    case "help":
      await interaction.reply("Need help? Visit https://lumecore.com/support or open a ticket with `/ticket`.");
      break;
    case "products":
      await interaction.reply("Available products:\n- Minecraft Server: 1GB RAM, 10GB SSD\n- Web Hosting: 1GB Storage, 10GB Bandwidth");
      break;
    case "ticket":
      await interaction.reply("To open a support ticket, please visit https://lumecore.com/tickets or use the staff portal.");
      break;
    case "uptime":
      await interaction.reply("Server uptime: 99.99% (last 30 days).");
      break;
    case "staff":
      await interaction.reply("Contact staff via the portal or email support@lumecore.com.");
      break;
    case "panel":
      await interaction.reply("Pterodactyl Panel: https://panel.lumecore.com");
      break;
    case "docs":
      await interaction.reply("Documentation & SOP: https://lumecore.com/docs");
      break;
    default:
      await interaction.reply("Unknown command.");
  }
});

client.on("error", (error) => {
  logError(error);
});

process.on("uncaughtException", (error) => {
  logError(error);
});

process.on("unhandledRejection", (reason) => {
  logError(reason);
});

client.login(BOT_TOKEN);
