import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MenucomplComponent } from '../usuarios/componentes/menucompl/menucompl.component';
import { HomeComponent } from '../componentes_generales/home/home.component';
import { PedidosplatosamostrarComponent } from '../usuarios/componentes/pedidosplatosamostrar/pedidosplatosamostrar.component';
import { PedidosAnterYDescargasComponent } from '../usuarios/componentes/pedidos-anter-ydescargas/pedidos-anter-ydescargas.component';

const routes: Routes = [
  { path: 'homepage', component: HomeComponent },
  { path: '', component: HomeComponent },
  { path: 'menucompleto', component: MenucomplComponent},
  { path: 'pedidosplatosamos', component: PedidosplatosamostrarComponent},
  { path: 'pedidosantydescarg', component: PedidosAnterYDescargasComponent}

];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
