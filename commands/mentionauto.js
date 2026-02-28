import fs from 'fs';
import path from 'path';

const FILE = './data/mentionauto.json';

let data = {};
try {
  data = JSON.parse(fs.readFileSync(FILE));
} catch {
  data = { enabled: false, mode: "text" };
}

function save() {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

export default {
  name: "mentionauto",
  description: "Active/Désactive la réponse automatique aux mentions (Solo Leveling)",

  async execute(sock, m, args) {
    if (!args[0]) {
      return sock.sendMessage(m.chat, {
        text: `⚔️ Mode actuel : *${data.enabled ? "ON" : "OFF"}*
🖤 Type : *${data.mode}*

Commandes :
!mentionauto on
!mentionauto off
!mentionauto text
!mentionauto image`
      });
    }

    if (args[0] === "on") {
      data.enabled = true;
      save();
      return sock.sendMessage(m.chat, { text: "✅ Mode mention automatique activé ⚔️" });
    }

    if (args[0] === "off") {
      data.enabled = false;
      save();
      return sock.sendMessage(m.chat, { text: "❌ Mode mention automatique désactivé." });
    }

    if (args[0] === "text") {
      data.mode = "text";
      save();
      return sock.sendMessage(m.chat, { text: "📝 Mode texte Solo Leveling activé." });
    }

    if (args[0] === "image") {
      data.mode = "image";
      save();
      return sock.sendMessage(m.chat, { text: "🖼️ Mode image Solo Leveling activé." });
    }
  },

  async onMention(sock, m) {
    if (!data.enabled) return;

    const botNumber = sock.user.id.split(":")[0] + "@s.whatsapp.net";

    if (!m.mentionedJid.includes(botNumber)) return;

    const username = m.sender.split("@")[0];
    const date = new Date().toLocaleString();

    const textMessage = `
╔═══════════════════════╗
  『 A V I S  D U  S Y S T È M E 』
╚═══════════════════════╝

👤 Chasseur : @${username}
⚔️ Statut : Invocation détectée
📆 Date système : ${date}

📢 Le père du Monarque de l’Ombre répond à ton appel…

⚔️ Survis.
📈 Progresse.
👑 Deviens plus fort.
`;

    if (data.mode === "image") {
      await sock.sendMessage(m.chat, {
        image: { url: "https://github.com/isaacmvoula1-dot/Sung-Il-hwan-/blob/6178611927920eab84cf5a4750fa5b8a6edacd86/mentionauto.png" }, // image Solo Leveling
        caption: textMessage,
        mentions: [m.sender]
      });
    } else {
      await sock.sendMessage(m.chat, {
        text: textMessage,
        mentions: [m.sender]
      });
    }
  }
};