const fs = require('fs')

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: "New Sound For Japan",
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: "Crypto-powered music festivals." },
      { hid: 'og:image', property: 'og:image', content: "https://newsoundforjapan.com/ogimage.png" }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:100,300,700' }
    ]
  },
  env: {
    terms: fs.readFileSync('./terms.txt').toString('hex'),
    network: process.env.ETH_NETWORK || 'rinkeby',
    wubAddress: process.env.ETH_NETWORK == 'main' ? '0x2664877980f2684c9e9be07a50330e85847c5241' : '0x2664877980f2684c9e9be07a50330e85847c5241'
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    vendor: ['vue-i18n', 'axios', 'web3', 'web3-eth-accounts', 'human-standard-token-abi'],
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // ...
    }
  },
  modules: [
    '@nuxtjs/toast',
    '@nuxtjs/axios'
  ],
  router: {
    middleware: ['i18n']
  },
  plugins: [
    {src: '~/plugins/tracking.js', ssr: false},
    {src: '~/plugins/web3.js'},
    {src: '~/plugins/i18n.js'}
  ],
  css: ['@/assets/styles/global.scss'],
  srcDir: './client',
  axios: {
    requestInterceptor: (config, context) => {
      let authorization = (typeof localStorage !== 'undefined' && localStorage.getItem('authorization')) || (context.req && context.req.headers.authorization) || (context.req && context.req.cookies.s)
      if (authorization) config.headers.common['Authorization'] = authorization
      return config
    }
  }
}
