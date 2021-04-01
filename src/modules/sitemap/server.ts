import { serverHooks } from '@vue-storefront/core/server/hooks'
import path from 'path';

export const sitemapMiddleware = () => {
  return (req, res) => {
    res.set('Content-Type', 'application/xml');

    const staticSitemap = path.resolve('./', 'sitemap.xml');

    return res.sendFile(staticSitemap);
  };
};

serverHooks.afterApplicationInitialized(({ app }) => {
  app.get('/sitemap.xml', sitemapMiddleware())
})