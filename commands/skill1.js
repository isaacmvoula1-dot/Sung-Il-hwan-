import checkAdminOrOwner from "../system/checkAdmin.js";
import { contextInfo } from "../system/contextInfo.js";

export default {
  name: "skill1",
  description: "Remove a member from the group silently",
  category: "Groupe",
  group: true,
  admin: true,
  botAdmin: true,

  run: async (kaya, m, args) => {
    const chatId = m.chat;

    try {
      // 🔹 Check admin / owner
      const permissions = await checkAdminOrOwner(kaya, chatId, m.sender);
      if (!permissions.isAdminOrOwner) {
        return kaya.sendMessage(
          chatId,
          { text: "🚫 Only *Admins* or the *Owner* can use `.kick`.", contextInfo },
          { quoted: m }
        );
      }

      // 🔹 Fetch group metadata
      const groupMetadata = await kaya.groupMetadata(chatId);
      const participants = groupMetadata.participants || [];

      // ==================== TARGET ====================
      let target = null;

      // Mention
      if (m.message?.extendedTextMessage?.contextInfo?.mentionedJid?.length > 0) {
        target = m.message.extendedTextMessage.contextInfo.mentionedJid[0];
      }
      // Reply to a message
      else if (m.message?.extendedTextMessage?.contextInfo?.participant) {
        target = m.message.extendedTextMessage.contextInfo.participant;
      }
      // Written number
      else if (args[0]) {
        target = args[0].replace(/[^0-9]/g, "") + "@s.whatsapp.net";
      }

      if (!target) {
        return kaya.sendMessage(
          chatId,
          { text: "⚙️ Usage: `.kick @user` or reply to their message.", contextInfo },
          { quoted: m }
        );
      }

      // 🔹 Protect admins
      const groupAdmins = participants
        .filter(p => p.admin === "admin" || p.admin === "superadmin")
        .map(p => p.id);

      if (groupAdmins.includes(target)) {
        return kaya.sendMessage(
          chatId,
          { text: "❌ Cannot skill1 an *Admin*.", contextInfo },
          { quoted: m }
        );
      }

      // ==================== SILENT SKILL ====================
      await kaya.groupParticipantsUpdate(chatId, [target], "remove");

      // ❌ NO MESSAGE SENT TO THE GROUP
      return;

    } catch (err) {
      console.error("❌ skill1 command error:", err);
      return kaya.sendMessage(
        chatId,
        { text: "⚠️ Unable to remove this member.", contextInfo },
        { quoted: m }
      );
    }
  }
};