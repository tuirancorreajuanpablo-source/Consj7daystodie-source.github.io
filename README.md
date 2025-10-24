# Página guía 7 Days to Die

Servidor local para manejar el formulario de contacto.

Requisitos:
- Node.js (14+ recomendado)

Pasos para ejecutar (Windows PowerShell):

1. Abrir PowerShell en la carpeta del proyecto:

```powershell
cd "C:\Users\juanp\OneDrive\Desktop\pagina pro\server"
```

2. Instalar dependencias:

```powershell
npm install
```

3. Iniciar el servidor:

```powershell
npm start
```

El servidor servirá tu sitio en http://localhost:3000. El formulario de `contact.html` enviará POST a `/api/contact` y los mensajes se guardarán en `db/contacts.json`.

Notas:
- `server/server.js` sirve archivos estáticos desde la raíz del proyecto.
- Para producción, usar una solución más robusta (base de datos real, validación, rate limiting, sanitización de inputs).
