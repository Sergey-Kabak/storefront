export interface EvinentSearchResponse {
  products: Product[],
  categories: Category[]
}

interface Product {
  isPreorder: boolean,
  isSale: boolean,
  isHit: boolean,
  isNew: boolean,
  rating: number,
  code: string,
  title: string,
  url: string,
  photoUrl: string,
  price: number,
  priceOld: number
  specialOffers?: [],
}

interface Category {
  id: number,
  count: number,
  title: string,
  url: string,
  imageUrl?: null
}
