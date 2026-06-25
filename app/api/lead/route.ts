import { NextResponse } from "next/server";

/**
 * Приём заявки с формы.
 * Отправляет сообщение в Telegram (если заданы env), плюс задел под почту.
 * ENV:
 *   TELEGRAM_BOT_TOKEN — токен бота
 *   TELEGRAM_CHAT_ID    — id чата/канала, куда слать заявки
 */
export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad json" }, { status: 400 });
  }

  const name = String(data.name ?? "").trim();
  const contact = String(data.contact ?? "").trim();
  const object = String(data.object ?? "").trim();

  if (!name || !contact) {
    return NextResponse.json(
      { ok: false, error: "missing fields" },
      { status: 422 }
    );
  }

  const text = [
    "🟢 Новая заявка с сайта",
    "",
    `Имя: ${name}`,
    `Связь: ${contact}`,
    object ? `Объект: ${object}` : "Объект: не указан",
  ].join("\n");

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (token && chatId) {
    try {
      const tg = await fetch(
        `https://api.telegram.org/bot${token}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text,
            disable_web_page_preview: true,
          }),
        }
      );
      if (!tg.ok) throw new Error("telegram failed");
      return NextResponse.json({ ok: true });
    } catch {
      return NextResponse.json(
        { ok: false, error: "delivery failed" },
        { status: 502 }
      );
    }
  }

  // Без настроенного Telegram просто логируем (для разработки),
  // чтобы форма не падала. Здесь же можно подключить отправку на почту.
  console.log("[lead] (telegram не настроен)\n" + text);
  return NextResponse.json({ ok: true, dev: true });
}
