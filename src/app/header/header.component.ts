import {Component, ViewEncapsulation} from '@angular/core'

@Component({
  selector: '.main-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {
  public isNavActive = false

  toggleNavActive() {
    this.isNavActive = !this.isNavActive
  }
}
