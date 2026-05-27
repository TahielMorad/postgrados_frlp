# ds-tequenos
Grupo Tequenos, Desarrollo de Software, Ingenieria en Sistemas 3er año.
Laura Camila Arevalo Cañon 32739
Matias Perez Vilmar 31330
Joaquin Tachi 32712
Leonardo Oscar Perez 33878
Tahiel Morad 34653
# Product Backlog — Sistema de Gestión Académica para Posgrado
**UTN FRLP · Desarrollo de Software 2026 · TP Integrador**

> **30 User Stories · 148 Story Points · 6 Épicas · 7 Actores · 8 Sprints**

---

##  Actores del Sistema

| Código | Actor | Descripción |
|--------|-------|-------------|
| ASP | Aspirante | Persona interesada en inscribirse a una carrera de posgrado |
| EST | Estudiante | Persona admitida y cursando una carrera de posgrado |
| DOC | Docente | Profesional a cargo de dictar seminarios o asignaturas |
| CDN | Equipo de Conducción | Personal administrativo-académico que gestiona carreras y legajos |
| CPR | Comisión CPR | Comisión de Posgrado Regional — aprueba tesis y resoluciones |
| SIS | Sistema | Actor sistémico — envía recordatorios y actualiza estados |

---

##  Épicas

| ID | Épica | Historias | SP |
|----|-------|-----------|----|
| EP1 | Inscripción y Legajo del Aspirante | US-01 → US-07 | 30 |
| EP2 | Gestión de Estudiantes y Perfil Académico | US-08 → US-12 | 26 |
| EP3 | Módulo Docente — Asistencia y Calificaciones | US-13 → US-17 | 26 |
| EP4 | Trabajos Finales y Tesis | US-18 → US-20 | 13 |
| EP5 | Estadísticas y Reportes | US-21 → US-23 | 21 |
| EP6 | Administración del Sistema y Seguridad | US-24 → US-26 | 16 |

---

##  Priorización MoSCoW

| Símbolo | Categoría | Criterio |
|---------|-----------|----------|
| **M** | Must Have | Funcionalidad crítica. Sin ella el sistema no tiene valor |
| **S** | Should Have | Importante pero no bloqueante para el lanzamiento |
| **C** | Could Have | Deseable si hay capacidad disponible en el sprint |
| **W** | Won't Have | Fuera del alcance de esta versión |

---

##  Product Backlog

