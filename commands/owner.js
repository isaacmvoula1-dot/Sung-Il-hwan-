/**
 * Menu Officiel du Créateur - Sung Il-hwan 
 * Intégré pour Sung Il-hwan 
 */

const handler = async (sock, m) => {
    const myNumber = "243983128167"; 
    
    // 1. Fiche Contact (V-Card)
    const vcard = `BEGIN:VCARD\n`
                + `VERSION:3.0\n`
                + `FN:Monarque-alias Momo\n` 
                + `ORG:Sung Il-hwan Creator;\n`
                + `TEL;type=CELL;type=VOICE;waid=${myNumber}:+243 983 128 167\n`
                + `END:VCARD`;

    // 2. Texte du Menu Réseaux
    const menuOwner = `
╔════════════════════╗
      *👑 PROFIL CRÉATEUR 👑*
╚════════════════════╝

🧘‍♂️ *Nom :* Sung Il-hwan 
🌍 *Pays :* CONGO B 🇨🇬
🆔 *Telegram :* @Monarque243

--- *🌐 MES RÉSEAUX* ---

📺 *YouTube :*
https://youtube.com/@sungjinwoo-c5g

🎬 *TikTok :*
tiktok.com/@blackmomo04

📢 *Chaîne Officielle :*
https://whatsapp.com/channel/0029VbBaDRo9Bb61diUMZz1q

👥 *Groupe de Discussion :*
https://chat.whatsapp.com/FnnKJUBOWFR0xYQqLjasyj

──────────────────────
   *SUNG IL-HWAN - L'ÉLÉGANCE*
──────────────────────`.trim();

    // 3. Envoi de la V-Card
    await sock.sendMessage(m.chat, {
        contacts: {
            displayName: "Monarque-alias Momo",
            contacts: [{ vcard }]
        }
    }, { quoted: m });

    // 4. Envoi du Menu avec ton image Catbox
    await sock.sendMessage(m.chat, { 
        text: menuOwner,
        contextInfo: {
            externalAdReply: {
                title: "SUNG IL-HWAN",
                body: "Le Maître de l'IA Zen",
                // Ton image Catbox est intégrée ici
                thumbnailUrl: "https://files.catbox.moe/0suyka.jpg", 
                sourceUrl: "https://whatsapp.com/channel/0029VbBaDRo9Bb61diUMZz1q",
                mediaType: 1,
                renderLargerThumbnail: true,
                showAdAttribution: true
            }
        }
    }, { quoted: m });
};

export default {
    name: "owner",
    alias: ["il-hwan", "boss", "liens", "createur"],
    description: "Affiche le menu complet du créateur",
    category: "main",
    run: handler,
    execute: handler
};
