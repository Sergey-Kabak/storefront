export default interface CreditState {
  banks: [],
  creditBanks: [],
  paypartsBanks: [],
  selectedBank: null,
  selectedCredit: null,
  productSku: null,
  creditExtraAttributes: null,
  creditMethod: string,
  creditDetails: {
    surname: string,
    name: string,
    last_name: string,
    date_of_birth: string,
    identification_code: string
  },
  PartPaymentData: object
}
