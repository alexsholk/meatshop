export interface Category {
  id: number
  parent_id?: number
  data: {
    slug: string
    title: string
  }
}

export interface Product {
  id: number
  category_id: number
  data: {
    title: string
    description: string
    image: string
  }
}

export class ProductWrapper {

  constructor(
    private product: Product) {
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
}
