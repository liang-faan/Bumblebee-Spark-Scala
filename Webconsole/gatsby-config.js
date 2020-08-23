/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  pathPrefix: "/gatsby-website",
  siteMetadata: {
    title: "Gatsby React Bootstrap Website",
    description: "A starter that includes react-bootstrap and react-icons, along with SASS compilation.",
    author: "Liang Faan",
    email: "liang.faan@gmail.com"
  },
  plugins: [
    { resolve: `gatsby-transformer-remark` },
    {
      resolve: "gatsby-plugin-typography",
      options: {
        pathToConfigModule: "src/utils/typography",
      },
    },
    {
      resolve: "gatsby-plugin-s3",
      options: {
        bucketName: "test-gatsby-website-bucket",
        protocol: "https",
        hostname: "test-gatsby-website-bucket.s3-website-us-east-1.amazonaws.com",
      },
    },
    {
      resolve: 'gatsby-source-multi-api',
      options: {
        apis:[
          {
            prefix: 'account',
            baseUrl: 'https://jsonplaceholder.typicode.com/',
            endpoints: ["users"],
            method: 'GET'
          },
          {
            prefix: "SpaceX",
            baseUrl: "https://api.spacex.land/rest/",
            endpoints: ["rockets", "ships"],
            method: "GET",
          },
        ],
      },
    },
  ],
};
