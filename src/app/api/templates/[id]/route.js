import { formatRupiah } from '../../../../lib/catalog'
import { getTemplate } from '../../../../lib/store'

export async function GET(_request, { params }) {
  const { id } = await params
  const template = await getTemplate(id)
  if (!template) return Response.json({ error: 'Template tidak ditemukan.' }, { status: 404 })
  return Response.json({ data: { ...template, name: template.title, tone: template.accent, priceLabel: formatRupiah(template.price) } })
}
