<script>
export default {
  middleware: async function({redirect, store}) {
    if (store.state.address) {
      return redirect('/profiles/'+store.state.address)
    }
    else {
      return redirect('/')
    }
  }
}
</script>
