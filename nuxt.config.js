const fs = require('fs')

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: "WUB",
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: "Project WUB is powering a new generation of music producers, teachers and events." }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:100,300,700' }
    ]
  },
  env: {
    terms: fs.readFileSync('./terms.txt').toString('hex'),
    network: process.env.ETH_NETWORK || 'rinkeby',
    wubAddress: process.env.ETH_NETWORK == 'main' ? '0x1e886ce6D18bF524373a546300dfe97674f5c6d2' : '0x8aeaa05dd16c43839176d169d2aa652c40434864'
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
