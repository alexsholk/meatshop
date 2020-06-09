import {Component, HostBinding, HostListener, Input, OnInit, Renderer2, ViewEncapsulation} from '@angular/core'
import {ProductWrapper} from '../types'

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

  constructor(private renderer: Renderer2) {
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

  openOptions() {
    this.isOptionsOpen = true
  }
}
