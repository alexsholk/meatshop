import {Injectable} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'

@Injectable({
  providedIn: 'root'
})
export class OrderFormService {
  regions: string[] = ['Москва', 'Московская область']
  districts: string[] = ['Дмитровский район', 'Дмитров']
  dayVariants: string[] = ['Завтра', 'Послезавтра']
  timeVariants: string[] = ['Утро', 'Обед', 'Вечер']
  paymentMethods: string[] = [/*'Онлайн-оплата',*/ 'Картой курьеру', 'Наличными курьеру']

  form: FormGroup = new FormGroup({
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
}
