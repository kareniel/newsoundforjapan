<template>
  <div class="wrapper">
    <img src="~/assets/more_wub_wub.jpg" alt="WubCoin" class="vinyl">
    <h1>{{ $t('index.title') }}</h1>
    {{ $t('index.poweredby') }}
    <div class="address" v-if="$store.state.address" >
      Wallet address: {{ $store.state.address }}
    </div>
    <div class="address" v-if="$store.state.user && $store.state.user.address">
      Logged in as: {{ $store.state.user.address }}
    </div>
    <div class="balance">
      Your Balance: 0 WUB
    </div>
    <div v-if="$store.state.noWallet">
      <p>{{ $t('index.noweb3') }}</p>
      <a href="https://metamask.io/" target="_blank">{{ $t('index.getmetamask') }}</a>
    </div>
    <div v-else-if="$store.state.locked">
      {{ $t('index.pleaseunlock') }}
    </div>
    <div v-else-if="!$store.state.user">
      <div class="button" @click="$store.dispatch('login', {$router})">{{ $t('index.login') }}</div>
    </div>
  </div>
</template>


<script>
export default {
  
}
</script>


<style lang="scss">
.vinyl {
  width: 50%;
  float: right;
}
</style>
