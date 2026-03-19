Actúa como un desarrollador Full-Stack (React, Node.js con Express, Prisma y PostgreSQL).
Tenemos el proyecto base "Sistema de Seguimiento de Talento (ATS)" inicializado, compuesto de una base de datos PostgreSQL en Docker, un backend en `backend/` y un frontend en `frontend/`.

Tu objetivo es resolver el siguiente ticket e implementar la historia de usuario completa desde la base de datos hasta la interfaz:
"Como reclutador, quiero tener la capacidad de añadir candidatos al sistema ATS, para que pueda gestionar sus datos y procesos de selección de manera eficiente."

**Requisitos**:
1.  **Frontend (React)**: 
    - Reemplazar la pantalla por defecto en `App.tsx` para que actúe como Dashboard del reclutador.
    - Colocar un botón claro "Añadir Candidato" que abra un formulario modal.
    - El formulario (`CandidateForm.tsx`) debe recopilar: Nombre, Apellidos, Correo, Teléfono, Dirección, Educación y Experiencia Laboral (todos requeridos).
    - Incluir un campo para carga de documento (CV) limitado a `.pdf, .doc, .docx`.
    - Maquetarlo de manera sencilla con CSS puro (`App.css` y `CandidateForm.css`).
    - Añadir validaciones para que no se envíe vacío y enviar la petición mediante `FormData` (por contener archivos) al endpoint `POST http://localhost:3010/api/candidates`.
    - Mostrar notificaciones de éxito o error.

2.  **Backend (Express & Prisma)**:
    - Instalar las dependencias de CORS (`cors`) y de subida de archivos (`multer`).
    - Actualizar `backend/src/index.ts` permitiendo CORS y leyendo JSON.
    - Configurar Multer para guardar archivos subidos en una carpeta `backend/uploads/` validando únicamente PDFs o DOCX.
    - Crear un endpoint `POST /api/candidates` que valide obligatoriedad de campos. Si no hay error, debe registrar el candidato con `prisma.candidate.create()`.
    
3.  **Base de Datos (Prisma)**:
    - Alterar `backend/prisma/schema.prisma` añadiendo el modelo `Candidate`.
    - Campos requeridos del modelo `Candidate`: `id` (int/autoincremental), `firstName`, `lastName`, `email` (único), `phone`, `address`, `education`, `workExperience` y `cvFilePath`.
    - Ejecutar la migración a la base de datos de Docker `npx prisma migrate dev --name init_candidate`.

4.  **Documentación**:
    - Generar un archivo `prompt_ejercicio3.md` detallando este prompt para replicar el proceso.
    - Actualizar `README.md` mencionando la nueva funcionalidad integrada (endpoint y frontend de añadido de candidatos).

Ejecuta todas estas tareas programando las implementaciones y ejecutando los comandos de consola en el orden adecuado (BBDD -> Backend -> Frontend). No esperes a mi validación paso por paso.
