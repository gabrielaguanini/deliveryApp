import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MenucomplComponent } from './usuarios/componentes/menucompl/menucompl.component';
import { AppRoutingModule } from './rutas/app-routing.module';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './componentes_generales/navbar/navbar.component';
import { HomeComponent } from './componentes_generales/home/home.component';
import { CartelerasliderComponent } from './componentes_generales/carteleraslider/carteleraslider.component';


@NgModule({
  declarations: [
    AppComponent,
    MenucomplComponent,
    CartelerasliderComponent,  
    NavbarComponent, HomeComponent 
    
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
