import {Component, HostBinding, HostListener, Input, OnInit, Renderer2, ViewEncapsulation} from '@angular/core'
import {Option, ProductWrapper} from '../types'
import {CartService} from '../cart/cart.service'

@Component({
  selector: '[app-product]',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductComponent implements OnInit {
  @Input() product: ProductWrapper
  @HostBinding('class.active') isChosen: boolean
  public isOptionsOpen = false
  public activeOption: Option = null

  constructor(
    private renderer: Renderer2,
    public cart: CartService) {
  }

  @HostListener('window:resize', ['$event.target'])
  onWindowResize(event) {
    if (event.innerWidth >= 600) {
      this.unChoose()
    } else {
      this.isOptionsOpen = false
    }
  }

  ngOnInit(): void {

  }

  choose() {
    this.isChosen = true
    this.renderer.addClass(document.body, 'modal-open')
  }

  unChoose() {
    this.isChosen = false
    this.renderer.removeClass(document.body, 'modal-open')
  }

  openOptions(option) {
    this.activeOption = option
    this.isOptionsOpen = true
  }
}
