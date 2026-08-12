Smart Gym

Aplicación web para la gestión de un gimnasio: administración de socios, armado de rutinas de entrenamiento según el objetivo de cada uno y recomendaciones de alimentación asociadas.

Stack: Angular · TypeScript · PWA

🔗 API: https://smartgymback-production-8639.up.railway.app/ (repositorio)

Sobre el proyecto

La gestión de un gimnasio chico suele resolverse con planillas y cuadernos: las rutinas se anotan a mano, se pierden, y adaptarlas al objetivo de cada socio implica rehacerlas de cero. Smart Gym centraliza socios, rutinas y planes de alimentación en un solo lugar.

Está hecho como PWA, o sea que se instala en el celular como una app y no depende de tener buena señal. Eso salió de pensar dónde se usa: el socio la abre en la sala de musculación, donde la conexión suele ser mala o directamente no hay.

Cómo correrlo
bash
npm install
ng serve

Queda en http://localhost:4200.

Para probar la parte de PWA (instalación y funcionamiento sin conexión) hace falta un build de producción, porque el service worker no se activa en modo desarrollo:

bash
ng build --configuration production
npx http-server -p 8080 -c-1 dist/tup-smart-gym/browser
**Cómo trabajamos**
-Una rama por funcionalidad, con Pull Request y revisión de otro integrante antes de mergear a main.
-Tablero Kanban para seguir las tareas: TODO → DOING → QA → DEPLOY → CLOSE.
-Issues de GitHub para registrar y repartir tareas y bugs.
-Prettier y EditorConfig versionados, más la configuración de VS Code (extensiones recomendadas y tareas), para que los tres trabajemos con el mismo formato y cualquiera pueda levantar el proyecto sin configurar nada.
**Equipo**
-Nicolás Licha
-Elisa Ramos Farinho
-Noder Durand

Proyecto de la Tecnicatura Universitaria en Programación, UTN Facultad Regional La Plata.
