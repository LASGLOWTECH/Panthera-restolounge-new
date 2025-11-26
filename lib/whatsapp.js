import axios from "axios";

export async function sendWhatsAppCloud({ phoneId, token, toNumber, message }) {
  const API_BASE = "https://graph.facebook.com/v22.0";

  let phone = toNumber.toString().trim();

  if (phone.startsWith("+")) phone = phone.slice(1);
  if (phone.startsWith("0")) phone = "234" + phone.slice(1);
  if (!phone.startsWith("234")) phone = "234" + phone;

  const payload = {
    messaging_product: "whatsapp",
    to: phone,
    type: "text",
    text: { body: message }
  };

  try {
    const res = await axios.post(
      `${API_BASE}/${phoneId}/messages`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

    return res.data;
  }  catch (err) {
  console.error(
    "WA CLOUD API ERROR:",
    err.response?.data || err.message || err
  );
  throw err;
}
}

export function makeWaMeLink(phone, message) {
  let num = phone.toString().trim();

  if (num.startsWith("+")) num = num.slice(1);
  if (num.startsWith("0")) num = "234" + num.slice(1);
  if (!num.startsWith("234")) num = "234" + num;

  const encoded = encodeURIComponent(message);
  return `https://wa.me/${num}?text=${encoded}`;
}
