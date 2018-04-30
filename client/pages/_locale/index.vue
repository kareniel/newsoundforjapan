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
      <div class="subtitle">
        {{ $t('index.'+powering) }}
      </div>
      <h2>NEXT EVENT: May 5-6 2018 in Fumotoppara Camping Grounds</h2>
      <img src="~/assets/events/teminite.png" alt="May 5-6 2018 in Fumotoppara Camping Grounds"><br>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/Yx72aImMxHE" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
      <div class="subscribe">
        <div v-if="subscribed">
          Thank you. You will soon receive more information.
        </div>
        <div v-else>
          <p>
            <strong>Get free WubCoin!</strong><br>
            Enter your email address to receive free WubCoin and spam from us.
          </p>
          <input type="email" v-model="email" placeholder="Enter your email address" @keypress.enter="subscribe">
          <button @click="subscribe">OK, send me your spam</button>
        </div>
      </div>  
    </div>
    <h2>LATEST POSTS</h2>
    <p>
      4/23/2018 6:04 PM | <a href="https://steemit.com/dubstep/@buhrmi/teminite-confirmed-for-our-first-event" _target="blank">Teminite confirmed for our first event</a> by buhrmi
    </p>
    <p>
      4/18/2018 6:18 PM | <a href="https://steemit.com/japan/@buhrmi/on-may-5-come-dance-with-us-at-mount-fuji-in-japan-and-get-some-wubwubs" _target="blank">On May 5, come dance with us at Mount Fuji in Japan and get some wubwubs</a> by buhrmi
    </p>
    <p>
      4/16/2018 5:31 PM | <a href="https://steemit.com/wub/@buhrmi/how-do-wubs-get-value" _target="blank">What is the value of a WUB?</a> by buhrmi
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
      <li>Issue a total of 15,000,000 wubs held by Stefan K.K. (<a target="_blank" href="https://etherscan.io/tx/0x3a51ac4aac8e948fe236aa0a050b224f17d7edda95c55c7c7348012e9c496029">completed</a>)</li>
      <li>Distribute 1,000,000 wubs to partners via airdrops. All partners will be officially announced on our homepage. (TBD)</li>
      <li>Distribute 1,000,000 wubs to the community via a faucet. (TBD)</li>
      <li>Distribute 10,000,000 wubs via an initial wub offering (IWO). (TBD)</li>
      <li>Reserve remaining 3,000,000 wubs for future use (held by Stefan K.K.)</li>
    </ul>
    <h2>TOKEN CONTRACT</h2>
    <p>
      <a href="https://etherscan.io/address/0xded90b4ed5131890809e4f6102d0a8c11a20a246#code" target="_blank">0xded90b4ed5131890809e4f6102d0a8c11a20a246</a>
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
      Shoot us a mail at <a href="mailto:support@wubcoin.com">support at wubcoin.com</a>.
    </p>
    <h2>QUOTES</h2>
    <p><i>"This is either the stupidest or most amazing thing ever"</i></p>
  </div>
</template>


<script>
export default {
  data() {
    return {
      subscribed: false,
      email: ''
    }
  },
  created() {
    this.powering = 'powering' + Math.floor(Math.random()*8+1)
  },
  methods: {
    async subscribe() {
      await this.$axios.post('/subscribe', {email: this.email, lang: this.$store.state.locale})
      this.subscribed = true
    }
  }
}
</script>


<style lang="scss">
.subscribe {
  background: rgba(255,255,255,0.1);
  padding: 20px;
  font-size: 16px;
  width: 72%;
  margin: 0 auto;
  margin-bottom: 40px;
  margin-top: 30px;
  input {
    border: none;
    background: rgba(255,255,255,1);
    padding-left: 20px;
    height: 38px;
    font-size: 16px;
    width: 50%;
    margin-top: 20px;
  }
  button {
    font-size: 16px;
    padding: 0 12px;
    height: 38px;
    border: 1px solid #aaa;
    background: #eee;
  }
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
    padding-top: 120px;
    font-size: 60px;
  }
  h2 {
    margin-top: 60px;
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
