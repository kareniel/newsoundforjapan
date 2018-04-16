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
    <h2>LATEST POSTS</h2>
    <p>
      4/16/2018 7:22 PM | <a href="https://steemit.com/wub/@buhrmi/15-000-000-wubs-have-been-issued" _target="blank">15,000,000 wubs have been issued</a> by buhrmi
    </p>
    <p>
      4/16/2018 5:31 PM | <a href="https://steemit.com/wub/@buhrmi/how-do-wubs-get-value" _target="blank">How do WUBs get value</a> by buhrmi
    </p>
    <p>
      4/13/2018 4:24 PM | <a href="https://steemit.com/ico/@buhrmi/an-ico-for-people-who-love-music-festivals-and-the-wubs" _target="blank">An ICO for people who love music festivals and the wubs.</a> by buhrmi
    </p>
    <h2>ROADMAP</h2>
    <ol>
      <li>Issue WUBs: WUBs are issued on the Ethereum platform as a standard ERC223 token</li>
      <li>Trade WUBs: We will reach out to exchanges to list and trade WUBs</li>
      <li>Organize raves: With the procured funds we will organize electronic dance music raves where WUB holders can attend for free and enjoy free champagne and snacks and have a good time. We will always do our best to book amazing producers and DJs.</li>
      <li>Platform development: We will develop an open source DApp where WUBs can be exchanged for music production lessons, soundpacks and live performances from your favourite producers and DJs.</li>
    </ol>
    <h2>DISTRIBUTION</h2>
    <p>
      The current plan is as follows:
    </p>
    <ul>
      <li>Issue a total of 15,000,000 wubs held by Stefan K.K. (<a target="_blank" href="https://etherscan.io/tx/0x4060170d48d1972e10098202bbc5a12cb5a43b8efd3d5d8e014afb9d574482a0">completed</a>)</li>
      <li>Distribute 1,000,000 wubs to partners via airdrops. All partners will be officially announced on our homepage. (TBD)</li>
      <li>Distribute 1,000,000 wubs to the community via a faucet. (TBD)</li>
      <li>Distribute 10,000,000 wubs via an initial wub offering (IWO). (TBD)</li>
      <li>Reserve remaining 3,000,000 wubs for future use (held by Stefan K.K.)</li>
    </ul>
    <h2>TOKEN CONTRACT</h2>
    <p>
      <a href="https://etherscan.io/address/0x8c5a05b691288f85e6e27bf6b5a454d2814f5a6f#code" target="_blank">0x8c5a05b691288f85e6e27bf6b5a454d2814f5a6f</a>
    </p>
    <p>
      Note: You can not send Ether to the token contract directly. Stay tuned for the announcement of the token issuance and distribution.
    </p>
    <h2>TEAM</h2>
    <ul>
      <li><a href="https://www.linkedin.com/in/stefan-buhrmester-05828b33/" target="_blank">Stefan Buhrmester</a> | Event organizer, Software developer</li>
      <li><a href="http://seamlessr.com" target="_blank">Stephen "SeamlessR" Oleary</a> | Music producer, teacher</li>
      <li>More to be announced</li>
    </ul>

    <h2>BOUNTY</h2>
    <p>
      We offer ETH rewards for people promoting our community, development, IWO and events. Please join the channel for further announcements.
    </p>
    <h2>CONTACT</h2>
    <p>
      Shoot us a mail at <a href="mailto:support@wubcoin.com">support at wubcoin.com</a> or find us in <a href="https://discordapp.com/channels/324034794184769537/324034794184769537" target="_blank">SeamlessR's discord channel</a>.
    </p>
    <p><i>"This either the most stupid or the most amazing thing ever"</i></p>
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
