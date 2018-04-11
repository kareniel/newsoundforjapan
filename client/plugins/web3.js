// import web3Utils from 'web3-utils'
import Web3 from 'web3'
import Web3Accounts from 'web3-eth-accounts'
import ERC20 from 'human-standard-token-abi'
import Vue from 'vue'

export default ({ app }, inject) => {
  
  if (process.env.VUE_ENV == 'client') {
    function checkForWeb3() {
      if (typeof(web3) !== 'undefined' && web3.currentProvider) {
        initializeClient(app, new Web3(web3.currentProvider))
        return
      }
      setTimeout(checkForWeb3, 100)
    }
    checkForWeb3()
  }
  }

function initializeClient(app, _web3) {
  global.web3 = _web3

  function checkNetwork () {
    _web3.eth.net.getNetworkType().then(function (network) {
      app.store.state.walletNetwork = network
    })
  }
  checkNetwork()

  new Web3Accounts(_web3)
  const checkAccounts = function () {
    _web3.eth.getAccounts()
      .then(function (accounts) {
        if (_web3.givenProvider) app.store.state.noWallet = false
        app.store.state.locked = (accounts.length === 0 || !accounts[0])

        if (accounts.length === 0 && app.store.state.address && (!app.store.state.user || !app.store.state.user.address)) {
          app.store.dispatch('setAddress', null)
          checkNetwork()
        } else if (!app.store.state.address && accounts[0]) {
          app.store.dispatch('setAddress', accounts[0])
          checkNetwork()
        }
        return Promise.resolve()
      })
  }
  const checkInterval = setInterval(checkAccounts, 100)
}

Vue.mixin({
  methods: {
    ether: (ether) => ether * 10 ** 18,
    weiToEther: (wei) => wei / 10 ** 18,
    etherscantxlink(txHash) {
      if (process.env.network == 'main') return 'https://etherscan.io/tx/' + txHash
      else return 'https://' + process.env.network + '.etherscan.io/tx/' + txHash
    },
    etherscanlink(address) {
      if (process.env.network == 'main') return 'https://etherscan.io/address/' + address
      else return 'https://' + process.env.network + '.etherscan.io/address/' + address
    }
  }
})
