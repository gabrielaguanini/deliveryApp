import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MenuCompletoComponent } from './componentes/usuarios/menu-completo/menu-completo.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuCompletoComponent,
   
    
  ],
  imports: [
    BrowserModule,
    ModalModule.forRoot(),
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
