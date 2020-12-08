export interface Shop {
  id: number | string,
  city: string,
  store_id: number,
  longitude: number,
  latitude: number,
  source_code?: string,
  country_id?: string,
  email?: string,
  phone?: string,
  fax?: string,
  opening_hours?: string
}
