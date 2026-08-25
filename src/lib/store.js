import 'server-only'
import { seedTemplates } from './catalog'

const baseUrl = process.env.SUPABASE_URL?.replace(/\/$/, '')
const secretKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY
const useDatabase = Boolean(baseUrl && secretKey)
const developmentOrders = new Map()

function databaseHeaders(extra = {}) {
  return { apikey: secretKey, Authorization: `Bearer ${secretKey}`, 'Content-Type': 'application/json', ...extra }
}

async function databaseRequest(path, options = {}) {
  const response = await fetch(`${baseUrl}/rest/v1/${path}`, { ...options, headers: databaseHeaders(options.headers) })
  if (!response.ok) throw new Error(`Database request failed (${response.status})`)
  return response.status === 204 ? null : response.json()
}

function requireDatabaseInProduction() {
  if (!useDatabase && process.env.NODE_ENV === 'production') throw new Error('SUPABASE_URL dan SUPABASE_SECRET_KEY wajib diatur saat production.')
}

export async function getTemplates() {
  requireDatabaseInProduction()
  if (!useDatabase) return seedTemplates
  return databaseRequest('templates?select=*&is_active=eq.true&order=created_at.desc')
}

export async function getTemplate(id) {
  requireDatabaseInProduction()
  if (!useDatabase) return seedTemplates.find((template) => template.id === id) || null
  const rows = await databaseRequest(`templates?select=*&id=eq.${encodeURIComponent(id)}&is_active=eq.true&limit=1`)
  return rows[0] || null
}

export async function createOrder(order) {
  requireDatabaseInProduction()
  if (!useDatabase) { developmentOrders.set(order.id, order); return order }
  const rows = await databaseRequest('orders', { method: 'POST', headers: { Prefer: 'return=representation' }, body: JSON.stringify(order) })
  return rows[0]
}

export async function getOrder(id) {
  requireDatabaseInProduction()
  if (!useDatabase) return developmentOrders.get(id) || null
  const rows = await databaseRequest(`orders?select=*&id=eq.${encodeURIComponent(id)}&limit=1`)
  return rows[0] || null
}

export async function updateOrder(id, patch) {
  requireDatabaseInProduction()
  if (!useDatabase) { const order = developmentOrders.get(id); if (order) developmentOrders.set(id, { ...order, ...patch }); return }
  await databaseRequest(`orders?id=eq.${encodeURIComponent(id)}`, { method: 'PATCH', headers: { Prefer: 'return=minimal' }, body: JSON.stringify(patch) })
}
