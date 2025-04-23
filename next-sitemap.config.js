module.exports = {
  siteUrl: "https://www.eduvia.space",
  generateRobotsTxt: true,
  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 5000,
  additionalPaths: async (config) => {
    return [
      {
        loc: "https://www.eduvia.space/javascript",
        changefreq: "daily",
        priority: 0.8,
      },
      {
        loc: "https://www.eduvia.space/javascript-compiler",
        changefreq: "daily",
        priority: 0.8,
      },
      
      // add more as needed
    ];
  },
};
