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
import {ProductComponent} from './store/product/product.component'
import {FormComponent} from './order/form/form.component'
import {QuantityControlComponent} from './store/product/quantity-control/quantity-control.component'
import {ListComponent} from './store/cart/list/list.component'
import {MatSelectModule} from '@angular/material/select'
import {MatRadioModule} from '@angular/material/radio'
import {MatInputModule} from '@angular/material/input'
import {MatCheckboxModule} from '@angular/material/checkbox'
import {ReactiveFormsModule} from '@angular/forms'
import {MatAutocompleteModule} from '@angular/material/autocomplete'
import {IConfig, NgxMaskModule} from 'ngx-mask'

export const maskConfig: Partial<IConfig> = {
  validation: true
}

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    StoreComponent,
    HtmlComponent,
    OrderComponent,
    CartComponent,
    ProductComponent,
    FormComponent,
    QuantityControlComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSelectModule,
    MatRadioModule,
    MatInputModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    NgxMaskModule.forRoot(maskConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
