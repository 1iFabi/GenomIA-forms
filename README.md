# Genomia Forms

React and Vite application for GenomIA. Pages live in `src/pages/`, sections in `src/components/<section>/` with their styles colocated, and shared UI in `src/components/ui/`.

## Development

Install dependencies and start the Vite development server:

```sh
npm install
npm run dev
```

## Typecheck and production build

```sh
npm run typecheck
npm run build
```

## Preview the production build

```sh
npm run preview
```

The hero video and Plus Jakarta Sans load from external URLs and require an internet connection. The GenomIA wordmark and team portraits are bundled locally in `src/assets/`.

## Self-check

```sh
npm run check   # validates the application rules in src/questions.ts
```

## Postulación: Google login → Google Sheets

"Postula" abre un popup (`src/components/apply/ApplyDialog.tsx`, cualquier `<a href="#postula">`). El postulante entra con Google, responde el cuestionario y la Netlify Function `netlify/functions/postular.ts` verifica su token, rechaza a quien ya postuló (por su id de Google) y agrega una fila a la planilla.

- **Preguntas:** se editan solo en `src/questions.ts`. Una pregunta nueva crea su columna al final de la planilla en la próxima postulación. No cambies el `id` de una pregunta existente: es el encabezado de su columna.
- **Borrador:** las respuestas se guardan en el navegador (`localStorage`) hasta enviar.

### Configuración (una vez, con la cuenta seqgenomia@gmail.com)

Todo es gratis; si Google Cloud pide activar facturación, detente: no se necesita.

1. **Proyecto de Google Cloud.** En <https://console.cloud.google.com/> → selector de proyectos → *Proyecto nuevo* → nombre `GenomIA`.
2. **Pantalla de consentimiento OAuth.** *APIs y servicios → Pantalla de consentimiento de OAuth* (o *Google Auth Platform*):
   - Tipo de usuario: **Externo**. Nombre de la app: `GenomIA`, correo de asistencia: seqgenomia@gmail.com.
   - Permisos: solo los básicos (`openid`, `email`, `profile`); no agregues otros.
   - Al terminar, en *Público*, presiona **Publicar app** (pasar a *En producción*). Si queda en *Prueba*, solo podrán entrar hasta 100 usuarios que agregues a mano. Con permisos básicos Google no exige verificación.
3. **OAuth Client ID.** *APIs y servicios → Credenciales → Crear credenciales → ID de cliente de OAuth* → tipo **Aplicación web**. En *Orígenes de JavaScript autorizados* agrega:
   - `http://localhost:8888` y `http://localhost` (desarrollo con `netlify dev`)
   - `https://<tu-sitio>.netlify.app` (y tu dominio propio si lo tienes)

   Copia el *ID de cliente* → será `VITE_GOOGLE_CLIENT_ID`. No necesitas el secreto del cliente.
4. **Google Sheets API.** *APIs y servicios → Biblioteca* → busca **Google Sheets API** → *Habilitar*.
5. **Cuenta de servicio.** *IAM y administración → Cuentas de servicio → Crear* (nombre `genomia-sheets`, sin roles). Ábrela → *Claves → Agregar clave → JSON*. Del archivo descargado:
   - `client_email` → `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `private_key` → `GOOGLE_PRIVATE_KEY` (completo, con `-----BEGIN…` y los `\n`)

   Guarda el JSON en un lugar seguro y no lo subas al repositorio.
6. **Planilla.** En Google Drive de seqgenomia@gmail.com crea una planilla `Postulaciones GenomIA`. *Compartir* → pega el `client_email` de la cuenta de servicio como **Editor**. Copia el id de la URL (`/spreadsheets/d/<ID>/edit`) → `SHEET_ID`. La primera fila (encabezados) se escribe sola; usa la primera pestaña.
7. **Sitio en Netlify.** Entra a <https://app.netlify.com/> con seqgenomia@gmail.com → *Add new project → Import an existing project* → GitHub → este repositorio. `netlify.toml` ya define build, publish y funciones.
8. **Variables de entorno.** En Netlify → *Project configuration → Environment variables* agrega las cuatro de `.env.example`. Luego *Deploys → Trigger deploy* (las `VITE_` se leen al compilar).
9. Vuelve al paso 3 y agrega la URL final `https://<tu-sitio>.netlify.app` a los orígenes autorizados si no la tenías.

### Probar en local

```sh
cp .env.example .env    # completa los valores
npx netlify dev         # sitio + función en http://localhost:8888
```

`npm run dev` sirve solo la landing: el popup abre, pero sin la función no puede verificar ni guardar.

Para ver las postulaciones en Excel: en la planilla, *Archivo → Descargar → Microsoft Excel (.xlsx)*.
