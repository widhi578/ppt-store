'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function CheckoutForm() {
  const [template, setTemplate] = useState(null)
  const [state, setState] = useState('loading')
  const [result, setResult] = useState(null)
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '' })
  const templateId = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('template') || 'nusa-pitch' : 'nusa-pitch'

  useEffect(() => {
    fetch(`/api/templates/${templateId}`).then((response) => response.json()).then((payload) => { setTemplate(payload.data); setState(payload.data ? 'ready' : 'error') }).catch(() => setState('error'))
  }, [templateId])

  function updateField(event) { setForm((current) => ({ ...current, [event.target.name]: event.target.value })) }
  async function submitOrder(event) {
    event.preventDefault(); setState('submitting')
    const response = await fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ templateId, customer: form }) })
    const payload = await response.json()
    if (!response.ok) { setResult({ error: payload.error }); setState('ready'); return }
    setResult(payload); setState('success')
    window.setTimeout(() => window.location.assign(payload.paymentUrl), 350)
  }

  if (state === 'loading') return <main className="checkout-page section-wrap"><div className="catalog-state">Memuat detail template...</div></main>
  if (state === 'error' || !template) return <main className="checkout-page section-wrap"><div className="catalog-state">Template tidak ditemukan. <Link href="/" className="text-link">Kembali ke katalog</Link></div></main>
  if (state === 'success') return <main className="checkout-page section-wrap"><div className="success-card"><span className="success-icon">✓</span><p className="eyebrow">ORDER DITERIMA</p><h1>Order siap dibayar.</h1><p>Order <strong>{result.orderId}</strong> untuk <strong>{template.name}</strong> sudah dibuat. Anda akan diarahkan ke halaman pembayaran Midtrans.</p><p className="secure-note">Jika halaman pembayaran tidak terbuka, gunakan tombol di bawah.</p><a href={result.paymentUrl} className="button button-primary">Lanjut ke pembayaran <span>→</span></a></div></main>

  return <main className="checkout-page section-wrap"><div className="checkout-top"><Link href="/" className="text-link">← Lanjut belanja</Link><span className="secure-note">🔒 Pembayaran aman & terenkripsi</span></div><div className="checkout-layout"><section><div className="checkout-steps"><i className="active" /><i /><i /></div><h1 className="checkout-title">Hampir selesai.</h1><p className="checkout-subtitle">Lengkapi detail Anda untuk memesan <strong>{template.name}</strong>.</p><form className="checkout-form" onSubmit={submitOrder}><div className="form-section"><h2>Informasi kontak</h2><div className="field-grid"><label className="field full">Email<input required type="email" name="email" value={form.email} onChange={updateField} placeholder="nama@email.com" /></label><label className="field">Nama depan<input required type="text" name="firstName" value={form.firstName} onChange={updateField} placeholder="Nama depan" /></label><label className="field">Nama belakang<input required type="text" name="lastName" value={form.lastName} onChange={updateField} placeholder="Nama belakang" /></label></div></div><div className="form-section"><h2>Metode pembayaran</h2><label className="payment-option active"><input type="radio" name="payment" defaultChecked /> <span className="pay-icon">VISA</span> Kartu kredit atau debit</label><label className="payment-option"><input type="radio" name="payment" /> <span className="pay-icon bank">VA</span> Virtual account bank</label><label className="payment-option"><input type="radio" name="payment" /> <span className="pay-icon">QR</span> QRIS</label>{result?.error && <p className="form-error">{result.error}</p>}<button className="button button-primary checkout-button" disabled={state === 'submitting'} type="submit">{state === 'submitting' ? 'Membuat order...' : 'Lanjut ke pembayaran'} <span>→</span></button></div></form></section><aside className="order-card"><h2>Ringkasan pesanan</h2><div className="order-product"><div className="mini-deck"><CatalogMini accent={template.accent} /></div><div><h3>{template.name}</h3><p>{template.category}<br />{template.slides} slide · PPTX</p></div></div><div className="price-row"><span>Harga template</span><span>{template.priceLabel}</span></div><div className="total-row"><span>Total</span><span>{template.priceLabel}</span></div><p className="order-note">Pembayaran diproses aman melalui Midtrans. Setelah lunas, link download akan tersedia.</p></aside></div></main>
}

function CatalogMini({ accent }) { const previewAccent = accent === 'ocean' ? 'blue' : accent === 'garden' ? 'dark' : 'orange'; return <div className={`deck-preview ${previewAccent}`}><div className="deck-content"><span className="deck-kicker">PPTera</span><span className="deck-title">Your<br />story.</span></div><div className="deck-orb" /></div> }
