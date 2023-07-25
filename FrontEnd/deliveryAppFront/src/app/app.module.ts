import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MenucomplComponent } from './usuarios/componentes/menucompl/menucompl.component';
import { NavbarComponent } from './usuarios/componentes/generales/navbar/navbar.component';
import { AppRoutingModule } from './rutas/app-routing.module';
import { HomeComponent } from './clientes/home/home.component';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    MenucomplComponent,
    NavbarComponent,
    HomeComponent,  
    
  ],
  imports: [
    BrowserModule,
    ModalModule.forRoot(),
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
     
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
