// ==================== commands/repo.js ====================
export default {
  name: 'repo',
  alias: ['github', 'source', 'il-hwan'],
  description: 'Affiche le dépôt source du système SUNG IL-HWAN',
  category: 'GÉNÉRAL',

  run: async (sock, m) => {
    try {
      const chatId = m.chat;

      const repoMsg = `
+---------------------------------------+
|       ARCHIVES DU SYSTÈME             |
+---------------------------------------+
|                                       |
| 📂 PROJET : SUNG IL-HWAN              |
| 🔗 SOURCE : 
|                                       |
| "LE CODE EST LA SEULE VÉRITÉ DANS     |
| CETTE MATRICE. EXPLORE-LE."           |
|                                       |
+---------------------------------------+
| 👑 PROPRIÉTAIRE : SUNG IL-HWAN        |
+---------------------------------------+
STATUT : ACCÈS AUTORISÉ`;

      await sock.sendMessage(chatId, { 
        image: { url: "https://files.catbox.moe/v7zea2.jpg" }, // Ta nouvelle photo
        caption: repoMsg 
      }, { quoted: m });

    } catch (err) {
      console.error('❌ Erreur Repo:', err);
    }
  }
};
