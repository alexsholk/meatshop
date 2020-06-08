export interface Category {
  id: number
  parent_id?: number
  data: {
    slug: string
    title: string
  }
}

export class Product {
  id: number
}
