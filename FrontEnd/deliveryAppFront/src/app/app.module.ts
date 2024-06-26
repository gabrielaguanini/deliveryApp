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
import { CarteleraslidercelComponent } from './componentes_generales/carteleraslidercel/carteleraslidercel.component';
import { PedidosplatosamostrarComponent } from './usuarios/componentes/pedidosplatosamostrar/pedidosplatosamostrar.component';
import { PedidosAnterYDescargasComponent } from './usuarios/componentes/pedidos-anter-ydescargas/pedidos-anter-ydescargas.component';
import { PedidosclientesComponent } from './componentes_generales/pedidosclientes/pedidosclientes.component';
import { CarteleraSecundariaComponent } from './componentes_generales/cartelera-secundaria/cartelera-secundaria.component';
import { CarteleraSecundariaCelComponent } from './componentes_generales/cartelera-secundaria-cel/cartelera-secundaria-cel.component';
import { FooterComponent } from './componentes_generales/footer/footer.component';
import { CartelerasCrudComponent } from './usuarios/componentes/carteleras-crud/carteleras-crud.component';
import { PanelDeControlComponent } from './usuarios/componentes/panel-de-control/panel-de-control.component';
import { FooterYLogoCrudComponent } from './usuarios/componentes/footer-ylogo-crud/footer-ylogo-crud.component';





@NgModule({
  declarations: [
    AppComponent,
    MenucomplComponent,
    CartelerasliderComponent,  
    NavbarComponent, 
    HomeComponent, 
    CarteleraslidercelComponent, 
    PedidosplatosamostrarComponent, 
    PedidosAnterYDescargasComponent, 
    PedidosclientesComponent, 
    CarteleraSecundariaComponent, 
    CarteleraSecundariaCelComponent, 
    FooterComponent, CartelerasCrudComponent, 
    PanelDeControlComponent, FooterYLogoCrudComponent
    
  ],
  imports: [
    BrowserModule,
    ModalModule.forRoot(),
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule

     
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
