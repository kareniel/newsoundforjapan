<template>
  <div v-if="$store.state.user" class="wrapper">
    <h1>Profile</h1>
    <label>Wallet Address</label>
    <input disabled :value="$store.state.address">
    <label>Profile Name</label>
    <input type="string" placeholder="e.g.: Wubbster" :value="$store.state.user.display_name" @input="user.display_name = $event.target.value">
    <label>Profile Image</label>
    <img v-if="$store.state.user.profile_image" class="profile_image" :src="'/'+$store.state.user.profile_image.path">
    <dropzone id="dz" ref="dz" :options="options" :destroyDropzone="true"></dropzone>
    <label>Real Name</label>
    <input type="string" placeholder="e.g.: Mr. Wub" :value="$store.state.user.real_name" @input="user.real_name = $event.target.value">
    <label>Email Address</label>
    <input type="email" placeholder="e.g.: email@wubcoin.com" :value="$store.state.user.email" @input="user.email = $event.target.value">
    <label>Website</label>
    <input type="website" placeholder="e.g.: https://wubcoin.com" :value="$store.state.user.website" @input="user.website = $event.target.value">
    <button class="button" data-style="slide-down" @click="$store.dispatch('saveUser', {user, $router})">Save changes</button>
    <nuxt-link :to="'/profiles/'+$store.state.address">Back to profile</nuxt-link>
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
        image_id: this.$store.state.user.image_id,
        website: this.$store.state.user.website
      },
      options: {
        url: "/api/uploads",
        success: this.fileUploaded,
        acceptedFiles: 'image/*',
        maxFiles: 1,
        addRemoveLinks: true,
        headers: {
          Authorization: process.env.VUE_ENV == 'client' ? localStorage.getItem('authorization') : ''
        } 
      }
    }
  },
  mounted() {
    let dz = this.$refs.dz.dropzone
    dz.on('success', this.fileUploaded)
    dz.on('removedfile', this.removedfile)
    if (this.$store.state.user.image) {
      let mockFile = { name: "filename", size: 1234, upload_id: this.user.image_id }
      dz.emit("addedfile", mockFile)
      dz.emit("thumbnail", mockFile, "/"+this.$store.state.user.image.path)
    }
  },
  methods: {
    fileUploaded(file, res) {
      this.user.image_id = res[0]
    },
    removedfile() {
      this.user.image_id = null
    }
  }
}
</script>

<style lang="scss">
button {
  margin-top: 22px;
  margin-right: 22px;
}
.dz-image-preview {
  width: 200px;
  height: 200px;
  img {
    width: 200px;
  }
}
.profile_image {
  width: 100px;
  height: 100px;
  border-radius: 50px;
}
.vue-dropzone:hover, .dropzone {
  background-color: #282c34;
  border: none;
}
</style>

