import {environment} from '../../environments/environment'

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
  price?: number
  options: Option[]
}

export interface Product {
  id: number
  category_id: number
  data: {
    title: string
    description: string
    image: string
    price?: number
    quantity?: Quantity
    options: Option[]
  }
}

export interface Quantity {
  unit: string
  quantity: number
}

export class ProductWrapper {
  private static* iterateAllOptions(options: Option[]) {
    for (const option of options) {
      yield option
      for (const value of option.values) {
        if ('options' in value) {
          yield* ProductWrapper.iterateAllOptions(value.options)
        }
      }
    }
  }

  private static* iterateOptions(options: Option[]) {
    for (const option of options) {
      yield option
      // Only if options has numeric value
      if (typeof option.value === 'number' && 'options' in option.values[option.value]) {
        yield* ProductWrapper.iterateAllOptions(option.values[option.value].options)
      }
    }
  }

  public static deserialize(data: string): ProductWrapper {
    const product = JSON.parse(data)
    return new ProductWrapper(product)
  }

  constructor(
    private product: Product) {
  }

  clone() {
    return ProductWrapper.deserialize(this.serialize())
  }

  serialize() {
    return JSON.stringify(this.product)
  }

  getId(): number {
    return this.product.id
  }

  getTitle(): string {
    return this.product.data.title
  }

  getDescription(): string {
    return this.product.data.description
  }

  getImageSrc(): string {
    return environment.assetsHost + this.product.data.image
  }

  getOptions() {
    return [...ProductWrapper.iterateOptions(this.product.data.options)]
  }

  getMinPrice(): number {
    const prices: number[] = []
    if (this.product.data.price) {
      prices.push(this.product.data.price)
    }
    for (const option of ProductWrapper.iterateAllOptions(this.product.data.options)) {
      for (const value of option.values) {
        if (value.price) {
          prices.push(value.price)
        }
      }
    }
    return Math.min(...prices)
  }

  getPrice(): number {
    let price: number = this.product.data?.price || null
    for (const option of ProductWrapper.iterateOptions(this.product.data.options)) {
      if (typeof option.value === 'number'
        && option.values[option.value].price) {
        // override price
        price = option.values[option.value].price
      }
    }
    return price
  }

  increaseQuantity() {
    this.product.data.quantity.quantity += 100
  }

  decreaseQuantity() {
    this.product.data.quantity.quantity -= 100
  }

  getQuantity(): Quantity | null {
    return this.product.data.quantity
  }

  formatQuantity(): string | null {
    const quantity = this.product.data?.quantity
    return quantity ? quantity.quantity + ' ' + quantity.unit : null
  }

  /**
   * Select default (first) values of options
   */
  selectDefault(): ProductWrapper {
    for (const option of ProductWrapper.iterateAllOptions(this.product.data.options)) {
      if ('values' in option && option.values.length) {
        option.value = 0
      }
    }
    return this
  }

  /**
   * Create default quantity object
   */
  setDefaultQuantity() {
    if (this.product.data.quantity) {
      return
    }
    this.product.data.quantity = {
      quantity: 1000,
      unit: 'г'
    }
    return this
  }

  isMinQuantity() {
    return this.getQuantity().quantity === this.getMinQuantity()
  }

  isMaxQuantity() {
    return this.getQuantity().quantity === this.getMaxQuantity()
  }

  private getMinQuantity() {
    return 300 // todo change
  }

  private getMaxQuantity() {
    return 15000
  }
}
