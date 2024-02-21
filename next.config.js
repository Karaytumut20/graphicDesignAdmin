const path = require('path')
const withTM = require('next-transpile-modules')([
  '@pqina/pintura',
  '@pqina/react-pintura',
]);
module.exports = withTM({
  swcMinify: false,
  trailingSlash: true,
  reactStrictMode: false,
  experimental: {
    esmExternals: false,
    jsconfigPaths: true // enables it for both jsconfig.json and tsconfig.json
  },
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
    }

    return config
  }
});
