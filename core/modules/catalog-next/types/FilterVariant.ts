export default interface FilterVariant {
  id: string,
  label: string,
  type: string,
  visible?: string,
  from?: string,
  to?: string,
  count?: string,
  single?: boolean,
  name?: string,
}
