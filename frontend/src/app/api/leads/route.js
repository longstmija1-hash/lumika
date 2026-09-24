import { NextResponse } from 'next/server'

function escapeHtml(text) {
  return String(text ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function buildTelegramMessage(data) {
  const tariff = data.tariff ? `\n💳 Тариф: ${escapeHtml(data.tariff)}` : ''
  const email = data.social ? `\n📧 Email: ${escapeHtml(data.social)}` : ''

  return `🚨 <b>НОВАЯ ЗАЯВКА</b>
👤 Имя: ${escapeHtml(data.parentName)}
📱 Телефон: ${escapeHtml(data.phone)}${email}
🎯 Программа: ${escapeHtml(data.program)}${tariff}
📍 Источник: сайт (форма записи)`
}

function isConnectTimeout(error) {
  return (
    error?.cause?.code === 'UND_ERR_CONNECT_TIMEOUT' ||
    error?.cause?.code === 'ETIMEDOUT' ||
    error?.name === 'TimeoutError'
  )
}

function parseTelegramError(body) {
  try {
    const data = JSON.parse(body)
    return data?.description || null
  } catch {
    return null
  }
}

export async function POST(request) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN?.trim()
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim()

  if (!botToken || !chatId) {
    console.error('TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not set')
    return NextResponse.json(
      { detail: 'Telegram не настроен на сервере. Добавьте переменные в Vercel.' },
      { status: 500 },
    )
  }

  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ detail: 'Некорректный JSON' }, { status: 400 })
  }

  const { parentName, phone, program } = body
  if (!parentName?.trim() || !phone?.trim() || !program?.trim()) {
    return NextResponse.json({ detail: 'Заполните обязательные поля' }, { status: 422 })
  }

  const message = buildTelegramMessage(body)

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
      }),
      signal: AbortSignal.timeout(30_000),
    })

    if (!response.ok) {
      const errorText = await response.text()
      const telegramError = parseTelegramError(errorText)
      console.error('Telegram API error:', response.status, errorText)

      let detail = 'Не удалось отправить в Telegram'
      if (telegramError?.includes('Unauthorized')) {
        detail = 'Неверный TELEGRAM_BOT_TOKEN в Vercel'
      } else if (telegramError?.includes('chat not found')) {
        detail = 'Неверный TELEGRAM_CHAT_ID или вы не написали боту первое сообщение'
      } else if (telegramError) {
        detail = `Telegram: ${telegramError}`
      }

      return NextResponse.json({ detail }, { status: 502 })
    }

    return NextResponse.json({ ok: true }, { status: 201 })
  } catch (error) {
    console.error('Telegram request failed:', error)

    if (isConnectTimeout(error)) {
      return NextResponse.json(
        { detail: 'Не удалось подключиться к Telegram API' },
        { status: 502 },
      )
    }

    return NextResponse.json({ detail: 'Ошибка соединения с Telegram' }, { status: 502 })
  }
}
