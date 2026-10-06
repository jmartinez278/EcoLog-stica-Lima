import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { App } from './App'

function json(data: unknown, status = 200) {
  return { ok: status < 400, status, json: async () => data } as Response
}

async function login() {
  await userEvent.type(screen.getByLabelText('Correo electrónico'), 'op@example.test')
  await userEvent.type(screen.getByLabelText('Contraseña'), 'secret')
  await userEvent.click(screen.getByRole('button', { name: 'Ingresar' }))
  await screen.findByRole('heading', { name: 'Inicio' })
}

beforeEach(() => {
  vi.restoreAllMocks()
  vi.spyOn(window, 'confirm').mockReturnValue(true)
  vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
})
afterEach(() => { cleanup(); vi.unstubAllGlobals() })

describe('flujos principales', () => {
  it('inicia sesión y muestra un error cuando las credenciales fallan', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(json({ detail: 'Credenciales inválidas' }, 401)))
    render(<App />)
    await userEvent.type(screen.getByLabelText('Correo electrónico'), 'op@example.test')
    await userEvent.type(screen.getByLabelText('Contraseña'), 'incorrecta')
    await userEvent.click(screen.getByRole('button', { name: 'Ingresar' }))
    expect(await screen.findByRole('alert')).toHaveTextContent('Credenciales inválidas')
  })

  it('registra, edita y desactiva un vehículo', async () => {
    const vehicles: Record<string, unknown>[] = []
    const fetchMock = vi.fn(async (input: string, init?: RequestInit) => {
      if (input.endsWith('/auth/login')) return json({ access_token: 'token' })
      if (input.endsWith('/vehiculos') && !init?.method) return json(vehicles)
      if (input.endsWith('/vehiculos') && init?.method === 'POST') {
        const vehicle = { ...JSON.parse(init.body as string), vehiculo_id: 'v1' }
        vehicles.push(vehicle); return json(vehicle, 201)
      }
      if (input.endsWith('/vehiculos/v1') && init?.method === 'PUT') {
        Object.assign(vehicles[0], JSON.parse(init.body as string)); return json(vehicles[0])
      }
      if (input.endsWith('/vehiculos/v1/desactivar') && init?.method === 'PATCH') {
        vehicles[0].estado = 'INACTIVO'; return json(vehicles[0])
      }
      throw new Error(`Unexpected request ${input}`)
    })
    vi.stubGlobal('fetch', fetchMock)
    render(<App />); await login()
    await userEvent.click(screen.getByRole('button', { name: 'Vehículos' }))
    await screen.findByText('No existen vehículos registrados.')
    await userEvent.type(screen.getByLabelText('Placa'), 'ABC-123')
    await userEvent.type(screen.getByLabelText('Marca'), 'Toyota')
    await userEvent.type(screen.getByLabelText('Modelo'), 'Hiace')
    await userEvent.type(screen.getByLabelText('Capacidad (kg)'), '1200')
    await userEvent.type(screen.getByLabelText('Capacidad (m³)'), '8')
    await userEvent.click(screen.getByRole('button', { name: 'Registrar' }))
    expect(await screen.findByText('ABC-123')).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Editar' }))
    fireEvent.change(screen.getByLabelText('Capacidad (kg)'), { target: { value: '1500' } })
    await userEvent.click(screen.getByRole('button', { name: 'Guardar cambios' }))
    await waitFor(() => expect(screen.getByText(/1500 kg/)).toBeInTheDocument())
    await userEvent.click(screen.getByRole('button', { name: 'Desactivar' }))
    await waitFor(() => expect(vehicles[0].estado).toBe('INACTIVO'))
    expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('/desactivar'), expect.objectContaining({ method: 'PATCH' }))
  })

  it('registra y cancela un pedido con el cliente inicial', async () => {
    const orders: Record<string, unknown>[] = []
    vi.stubGlobal('fetch', vi.fn(async (input: string, init?: RequestInit) => {
      if (input.endsWith('/auth/login')) return json({ access_token: 'token' })
      if (input.includes('/clientes?activo=true')) return json([{ cliente_id: 'c1', nombre: 'Cliente de ejemplo' }])
      if (input.endsWith('/pedidos') && !init?.method) return json(orders)
      if (input.endsWith('/pedidos') && init?.method === 'POST') {
        const order = { ...JSON.parse(init.body as string), pedido_id: 'p1', estado: 'PENDIENTE' }
        orders.push(order); return json(order, 201)
      }
      if (input.endsWith('/pedidos/p1') && init?.method === 'PUT') {
        Object.assign(orders[0], JSON.parse(init.body as string)); return json(orders[0])
      }
      if (input.endsWith('/pedidos/p1/cancelar')) {
        orders[0].estado = 'CANCELADO'; return json(orders[0])
      }
      throw new Error(`Unexpected request ${input}`)
    }))
    render(<App />); await login()
    await userEvent.click(screen.getByRole('button', { name: 'Pedidos' }))
    await screen.findByText('No hay pedidos para el filtro seleccionado.')
    await userEvent.selectOptions(screen.getByLabelText('Cliente'), 'c1')
    await userEvent.type(screen.getByLabelText('Código de pedido'), 'PED-001')
    await userEvent.type(screen.getByLabelText('Dirección de entrega'), 'Av. Lima 100')
    await userEvent.type(screen.getByLabelText('Latitud'), '-12.04')
    await userEvent.type(screen.getByLabelText('Longitud'), '-77.02')
    await userEvent.type(screen.getByLabelText('Peso (kg)'), '25')
    await userEvent.type(screen.getByLabelText('Volumen (m³)'), '0.125')
    fireEvent.change(screen.getByLabelText('Inicio de ventana'), { target: { value: '2026-10-01T09:00' } })
    fireEvent.change(screen.getByLabelText('Fin de ventana'), { target: { value: '2026-10-01T12:00' } })
    await userEvent.click(screen.getByRole('button', { name: 'Registrar' }))
    expect(await screen.findByText('PED-001')).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Editar' }))
    await userEvent.clear(screen.getByLabelText('Dirección de entrega'))
    await userEvent.type(screen.getByLabelText('Dirección de entrega'), 'Jr. Nuevo 200')
    await userEvent.click(screen.getByRole('button', { name: 'Guardar cambios' }))
    expect(await screen.findByText('Jr. Nuevo 200')).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Cancelar pedido' }))
    await waitFor(() => expect(orders[0].estado).toBe('CANCELADO'))
  })

  it('registra, actualiza, desactiva y filtra conductores', async () => {
    const drivers: Record<string, unknown>[] = []
    const fetchMock = vi.fn(async (input: string, init?: RequestInit) => {
      if (input.endsWith('/auth/login')) return json({ access_token: 'token' })
      if (input.includes('/conductores') && !init?.method) return json(input.includes('disponible=true') ? drivers.filter(item => item.estado === 'DISPONIBLE') : drivers)
      if (input.endsWith('/conductores') && init?.method === 'POST') {
        const driver = { ...JSON.parse(init.body as string), conductor_id: 'd1' }
        drivers.push(driver); return json(driver, 201)
      }
      if (input.endsWith('/conductores/d1') && init?.method === 'PUT') {
        Object.assign(drivers[0], JSON.parse(init.body as string)); return json(drivers[0])
      }
      if (input.endsWith('/conductores/d1/desactivar') && init?.method === 'PATCH') {
        drivers[0].estado = 'INACTIVO'; return json(drivers[0])
      }
      throw new Error(`Unexpected request ${input}`)
    })
    vi.stubGlobal('fetch', fetchMock)
    render(<App />); await login()
    await userEvent.click(screen.getByRole('button', { name: 'Conductores' }))
    await screen.findByText('No existen conductores registrados.')
    await userEvent.type(screen.getByLabelText('Nombres'), 'Ana')
    await userEvent.type(screen.getByLabelText('Apellidos'), 'Pérez')
    await userEvent.type(screen.getByLabelText('Número de licencia'), 'LIC-001')
    await userEvent.type(screen.getByLabelText('Categoría de licencia'), 'A-IIb')
    await userEvent.click(screen.getByRole('button', { name: 'Registrar' }))
    expect(await screen.findByText('Ana Pérez')).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Editar' }))
    await userEvent.clear(screen.getByLabelText('Teléfono'))
    await userEvent.type(screen.getByLabelText('Teléfono'), '999111222')
    await userEvent.click(screen.getByRole('button', { name: 'Guardar cambios' }))
    expect(await screen.findByText('999111222')).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Desactivar' }))
    await waitFor(() => expect(drivers[0].estado).toBe('INACTIVO'))
    await userEvent.click(screen.getByLabelText('Solo disponibles'))
    await waitFor(() => expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('disponible=true'), expect.anything()))
  })

  it('registra, consulta y actualiza las condiciones de un cliente', async () => {
    const clients: Record<string, unknown>[] = []
    vi.stubGlobal('fetch', vi.fn(async (input: string, init?: RequestInit) => {
      if (input.endsWith('/auth/login')) return json({ access_token: 'token' })
      if (input.includes('/clientes') && !init?.method) return json(input.includes('activo=true') ? clients.filter(item => item.estado === 'ACTIVO') : clients)
      if (input.endsWith('/clientes') && init?.method === 'POST') {
        const client = { ...JSON.parse(init.body as string), cliente_id: 'c1', creado_en: '2026-10-06T12:00:00Z' }
        clients.push(client); return json(client, 201)
      }
      if (input.endsWith('/clientes/c1') && init?.method === 'PUT') {
        Object.assign(clients[0], JSON.parse(init.body as string)); return json(clients[0])
      }
      throw new Error(`Unexpected request ${input}`)
    }))
    render(<App />); await login()
    await userEvent.click(screen.getByRole('button', { name: 'Clientes' }))
    await screen.findByText('No existen clientes registrados.')
    await userEvent.type(screen.getByLabelText('Nombre'), 'Bodega Central')
    await userEvent.type(screen.getByLabelText('Correo electrónico'), 'entregas@bodega.test')
    await userEvent.type(screen.getByLabelText('Preferencia de entrega'), 'Llamar antes')
    await userEvent.type(screen.getByLabelText('Restricción de acceso'), 'Acceso lateral')
    await userEvent.click(screen.getByRole('button', { name: 'Registrar' }))
    expect(await screen.findByText('Bodega Central')).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Editar' }))
    await userEvent.clear(screen.getByLabelText('Preferencia de entrega'))
    await userEvent.type(screen.getByLabelText('Preferencia de entrega'), 'Entregar por la mañana')
    await userEvent.click(screen.getByRole('button', { name: 'Guardar cambios' }))
    expect(await screen.findByText(/Entregar por la mañana/)).toBeInTheDocument()
    await userEvent.click(screen.getByLabelText('Solo activos'))
    await waitFor(() => expect(fetch).toHaveBeenCalledWith(expect.stringContaining('activo=true'), expect.anything()))
  })
})
