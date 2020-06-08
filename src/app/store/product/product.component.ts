import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core'
import {Product} from '../types'

@Component({
  selector: '[app-product]',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductComponent implements OnInit {
  @Input() product: Product

  constructor() {
  }

  ngOnInit(): void {
  }

}
