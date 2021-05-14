export default interface UserState {
  login: object,
  register: object,
  token: string,
  refreshToken: string,
  groupToken: string,
  groupId: any,
  current: {
    email: string,
    custom_attributes: any
  } | null,
  current_storecode: string,
  visited_products_history: any
  session_started: Date,
  orders_history: any,
  local_data_loaded: boolean
}
