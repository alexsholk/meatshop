import {Component, OnDestroy, ViewEncapsulation} from '@angular/core'
import {CartService} from '../../store/cart/cart.service'
import {MatDialog} from '@angular/material/dialog'
import {DialogComponent} from '../dialog/dialog.component'
import {Subscription} from 'rxjs'

@Component({
  selector: '[app-order-form]',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormComponent implements OnDestroy {
  subs: Array<Subscription> = []

  constructor(
    public cart: CartService,
    public dialog: MatDialog) {
  }

  ngOnDestroy(): void {
    for (const subscription of this.subs) {
      subscription.unsubscribe()
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent)

    this.subs.push(dialogRef.afterClosed().subscribe(result => {
      this.cart.clear()
    }))
  }

  submit() {
    this.subs.push(
      this.cart.submit().subscribe((v) => this.openDialog())
    )
  }
}
