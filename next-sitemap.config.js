/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://YOUR-DOMAIN', // 배포 후 실제 도메인으로 변경
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/api/*'],
}
