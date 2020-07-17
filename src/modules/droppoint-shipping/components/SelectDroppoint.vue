<script>
export default {
  methods: {
    selectDroppoint (drpnt) {
      let phoneNumber = this.shipping.phoneNumber

      let nameArr = drpnt.name.split(' ')
      let first = nameArr[0]
      let last = nameArr[1]

      if (!last || last.length === 0) {
        last = first
      }

      return {
        firstName: first,
        lastName: last,
        streetAddress: drpnt.streetname,
        apartmentNumber: drpnt.streetname2,
        zipCode: drpnt.zipcode,
        company: drpnt.id,
        city: drpnt.city,
        shippingCarrier: 'flatrate',
        state: '',
        region_id: 0,
        country: drpnt.country,
        phoneNumber: phoneNumber,
        shippingMethod: 'flatrate'
      }
    }
  }
}
</script>
