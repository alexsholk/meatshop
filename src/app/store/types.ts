import {BehaviorSubject} from 'rxjs'

export interface Category {
  id: number
  parent_id?: number
  data: {
    slug: string
    title: string
  }
}

export interface Option {
  code: string
  title: string
  type: OptionType
  required: boolean
  values: OptionValue[]
  value?: number // synthetic
}

export enum OptionType {
  select
}

export interface OptionValue {
  title: string
  options: Option[]
}

export interface Product {
  id: number
  category_id: number
  data: {
    title: string
    description: string
    image: string
    options: Option[]
  }
}

export class ProductWrapper {
  public options$: BehaviorSubject<Option[]> = new BehaviorSubject<Option[]>([])

  constructor(
    private product: Product) {
    this.options$.next([...this.iterateOptions(product.data.options)])
  }

  private* iterateOptions(options: Option[]) {
    for (const option of options) {
      yield option
      if (option.value === undefined) {
        option.value = 0
      }
      if (option.values.length && option.values[option.value]?.options) {
        yield* this.iterateOptions(option.values[option.value].options)
      }
    }
  }

  getTitle(): string {
    return this.product.data.title
  }

  getDescription(): string {
    return this.product.data.description
  }

  getImageSrc(): string {
    // todo replace
    return '../../../assets/mock/' + this.product.data.image
  }

  setOptionValue(optionCode: string, value: number) {
    for (const option of this.iterateOptions(this.product.data.options)) {
      if (option.code === optionCode && option.values[value]) {
        option.value = value
      }
    }
    this.options$.next([...this.iterateOptions(this.product.data.options)])
  }
}
