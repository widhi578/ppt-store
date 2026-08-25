'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

function CatalogPreview({ accent }) {
  const previewAccent = accent === 'ocean' ? 'blue' : accent === 'garden' ? 'dark' : 'orange'
  return <div className={`deck-preview ${previewAccent}`} aria-hidden="true"><div className="deck-content"><span className="deck-kicker">PPTera TEMPLATE</span><span className="deck-title">Make your<br />story count.</span><div className="deck-lines"><i /><i /><i /></div></div><div className="deck-orb" /></div>
}

export default function TemplateCatalog() {
  const [templates, setTemplates] = useState([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()
    fetch(`/api/templates${query ? `?q=${encodeURIComponent(query)}` : ''}`, { signal: controller.signal })
      .then((response) => response.json())
      .then((payload) => setTemplates(payload.data || []))
      .catch((error) => { if (error.name !== 'AbortError') setTemplates([]) })
      .finally(() => setLoading(false))
    return () => controller.abort()
  }, [query])

  return <>
    <div className="catalog-toolbar"><span>Terbaru dari katalog API</span><label className="catalog-search"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari template..." aria-label="Cari template" /></label></div>
    {loading ? <div className="catalog-state">Memuat template...</div> : <div className="template-grid">{templates.map((template) => <article className="template-card" key={template.id}><div className={`template-art ${template.tone}`}><CatalogPreview accent={template.accent} /></div><div className="template-info"><div><p>{template.category}</p><h3>{template.name}</h3></div><strong>{template.priceLabel}</strong></div><Link href={`/checkout?template=${template.id}`} className="catalog-buy">Beli sekarang <span>→</span></Link></article>)}</div>}
    {!loading && templates.length === 0 && <div className="catalog-state">Template tidak ditemukan. Coba kata kunci lain.</div>}
  </>
}
