export interface Brand {
  accessories: BrandAccessories[],
  groups: BrandGroups[],
  banner_desktop: string,
  banner_promo: string,
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

export interface BrandGroups {
  image: string,
  name: string,
  url_key: string,
  url_path: string,
  id: number,
  products: BrandSubGroup[]
}

export interface BrandSubGroup {
  image: string,
  name: string,
  url_key: string,
  url_path: string,
}
