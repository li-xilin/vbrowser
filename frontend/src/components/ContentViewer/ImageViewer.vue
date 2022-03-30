<template>
    <div class="box">
    <a-image :src=imageurl />
    </div>
</template>

<script>
import { defineComponent, ref, onMounted, watch } from 'vue'
import api from '@/api'
const imageurl = ref()
export default defineComponent({
    name: 'ImageViewer',
    components: { },
    props: {
      path: { type: String }
    },
    setup (props) {
      onMounted(() => {
        ;
      })
      watch(() => props.path, (newPath, oldPath) => {
        console.log('watch :' + newPath)
        imageurl.value = api.api.defaults.baseURL + '/preview?where=' + newPath
      }, { immediate: true })
      return { imageurl }
    }
})
</script>

<style scoped>
  .box {
    text-align: center;
  }
</style>
