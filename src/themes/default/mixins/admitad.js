export default {
  data: () => ({
    cookie_name: 'tagtag_aid',
    days_to_store: 90,
    deduplication_cookie_value: 'admitad',
    channel_name: 'target'
  }),
  mounted: function () {
    this.setSourceCookie();
    this.defineAdmitadChannel();
  },
  methods: {
    getSourceParamFromUri () {
      const pattern = this.channel_name + '=([^&]+)';
      const re = new RegExp(pattern);
      return (re.exec(document.location.search) || [])[1] || '';
    },
    getSourceCookie () {
      // eslint-disable-next-line
      const matches = document.cookie.match(new RegExp('(?:^|; )' + this.cookie_name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'));
      return matches ? decodeURIComponent(matches[1]) : undefined
    },
    setSourceCookie () {
      const param = this.getSourceParamFromUri()
      if (!param) {
        return
      }
      const period = this.days_to_store * 60 * 60 * 24 * 1000;
      const expiresDate = new Date(period + +new Date());
      const cookieString =
        this.cookie_name +
        '=' +
        param +
        '; path=/; expires=' +
        expiresDate.toGMTString();
      document.cookie = cookieString;
      document.cookie = cookieString + '; domain=.' + location.host;
    },
    defineAdmitadChannel () {
      const ADMITAD = window.ADMITAD || {}
      if (!this.getSourceCookie(this.cookie_name)) {
        ADMITAD.Invoice.broker = 'na';
      } else if (
        this.getSourceCookie(this.cookie_name) !== this.deduplication_cookie_value
      ) {
        ADMITAD.Invoice.broker = this.getSourceCookie(this.cookie_name);
      } else {
        ADMITAD.Invoice.broker = 'adm';
      }
    }
  }
};
