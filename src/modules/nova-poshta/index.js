import NovaPoshta from 'novaposhta';

const api = new NovaPoshta({ apiKey: '8dfaeb82813cb049eab8b34e1712e9ed' });

export default {
  methods: {
    async getCityList () {
      let cities = await api.address.getAreas();
      let centers = cities.data.map(c => api.address.getCities({ Ref: c.AreasCenter }));
      let response = await Promise.all(centers);
      this.cities = response.filter(r => r.data.length).map(r => r.data && r.data[0] && r.data[0].Description);
    },
    async getListByAddress (city) {
      try {
        let res = await api.address.getWarehouses({ CityName: city });
        let filteredData = res.data.map(loc => (
          {
            'position': {
              'lat': loc.Latitude,
              'lng': loc.Longitude
            },
            'number': loc.Number,
            'name': loc.Description,
            'id': loc.Ref,
            'country': 'UA',
            'city': loc.CityDescription,
            'zipcode': '69068',
            'streetname': loc.ShortAddress,
            'streetname2': loc.Number,
            'city_id': loc.CityRef,
            'work_mode': '',
            'round_the_clock': false,
            'active': true
          }
        ));
        this.setDroppoints(filteredData)
      } catch (errors) {
        console.log(errors)
        if (Array.isArray(errors)) {
          // errors.forEach((error) => console.log(`[${ error.code || '-' }] ${ error.en || error.uk || error.ru || error.message }`));
        }
      }
    }
  }
};
