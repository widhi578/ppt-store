import { createHash, timingSafeEqual } from 'crypto'
import { getOrder, updateOrder } from '../../../../lib/store'

export const runtime = 'nodejs'

function statusFromNotification(transactionStatus, fraudStatus) {
  if ((transactionStatus === 'settlement' || transactionStatus === 'capture') && (!fraudStatus || fraudStatus === 'accept')) return 'paid'
  if (['deny', 'cancel', 'expire', 'failure'].includes(transactionStatus)) return 'failed'
  return 'pending'
}

export async function POST(request) {
  try {
    const body = await request.json()
    const serverKey = process.env.MIDTRANS_SERVER_KEY
    if (!serverKey) return Response.json({ error: 'Webhook belum dikonfigurasi.' }, { status: 503 })
    const expected = createHash('sha512').update(`${body.order_id}${body.status_code}${body.gross_amount}${serverKey}`).digest('hex')
    const received = body.signature_key || ''
    if (received.length !== expected.length || !timingSafeEqual(Buffer.from(received), Buffer.from(expected))) return Response.json({ error: 'Signature Midtrans tidak valid.' }, { status: 401 })
    const order = await getOrder(body.order_id)
    if (!order || Number(body.gross_amount) !== Number(order.amount)) return Response.json({ error: 'Order tidak valid.' }, { status: 404 })
    await updateOrder(order.id, { status: statusFromNotification(body.transaction_status, body.fraud_status), payment_type: body.payment_type || null, payment_reference: body.transaction_id || null, paid_at: body.transaction_status === 'settlement' ? new Date().toISOString() : null })
    return Response.json({ received: true })
  } catch (error) { return Response.json({ error: error.message || 'Webhook tidak dapat diproses.' }, { status: 400 }) }
}
