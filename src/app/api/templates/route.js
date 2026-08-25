import { formatRupiah } from '../../../lib/catalog'
import { getTemplates } from '../../../lib/store'

function serialize(template) {
  return { ...template, name: template.title, tone: template.accent, priceLabel: formatRupiah(template.price) }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')?.toLowerCase().trim()
  const category = searchParams.get('category')?.toLowerCase().trim()
  const templates = await getTemplates()
  const filtered = templates.filter((template) => {
    const matchesQuery = !query || `${template.title} ${template.category}`.toLowerCase().includes(query)
    const matchesCategory = !category || template.category.toLowerCase().includes(category)
    return matchesQuery && matchesCategory
  })

  return Response.json({ data: filtered.map(serialize), count: filtered.length })
}
