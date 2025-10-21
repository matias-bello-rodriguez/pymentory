# Pyventory

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.6.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
# pymentory


📋 Resumen de Componentes Creados
🏗️ Contenedores y Layout
pym-header - Header con logo, búsqueda, notificaciones y menú de usuario
pym-sidebar - Sidebar navegacional colapsable con items anidados
pym-footer - Footer con copyright, versión y links
pym-breadcrumb - Navegación jerárquica de migas de pan
pym-card - Contenedor modular con header y footer
pym-tabs - Sistema de pestañas con badges e iconos
pym-accordion - Contenedores expandibles agrupados
📝 Formularios y Inputs
pym-input - Input de texto con iconos, validación y máscaras
pym-textarea - Área de texto redimensionable
pym-select - Dropdown selector con grupos y búsqueda
pym-checkbox - Checkbox con descripciones
pym-radio - Radio buttons agrupados
pym-switch - Toggle switch estilizado
🔘 Botones y Acciones
pym-button - Botones con múltiples variantes y tamaños
pym-button-group - Agrupación de botones relacionados
pym-fab - Floating Action Button para acciones principales
📊 Tablas y Listados
pym-table - Tabla avanzada con sorting, filtrado, paginación y acciones
pym-pagination - Navegación de páginas con info de registros
🔔 Notificaciones y Feedback
pym-toast - Notificaciones temporales con acciones
pym-alert - Mensajes de alerta persistentes
pym-modal - Ventanas modales personalizables
pym-dialog - Diálogos de confirmación con iconos
pym-loading - Indicadores de carga (spinner, progress, skeleton)
pym-progress - Barras de progreso animadas
🎨 Elementos Visuales
pym-badge - Etiquetas de estado y categorización
pym-avatar - Avatares de usuario con estados
pym-avatar-group - Grupos de avatares con contador
🔧 Elementos Interactivos
pym-dropdown - Menús desplegables con separadores
pym-tooltip - Ayuda contextual posicionable
pym-search - Búsqueda con autocompletado y resultados

##ESTRUCTURA

src/app/shared/ui/
├── header.ts
├── sidebar.ts
├── footer.ts
├── breadcrumb.ts
├── card.ts
├── tabs.ts
├── accordion.ts
├── input.ts
├── textarea.ts
├── select.ts
├── checkbox-radio.ts
├── switch.ts
├── button.ts
├── table.ts
├── pagination.ts
├── toast-alert.ts
├── modal-dialog.ts
├── loading-progress.ts
├── badge-avatar.ts
├── dropdown-tooltip.ts
└── index.ts

##CSS

// Importar componentes
import { PymButtonComponent, PymTableComponent, PymModalComponent } from '@shared/ui';

// Usar en templates
<pym-button variant="primary" icon="plus" (click)="create()">
  Crear Nuevo
</pym-button>

<pym-table 
  [columns]="columns" 
  [data]="data" 
  [loading]="loading"
  (pageChange)="onPageChange($event)">
</pym-table>


Layout / Contenedores

header.ts → Componente que muestra la barra superior con logo, usuario, notificaciones y acciones globales.

sidebar.ts → Menú lateral de navegación entre módulos o secciones del ERP.

footer.ts → Pie de página, con información de copyright, versión o links legales.

breadcrumb.ts → Muestra la ruta de navegación dentro de la app, ayuda a orientarse.

card.ts → Contenedor modular para mostrar información resumida (datos, gráficos, acciones).

tabs.ts → Permite separar contenido en pestañas dentro de un módulo o página.

accordion.ts → Secciones expandibles/colapsables para agrupar información sin saturar la UI.

Inputs y Formularios

input.ts → Campo de texto, número, contraseña u otro input básico.

textarea.ts → Campo de texto multilinea.

select.ts → Dropdown o lista desplegable de opciones.

checkbox-radio.ts → Casillas de verificación (checkbox) o botones de opción (radio).

switch.ts → Toggle ON/OFF, para activar/desactivar opciones.

Botones y Acciones

button.ts → Botones generales (primario, secundario, ghost, icon button, etc.)

Listados y Tablas

table.ts → Tabla de datos con funcionalidades típicas de ERP: orden, filtrado, edición, selección.

pagination.ts → Control de paginación para tablas o listados largos.

Notificaciones y Feedback

toast-alert.ts → Mensajes emergentes tipo toast/snackbar para confirmaciones, errores o alertas rápidas.

modal-dialog.ts → Ventanas modales para confirmaciones, formularios rápidos o mensajes críticos.

loading-progress.ts → Indicadores de carga: spinner, barra de progreso o overlay mientras se esperan datos.

Visual / Iconografía

badge-avatar.ts → Avatares de usuario, indicadores de estado, badges o etiquetas informativas.

dropdown-tooltip.ts → Menús desplegables o tooltips para mostrar información adicional al pasar el cursor o hacer click.

index.ts

Archivo que exporta todos los componentes para poder importarlos fácilmente en otros módulos:

export * from './header';
export * from './sidebar';
export * from './footer';
// etc.


💡 Resumen práctico:
Estos componentes son bloques reutilizables de UI, pensados para construir cualquier módulo de un ERP sin repetir código ni estilos.

##directivas

Perfecto! He creado un conjunto de directivas prácticas y útiles sin sobreingeniería. Aquí está el resumen:

🎯 Directivas Creadas - Solo lo Esencial
🎭 Directivas de Comportamiento
1. pymClickOutside - Click Outside Detection
Uso: Cerrar modales, dropdowns, menús
Beneficio: Evita duplicar lógica de detección de clicks externos
2. pymAutoFocus - Auto Focus
Uso: Enfocar automáticamente inputs, botones principales
Beneficio: Mejora UX en formularios y modales
3. pymLongPress - Long Press Detection
Uso: Menús contextuales, acciones especiales
Beneficio: Funcionalidad móvil-friendly para acciones avanzadas
🎨 Directivas de Mejora Visual
4. pymRipple - Material Ripple Effect
Uso: Botones, elementos clickeables
Beneficio: Feedback visual inmediato, mejora UX
5. pymHighlight - Text Highlighting
Uso: Resultados de búsqueda, términos importantes
Beneficio: Resalta visualmente contenido relevante
🔧 Directivas de Utilidad
6. pymCopyToClipboard - Copy to Clipboard
Uso: Códigos, enlaces, datos de tablas
Beneficio: Funcionalidad común sin duplicar código
