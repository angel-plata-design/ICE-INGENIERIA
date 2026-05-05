# API Contracts — ICE Ingeniería

## Objetivo
Persistir las solicitudes de cotización enviadas desde el formulario de la sección Contacto.

## 1. Datos mockeados actualmente (mock.js)
Solo el flujo del formulario está mockeado: al enviarlo se muestra un toast pero los datos no se guardan.
- `serviceOptions[]` en `mock.js` permanece como lista de tipos de servicio (catálogo estático del frontend).

## 2. Backend a implementar

### Modelo Mongo: `quotations`
```
{
  id: str (uuid)             # PK
  name: str (required)
  company: str | None
  email: EmailStr (required)
  phone: str | None
  service_type: str | None    # uno de serviceOptions
  message: str (required, min 5 chars)
  status: str = "new"         # new | contacted | archived
  created_at: datetime
  ip: str | None              # opcional para audit
}
```

### Endpoints (todos con prefijo `/api`)
- `POST /api/quotations` → crea una cotización.
  - Body: `{ name, company?, email, phone?, service_type?, message }`
  - 201 → `{ id, created_at, status }`
  - 422 → validación (Pydantic)
- `GET /api/quotations` → lista (orden DESC por `created_at`, paginado simple `?limit=50`).
- `GET /api/quotations/{id}` → detalle.

### Reglas
- Email validado con `EmailStr`.
- `message` mínimo 5 caracteres.
- Sanitizar/trim de strings.
- Capturar IP del request (header `x-forwarded-for` o `request.client.host`).

## 3. Integración frontend ↔ backend

### Frontend (`Contact.jsx`)
- Reemplazar el `setTimeout` simulado por `axios.post(`${API}/quotations`, payload)`.
- Mostrar toast de éxito real cuando responde 200/201.
- Mostrar toast de error si rechaza (422 → mensaje del backend; otro → genérico).
- Reset del formulario solo en éxito.
- Loading state mientras la petición está en curso.

### Variable de entorno
- Frontend: `process.env.REACT_APP_BACKEND_URL` ya configurado. Construir `API = ${REACT_APP_BACKEND_URL}/api`.
- Backend: usa `MONGO_URL` y `DB_NAME` ya presentes.

## 4. Out of scope (futuro)
- Envío de email de notificación (SendGrid/SMTP).
- Panel admin para listar y marcar como contactado.
- Captcha / rate limiting.
