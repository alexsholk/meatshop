import {Component, OnInit, ViewEncapsulation} from '@angular/core'

@Component({
  selector: '[app-order-form]',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormComponent implements OnInit {
  public times = [
    {value: 'morning', viewValue: 'Утро'},
    {value: 'dinner', viewValue: 'Обед'},
    {value: 'evening', viewValue: 'Вечер'}
  ]

  constructor() {
  }

  ngOnInit(): void {
  }

}
