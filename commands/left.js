// ==================== commands/left.js ====================
import config from '../config.js';

export default {
  name: "left",
  alias: ["leave", "sortir"],
  description: "Le bot quitte le donjon sur ordre de IL-HWAN",
  category: "OWNER",

  run: async (sock, m, args) => {
    try {
      const chatId = m.chat;

      // 1. Sécurité : Seul IL-HWAN (Owner) peut donner cet ordre
      // On vérifie si c'est toi (fromMe) OU ton numéro configuré
      if (!m.fromMe && m.sender !== config.ownerNumber) {
        return sock.sendMessage(chatId, { text: "🚫 SEUL LE  PERE DU MONARQUE PEUT ORDONNER MON RETRAIT." });
      }

      if (!m.isGroup) return;

      const leaveMsg = `
+---------------------------------------+
|       MISSION TERMINÉE : RETRAIT      |
+---------------------------------------+
|                                       |
| ⚡ ORDRE DE IL-HWAN REÇU              |
| 🌑 STATUT : RETRAIT DES OMBRES        |
|                                       |
| "CE DONJON N'A PLUS RIEN À M'OFFRIR.  |
| JE DISPARAIS DANS LE NÉANT."          |
|                                       |
+---------------------------------------+
STATUT : DÉCONNEXION...`;

      // 2. Envoi de l'image de sortie
      await sock.sendMessage(chatId, {
        image: { url: "https://files.catbox.moe/3k8i0k.jpg" },
        caption: leaveMsg
      });

      // 3. Délai de 2 secondes pour s'assurer que le message part
      await new Promise(resolve => setTimeout(resolve, 2000));

      // 4. Le bot quitte le groupe
      await sock.groupLeave(chatId);

    } catch (err) {
      console.error("❌ Erreur commande left :", err);
    }
  }
};