| ID | Épica | Historia de Usuario | Criterio de Aceptación 1 | Criterio de Aceptación 2 | SP | Prior. | Sprint |
|----|-------|---------------------|--------------------------|--------------------------|:--:|:------:|:------:|
| US-01 | EP1 | Como **aspirante**, quiero completar un formulario web de inscripción, para evitar enviar documentación por correo electrónico | Dado que el equipo de conducción genera y envía el enlace por email, cuando el aspirante hace clic en ese enlace, entonces es redirigido a la página web del formulario de inscripción | Dado que el formulario está incompleto, cuando hago clic en 'Enviar', entonces el sistema resalta en rojo los campos faltantes e impide el envío | 8 | M | 1 |
| US-02 | EP1 | Como **aspirante**, quiero adjuntar mis documentos en PDF (DNI o pasaporte, título, partida de nacimiento, CUIT/CUIL), para completar mi legajo digital | Dado que estoy en el formulario, cuando selecciono un archivo que no es PDF, entonces el sistema muestra un error indicando que solo se aceptan PDFs | Dado que adjunto un PDF válido, cuando guardo el formulario, entonces el archivo queda vinculado a mi legajo | 5 | M | 1 |
| US-03 | EP1 | Como **aspirante**, quiero seleccionar una opción de beca (30% o 100%) y adjuntar el formulario firmado, para solicitar el beneficio | Dado que selecciono una opción de beca y adjunto el formulario firmado en PDF, entonces la solicitud queda registrada junto a mi legajo | Dado que no selecciono ninguna beca, cuando envío el formulario, entonces el campo beca queda vacío sin impedir el envío | 3 | M | 1 |
| US-04 | EP1 | Como **aspirante**, quiero ver el estado de carga de mi legajo, para saber qué documentación falta completar | Dado que ingreso a mi perfil y algunos documentos están pendientes, entonces veo un indicador visual que muestra el nivel de completitud | Dado que completo toda la documentación, cuando accedo a mi legajo, entonces el indicador muestra 'Legajo completo' en verde | 3 | M | 2 |
| US-05 | EP1 | Como **equipo de conducción**, quiero listar todos los aspirantes inscriptos por cohorte, para tener una visión organizada de cada ciclo lectivo | Dado que selecciono una cohorte, cuando se carga el panel, entonces veo la lista con nombre, carrera, fecha de inscripción y estado del legajo | Dado que aplico filtros por estado de legajo, entonces la lista se actualiza mostrando solo los registros que cumplen el criterio | 5 | M | 2 |
| US-06 | EP1 | Como **equipo de conducción**, quiero buscar un aspirante o estudiante por nombre o DNI, para acceder rápidamente a su legajo | Dado que ingreso un nombre parcial o DNI en el buscador y presiono buscar, entonces el sistema muestra todos los registros que coincidan | Dado que no existe ningún registro con los datos ingresados, cuando presiono buscar, entonces el sistema muestra 'No se encontraron resultados' | 3 | M | 2 |
| US-07 | EP1 | Como **equipo de conducción**, quiero abrir o cerrar el período de inscripción a las carreras, para controlar cuándo los aspirantes pueden inscribirse | Dado que el período está cerrado y hago clic en 'Abrir inscripción', entonces el formulario se activa para los aspirantes | Dado que el período está abierto y lo cierro, entonces el formulario muestra 'Inscripción cerrada' y no permite nuevos envíos | 3 | M | 2 |
| US-08 | EP2 | Como **equipo de conducción**, quiero visualizar el perfil académico completo de un estudiante, para hacer seguimiento de su avance | Dado que selecciono a un estudiante, cuando accedo a su perfil, entonces veo todos los seminarios con estado, porcentaje de asistencia y calificación final | Dado que el docente actualiza sus cargas, cuando refresco el perfil, entonces los datos de asistencia y nota se actualizan automáticamente | 8 | M | 3 |
| US-09 | EP2 | Como **equipo de conducción**, quiero ver un indicador tipo semáforo en el perfil de cada estudiante, para identificar rápidamente su situación en la carrera | Dado que un estudiante supera el límite normativo sin completar seminarios, cuando accedo a su perfil, entonces el semáforo se muestra en rojo | Dado que un estudiante está al día con sus seminarios y plazos, cuando accedo a su perfil, entonces el semáforo se muestra en verde | 5 | M | 3 |
| US-10 | EP2 | Como **equipo de conducción**, quiero recibir alertas automáticas cuando un estudiante esté por vencer el plazo normativo, para tomar acciones a tiempo | Dado que el sistema detecta que un estudiante superará el plazo en 30 días, entonces se genera una alerta visible en el panel de gestión | Dado que la alerta está activa y el estudiante regulariza su situación, entonces la alerta desaparece del panel automáticamente | 5 | M | 4 |
| US-11 | EP2 | Como **equipo de conducción**, quiero descargar el perfil académico de un estudiante o el reporte de una cohorte completa| Dado que accedo al perfil de un estudiante y hago clic en 'Descargar', entonces se genera un PDF con toda su información académica | Dado que selecciono una cohorte y hago clic en 'Descargar reporte', entonces obtengo un archivo con el estado de todos los estudiantes | 5 | S | 4 |
| US-12 | EP2 | Como **equipo de conducción**, quiero registrar las tutorías realizadas con cada estudiante, para llevar un historial del seguimiento académico | Dado que accedo al perfil del estudiante y cargo una tutoría con fecha, responsable y observaciones, entonces queda registrada en el historial | Dado que hay tutorías registradas, cuando las visualizo, entonces se muestran ordenadas cronológicamente | 3 | S | 5 |
| US-13 | EP3 | Como **docente**, quiero acceder al sistema mediante un enlace personalizado, para cargar asistencia y calificaciones | Dado que recibo un enlace por correo y lo abro, entonces el sistema me redirige a la planilla de mi seminario| Dado que el enlace es para un seminario específico, cuando lo abro, entonces solo veo los estudiantes de ese seminario | 5 | M | 3 |
| US-14 | EP3 | Como **docente**, quiero registrar la asistencia de los estudiantes por fecha de cursada, para que el sistema calcule automáticamente el porcentaje | Dado que selecciono una fecha, marco presencia/ausencia y guardo, entonces el porcentaje de asistencia se actualiza en el perfil de cada alumno | Dado que registro asistencia y el porcentaje de un estudiante cae por debajo del mínimo, entonces el sistema resalta esa situación visualmente | 8 | M | 3 |
| US-15 | EP3 | Como **docente**, quiero cargar la calificación final y la fecha del acta de examen de cada estudiante, para que quede registrada en su perfil académico | Dado que ingreso la nota final y la fecha del acta y guardo, entonces el perfil del estudiante se actualiza automáticamente | Dado que intento cargar una nota fuera del rango válido (1–10), entonces el sistema muestra un error de validación | 5 | M | 3 |
| US-16 | EP3 | Como **docente**, quiero descargar la planilla de mi seminario en formato imprimible, para du uso en formato analógico  | Dado que accedo a mi planilla y hago clic en 'Descargar', entonces obtengo un PDF con los datos de los estudiantes y columnas para asistencia manual | Dado que descargo la planilla y la imprimo, entonces el formato es legible e incluye el nombre del seminario y la cohorte | 3 | S | 4 |
| US-17 | EP3 | Como **sistema**, quiero enviar recordatorios automáticos por email al docente cuando no haya cargado asistencia o calificación en tiempo y forma | Dado que pasaron 7 días desde la cursada sin que el docente cargue asistencia, entonces el sistema envía automáticamente un email de recordatorio | Dado que el docente completa la carga tras recibir el recordatorio, entonces el sistema no vuelve a enviar recordatorios por esa cursada | 5 | M | 4 |
| US-18 | EP4 | Como **equipo de conducción**, quiero registrar la información del TFI(Trabajo Final Integrador) de los estudiantes de especialización, para hacer seguimiento de su avance | Dado que accedo al perfil de un estudiante de especialización y cargo los datos del TFI (título, director, estado), entonces quedan registrados en su perfil | Dado que el TFI está registrado y actualizo el estado, entonces el semáforo del estudiante refleja el cambio | 5 | M | 5 |
| US-19 | EP4 | Como **Comisión CPR**, quiero cargar los datos de la tesis (título, director, codirector, fecha, N° resolución), para que queden en el legajo del estudiante | Dado que accedo con el rol CPR al perfil de un estudiante de maestría/doctorado y cargo los datos, entonces quedan visibles en su perfil académico | Dado que un actor sin el rol CPR intenta cargar datos de tesis, entonces el sistema muestra un error de autorización | 5 | M | 5 |
| US-20 | EP4 | Como **equipo de conducción**, quiero ver el estado actual del trabajo final o tesis de cada estudiante, para saber cuántos están en proceso, presentados o aprobados | Dado que accedo al perfil del estudiante, entonces veo un badge indicando el estado (en proceso / presentado / aprobado / sin iniciar) | Dado que filtro la lista de estudiantes por estado 'Aprobado', entonces solo se muestran los estudiantes con trabajo aprobado | 3 | S | 5 |
| US-21 | EP5 | Como **equipo de conducción**, quiero ver estadísticas de una cohorte específica, para evaluar el desempeño del ciclo lectivo | Dado que selecciono una cohorte en el módulo de estadísticas, entonces veo gráficos con inscriptos, porcentaje de seminarios aprobados y estado de trabajos finales | Dado que hago clic en un indicador, entonces puedo ver el listado detallado de estudiantes que componen ese dato | 8 | M | 6 |
| US-22 | EP5 | Como **equipo de conducción**, quiero ver estadísticas globales de todas las cohortes, para tener una visión general del estado de la carrera | Dado que accedo al módulo global, entonces veo métricas acumuladas: total de inscriptos históricos, total de graduados y tasa de desgranamiento | Dado que comparo cohortes en un gráfico, entonces puedo identificar tendencias de crecimiento o desgranamiento | 8 | M | 6 |
| US-23 | EP5 | Como **equipo de conducción**, quiero ver un reporte con la situación de todos los TFI y tesis, para priorizar el seguimiento de casos críticos | Dado que accedo al reporte, entonces veo una tabla con todos los estudiantes, tipo de trabajo, estado actual y tiempo transcurrido desde el inicio | Dado que hay estudiantes con plazo próximo a vencer, entonces esos registros se destacan con una alerta visual | 5 | S | 6 |
| US-24 | EP6 | Como **administrador**, quiero asignar roles (Aspirante, Estudiante, Docente, Conducción, CPR, Admin), para que cada usuario acceda solo a las funciones correspondientes | Dado que asigno el rol Docente a un usuario, entonces ese usuario solo puede acceder a la planilla de su seminario | Dado que un usuario intenta acceder a una URL restringida para su rol, entonces el sistema redirige a una página de acceso denegado | 8 | M | 1 |
| US-25 | EP6 | Como **usuario del sistema**, quiero iniciar sesión de forma segura, para proteger la información académica confidencial | Dado que ingreso mis credenciales correctas, entonces el sistema me autentica y redirige al panel correspondiente a mi rol | Dado que ingreso una contraseña incorrecta 5 veces, entonces el sistema, recomienda al usuario el cambio de contraseña | 5 | M | 1 |
| US-26 | EP6 | Como **equipo de conducción**, quiero configurar los plazos normativos para cada tipo de carrera, para que el sistema genere alertas correctas | Dado que defino el plazo máximo en meses para cada tipo de carrera, entonces el sistema lo utiliza para calcular alertas de vencimiento | Dado que un plazo normativo cambia y lo actualizo, entonces el recálculo de alertas se aplica a todos los estudiantes activos | 3 | M | 2 |

