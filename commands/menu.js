// ==================== commands/menu.js ====================
import { commands } from '../handler.js';
import { contextInfo } from '../system/contextInfo.js';

const MENU_THEMES = [
  { url: "https://files.catbox.moe/6e8cho.jpg", emoji: "🌑", frame: ["« 🌑 ━━━━━━━ SYSTEM ━━━━━━━ 🌑 »", "┃", "« ━━━━━━━━━━━━━━━━━━━━━━━━━━ »"] },
  { url: "https://files.catbox.moe/2v7xl4.jpg", emoji: "💠", frame: ["╭💠──────────────────💠╮", "│", "╰💠──────────────────💠╯"] },
  { url: "https://files.catbox.moe/jwwjsj.jpg", emoji: "⚔️", frame: ["⚔️|──────────────────|⚔️", "┃", "⚔️|──────────────────|⚔️"] },
  { url: "https://files.catbox.moe/mi5dfw.jpg", emoji: "⚡", frame: ["⚡══════════════════⚡", "⚡", "⚡══════════════════⚡"] },
  { url: "https://files.catbox.moe/sixfi7.jpg", emoji: "🔥", frame: ["🔥━━━━━━━━━━━━━━━━━━🔥", "🔥", "🔥━━━━━━━━━━━━━━━━━━🔥"] },
  { url: "https://files.catbox.moe/5h3p0k.jpg", emoji: "🧬", frame: ["◈🧬━━━━━━━━━━━━━━━🧬◈", "◈", "◈🧬━━━━━━━━━━━━━━━🧬◈"] },
  { url: "https://files.catbox.moe/97v0yn.jpg", emoji: "👑", frame: ["👑══════════════════👑", "┃", "👑══════════════════👑"] },
  { url: "https://files.catbox.moe/7t9dud.jpg", emoji: "🩸", frame: ["🩸──────────────────🩸", "┃", "🩸──────────────────🩸"] },
  { url: "https://files.catbox.moe/jmocnq.jpg", emoji: "🌌", frame: ["🌌▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬🌌", "🌌", "🌌▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬🌌"] },
  { url: "https://files.catbox.moe/0ultrk.jpg", emoji: "🎭", frame: ["🎭━━━━━━━━━━━━━━━━━━🎭", "┃", "🎭━━━━━━━━━━━━━━━━━━🎭"] },
  { url: "https://files.catbox.moe/nwtwec.jpg", emoji: "🧊", frame: ["❄️══════════════════❄️", "❄️", "❄️══════════════════❄️"] },
  { url: "https://files.catbox.moe/ghumqx.jpg", emoji: "🧿", frame: ["🌀━━━━━━━━━━━━━━━━━━🌀", "🌀", "🌀━━━━━━━━━━━━━━━━━━🌀"] },
  { url: "https://files.catbox.moe/to9mhw.jpg", emoji: "🔱", frame: ["🔱──────────────────🔱", "🔱", "🔱──────────────────🔱"] },
  { url: "https://files.catbox.moe/1ghz46.jpg", emoji: "✨", frame: ["✨━━━━━━━━━━━━━━━✨", "✨", "✨━━━━━━━━━━━━━━━✨"] },
  { url: "https://files.catbox.moe/uyk5v1.jpg", emoji: "👤", frame: ["☾━━━━━━━━━━━━━━━━━━☽", "┃", "☾━━━━━━━━━━━━━━━━━━☽"] },
  { url: "https://files.catbox.moe/jlnqs3.jpg", emoji: "⛩️", frame: ["⛩️──────────────────⛩️", "⛩️", "⛩️──────────────────⛩️"] }
];

export default {
  name: 'menu',
  description: 'Affiche le menu principal',
  category: 'Général',

  async execute(sock, m, args) {
    // Calcul des catégories depuis l'import de handler.js
    const categories = {};
    const allCmds = Object.values(commands);
    
    allCmds.forEach(cmd => {
      const cat = (cmd.category || 'Général').toUpperCase();
      if (!categories[cat]) categories[cat] = [];
      if (!categories[cat].includes(`.${cmd.name}`)) {
        categories[cat].push(`.${cmd.name}`);
      }
    });

    const totalCmds = allCmds.length;
    const now = new Date();
    const date = now.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
    const heure = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

    // Sélection du thème
    const theme = MENU_THEMES[Math.floor(Math.random() * MENU_THEMES.length)];

    // Construction du texte (Format épuré demandé)
    let menuText = `
${theme.frame[0]}
   ${theme.emoji}  *SUNG IL-HWAN* ${theme.emoji}
${theme.frame[2]}

${theme.emoji} **DÉVELOPPEUR** : IL-HWAN
${theme.emoji} **COMMANDES** : ${totalCmds}
${theme.emoji} **DATE** : ${date}
${theme.emoji} **HEURE** : ${heure}

╰──────────────────────────
`;

    // Affichage des catégories et commandes
    const sortedCats = Object.keys(categories).sort();
    for (const cat of sortedCats) {
      menuText += `
『 ${theme.emoji} *\`${cat}\`* 』
${theme.frame[1]}─────────────────────
${theme.frame[1]} ${categories[cat].sort().join(`\n${theme.frame[1]} `)}
╰─────────────────────
`;
    }

    menuText += `\n> © MOMO-ZEN AI - 2026`;

    // Envoi du message avec l'image du thème
    await sock.sendMessage(m.chat, {
      image: { url: theme.url },
      caption: menuText,
      contextInfo: {
        ...contextInfo,
        mentionedJid: [m.sender],
        externalAdReply: {
          title: "S U N G  I L - H W A N",
          body: "S Y S T E M  A C T I V A T E D",
          thumbnailUrl: theme.url,
          sourceUrl: "https://github.com/", // Tu peux mettre ton lien ici
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m });
  },
};
