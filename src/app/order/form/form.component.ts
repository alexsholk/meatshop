import {Component, OnInit, ViewEncapsulation} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'

@Component({
  selector: '[app-order-form]',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormComponent implements OnInit {
  public regions: string[] = ['Москва', 'Московская область']
  public districts: string[] = ['Дмитровский район', 'Дмитров']
  public dayVariants: string[] = ['Завтра', 'Послезавтра']
  public timeVariants: string[] = ['Утро', 'Обед', 'Вечер']
  public paymentMethods: string[] = [/*'Онлайн-оплата',*/ 'Картой курьеру', 'Наличными курьеру']

  public form: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d+$/)
    ]),
    address: new FormGroup({
      region: new FormControl(this.regions[0], [
        Validators.required
      ]),
      district: new FormControl('', [
        Validators.required
      ]),
      street: new FormControl('', [
        Validators.required
      ]),
      house: new FormControl('', [
        Validators.required
      ]),
      flat: new FormControl('', [
        Validators.required
      ])
    }),
    delivery: new FormGroup({
      day: new FormControl(this.dayVariants[0], [
        Validators.required
      ]),
      time: new FormControl(this.timeVariants[0], [
        Validators.required
      ])
    }),
    paymentMethod: new FormControl(this.paymentMethods[0], [
      Validators.required
    ]),
    contactlessDelivery: new FormControl(),
    pdpa: new FormControl(null, [
      Validators.requiredTrue
    ]),
  })

  constructor() {
  }

  ngOnInit(): void {
  }

  submit() {
    console.log(this.form)
    const formData = {...this.form.value}
  }
}
