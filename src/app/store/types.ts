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
  type?: OptionType
  required: boolean
  mutually_exclusive?: number
  values: OptionValue[]
  value?: number // synthetic
}

export enum OptionType {
  select = 'select'
}

export interface OptionValue {
  title: string
  price?: number
  input_type?: InputType
  weight?: number
  price_multiplier?: number
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
    input_type?: InputType
    quantity?: Quantity
    options: Option[]
  }
}

export interface Quantity {
  unit: Unit
  amount: number
}

export enum InputType {
  weight = 'weight',
  count = 'count'
}

export enum Unit {
  pc = 'шт',
  g = 'г',
  kg = 'кг',
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

  public static getOptionValue(option: Option): OptionValue | null {
    if (option.value !== undefined && option.value !== null) {
      return option.values[option.value]
    }
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

  /**
   * Type of amount input (weight|count)
   */
  getInputType(): InputType {
    let inputType = this.product.data.input_type || null
    for (const option of ProductWrapper.iterateOptions(this.product.data.options)) {
      if (typeof option.value === 'number') {
        const value = option.values[option.value]
        if (value?.input_type) {
          inputType = option.values[option.value].input_type
        }
      }
    }
    return inputType
  }

  /**
   * Label of amount input
   */
  getInputTypeLabel(): string {
    switch (this.getInputType()) {
      case InputType.count:
        return 'Кол-во'
      case InputType.weight:
        return 'Вес'
    }
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

  getBaseCost(): number {
    const amount = this.getQuantity().amount
    const price = this.getPrice()
    switch (this.getInputType()) {
      case InputType.weight:
        return price * amount / 1000
      case InputType.count:
        return price * amount * this.getOptionValueWeight() / 1000
    }
  }

  getAddonsCost(): number {
    let addonsCost = 0
    for (const option of ProductWrapper.iterateOptions(this.product.data.options)) {
      if (typeof option.value === 'number'
        && option.values[option.value].price_multiplier) {
        addonsCost += this.getBaseCost() * option.values[option.value].price_multiplier
      }
    }
    return addonsCost
  }

  getTotalCost(): number {
    return this.getBaseCost() + this.getAddonsCost()
  }

  getWeight(): number {
    const amount = this.getQuantity().amount
    switch (this.getInputType()) {
      case InputType.weight:
        return amount
      case InputType.count:
        return amount * this.getOptionValueWeight()
    }
  }

  getOptionValueWeight(): number | null {
    let weight: number = null
    for (const option of ProductWrapper.iterateOptions(this.product.data.options)) {
      if (typeof option.value === 'number'
        && option.values[option.value].weight) {
        // override weight
        weight = option.values[option.value].weight
      }
    }
    return weight
  }

  increaseQuantity() {
    const quantity = this.getQuantity()
    const step = this.getQuantityStep()
    const max = this.getMaxQuantity()
    if (quantity.amount + step > max) {
      quantity.amount = max
    } else {
      quantity.amount += step
    }
  }

  decreaseQuantity() {
    const quantity = this.getQuantity()
    const step = this.getQuantityStep()
    const min = this.getMinQuantity()
    if (quantity.amount - step < min) {
      quantity.amount = min
    } else {
      quantity.amount -= step
    }
  }

  getQuantity(): Quantity | null {
    return this.product.data.quantity
  }

  formatQuantity(): string {
    const quantity = this.product.data.quantity
    if (quantity.unit === Unit.g && quantity.amount > 1000) {
      return (quantity.amount / 1000) + ' ' + Unit.kg
    }

    return quantity.amount + ' ' + quantity.unit
  }

  /**
   * Set option value
   */
  setOptionValue(option: Option, value: number | null) {
    if (value === null || option.values[value]) {
      const previousInputType = this.getInputType()
      option.value = value
      // Check mutually exclusive exclusive
      if (option?.mutually_exclusive) {
        const mutualCode = option.mutually_exclusive
        for (const opt of ProductWrapper.iterateOptions(this.product.data.options)) {
          if (opt !== option && opt?.mutually_exclusive === mutualCode) {
            opt.value = null
          }
        }
      }

      const nextInputType = this.getInputType()
      // If input type changed - set default quantity
      if (previousInputType !== nextInputType) {
        this.setDefaultQuantity()
      }
    } else {
      throw new Error('Invalid option value ' + value)
    }
  }

  /**
   * Select default (first) values of options
   */
  selectDefault(): ProductWrapper {
    for (const option of ProductWrapper.iterateAllOptions(this.product.data.options)) {
      if ('values' in option && option.values.length && option.required) {
        option.value = 0
      }
    }
    return this
  }

  /**
   * Create default quantity object
   */
  setDefaultQuantity() {
    this.product.data.quantity = {
      amount: this.getDefaultQuantity(),
      unit: this.getQuantityUnit()
    }
    return this
  }

  isMinQuantity() {
    return this.getQuantity().amount === this.getMinQuantity()
  }

  isMaxQuantity() {
    return this.getQuantity().amount === this.getMaxQuantity()
  }

  private getMinQuantity() {
    switch (this.getInputType()) {
      case InputType.count:
        return 1
      case InputType.weight:
        return 500 // g
    }
  }

  private getMaxQuantity() {
    switch (this.getInputType()) {
      case InputType.count:
        return 50
      case InputType.weight:
        return 10000 // g
    }
  }

  private getDefaultQuantity() {
    switch (this.getInputType()) {
      case InputType.count:
        return 1
      case InputType.weight:
        return 1000
    }
  }

  private getQuantityStep() {
    switch (this.getInputType()) {
      case InputType.count:
        return 1
      case InputType.weight:
        return 100 // g
    }
  }

  private getQuantityUnit(): Unit {
    switch (this.getInputType()) {
      case InputType.count:
        return Unit.pc
      case InputType.weight:
        return Unit.g
    }
  }
}
