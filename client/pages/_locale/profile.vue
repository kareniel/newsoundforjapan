<template>
  <div v-if="$store.state.user" class="wrapper">
    <h1>Profile</h1>
    <label>Wallet Address</label>
    <input disabled :value="$store.state.address">
    <label>Profile Name</label>
    <input type="string" placeholder="e.g.: Wubbster" :value="$store.state.user.display_name" @input="user.display_name = $event.target.value">
    <label>Profile Image</label>
    <img v-if="$store.state.user.profile_image" class="profile_image" :src="'/'+$store.state.user.profile_image.path">
    <dropzone id="foo" ref="el" :options="options" :destroyDropzone="true"></dropzone>
    <label>Real Name</label>
    <input type="string" placeholder="e.g.: Mr. Wub" :value="$store.state.user.real_name" @input="user.real_name = $event.target.value">
    <label>Email Address</label>
    <input type="email" placeholder="e.g.: email@wubcoin.com" :value="$store.state.user.email" @input="user.email = $event.target.value">
    <label>Website</label>
    <input type="website" placeholder="e.g.: https://wubcoin.com" :value="$store.state.user.website" @input="user.website = $event.target.value">
    <button class="ladda-button" data-style="slide-down" @click="$store.dispatch('saveUser', user)">Save changes</button>
    <nuxt-link :to="'/profiles/'+$store.state.address">Go to Profile</nuxt-link>
  </div>
</template>

<script>
import Dropzone from 'nuxt-dropzone'
import 'nuxt-dropzone/dropzone.css'

export default {
  middleware: 'require-user',
  components: {Dropzone},
  data() {
    return {
      user: {
        email: this.$store.state.user.email,
        display_name: this.$store.state.user.display_name,
        real_name: this.$store.state.user.real_name,
        profile_image_id: this.$store.state.user.profile_image_id,
        website: this.$store.state.user.website
      },
      options: {
        url: "/api/uploads",
        success: this.fileUploaded,
        maxFiles: 1,
        headers: {
          Authorization: process.env.VUE_ENV == 'client' ? localStorage.getItem('authorization') : ''
        } 
      }
    }
  },
  methods: {
    fileUploaded(file, res) {
      this.user.profile_image_id = res[0]
    }
  }
}
</script>

<style lang="scss">
button {
  margin-top: 22px;
  margin-right: 22px;
}
.profile_image {
  width: 100px;
  height: 100px;
  border-radius: 50px;
}
</style>

