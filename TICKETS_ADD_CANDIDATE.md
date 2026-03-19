# Tickets de Trabajo: Sistema de Seguimiento de Talento (ATS)
## Épica: Añadir Candidato al Sistema

A continuación se detallan los 3 tickets de desarrollo (historias de usuario técnicas) necesarios para implementar la funcionalidad completa de registro de candidatos.

---

### 📋 Ticket 1: Modelado de Datos (Base de Datos)
**Objetivo:** Crear la estructura en la base de datos para almacenar la información de los candidatos usando Prisma.

**Tareas a realizar:**
1. **Modificar el Schema de Prisma:** Ir a `backend/prisma/schema.prisma` y crear un nuevo modelo llamado `Candidate`.
2. **Campos necesarios:**
   * `id` (Clave primaria autoincremental).
   * `firstName` (String, requerido).
   * `lastName` (String, requerido).
   * `email` (String, único, requerido).
   * `phone` (String, requerido).
   * `address` (String, requerido).
   * `education` (String, requerido).
   * `workExperience` (String, requerido).
   * `cvFilePath` (String, para guardar la ruta local donde se almacena el currículum).
   * `createdAt` y `updatedAt` para trazar la fecha y hora de los registros.
3. **Migración:** Ejecutar el comando para crear la tabla generada en PostgreSQL (`npx prisma migrate dev --name init_candidate`) y actualizar el cliente de Prisma.

---

### 📋 Ticket 2: Lógica de Servidor (Backend)
**Objetivo:** Crear un endpoint (API) seguro que reciba los datos del formulario, incluya la subida de un archivo físico del CV, aplique validaciones y lo guarde en la base de datos.

**Tareas a realizar:**
1. **Instalar dependencias extra:** Instalar las librerías `multer` (para la gestión de subida de archivos multipart/form-data) y `cors` (para permitir peticiones entre puertos distintos), junto a sus tipos de TypeScript.
2. **Configuración de Express:** Habilitar CORS y lectura de JSON en `backend/src/index.ts`.
3. **Manejo de Archivos (Multer):** Configurar `multer` para aceptar solo archivos en formato PDF o DOCX y almacenarlos localmente en el servidor en la carpeta `backend/uploads/`.
4. **Crear Endpoint:** Desarrollar la ruta `POST /api/candidates`.
5. **Validación de Datos:** Confirmar en el endpoint que todos los campos requeridos y el archivo del CV (`req.file`) no estén vacíos antes de procesar el guardado.
6. **Guardado y Manejo de Errores:** Usar Prisma Client para insertar el candidato, devolviendo códigos HTTP adecuados (201 para éxito, 400 o 500 para errores o duplicados de email).

---

### 📋 Ticket 3: Interfaz de Usuario (Frontend)
**Objetivo:** Crear y maquetar los componentes visuales en React para que el reclutador pueda introducir los datos del nuevo candidato y ver la confirmación.

**Tareas a realizar:**
1. **Punto de Entrada (Dashboard):** Modificar `App.tsx` para reflejar un entorno de "Dashboard del Reclutador" y agregar un botón de acción primario "Añadir Candidato".
2. **Formulario Modal:** Crear el componente `CandidateForm.tsx` para presentar un diálogo superpuesto con los campos indicados (Nombre, Apellidos, Correo, Teléfono, Dirección, Educación y Experiencia).
3. **Carga de Archivo (Input File):** Incorporar un input de tipo fichero con el atributo `accept=".pdf,.doc,.docx"`.
4. **Estado y Validación en Cliente:** Usar el hook `useState` para controlar los valores de los inputs. Verificar que los datos y el archivo estén presentes antes de proceder.
5. **Petición HTTP (Fetch API):** Al enviar el formulario (submit), construir un objeto `FormData` nativo (requerido para subir archivos adjuntos junto con texto) y hacer una petición asíncrona mediante `fetch` al backend `http://localhost:3010/api/candidates`.
6. **Feedback y UX:** Proveer respuesta visual sobre la carga ("Guardando..."), un mensaje de éxito ("Candidato añadido con éxito") o las alertas de error correspondientes utilizando estilos básicos de CSS.
