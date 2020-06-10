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
    // todo replace
    return '../../../assets/mock/' + this.product.data.image
  }

  getOptions() {
    return [...ProductWrapper.iterateOptions(this.product.data.options)]
  }

  selectDefault(): ProductWrapper {
    for (const option of ProductWrapper.iterateAllOptions(this.product.data.options)) {
      if ('values' in option && option.values.length) {
        option.value = 0
      }
    }
    return this
  }
}
