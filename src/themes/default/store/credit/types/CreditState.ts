export default interface CreditState {
  banks: [],
  selectedBank: null,
  selectedCredit: null,
  accessories: null,
  services: null,
  creditMethod: string,
  creditDetails: {
    surname: string,
    name: string,
    last_name: string,
    date_of_birth: string,
    identification_code: string
  }
}
