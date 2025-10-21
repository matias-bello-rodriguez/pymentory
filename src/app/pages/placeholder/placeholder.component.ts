import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PymCardComponent } from '../../shared/ui';

@Component({
  selector: 'app-placeholder',
  standalone: true,
  imports: [CommonModule, PymCardComponent],
  template: `
    <div class="placeholder-page">
      <pym-card>
        <div class="text-center py-12">
          <div class="mb-4">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M19 11H5m0 0l4-4m-4 4l4 4m6-4h8m-8 0l-4-4m4 4l-4 4"/>
            </svg>
          </div>
          <h2 class="text-xl font-semibold text-gray-800 mb-2">
            {{ getModuleName() }}
          </h2>
          <p class="text-gray-600 mb-4">
            Este módulo está en desarrollo y estará disponible próximamente.
          </p>
          <div class="text-sm text-gray-500">
            Ruta actual: <code class="bg-gray-100 px-2 py-1 rounded">{{ getCurrentRoute() }}</code>
          </div>
        </div>
      </pym-card>
    </div>
  `,
  styles: [`
    .placeholder-page {
      padding: 2rem;
      max-width: 600px;
      margin: 0 auto;
    }

    code {
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaceholderComponent {
  constructor(private route: ActivatedRoute) {}

  getModuleName(): string {
    const route = this.getCurrentRoute();
    const moduleMap: { [key: string]: string } = {
      '/inventario': 'Módulo de Inventario',
      '/ventas': 'Módulo de Ventas',
      '/compras': 'Módulo de Compras',
      '/co-fi': 'Módulo de Co-Fi (Contabilidad y Finanzas)',
      '/configuracion': 'Configuración del Sistema'
    };
    
    return moduleMap[route] || 'Módulo en Desarrollo';
  }

  getCurrentRoute(): string {
    return window.location.pathname;
  }
}