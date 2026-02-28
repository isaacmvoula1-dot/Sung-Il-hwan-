// ==================== commands/ult.js ====================
export default {
  name: "ult",
  alias: ["exorcisme", "purge"],
  description: "Attaque ultime de purification aléatoire contre les monstres",
  category: "ADMINISTRATION",

  run: async (sock, m, args) => {
    try {
      const chatId = m.chat;

      if (!m.isGroup) return sock.sendMessage(chatId, { text: "Le rite ne peut avoir lieu qu'en groupe." });

      let cible = null;
      if (m.message.extendedTextMessage?.contextInfo?.participant) {
        cible = m.message.extendedTextMessage.contextInfo.participant;
      } else if (m.mentionedJid && m.mentionedJid.length > 0) {
        cible = m.mentionedJid[0];
      }

      if (!cible) {
        return sock.sendMessage(chatId, { text: "Désignez l'imposteur à purifier." });
      }

      // --- 🖼️ Liste de tes images Catbox ---
      const images = [
        "https://files.catbox.moe/smaa9g.jpg",
        "https://files.catbox.moe/a2sivk.jpg",
        "https://files.catbox.moe/teyy91.jpg",
        "https://files.catbox.moe/0gskrs.jpg",
        "https://files.catbox.moe/h7729z.jpg",
        "https://files.catbox.moe/37z9ek.jpg"
      ];

      // --- 📜 Liste des techniques de Purification ---
      const techniques = [
        `+---------------------------------------+\n|      ☠️ ORATION MUTILATION ☠️       |\n+---------------------------------------+\n\n@${cible.split('@')[0]}\nTES ATTAQUES SONT NULS DEVANT MOI.\nMES DAGUES DU RÉSEAU TE TRANCHE.\n\nADIEU, OBJET SANS POUVOIR.`,
        
        `+---------------------------------------+\n|       ⚔️ APOCALYPTIC MIGHT ⚔️         |\n+---------------------------------------+\n\n@${cible.split('@')[0]}\nJE BANNIS TES ARNAQUES DE CE CANAL.\nTA PRÉSENCE EST UNE ERREUR SYSTÈME.\n\nPURGE TOTALE ENCLENCHÉE.`,
        
        `+---------------------------------------+\n|       LE VERDICT DU HUNTER         |\n+---------------------------------------+\n\n@${cible.split('@')[0]}\nTON ÉNERGIE MEURTRIÈRE EST DÉTECTÉE.\nLE PROTOCOLE DE NETTOYAGE EST ACTIVÉ.\n\nDISPARAÎT DANS LE NÉANT DU CLOUD.`,
        
        `+---------------------------------------+\n|        SAINT SIÈGE : APOCALYPTIC MIGHT            |\n+---------------------------------------+\n\n@${cible.split('@')[0]}\nTES PROMESSES DE RICHESSE SONT FAUSSES.\nMA PUISSANCE TE TRANSFORME EN POUSSIÈRE.\n\nL'ÉQUILIBRE EST RESTAURÉ.`
      ];

      // Sélection aléatoire
      const randomImage = images[Math.floor(Math.random() * images.length)];
      const randomPriere = prieres[Math.floor(Math.random() * prieres.length)];

      // 1. Envoi de l'image et du texte aléatoire
      await sock.sendMessage(chatId, {
        image: { url: randomImage },
        caption: randomPriere,
        mentions: [cible]
      });

      // 2. Pause pour l'effet (2 secondes)
      await new Promise(res => setTimeout(res, 2000));

      // 3. Suppression du marabout
      await sock.groupParticipantsUpdate(chatId, [cible], "remove");

      await sock.sendMessage(chatId, { text: "Qte terminée. La zone est saine." });

    } catch (error) {
      console.error("Erreur qte.js :", error);
      await sock.sendMessage(chatId, { text: "L'entité résiste (Vérifie mes droits admin)." });
    }
  }
};