---

##  Planificación de Sprints

| Sprint | Nombre | SP | Objetivo | Historias |
|:------:|--------|:--:|----------|-----------|
| 1 | Inscripción y Autenticación | 29 | Formulario de inscripción online, adjuntar PDFs, solicitud de beca, autenticación y roles | US-01, US-02, US-03, US-24, US-25 |
| 2 | Gestión de Inscripción | 17 | Indicador de legajo, listados por cohorte, búsqueda, apertura/cierre de inscripción, plazos | US-04, US-05, US-06, US-07 |
| 3 | Perfil Académico y Docente | 31 | Perfil académico, semáforo, acceso docente vía enlace, asistencia y calificaciones | US-08, US-09, US-13, US-14, US-15 |
| 4 | Trabajos Finales y Tutorías | 16 | TFI, tesis (CPR), seguimiento del estado de trabajos finales, registro de tutorías | US-12, US-18, US-19, US-20 |
| 5 | Alertas,Descargas y Configuraciones | 18 | Alertas de vencimiento, recordatorios automáticos al docente, descargas de planillas,perfiles y configuraciones | US-10, US-11, US-16, US-17,US-26 |
| 6 | Módulo de Estadísticas | 21 | Estadísticas por cohorte, globales de la carrera, reporte de situación de trabajos finales | US-21, US-22, US-23 |
---

> **Metodología:** Scrum · **Estimación:** Story Points (Fibonacci: 2, 3, 5, 8) · **Priorización:** MoSCoW · **Duración de sprint:** 2 semanas
