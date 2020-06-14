import {Component, OnInit, ViewEncapsulation} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'

@Component({
  selector: '[app-order-form]',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormComponent implements OnInit {
  public form: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/\d+/)
    ])
  })

  public times = [
    {value: 'morning', viewValue: 'Утро'},
    {value: 'dinner', viewValue: 'Обед'},
    {value: 'evening', viewValue: 'Вечер'}
  ]
  myControl = new FormControl()
  options: string[] = ['One', 'Two', 'Three']


  constructor() {
  }

  ngOnInit(): void {
  }

  submit() {
    console.log(this.form)
    const formData = {...this.form.value}
  }
}
