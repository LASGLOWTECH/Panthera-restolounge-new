// lib/whatsapp.js
import axios from "axios";

const API_BASE = "https://graph.facebook.com/v18.0";

export async function sendWhatsAppCloud({ phoneId, token, toNumber, message }) {
  if (!phoneId || !token) throw new Error("WhatsApp credentials missing");
  const payload = {
    messaging_product: "whatsapp",
    to: toNumber,
    type: "text",
    text: { body: message },
  };
  const res = await axios.post(`${API_BASE}/${phoneId}/messages`, payload, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  });
  return res.data;
}

// fallback helper to return wa.me link (no API needed)
export function makeWaMeLink(number, message) {
  const text = encodeURIComponent(message);
  const clean = number.replace(/\D/g, "");
  return `https://wa.me/${clean}?text=${text}`;
}
