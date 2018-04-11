<template>
  <div class="layout">
    <div>
      <div v-if="$store.state.noWallet" class="top notification error" v-html="$t('global.noweb3')"></div>
      <div v-else-if="$store.state.walletNetwork && $store.state.network !== $store.state.walletNetwork" class="top notification error">
        Warning: Your wallet is on the wrong network. Switch over to the <strong>{{$store.state.network}}</strong> network.
      </div>
      <div v-else-if="$store.state.walletLocked" class="top notification error" v-html="$t('global.walletLocked')"></div>
    </div>
    <div class="header">
      <div class="wrapper">
        <div class="lang_links">
          <nuxt-link class="lang_link" v-if="$i18n.locale === 'en'" :to="`/ja` + $route.fullPath" active-class="none" exact>
            {{ $t('nav.japanese') }}
          </nuxt-link>
          <nuxt-link class="lang_link" v-else :to="$route.fullPath.replace(/^\/[^\/]+/, '')" active-class="none" exact>
            {{ $t('nav.english') }}
          </nuxt-link>
        </div>

        <div class="nav_area">
          <nuxt-link :to="path('/')">Home</nuxt-link>
        </div>
        <div class="user_area" >
          <div v-if="$store.state.user">
            <a @click="$store.dispatch('logout', $router)">Log out</a>
          </div>
          <div v-else class="logged_out">
          </div>
        </div>

        <div class="brand">
          WubCoin
          <!-- <nuxt-link :to="path('/')"><img src="~/assets/logo.png" alt="WubCoin" width="200"></nuxt-link> -->
          <span v-if="$store.state.network !== 'main'">{{ $store.state.network }}</span>
        </div>
      </div>
    </div>

    <div class="content">
      <nuxt/>
    </div>
    
    <div class="footer">
      <div class="wrapper">
        <!-- <nuxt-link :to="path('/')"><img src="~/assets/logo.png" alt="WubCoin" width="200"></nuxt-link> -->
        <div class="copyright">
          Copyright © <a href="https://stefan.co.jp">Stefan K.K.</a> All Rights Reserved.
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.layout {
  min-height: 100vh;
  position: relative;
}
.layout > .content {
  position: relative;
  padding-bottom: 400px;
}
.header {
  position: relative;
  margin-bottom: 50px;
  padding-top: 10px;
  height: 100px;
  //padding-bottom: 20px;
  background: #282c34;
  a {
    text-decoration: none;
    // color: #66f;
  }
}
.lang_links {
  position: absolute;
  right: 0;
  top: 10px;
  font-size: 12px;
}
.brand {
  position: absolute;
  top: 10px;
  font-size: 32px;
  font-weight: bold;
}
.right {
  float: right;
}
.nav_area {
  position: absolute;
  bottom: -1px;
  // left: 200px;
  a {
    display: inline-block;
    padding: 8px 15px;
  }
  .level1.nuxt-link-active, .nuxt-link-exact-active {
    box-shadow: inset 0 -4px 0 #F14471;
  }
}
.user_area {
  position: absolute;
  right: 0;
  bottom: -1px;
  a {
    display: inline-block;
    padding: 8px 15px;
  }
  .level1.nuxt-link-active, .nuxt-link-exact-active {
    border: 1px solid #ddd;
    border-bottom: none;
    background: #fcfcfd;
  }
}
.footer {
  position: absolute;
  width: 100%;
  bottom: 0;
  height: 350px;
  background: #282c34;
  .links {
    margin-top: 20px;
  }
  .copyright {
    padding-top: 60px;
    // text-align: center;
  }
  a {
    text-decoration: none;
    text-decoration: underline;
    &:hover {

    }
  }
}
.notification {
  text-align: center;
  padding: 15px;
  &.error {
    background: #fdd;
    border-bottom: 1px solid #fbb;
  }
  &.alert {
    background: #ffd;
    border-bottom: 1px solid #ffb;
  }
}
</style>
