import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

const VALID_FORM_TYPES = ['contact', 'ebook', 'whitepaper', 'template', 'webinar'] as const

// In-memory rate limiting (sufficient for launch, upgrade to Redis if needed)
const rateLimitMap = new Map<string, { count: number; firstRequest: number }>()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX = 5 // max 5 submissions per minute per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now - entry.firstRequest > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, firstRequest: now })
    return false
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return true
  }

  entry.count++
  return false
}

// Clean up old entries every 5 minutes
if (typeof globalThis !== 'undefined') {
  const cleanup = (): void => {
    const now = Date.now()
    for (const [key, value] of rateLimitMap.entries()) {
      if (now - value.firstRequest > RATE_LIMIT_WINDOW) {
        rateLimitMap.delete(key)
      }
    }
  }
  setInterval(cleanup, 5 * 60 * 1000)
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // Origin check — only accept submissions from our own site
    const origin = req.headers.get('origin')
    const allowedOrigins = [
      process.env.NEXT_PUBLIC_SERVER_URL,
      'http://localhost:3000',
      'http://localhost:3001',
      'https://revnator.com',
      'https://www.revnator.com',
    ].filter(Boolean)

    if (origin && !allowedOrigins.includes(origin)) {
      return NextResponse.json({ error: 'Unauthorized origin' }, { status: 403 })
    }

    // Rate limiting
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'unknown'

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again in a minute.' },
        { status: 429 },
      )
    }

    const body = await req.json()

    // Honeypot check — bots fill hidden fields, real users don't
    if (body.website) {
      return NextResponse.json({ success: true })
    }

    // Required fields
    if (!body.email || !body.formType) {
      return NextResponse.json(
        { error: 'Email and form type are required' },
        { status: 400 },
      )
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 },
      )
    }

    // Validate formType
    if (!VALID_FORM_TYPES.includes(body.formType)) {
      return NextResponse.json(
        { error: 'Invalid form type' },
        { status: 400 },
      )
    }

    const payload = await getPayload({ config })

    await payload.create({
      collection: 'lead-submissions',
      data: {
        formType: body.formType,
        source: body.source || 'unknown',
        firstName: body.firstName || '',
        lastName: body.lastName || '',
        email: body.email,
        company: body.company || '',
        teamSize: body.teamSize || '',
        subject: body.subject || '',
        message: body.message || '',
        status: 'new',
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Form submission error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 },
    )
  }
}
