export interface Brand {
  accessories: BrandAccessories[],
  banner_desktop: string,
  banner_promo: string,
  categories: BrandCategories[],
  description: string,
  id: number | string,
  url_key: string
}

export interface BrandAccessories {
  image: string,
  name: string,
  url_key: string,
  url_path: string,
  id: number
}

export interface BrandCategories {
  image: string,
  name: string,
  url_key: string,
  url_path: string,
  id: number,
  products: BrandProduct[]
}

export interface BrandProduct {
  image: string,
  name: string,
  url_key: string,
  url_path: string,
}
