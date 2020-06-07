import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'

import {AppRoutingModule} from './app-routing.module'
import {AppComponent} from './app.component'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {FooterComponent} from './footer/footer.component'
import {HeaderComponent} from './header/header.component'
import {StoreComponent} from './store/store.component'
import {HtmlComponent} from './html/html.component'
import {OrderComponent} from './order/order.component'
import {HttpClientModule} from '@angular/common/http'
import {CartComponent} from './store/cart/cart.component'

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    StoreComponent,
    HtmlComponent,
    OrderComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
