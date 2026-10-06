import { useEffect, useState, type FormEvent, type ReactNode } from 'react'
import { api, type Client, type Driver, type Order, type Vehicle } from './api'

type Page = 'Inicio' | 'Vehículos' | 'Pedidos' | 'Conductores' | 'Clientes'
type Notice = { text: string; error: boolean } | null

function Field({ label, children }: { label: string; children: ReactNode }) {
  return <label className="field"><span>{label}</span>{children}</label>
}

function NoticeBox({ notice }: { notice: Notice }) {
  return notice && <div role={notice.error ? 'alert' : 'status'} className={notice.error ? 'notice error' : 'notice success'}>{notice.text}</div>
}

function PageIntro({ number, title, description }: { number: string; title: Page; description: string }) {
  return <div className="page-intro">
    <div><p className="eyebrow"><span className="eyebrow-mark" /> MÓDULO / {number}</p>
      <h1>{title}<span className="heading-dot" aria-hidden="true">.</span></h1><p className="page-description">{description}</p></div>
    <span className="edition-tag">ECOLOGÍSTICA · SPRINT 02</span>
  </div>
}

function Login({ onLogin }: { onLogin: (token: string) => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [notice, setNotice] = useState<Notice>(null)
  const [busy, setBusy] = useState(false)

  async function submit(event: FormEvent) {
    event.preventDefault()
    setBusy(true)
    setNotice(null)
    try {
      const result = await api<{ access_token: string }>('/auth/login', '', {
        method: 'POST', body: JSON.stringify({ email, password }),
      })
      onLogin(result.access_token)
    } catch (error) {
      setNotice({ text: (error as Error).message, error: true })
    } finally {
      setBusy(false)
    }
  }

  return <main className="login-shell"><div className="login-layout">
    <section className="login-story" aria-labelledby="login-title">
      <p className="eyebrow"><span className="eyebrow-mark" /> ECOLOGÍSTICA / LIMA</p>
      <h1 id="login-title">La operación,<br /><span>en orden.</span></h1>
      <p className="login-lead">Vehículos, pedidos y conductores en un mismo lugar. Una base clara para cada entrega.</p>
      <div className="preview-window" aria-hidden="true">
        <div className="window-bar"><span className="window-controls"><i /><i /><i /></span><span>OPERACIÓN / SPRINT_02</span><span>● ACTIVO</span></div>
        <div className="preview-body"><span className="preview-kicker">PANEL OPERATIVO</span><strong>Todo listo para avanzar<span className="heading-dot">.</span></strong>
          <div className="preview-row"><span className="preview-icon">01</span><span>Vehículos</span><span>↗</span></div>
          <div className="preview-row"><span className="preview-icon">02</span><span>Pedidos</span><span>↗</span></div>
          <div className="preview-row"><span className="preview-icon">03</span><span>Conductores</span><span>↗</span></div>
          <div className="preview-row"><span className="preview-icon">04</span><span>Clientes</span><span>↗</span></div>
        </div>
      </div>
    </section>
    <section className="panel login-panel">
      <div className="panel-topline"><span>ACCESO / OPERADOR</span><span className="online-indicator">● SISTEMA LOCAL</span></div>
      <div className="login-panel-body"><span className="login-emblem" aria-hidden="true">EL<span>↗</span></span>
        <h2>Bienvenido de nuevo<span className="heading-dot">.</span></h2><p>Ingresa con tu cuenta de operador para continuar.</p>
        <form onSubmit={submit} className="form-grid">
          <Field label="Correo electrónico"><input type="email" autoComplete="username" required placeholder="operador@empresa.com" value={email} onChange={event => setEmail(event.target.value)} /></Field>
          <Field label="Contraseña"><input type="password" autoComplete="current-password" required placeholder="Tu contraseña" value={password} onChange={event => setPassword(event.target.value)} /></Field>
          <button className="login-submit" disabled={busy} type="submit">{busy ? 'Ingresando…' : 'Ingresar'}<span aria-hidden="true">→</span></button>
        </form><NoticeBox notice={notice} />
      </div>
      <div className="login-footer">GESTIÓN LOGÍSTICA / LIMA, PERÚ</div>
    </section>
  </div></main>
}

type VehicleForm = Omit<Vehicle, 'vehiculo_id'>
const emptyVehicle: VehicleForm = {
  placa: '', marca: '', modelo: '', capacidad_kg: '', capacidad_m3: '',
  consumo_km_l: null, factor_emision_kg_co2_km: null, estado: 'DISPONIBLE',
}

function VehiclesPage({ token }: { token: string }) {
  const [items, setItems] = useState<Vehicle[]>([])
  const [form, setForm] = useState<VehicleForm>(emptyVehicle)
  const [editing, setEditing] = useState<string | null>(null)
  const [notice, setNotice] = useState<Notice>(null)
  const [busy, setBusy] = useState(false)

  async function load() {
    try { setItems(await api<Vehicle[]>('/vehiculos', token)) }
    catch (error) { setNotice({ text: (error as Error).message, error: true }) }
  }
  useEffect(() => { void load() }, [token])

  function set<K extends keyof VehicleForm>(key: K, value: VehicleForm[K]) {
    setForm(current => ({ ...current, [key]: value }))
  }

  async function submit(event: FormEvent) {
    event.preventDefault(); setBusy(true); setNotice(null)
    try {
      await api(editing ? `/vehiculos/${editing}` : '/vehiculos', token, {
        method: editing ? 'PUT' : 'POST', body: JSON.stringify(form),
      })
      setNotice({ text: editing ? 'Vehículo actualizado.' : 'Vehículo registrado.', error: false })
      setEditing(null); setForm(emptyVehicle); await load()
    } catch (error) { setNotice({ text: (error as Error).message, error: true }) }
    finally { setBusy(false) }
  }

  async function deactivate(item: Vehicle) {
    if (!window.confirm(`¿Desactivar el vehículo ${item.placa}?`)) return
    try {
      await api(`/vehiculos/${item.vehiculo_id}/desactivar`, token, { method: 'PATCH' })
      setNotice({ text: 'Vehículo desactivado.', error: false }); await load()
    } catch (error) { setNotice({ text: (error as Error).message, error: true }) }
  }

  return <section>
    <PageIntro number="01" title="Vehículos" description="Organiza la flota y mantén sus datos operativos al día." /><NoticeBox notice={notice} />
    <div className="split"><div className="panel">
      <p className="panel-label">FLOTA / FORMULARIO</p><h2>{editing ? 'Editar vehículo' : 'Registrar vehículo'}</h2><p className="panel-description">Datos que identifican y describen la capacidad de cada unidad.</p>
      <form onSubmit={submit} className="form-grid">
        <Field label="Placa"><input required maxLength={15} value={form.placa} onChange={e => set('placa', e.target.value)} /></Field>
        <Field label="Marca"><input required maxLength={80} value={form.marca} onChange={e => set('marca', e.target.value)} /></Field>
        <Field label="Modelo"><input required maxLength={80} value={form.modelo} onChange={e => set('modelo', e.target.value)} /></Field>
        <Field label="Capacidad (kg)"><input required type="number" step="0.01" min="0.01" value={form.capacidad_kg} onChange={e => set('capacidad_kg', e.target.value)} /></Field>
        <Field label="Capacidad (m³)"><input required type="number" step="0.01" min="0.01" value={form.capacidad_m3} onChange={e => set('capacidad_m3', e.target.value)} /></Field>
        <Field label="Consumo (km/l)"><input type="number" step="0.0001" min="0.0001" value={form.consumo_km_l ?? ''} onChange={e => set('consumo_km_l', e.target.value || null)} /></Field>
        <Field label="Emisión (kg CO₂/km)"><input type="number" step="0.000001" min="0" value={form.factor_emision_kg_co2_km ?? ''} onChange={e => set('factor_emision_kg_co2_km', e.target.value || null)} /></Field>
        <Field label="Estado"><select value={form.estado} onChange={e => set('estado', e.target.value)}>
          {['DISPONIBLE', 'EN_RUTA', 'MANTENIMIENTO', 'INACTIVO'].map(state => <option key={state}>{state}</option>)}
        </select></Field>
        <div className="actions"><button disabled={busy}>{editing ? 'Guardar cambios' : 'Registrar'}</button>
          {editing && <button type="button" className="secondary" onClick={() => { setEditing(null); setForm(emptyVehicle) }}>Cancelar edición</button>}
        </div>
      </form>
    </div><div className="panel"><p className="panel-label">FLOTA / REGISTROS</p><div className="panel-heading"><h2>Flota registrada</h2><span className="count-pill">{items.length}</span></div>
      {items.length === 0 ? <p className="empty-state">No existen vehículos registrados.</p> : <ul className="cards">
        {items.map(item => <li key={item.vehiculo_id}><div className="card-heading"><strong>{item.placa}</strong><span className="badge" data-state={item.estado}>{item.estado}</span></div>
          <p className="card-subtitle">{item.marca} · {item.modelo}</p><p className="card-detail"><span>{item.capacidad_kg} kg</span><span>{item.capacidad_m3} m³</span></p>
          <div className="actions"><button type="button" className="secondary" onClick={() => { setEditing(item.vehiculo_id); setForm({ ...item }); window.scrollTo(0, 0) }}>Editar</button>
            {item.estado !== 'INACTIVO' && <button type="button" className="danger" onClick={() => void deactivate(item)}>Desactivar</button>}
          </div></li>)}
      </ul>}
    </div></div>
  </section>
}

type DriverForm = Omit<Driver, 'conductor_id'>
const emptyDriver: DriverForm = {
  nombres: '', apellidos: '', numero_licencia: '', categoria_licencia: '',
  telefono: null, experiencia_anios: null, estado: 'DISPONIBLE',
}

function DriversPage({ token }: { token: string }) {
  const [items, setItems] = useState<Driver[]>([])
  const [form, setForm] = useState<DriverForm>(emptyDriver)
  const [editing, setEditing] = useState<string | null>(null)
  const [onlyAvailable, setOnlyAvailable] = useState(false)
  const [notice, setNotice] = useState<Notice>(null)
  const [busy, setBusy] = useState(false)
  async function load() {
    try { setItems(await api<Driver[]>(`/conductores${onlyAvailable ? '?disponible=true' : ''}`, token)) }
    catch (error) { setNotice({ text: (error as Error).message, error: true }) }
  }
  useEffect(() => { void load() }, [token, onlyAvailable])
  function set<K extends keyof DriverForm>(key: K, value: DriverForm[K]) { setForm(current => ({ ...current, [key]: value })) }
  async function submit(event: FormEvent) {
    event.preventDefault(); setBusy(true); setNotice(null)
    try {
      await api(editing ? `/conductores/${editing}` : '/conductores', token, {
        method: editing ? 'PUT' : 'POST', body: JSON.stringify(form),
      })
      setNotice({ text: editing ? 'Conductor actualizado.' : 'Conductor registrado.', error: false })
      setEditing(null); setForm(emptyDriver); await load()
    } catch (error) { setNotice({ text: (error as Error).message, error: true }) }
    finally { setBusy(false) }
  }
  async function deactivate(item: Driver) {
    if (!window.confirm(`¿Desactivar al conductor ${item.nombres} ${item.apellidos}?`)) return
    try {
      await api(`/conductores/${item.conductor_id}/desactivar`, token, { method: 'PATCH' })
      setNotice({ text: 'Conductor desactivado.', error: false }); await load()
    } catch (error) { setNotice({ text: (error as Error).message, error: true }) }
  }
  return <section><PageIntro number="03" title="Conductores" description="Registra, consulta y mantén actualizada la disponibilidad del equipo." /><NoticeBox notice={notice} />
    <div className="split"><div className="panel"><p className="panel-label">EQUIPO / FORMULARIO</p><h2>{editing ? 'Editar conductor' : 'Registrar conductor'}</h2><p className="panel-description">Mantén la información de licencia y disponibilidad en un solo lugar.</p><form onSubmit={submit} className="form-grid">
      <Field label="Nombres"><input required value={form.nombres} onChange={e => set('nombres', e.target.value)} /></Field>
      <Field label="Apellidos"><input required value={form.apellidos} onChange={e => set('apellidos', e.target.value)} /></Field>
      <Field label="Número de licencia"><input required value={form.numero_licencia} onChange={e => set('numero_licencia', e.target.value)} /></Field>
      <Field label="Categoría de licencia"><input required value={form.categoria_licencia} onChange={e => set('categoria_licencia', e.target.value)} /></Field>
      <Field label="Teléfono"><input value={form.telefono ?? ''} onChange={e => set('telefono', e.target.value || null)} /></Field>
      <Field label="Experiencia (años)"><input type="number" min="0" step="1" value={form.experiencia_anios ?? ''} onChange={e => set('experiencia_anios', e.target.value ? Number(e.target.value) : null)} /></Field>
      <Field label="Estado"><select value={form.estado} onChange={e => set('estado', e.target.value)}>
        {['DISPONIBLE', 'ASIGNADO', 'DESCANSO'].map(state => <option key={state}>{state}</option>)}
      </select></Field><div className="actions"><button disabled={busy}>{editing ? 'Guardar cambios' : 'Registrar'}</button>
        {editing && <button type="button" className="secondary" onClick={() => { setEditing(null); setForm(emptyDriver) }}>Cancelar edición</button>}
      </div>
    </form></div><div className="panel"><p className="panel-label">EQUIPO / REGISTROS</p><div className="panel-heading"><h2>Conductores registrados</h2><span className="count-pill">{items.length}</span></div>
      <label className="check"><input type="checkbox" checked={onlyAvailable} onChange={e => setOnlyAvailable(e.target.checked)} /> Solo disponibles</label>
      {items.length === 0 ? <p className="empty-state">{onlyAvailable ? 'No hay conductores disponibles.' : 'No existen conductores registrados.'}</p> : <ul className="cards">
        {items.map(item => <li key={item.conductor_id}><div className="card-heading"><strong>{item.nombres} {item.apellidos}</strong><span className="badge" data-state={item.estado}>{item.estado}</span></div><p className="card-subtitle">Licencia {item.numero_licencia} · {item.categoria_licencia}</p>
          <p className="card-detail"><span>{item.telefono || 'Sin teléfono'}</span><span>{item.experiencia_anios ?? 0} años de experiencia</span></p>
          {item.estado !== 'INACTIVO' && <div className="actions"><button type="button" className="secondary" onClick={() => { setEditing(item.conductor_id); setForm({ ...item }); window.scrollTo(0, 0) }}>Editar</button>
            {item.estado !== 'ASIGNADO' && <button type="button" className="danger" onClick={() => void deactivate(item)}>Desactivar</button>}
          </div>}
        </li>)}
      </ul>}
    </div></div></section>
}

type ClientForm = Omit<Client, 'cliente_id' | 'creado_en'>
const emptyClient: ClientForm = {
  nombre: '', telefono: null, email: null, preferencia_entrega: null,
  restriccion_acceso: null, estado: 'ACTIVO',
}

function ClientsPage({ token }: { token: string }) {
  const [items, setItems] = useState<Client[]>([])
  const [form, setForm] = useState<ClientForm>(emptyClient)
  const [editing, setEditing] = useState<string | null>(null)
  const [onlyActive, setOnlyActive] = useState(false)
  const [notice, setNotice] = useState<Notice>(null)
  const [busy, setBusy] = useState(false)
  async function load() {
    try { setItems(await api<Client[]>(`/clientes${onlyActive ? '?activo=true' : ''}`, token)) }
    catch (error) { setNotice({ text: (error as Error).message, error: true }) }
  }
  useEffect(() => { void load() }, [token, onlyActive])
  function set<K extends keyof ClientForm>(key: K, value: ClientForm[K]) { setForm(current => ({ ...current, [key]: value })) }
  async function submit(event: FormEvent) {
    event.preventDefault(); setBusy(true); setNotice(null)
    try {
      await api(editing ? `/clientes/${editing}` : '/clientes', token, {
        method: editing ? 'PUT' : 'POST', body: JSON.stringify(form),
      })
      setNotice({ text: editing ? 'Cliente actualizado.' : 'Cliente registrado.', error: false })
      setEditing(null); setForm(emptyClient); await load()
    } catch (error) { setNotice({ text: (error as Error).message, error: true }) }
    finally { setBusy(false) }
  }
  return <section><PageIntro number="04" title="Clientes" description="Administra los datos y las condiciones de entrega de cada cliente." /><NoticeBox notice={notice} />
    <div className="split"><div className="panel"><p className="panel-label">CLIENTES / FORMULARIO</p><h2>{editing ? 'Editar cliente' : 'Registrar cliente'}</h2>
      <p className="panel-description">Registra información de contacto, preferencias y restricciones de acceso.</p><form onSubmit={submit} className="form-grid">
        <Field label="Nombre"><input required maxLength={180} value={form.nombre} onChange={e => set('nombre', e.target.value)} /></Field>
        <Field label="Teléfono"><input maxLength={30} value={form.telefono ?? ''} onChange={e => set('telefono', e.target.value || null)} /></Field>
        <Field label="Correo electrónico"><input type="email" maxLength={255} value={form.email ?? ''} onChange={e => set('email', e.target.value || null)} /></Field>
        <Field label="Preferencia de entrega"><textarea maxLength={2000} rows={3} value={form.preferencia_entrega ?? ''} onChange={e => set('preferencia_entrega', e.target.value || null)} /></Field>
        <Field label="Restricción de acceso"><textarea maxLength={2000} rows={3} value={form.restriccion_acceso ?? ''} onChange={e => set('restriccion_acceso', e.target.value || null)} /></Field>
        <Field label="Estado"><select value={form.estado} onChange={e => set('estado', e.target.value as ClientForm['estado'])}><option>ACTIVO</option><option>INACTIVO</option></select></Field>
        <div className="actions"><button disabled={busy}>{editing ? 'Guardar cambios' : 'Registrar'}</button>{editing && <button type="button" className="secondary" onClick={() => { setEditing(null); setForm(emptyClient) }}>Cancelar edición</button>}</div>
      </form>
    </div><div className="panel"><p className="panel-label">CLIENTES / REGISTROS</p><div className="panel-heading"><h2>Clientes registrados</h2><span className="count-pill">{items.length}</span></div>
      <label className="check"><input type="checkbox" checked={onlyActive} onChange={e => setOnlyActive(e.target.checked)} /> Solo activos</label>
      {items.length === 0 ? <p className="empty-state">{onlyActive ? 'No hay clientes activos.' : 'No existen clientes registrados.'}</p> : <ul className="cards">
        {items.map(item => <li key={item.cliente_id}><div className="card-heading"><strong>{item.nombre}</strong><span className="badge" data-state={item.estado}>{item.estado}</span></div>
          <p className="card-subtitle">{item.email || 'Sin correo'} · {item.telefono || 'Sin teléfono'}</p><p className="card-detail"><span>Preferencia: {item.preferencia_entrega || 'Sin especificar'}</span><span>Acceso: {item.restriccion_acceso || 'Sin restricciones'}</span></p>
          <div className="actions"><button type="button" className="secondary" onClick={() => { setEditing(item.cliente_id); setForm({ nombre: item.nombre, telefono: item.telefono, email: item.email, preferencia_entrega: item.preferencia_entrega, restriccion_acceso: item.restriccion_acceso, estado: item.estado }); window.scrollTo(0, 0) }}>Editar</button></div>
        </li>)}
      </ul>}
    </div></div>
  </section>
}

type OrderForm = Omit<Order, 'pedido_id' | 'estado'>
const emptyOrder: OrderForm = {
  cliente_id: '', codigo_pedido: '', direccion_entrega: '', referencia_entrega: null,
  latitud: '', longitud: '', peso_kg: '', volumen_m3: '', ventana_inicio: '',
  ventana_fin: '', prioridad: 'MEDIA', tipo_producto: null,
}
function localDate(iso: string) {
  const date = new Date(iso)
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
  return local.toISOString().slice(0, 16)
}

function OrdersPage({ token }: { token: string }) {
  const [items, setItems] = useState<Order[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [form, setForm] = useState<OrderForm>(emptyOrder)
  const [editing, setEditing] = useState<string | null>(null)
  const [filter, setFilter] = useState('')
  const [notice, setNotice] = useState<Notice>(null)
  const [busy, setBusy] = useState(false)
  async function load() {
    try { setItems(await api<Order[]>(`/pedidos${filter ? `?estado=${filter}` : ''}`, token)) }
    catch (error) { setNotice({ text: (error as Error).message, error: true }) }
  }
  useEffect(() => { void load() }, [token, filter])
  useEffect(() => {
    void api<Client[]>('/clientes?activo=true', token).then(setClients).catch(error => setNotice({ text: error.message, error: true }))
  }, [token])
  function set<K extends keyof OrderForm>(key: K, value: OrderForm[K]) { setForm(current => ({ ...current, [key]: value })) }
  async function submit(event: FormEvent) {
    event.preventDefault(); setBusy(true); setNotice(null)
    try {
      const payload = {
        ...form,
        ventana_inicio: new Date(form.ventana_inicio).toISOString(),
        ventana_fin: new Date(form.ventana_fin).toISOString(),
      }
      await api(editing ? `/pedidos/${editing}` : '/pedidos', token, {
        method: editing ? 'PUT' : 'POST', body: JSON.stringify(payload),
      })
      setNotice({ text: editing ? 'Pedido actualizado.' : 'Pedido registrado.', error: false })
      setEditing(null); setForm(emptyOrder); await load()
    } catch (error) { setNotice({ text: (error as Error).message, error: true }) }
    finally { setBusy(false) }
  }
  async function cancel(item: Order) {
    if (!window.confirm(`¿Cancelar el pedido ${item.codigo_pedido}?`)) return
    try {
      await api(`/pedidos/${item.pedido_id}/cancelar`, token, { method: 'PATCH' })
      setNotice({ text: 'Pedido cancelado.', error: false }); await load()
    } catch (error) { setNotice({ text: (error as Error).message, error: true }) }
  }
  return <section><PageIntro number="02" title="Pedidos" description="Registra entregas, revisa su estado y actualiza las solicitudes pendientes." /><NoticeBox notice={notice} />
    <div className="split"><div className="panel"><p className="panel-label">ENTREGAS / FORMULARIO</p><h2>{editing ? 'Editar pedido' : 'Registrar pedido'}</h2><p className="panel-description">Define destino, carga y una ventana de tiempo válida.</p>
      <form onSubmit={submit} className="form-grid">
        <Field label="Cliente"><select required value={form.cliente_id} onChange={e => set('cliente_id', e.target.value)}>
          <option value="">Selecciona un cliente</option>{clients.map(client => <option value={client.cliente_id} key={client.cliente_id}>{client.nombre}</option>)}
        </select></Field>
        <Field label="Código de pedido"><input required value={form.codigo_pedido} onChange={e => set('codigo_pedido', e.target.value)} /></Field>
        <Field label="Dirección de entrega"><input required value={form.direccion_entrega} onChange={e => set('direccion_entrega', e.target.value)} /></Field>
        <Field label="Referencia"><input value={form.referencia_entrega ?? ''} onChange={e => set('referencia_entrega', e.target.value || null)} /></Field>
        <Field label="Latitud"><input required type="number" step="0.000001" min="-90" max="90" value={form.latitud} onChange={e => set('latitud', e.target.value)} /></Field>
        <Field label="Longitud"><input required type="number" step="0.000001" min="-180" max="180" value={form.longitud} onChange={e => set('longitud', e.target.value)} /></Field>
        <Field label="Peso (kg)"><input required type="number" step="0.01" min="0.01" value={form.peso_kg} onChange={e => set('peso_kg', e.target.value)} /></Field>
        <Field label="Volumen (m³)"><input required type="number" step="0.001" min="0.001" value={form.volumen_m3} onChange={e => set('volumen_m3', e.target.value)} /></Field>
        <Field label="Inicio de ventana"><input required type="datetime-local" value={form.ventana_inicio} onChange={e => set('ventana_inicio', e.target.value)} /></Field>
        <Field label="Fin de ventana"><input required type="datetime-local" value={form.ventana_fin} onChange={e => set('ventana_fin', e.target.value)} /></Field>
        <Field label="Prioridad"><select value={form.prioridad} onChange={e => set('prioridad', e.target.value as OrderForm['prioridad'])}>
          {['ALTA', 'MEDIA', 'BAJA'].map(priority => <option key={priority}>{priority}</option>)}
        </select></Field>
        <Field label="Tipo de producto"><input value={form.tipo_producto ?? ''} onChange={e => set('tipo_producto', e.target.value || null)} /></Field>
        <div className="actions"><button disabled={busy || clients.length === 0}>{editing ? 'Guardar cambios' : 'Registrar'}</button>
          {editing && <button type="button" className="secondary" onClick={() => { setEditing(null); setForm(emptyOrder) }}>Cancelar edición</button>}
        </div>
      </form>{clients.length === 0 && <p>No hay clientes activos para registrar pedidos.</p>}
    </div><div className="panel"><p className="panel-label">ENTREGAS / REGISTROS</p><div className="panel-heading"><h2>Pedidos registrados</h2><span className="count-pill">{items.length}</span></div>
      <Field label="Filtrar por estado"><select value={filter} onChange={e => setFilter(e.target.value)}>
        <option value="">Todos</option>{['PENDIENTE', 'PLANIFICADO', 'EN_RUTA', 'ENTREGADO', 'CANCELADO', 'NO_ASIGNADO'].map(state => <option key={state}>{state}</option>)}
      </select></Field>
      {items.length === 0 ? <p className="empty-state">No hay pedidos para el filtro seleccionado.</p> : <ul className="cards">
        {items.map(item => <li key={item.pedido_id}><div className="card-heading"><strong>{item.codigo_pedido}</strong><span className="badge" data-state={item.estado}>{item.estado}</span></div>
          <p className="card-subtitle">{item.direccion_entrega}</p><p className="card-detail"><span>{item.peso_kg} kg</span><span>{item.volumen_m3} m³</span><span>Prioridad {item.prioridad}</span></p>
          {item.estado === 'PENDIENTE' && <div className="actions">
            <button className="secondary" type="button" onClick={() => {
              setEditing(item.pedido_id); setForm({ ...item, ventana_inicio: localDate(item.ventana_inicio), ventana_fin: localDate(item.ventana_fin) }); window.scrollTo(0, 0)
            }}>Editar</button>
            <button className="danger" type="button" onClick={() => void cancel(item)}>Cancelar pedido</button>
          </div>}
        </li>)}
      </ul>}
    </div></div></section>
}

function HomePage({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const modules: { number: string; title: Page; description: string }[] = [
    { number: '01', title: 'Vehículos', description: 'Gestiona la flota, sus capacidades y estados.' },
    { number: '02', title: 'Pedidos', description: 'Organiza las entregas y sus ventanas de tiempo.' },
    { number: '03', title: 'Conductores', description: 'Consulta quiénes están disponibles para operar.' },
    { number: '04', title: 'Clientes', description: 'Gestiona contactos, preferencias y restricciones de entrega.' },
  ]
  return <section>
    <div className="home-hero"><p className="eyebrow"><span className="eyebrow-mark" /> PANEL / OPERACIÓN LOGÍSTICA</p>
      <h1>Inicio<span className="heading-dot" aria-hidden="true">.</span></h1>
      <p>Un espacio para mantener tu operación en movimiento. Elige un módulo para empezar.</p>
      <div className="hero-decoration" aria-hidden="true"><span>EL</span><i /><i /><i /></div>
    </div>
    <div className="module-section-heading"><div><p className="panel-label">ESPACIO DE TRABAJO</p><h2>Módulos operativos</h2></div><span className="edition-tag">04 MÓDULOS DISPONIBLES</span></div>
    <div className="module-grid">{modules.map(module =>
      <article className="module-card" key={module.number}>
        <div className="module-card-top"><span className="module-index">/{module.number}</span><span className="module-arrow" aria-hidden="true">↗</span></div>
        <h3>{module.title}</h3><p>{module.description}</p>
        <button type="button" className="module-link" onClick={() => onNavigate(module.title)}>Abrir {module.title.toLowerCase()} <span aria-hidden="true">→</span></button>
      </article>
    )}</div>
  </section>
}

export function App() {
  const [token, setToken] = useState('')
  const [page, setPage] = useState<Page>('Inicio')
  function navigate(target: Page) {
    setPage(target)
    window.scrollTo(0, 0)
  }
  if (!token) return <Login onLogin={value => { setToken(value); window.scrollTo(0, 0) }} />
  return <div className="app-shell"><header className="topbar"><div className="brand"><span className="brand-mark" aria-hidden="true">EL<span>↗</span></span><span>EcoLogística<span className="brand-location">Lima / Perú</span></span></div>
    <nav aria-label="Navegación principal">{(['Inicio', 'Vehículos', 'Pedidos', 'Conductores', 'Clientes'] as Page[]).map(item =>
      <button key={item} type="button" className={page === item ? 'nav-active' : ''} aria-current={page === item ? 'page' : undefined} onClick={() => navigate(item)}>{item}</button>)}</nav>
    <button type="button" className="logout" onClick={() => { setToken(''); setPage('Inicio') }}>Salir</button>
  </header><main className="content">
    {page === 'Inicio' && <HomePage onNavigate={navigate} />}
    {page === 'Vehículos' && <VehiclesPage token={token} />}
    {page === 'Pedidos' && <OrdersPage token={token} />}
    {page === 'Conductores' && <DriversPage token={token} />}
    {page === 'Clientes' && <ClientsPage token={token} />}
  </main></div>
}
