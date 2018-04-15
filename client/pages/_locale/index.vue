<template>
  <div class="wrapper">
    <div class="profilebox">
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
      <div class="address" v-if="$store.state.address" >
        Wallet address: {{ $store.state.address }}
      </div>
      <div class="balance">
        Your Balance: {{ $store.state.wubBalance }} WUB
      </div>
    </div>
    <div class="hero">
      <h1>{{ $t('index.title') }}</h1>
      <div class="block">
        {{ $t('index.powering') }}
      </div>
      <img src="~/assets/more_wub_wub.jpg" alt="WubCoin" class="vinyl">
    </div>

    <h2>ROADMAP</h2>
    <ol>
      <li>Issue WUBs: WUBs are issued on the Ethereum platform as a standard ERC223 token</li>
      <li>Trade WUBs: We will reach out to exchanges to list and trade WUBs</li>
      <li>Organize raves: With the procured funds we will organize electronic dance music raves where WUB holders can attend for free and enjoy free champagne and snacks and have a good time. We will always do our best to book amazing producers and DJs.</li>
      <li>Platform development: We will develop an open source DApp where WUBs can be exchanged for music production lessons and gigs from your favourite producers and DJs.</li>
    </ol>
    <h2>TEAM</h2>
    <ul>
      <li><a href="https://www.linkedin.com/in/stefan-buhrmester-05828b33/" target="_blank">Stefan Buhrmester</a> | Event organizer, Software developer</li>
      <li><a href="http://seamlessr.com" target="_blank">Stephen "SeamlessR" Oleary</a> | Music producer, teacher</li>
      <li>More to be announced</li>
    </ul>
    <h2>TOKEN CONTRACT</h2>
    <p>
      <a href="https://etherscan.io/address/0x1e886ce6d18bf524373a546300dfe97674f5c6d2#code" target="_blank">0x1e886ce6d18bf524373a546300dfe97674f5c6d2</a>
    </p>
    <p>
      Note: You can not send Ether to the token contract directly. Stay tuned for the announcement of the token issuance and distribution.
    </p>
    <h2>BOUNTY</h2>
    <p>
      We offer ETH rewards for people participating in our community, development and events. Stay tuned for further announcements.
    </p>
    <h2>CONTACT</h2>
    <p>
      For now, you can find us in <a href="https://discordapp.com/channels/324034794184769537/324034794184769537" target="_blank">Seamless's discord channel</a>.
    </p>
  </div>
</template>


<script>
export default {
  
}
</script>


<style lang="scss">
.block {
  margin-bottom: 20px;
}
.vinyl {
  width: 100%;
}
.profilebox {
  right: 0;
  top: 0;

  position: absolute;
  text-align: right;
  max-width: 400px;
}
.hero {
  text-align: center;
  h1 {
    padding-top: 160px;
    font-size: 60px;
  }
  .block {
    margin-bottom: 100px;
  }
}
h2 {
  margin-top: 100px;
  margin-bottom: 30px;
}
</style>
