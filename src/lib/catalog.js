export const seedTemplates = [
  { id: 'nusa-pitch', title: 'Nusa Pitch', category: 'Startup Pitch Deck', description: 'Pitch deck modern untuk founder yang ingin menyampaikan ide dengan jernih dan meyakinkan.', price: 109000, slides: 36, accent: 'ocean', file_url: 'https://example.com/nusa-pitch.pptx', is_active: true },
  { id: 'kopi-senja', title: 'Kopi Senja', category: 'Brand Presentation', description: 'Sistem visual hangat untuk brand story, company profile, dan presentasi kreatif.', price: 89000, slides: 28, accent: 'coffee', file_url: 'https://example.com/kopi-senja.pptx', is_active: true },
  { id: 'tumbuh-report', title: 'Tumbuh', category: 'Business Report', description: 'Template laporan yang rapi untuk data, strategi, dan pembaruan kinerja bisnis.', price: 79000, slides: 32, accent: 'garden', file_url: 'https://example.com/tumbuh-report.pptx', is_active: true },
]

export function formatRupiah(amount) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount)
}
