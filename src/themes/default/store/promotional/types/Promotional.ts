export default interface Promotional {
  name: string,
  description?: string,
  image: string,
  url: string,
  from_date: Date,
  to_date: Date,
  id: number,
  active: Boolean,
  filters: []
}
