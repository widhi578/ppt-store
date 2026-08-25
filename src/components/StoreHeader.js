import Link from 'next/link'

export default function StoreHeader() {
  return <header className="store-header section-wrap"><Link href="/" className="brand" aria-label="PPTera home"><span className="brand-mark">P</span><span>PPTera</span></Link><nav className="main-nav" aria-label="Navigasi utama"><Link href="/">Beranda</Link><Link href="#koleksi">Koleksi</Link><Link href="#template">Template</Link><Link href="#tentang">Tentang</Link></nav><div className="header-actions"><Link href="/admin" className="login-link">Masuk admin</Link><Link href="/checkout" className="header-cta">Mulai belanja <span>↗</span></Link></div></header>
}
