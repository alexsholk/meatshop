import {Component, OnInit, ViewEncapsulation} from '@angular/core'
import {StoreService} from './store.service'

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StoreComponent implements OnInit {

  constructor(
    public store: StoreService) {
  }

  ngOnInit(): void {
  }

}
