import {Component, ViewEncapsulation} from '@angular/core'
import {Angulartics2GoogleAnalytics} from 'angulartics2/ga'
import {NgxMetrikaService} from '@kolkov/ngx-metrika'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  constructor(
    angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics,
    private ym: NgxMetrikaService
  ) {
    angulartics2GoogleAnalytics.startTracking()
  }
}
