<template>
  <div class="wrapper">
    <img v-if="user.user_image" class="user_image" :src="'/'+user.user_image.path">
    <h1>{{ user.display_name }}</h1>
    <p>{{ $route.params.id }}</p>
    <p>Reputation: UNKNOWN</p>
  </div>
</template>

<script>
export default {
  async asyncData({app, store, params}) {
    // TODO: use feathersjs for API
    let user = await app.$axios.get('/users/' + params.id)
    // let assets = await app.$axios.get('/assets?created_by_id=' + user.data.id)
    return {
      user: user.data,
      // assets: assets.data
    }
  },
  data() {
    return {

      }
  },
  methods: {
    
  }
}
</script>
    
<style lang="scss">
.work img {
  max-width: 100%;
}
.user_image {
  width: 100px;
  height: 100px;
  border-radius: 50px;
}
</style>
