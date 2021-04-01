import Option from './Option'

export default interface Attribute {
  id: number,
  attribute_code: string,
  attribute_id: number,
  is_visible_on_front: boolean,
  options: Option[]
}
  