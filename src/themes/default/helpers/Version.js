import config from 'config';

export default function () {
  console.log('Current site version : ' + config.version);
  if (!localStorage.getItem('siteVersion') || localStorage.getItem('siteVersion') !== config.version) {
    localStorage.setItem('siteVersion', config.version);
  }
}
