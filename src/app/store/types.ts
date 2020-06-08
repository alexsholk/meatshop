export interface Category {
  id: number
  parent_id?: number
  data: {
    slug: string
    title: string
  }
}

export interface ProductRaw {
  id: number
  data: {
    title: string
  }
}

export class Product {

  constructor(private raw: ProductRaw) {}

  getTitle(): string {
    return this.raw.data.title
  }

}
