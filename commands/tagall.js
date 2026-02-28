// ==================== commands/tagall.js ====================
export default {
  name: "tagall",
  alias: ["everyone", "mention"],
  description: "📢 Invoque tous les membres du groupe (Solo Leveling Style)",
  category: "Groupe",

  run: async (sock, m, args) => {
    try {
      const chatId = m.chat;

      // 1. Vérification : Uniquement en groupe
      if (!m.isGroup) {
        return sock.sendMessage(chatId, { text: "❌ Le donjon est requis pour cette invocation." });
      }

      // 2. Récupération des données du groupe et des participants
      const metadata = await sock.groupMetadata(chatId);
      const participants = metadata.participants.map(p => p.id);

      // 3. Préparation du temps et de la date
      const now = new Date();
      const date = now.toLocaleDateString('fr-FR');
      const time = now.toLocaleTimeString('fr-FR');

      // 4. Construction de la liste numérotée (Style Épuré)
      let mentionText = "";
      participants.forEach((p, i) => {
        mentionText += `│ ${i + 1}. @${p.split('@')[0]}\n`;
      });

      // 5. Menu Solo Leveling
      const fullMessage = `
┌───  「 **SYSTEM : INVOCATION** 」
│ 
│ ⚡ **APPEL DU PÈRE**
│ 📅 Date : ${date}
│ ⏰ Heure : ${time}
│ 👥 Sujets : ${participants.length}
│ 🏰 Donjon : ${metadata.subject}
│ 
├───────────────────────────
${mentionText}
└───────────────────────────
   *“Éveillez-vous... le Maître vous appelle.”*`;

      // 6. Envoi avec ton image Jin-Woo sur le trône
      await sock.sendMessage(chatId, {
        image: { url: "https://github.com/isaacmvoula1-dot/Sung-Il-hwan-/blob/58fa1d659860d6d9831e34f3c18f2e6518cd0cd5/qte.jpg" },
        caption: fullMessage,
        mentions: participants
      });

    } catch (error) {
      console.error("❌ Erreur Tagall :", error);
    }
  }
};
