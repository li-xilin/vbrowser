<template>
  <div class="home">
    <file-browser />
  </div>
</template>

<script>
// @ is an alias to /src

import FileBrowser from '@/components/FileBrowser'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'HomeView',
  components: {
    FileBrowser
  },
  setup () {
    onMounted(() => {
      console.log('HomeViewer ' + useRouter().currentRoute.value.query.where)
    })
  }
}
</script>
