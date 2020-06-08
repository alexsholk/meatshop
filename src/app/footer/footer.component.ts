import {Component, ViewEncapsulation} from '@angular/core'

@Component({
  selector: '[app-footer]',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FooterComponent {
  links = [
    {route: ['/p', 'payment-details'], title: 'Реквизиты'},
    {route: ['/p', 'ua'], title: 'Пользовательское соглашение'},
    {route: ['/p', 'pdpa'], title: 'Соглашение на обработку персональных данных'},
  ]
}
