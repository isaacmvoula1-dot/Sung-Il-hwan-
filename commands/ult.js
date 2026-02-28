// ==================== commands/ult.js ====================
import checkAdminOrOwner from "../system/checkAdmin.js";

export default {
  name: "skill2",
  description: "Expulse tous les membres non-admin silencieusement",
  category: "Groupe",
  group: true,
  admin: true,
  botAdmin: true,

  run: async (kaya, m, args) => {
    try {
      if (!m.isGroup) return;

      // ✅ Vérification admin / owner
      const permissions = await checkAdminOrOwner(kaya, m.chat, m.sender);
      if (!permissions.isAdminOrOwner) {
        return kaya.sendMessage(
          m.chat,
          { text: "🚫 Seuls les Admins ou le Propriétaire peuvent utiliser `.ult`." }
        );
      }

      // ✅ Récupère metadata du groupe
      const groupMetadata = await kaya.groupMetadata(m.chat);
      const botNumber = kaya.user.id.split(":")[0] + "@s.whatsapp.net";

      // ✅ Liste des membres à expulser (non admins et non bot)
      const toKick = groupMetadata.participants
        .filter(p => !p.admin && p.id !== botNumber)
        .map(p => p.id);

      if (!toKick.length) return;

      // ✅ Expulsion silencieuse
      for (const user of toKick) {
        await kaya.groupParticipantsUpdate(m.chat, [user], "remove");
        await new Promise(r => setTimeout(r, 1000)); // pause pour éviter spam serveur
      }

      // ❌ Aucun message envoyé au groupe
      return;

    } catch (err) {
      console.error("❌ Erreur ult :", err);
      return;
    }
  }
};