"use server";

export async function sendContactMessage(_previousState, formData) {
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const message = String(formData.get("message") || "").trim();
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

  if (!name || !email || !message) {
    return { status: "error", message: "Incomplete Fields" };
  }

  if (!accessKey) {
    return { status: "error", message: "Press Desk Offline" };
  }

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        access_key: accessKey,
        name,
        email,
        message,
        subject: `Portfolio Inquiry from ${name}`
      })
    });

    if (!response.ok) {
      return { status: "error", message: "Error Sending" };
    }

    return { status: "success", message: "Message Dispatched" };
  } catch {
    return { status: "error", message: "Error Sending" };
  }
}
