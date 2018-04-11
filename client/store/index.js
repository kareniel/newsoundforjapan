import Vuex from 'vuex'
import axios from 'axios'
import ERC20 from 'human-standard-token-abi'

const createStore = () => {
  return new Vuex.Store({
    state: {
      user: null,
      shopContract: null,
      address: null,
      locked: true,
      noWallet: true,
      walletNetwork: null,
      network: process.env.network,
      pendingTokens: 0,
      locales: ['en', 'ja'],
      locale: 'en',
      whsBalance: 0
    },

    mutations: {
      SET_LANG (state, locale) {
        if (state.locales.indexOf(locale) !== -1) {
          state.locale = locale
        }
      },
      SET_USER (state, user) {
        state.user = user
      }
    },

    getters: {
      tokens (state) {
        return state.tokens[state.network]
      },
      balance (state) {
        return state.tokens[state.network].WHS.balance
      }
    },

    actions: {
      async nuxtServerInit ({commit, dispatch, state}, {req, res}) {
        // On first time visit, if no locale is specified in URL and useragent is not english, redirect to language.
        if (!req.cookies.redirected && !req.params.lang) {
          let locale = (req.headers['accept-language'] || 'en').substr(0, 2)
          if (locale !== 'en' && state.locales.indexOf(locale) !== -1) res.cookie('redirected', 1).redirect('/' + locale + '/').end()
        }
        state.nftAddress = process.env.nftAddress
        state.shopAddress = process.env.shopAddress
        if (req.user) {
          commit('SET_USER', req.user)
          await dispatch('setAddress', req.user.eth_address)
        }
      },

      async setAddress ({state, commit}, address) {
        state.noWallet = false
        state.address = address
      },

      async purchaseEthToken ({state, commit}, {symbol, wei}) {
        if (state.locked) return this.$toast.error('Please unlock your wallet to use this function.')
        if (typeof web3 === 'undefined') return this.$toast.error('Please install MetaMask to use this function.')

        web3.eth.sendTransaction({value: wei, from: state.address, to: state.tokens[state.network][symbol].address})
          .catch((err) => {
            const errs = err.message.split(':')
            this.$toast.error(errs[errs.length - 1])
          })
      },

      async saveUser ({state, commit}, user) {
        await this.$axios.put('/user', user)
        state.user = user
        ladda.stopAll()
        this.$toast.success('Changes saved')
      },

      async login ({state, commit}, {$router, email}) {
        if (state.locked) return this.$toast.error('Please unlock your wallet to use this function.')
        if (typeof web3 === 'undefined') return this.$toast.error('Web3 not available. Please use a Web3-enabled browser.')

        // let data = state.contract.methods.balanceOf(state.address).encodeABI()
        // web3.eth.sign(state.address, data, console.log)
        try {
          let signature = await web3.eth.personal.sign('0x' + process.env.terms, state.address)
          localStorage.setItem('authorization', signature)
          let response = await this.$axios.get('/user')
          commit('SET_USER', response.data)
          // $router.replace({path: '/portfolio'})
        } catch (err) {
          const errs = err.message.split(':')
          this.$toast.error(errs[errs.length - 1])
        }
      },
      async logout ({commit}, router) {
        commit('SET_USER', null)
        await this.$axios.delete('/session')
        localStorage.setItem('authorization', null)
        router.replace({path: '/'})
      }
    }
  })
}

export default createStore
