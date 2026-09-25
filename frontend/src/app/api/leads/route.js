import { NextResponse } from 'next/server'

const GOOGLE_SHEETS_TIMEOUT_MS = 15_000

function normalize(value) {
  return String(value ?? '').trim()
}

function validateLead(body) {
  const parentName = normalize(body.parentName)
  const phone = normalize(body.phone)
  const program = normalize(body.program)

  if (!parentName || !phone || !program) {
    return {
      ok: false,
      detail: 'Заполните обязательные поля',
    }
  }

  return {
    ok: true,
    data: {
      parentName,
      phone,
      program,
      social: normalize(body.social),
      tariff: normalize(body.tariff),
    },
  }
}

async function saveLeadToGoogleSheets(data) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL?.trim()

  if (!webhookUrl) {
    throw new Error('GOOGLE_SHEETS_WEBHOOK_URL is not configured')
  }

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: data.parentName,
      phone: data.phone,
      email: data.social,
      course: data.program,
      tariff: data.tariff,
      source: 'lumika.tech',
    }),
    redirect: 'follow',
    signal: AbortSignal.timeout(GOOGLE_SHEETS_TIMEOUT_MS),
  })

  if (!response.ok) {
    const responseText = await response.text()

    console.error('Google Apps Script error', {
      status: response.status,
      body: responseText,
    })

    throw new Error(
      `Google Apps Script returned HTTP ${response.status}`,
    )
  }
}

export async function POST(request) {
  let body

  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      {
        ok: false,
        detail: 'Некорректный JSON',
      },
      { status: 400 },
    )
  }

  const validation = validateLead(body)

  if (!validation.ok) {
    return NextResponse.json(
      {
        ok: false,
        detail: validation.detail,
      },
      { status: 422 },
    )
  }

  try {
    await saveLeadToGoogleSheets(validation.data)
  } catch (error) {
    console.error('Failed to save lead:', error)

    return NextResponse.json(
      {
        ok: false,
        detail: 'Не удалось отправить заявку. Попробуйте ещё раз.',
      },
      { status: 502 },
    )
  }

  return NextResponse.json(
    {
      ok: true,
      message: 'Заявка успешно отправлена',
    },
    { status: 201 },
  )
}

