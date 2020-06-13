import {Component, OnInit, ViewEncapsulation} from '@angular/core'

@Component({
  selector: '[app-order-form]',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
