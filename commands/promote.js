// ==================== commands/promote.js ====================
export default {
  name: 'promote',
  alias: ['nommer', 'up'],
  description: 'Élévation d\'un membre au rang d\'Admin',
  category: 'ADMINISTRATION',

  run: async (sock, m, args) => {
    try {
      const chatId = m.chat;

      if (!m.isGroup) return;

      // 1. Vérification des droits (Directe via Metadata pour éviter les bugs)
      const groupMetadata = await sock.groupMetadata(chatId);
      const participants = groupMetadata.participants;
      const user = participants.find(p => p.id === m.sender);
      
      const isUserAdmin = user?.admin === 'admin' || user?.admin === 'superadmin';

      if (!isUserAdmin) {
        return sock.sendMessage(chatId, { text: "🚫 Seul IL-HWAN ou un Admin peut utiliser cette commande." });
      }

      // 2. Identification de la cible (Réponse, Mention ou Numéro)
      let target = null;
      if (m.mentionedJid && m.mentionedJid.length > 0) {
        target = m.mentionedJid[0];
      } else if (m.message?.extendedTextMessage?.contextInfo?.participant) {
        target = m.message.extendedTextMessage.contextInfo.participant;
      } else if (args[0]) {
        target = args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net';
      }

      if (!target) {
        return sock.sendMessage(chatId, { text: "⚠️ Désigne une cible pour la promotion." });
      }

      // 3. Vérification des droits du bot
      const botId = sock.user.id.split(":")[0] + "@s.whatsapp.net";
      const bot = participants.find(p => p.id === botId);
      if (!bot?.admin) {
        return sock.sendMessage(chatId, { text: "❌ Le bot doit être admin pour promouvoir quelqu'un." });
      }

      // 4. Promotion silencieuse (Comme tu as demandé)
      await sock.groupParticipantsUpdate(chatId, [target], 'promote');

      // Confirmation visuelle légère pour toi (optionnel)
      console.log(`✅ [SYSTEM] : ${target} a été promu par ${m.sender}`);

    } catch (err) {
      console.error('❌ Erreur promote:', err);
    }
  }
};
