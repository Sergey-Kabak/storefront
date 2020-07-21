export default interface FilterVariant {
  id: string,
  label: string,
  type: string,
  from?: string,
  to?: string,
  min?: string,
  max?: string,
  single?: boolean
}
