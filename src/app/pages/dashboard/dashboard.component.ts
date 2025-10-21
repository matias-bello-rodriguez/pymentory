import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PymCardComponent } from '../../shared/ui';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, PymCardComponent],
  template: `
    <div class="dashboard">
      <div class="dashboard-header">
        <h1 class="text-2xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p class="text-gray-600">Bienvenido a Pymentory - Sistema de Inventario</p>
      </div>

      <div class="dashboard-grid">
        <pym-card class="stat-card">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500">Productos</p>
              <p class="text-2xl font-bold text-gray-900">1,234</p>
            </div>
            <div class="p-3 bg-blue-100 rounded-full">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"/>
              </svg>
            </div>
          </div>
        </pym-card>

        <pym-card class="stat-card">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500">Ventas Hoy</p>
              <p class="text-2xl font-bold text-gray-900">$12,345</p>
            </div>
            <div class="p-3 bg-green-100 rounded-full">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
              </svg>
            </div>
          </div>
        </pym-card>

        <pym-card class="stat-card">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500">Stock Bajo</p>
              <p class="text-2xl font-bold text-red-600">23</p>
            </div>
            <div class="p-3 bg-red-100 rounded-full">
              <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L4.34 16.5c-.77.833.192 2.5 1.732 2.5z"/>
              </svg>
            </div>
          </div>
        </pym-card>

        <pym-card class="stat-card">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500">Clientes</p>
              <p class="text-2xl font-bold text-gray-900">567</p>
            </div>
            <div class="p-3 bg-purple-100 rounded-full">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a4 4 0 11-8 0 4 4 0 018 0z"/>
              </svg>
            </div>
          </div>
        </pym-card>
      </div>

      <div class="dashboard-content">
        <pym-card>
          <h2 class="text-lg font-semibold text-gray-800 mb-4">Actividad Reciente</h2>
          <div class="space-y-3">
            <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div class="w-2 h-2 bg-green-500 rounded-full"></div>
              <div class="flex-1">
                <p class="text-sm font-medium">Nueva venta registrada</p>
                <p class="text-xs text-gray-500">Hace 5 minutos</p>
              </div>
            </div>
            <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div class="flex-1">
                <p class="text-sm font-medium">Producto actualizado</p>
                <p class="text-xs text-gray-500">Hace 15 minutos</p>
              </div>
            </div>
            <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div class="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div class="flex-1">
                <p class="text-sm font-medium">Stock bajo detectado</p>
                <p class="text-xs text-gray-500">Hace 1 hora</p>
              </div>
            </div>
          </div>
        </pym-card>
      </div>
    </div>
  `,
  styles: [`
    .dashboard {
      padding: 1rem;
    }

    .dashboard-header {
      margin-bottom: 2rem;
    }

    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      padding: 1.5rem;
    }

    .dashboard-content {
      max-width: 100%;
    }

    @media (max-width: 640px) {
      .dashboard {
        padding: 0.5rem;
      }

      .dashboard-grid {
        grid-template-columns: 1fr;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {}