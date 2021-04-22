import Banner from './Banner'

export default interface BannerGroup {
  name: string,
  banners: Banner[],
  status: string
}
