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
        image: { url: "https://github.com/isaacmvoula1-dot/Sung-Il-hwan-/blob/3886d9d94b0eb4e4c88182203302dc3b58735a00/tagall.jpg" }, // Ta nouvelle photo
        caption: repoMsg 
      }, { quoted: m });

    } catch (err) {
      console.error('❌ Erreur Repo:', err);
    }
  }
};
