import { getOrder } from '../../../../../lib/store'
import { getTemplate } from '../../../../../lib/store'

export async function GET(request, { params }) {
  const { id } = await params
  const token = new URL(request.url).searchParams.get('token')
  try {
    const order = await getOrder(id)
    if (!order || order.status !== 'paid' || token !== order.download_token) return Response.json({ error: 'File belum tersedia.' }, { status: 403 })
    const template = await getTemplate(order.template_id)
    if (!template?.file_url) return Response.json({ error: 'File template belum dikonfigurasi.' }, { status: 404 })
    return Response.redirect(template.file_url)
  } catch (error) { return Response.json({ error: error.message }, { status: 503 }) }
}
