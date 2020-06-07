import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {StoreComponent} from './store/store.component'
import {HtmlComponent} from './html/html.component'
import {OrderComponent} from './order/order.component'


const routes: Routes = [
  {path: '', component: StoreComponent, pathMatch: 'full'},
  {path: 'p/:slug', component: HtmlComponent},
  {path: 'order', component: OrderComponent},
  {path: '**', redirectTo: 'p/404'},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
