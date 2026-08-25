import 'server-only'

export async function createMidtransTransaction({ orderId, amount, template, customer, finishUrl }) {
  const serverKey = process.env.MIDTRANS_SERVER_KEY
  if (!serverKey) throw new Error('MIDTRANS_SERVER_KEY belum diatur.')
  const production = process.env.MIDTRANS_IS_PRODUCTION === 'true'
  const endpoint = production ? 'https://app.midtrans.com/snap/v1/transactions' : 'https://app.sandbox.midtrans.com/snap/v1/transactions'
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: `Basic ${Buffer.from(`${serverKey}:`).toString('base64')}` },
    body: JSON.stringify({
      transaction_details: { order_id: orderId, gross_amount: amount },
      item_details: [{ id: template.id, price: amount, quantity: 1, name: template.title.slice(0, 50) }],
      customer_details: { first_name: customer.firstName, last_name: customer.lastName, email: customer.email },
      credit_card: { secure: true },
      callbacks: { finish: finishUrl },
    }),
    cache: 'no-store',
  })
  const payload = await response.json()
  if (!response.ok) throw new Error(payload.error_messages?.[0] || payload.error_message || 'Midtrans gagal membuat transaksi.')
  return payload
}
