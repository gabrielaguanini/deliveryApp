import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PanelEmpleadosComponent } from './componentes/panel-empleados/panel-empleados.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalPlatosComponent } from './componentes/modales/modal-platos/modal-platos.component';

@NgModule({
  declarations: [
    AppComponent,
    PanelEmpleadosComponent,
    ModalPlatosComponent,
    
  ],
  imports: [
    BrowserModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
