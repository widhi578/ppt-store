import { getOrder } from '../../../../lib/store'

export async function GET(request, { params }) {
  const { id } = await params
  const token = new URL(request.url).searchParams.get('token')
  try {
    const order = await getOrder(id)
    if (!order || !token || token !== order.download_token) return Response.json({ error: 'Order tidak ditemukan.' }, { status: 404 })
    return Response.json({ data: { id: order.id, status: order.status, templateTitle: order.template_title, downloadUrl: order.status === 'paid' ? `/api/orders/${order.id}/download?token=${encodeURIComponent(token)}` : null } })
  } catch (error) { return Response.json({ error: error.message }, { status: 503 }) }
}
