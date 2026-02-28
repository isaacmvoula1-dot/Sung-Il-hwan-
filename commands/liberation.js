// ==================== commands/liberation.js ====================
export default {
  name: 'liberation',
  description: 'Ouvre le groupe (Tout le monde)',
  category: 'Administration',

  async execute(sock, m, args) {
    if (!m.isGroup) return;

    try {
      await sock.groupSettingUpdate(m.chat, 'not_announcement');

      const text = `
◈🧬━━━━━━━━━━━━━━━🧬◈
   *L I B É R A T I O N*
◈🧬━━━━━━━━━━━━━━━🧬◈

> *“Les entraves sont brisées. Reprenez vos activités.”*

Le sceau a été levé. Tout le monde peut 
désormais envoyer des messages.

© SUNG IL-HWAN - 2026
`;

      await sock.sendMessage(m.chat, {
        image: { url: "https://files.catbox.moe/5h3p0k.jpg" },
        caption: text
      }, { quoted: m });

    } catch (err) {
      console.error(err);
      m.reply("Erreur : Impossible de libérer le groupe.");
    }
  },
};
