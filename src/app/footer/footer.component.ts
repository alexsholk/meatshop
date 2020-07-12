import {Component, ViewEncapsulation} from '@angular/core'

@Component({
  selector: '[app-footer]',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FooterComponent {
  links = [
    {route: ['/p', 'rights'], title: 'Правовой уголок'},
  ]

  currentYear(): number {
    return (new Date()).getFullYear()
  }
}
