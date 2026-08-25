import { randomUUID } from 'crypto'
import { createMidtransTransaction } from '../../../lib/midtrans'
import { createOrder, getTemplate } from '../../../lib/store'

export const runtime = 'nodejs'

function validCustomer(customer) {
  return customer && typeof customer.firstName === 'string' && customer.firstName.trim().length > 1 && typeof customer.lastName === 'string' && customer.lastName.trim().length > 1 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email || '')
}

export async function POST(request) {
  try {
    const { templateId, customer } = await request.json()
    if (!validCustomer(customer) || typeof templateId !== 'string') return Response.json({ error: 'Lengkapi nama dan email yang valid.' }, { status: 400 })
    const template = await getTemplate(templateId)
    if (!template) return Response.json({ error: 'Template tidak ditemukan atau tidak tersedia.' }, { status: 404 })
    const id = `PPT-${randomUUID().replaceAll('-', '').slice(0, 24)}`
    const downloadToken = randomUUID()
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '')
    if (!siteUrl) throw new Error('NEXT_PUBLIC_SITE_URL belum diatur.')
    const finishUrl = `${siteUrl}/checkout/success?order=${encodeURIComponent(id)}&token=${encodeURIComponent(downloadToken)}`
    const transaction = await createMidtransTransaction({ orderId: id, amount: template.price, template, customer, finishUrl })
    await createOrder({ id, template_id: template.id, template_title: template.title, customer_email: customer.email.trim().toLowerCase(), customer_name: `${customer.firstName.trim()} ${customer.lastName.trim()}`, amount: template.price, status: 'pending', payment_url: transaction.redirect_url, download_token: downloadToken })
    return Response.json({ orderId: id, paymentUrl: transaction.redirect_url })
  } catch (error) { return Response.json({ error: error.message || 'Checkout tidak dapat diproses.' }, { status: 503 }) }
}
