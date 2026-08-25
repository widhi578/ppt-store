import Link from 'next/link'
import StoreHeader from '../components/StoreHeader'

const collections = [
  { name: 'Pitch Deck', description: 'Deck yang meyakinkan untuk ide besar.', tone: 'sunset', label: '12 template' },
  { name: 'Business Pro', description: 'Untuk laporan, proposal, dan strategi.', tone: 'sand', label: '24 template' },
  { name: 'Creative', description: 'Narasi visual yang terasa lebih hidup.', tone: 'terra', label: '18 template' },
]
const templates = [
  { name: 'Kopi Senja', category: 'Brand Presentation', price: 'Rp89.000', accent: 'coffee' },
  { name: 'Nusa Pitch', category: 'Startup Pitch Deck', price: 'Rp109.000', accent: 'ocean' },
  { name: 'Tumbuh', category: 'Business Report', price: 'Rp79.000', accent: 'garden' },
]

function DeckPreview({ accent = 'orange', compact = false }) {
  return <div className={`deck-preview ${accent} ${compact ? 'deck-preview-compact' : ''}`} aria-hidden="true"><div className="deck-side-label">PPTera</div><div className="deck-content"><span className="deck-kicker">BRAND STORY</span><span className="deck-title">Ideas that<br />move people.</span><div className="deck-lines"><i /><i /><i /></div></div><div className="deck-orb" /><div className="deck-card" /></div>
}

export default function Home() {
  return <><StoreHeader /><main>
    <section className="hero section-wrap"><div className="hero-copy"><p className="eyebrow">PRESENT BETTER, EVERY TIME</p><h1>Buat presentasi<br /><em>terasa premium.</em></h1><p className="hero-description">Koleksi template PowerPoint modern yang membuat ide, brand, dan data Anda terlihat setara dengan kualitasnya.</p><div className="hero-actions"><Link className="button button-primary" href="#koleksi">Lihat koleksi <span>→</span></Link><Link className="text-link" href="/checkout">Mulai dari Rp49rb <span>↗</span></Link></div><div className="hero-proof"><div className="avatars"><b>AR</b><b>DS</b><b>MA</b></div><p><strong>2.500+</strong><br />kreator sudah percaya</p></div></div><div className="hero-visual"><div className="sun-arch" /><div className="hero-deck"><DeckPreview /></div><div className="floating-note top-note"><span>✦</span> 100% mudah diedit</div><div className="floating-note bottom-note"><strong>4.9/5</strong> dari 600+ ulasan</div></div></section>
    <section className="trust-bar section-wrap"><p>Dipercaya untuk presentasi di</p><div><strong>▲ arc</strong><strong>nusa<span>.</span></strong><strong>VERVE</strong><strong>ruang</strong><strong>kamana</strong></div></section>
    <section id="koleksi" className="collections section-wrap"><div className="section-heading"><div><p className="eyebrow">TEMUKAN GAYA ANDA</p><h2>Koleksi pilihan<br /><em>untuk setiap cerita.</em></h2></div><Link href="#template" className="text-link">Lihat semua kategori <span>→</span></Link></div><div className="collection-grid">{collections.map((collection, index) => <article className={`collection-card ${collection.tone}`} key={collection.name}><div><span>{collection.label}</span><h3>{collection.name}</h3><p>{collection.description}</p><Link href="/checkout" className="collection-buy">Beli sekarang <b>→</b></Link></div><DeckPreview accent={index === 1 ? 'blue' : index === 2 ? 'dark' : 'orange'} compact /><Link href="/checkout" aria-label={`Lihat ${collection.name}`} className="round-arrow">↗</Link></article>)}</div></section>
    <section id="template" className="featured section-wrap"><div className="section-heading"><div><p className="eyebrow">PALING DISUKAI</p><h2>Template yang siap<br /><em>mencuri perhatian.</em></h2></div><span className="count-pill">48 template baru bulan ini</span></div><div className="template-grid">{templates.map((template) => <article className="template-card" key={template.name}><div className={`template-art ${template.accent}`}><DeckPreview accent={template.accent === 'ocean' ? 'blue' : template.accent === 'garden' ? 'dark' : 'orange'} /></div><div className="template-info"><div><p>{template.category}</p><h3>{template.name}</h3></div><strong>{template.price}</strong></div></article>)}</div></section>
    <section className="cta-banner section-wrap"><div><p className="eyebrow">UNTUK TIM & BISNIS</p><h2>Satu sistem visual.<br /><em>Lebih banyak impact.</em></h2></div><div><p>Buat presentasi tim terasa sejalan, tanpa menghabiskan berjam-jam di depan slide kosong.</p><Link href="/checkout" className="button button-dark">Pilih template Anda <span>→</span></Link></div></section>
  </main><footer className="site-footer section-wrap"><span>PPTera © 2026</span><span>Designed for better stories.</span><Link href="/admin">Admin store</Link></footer></>
}
