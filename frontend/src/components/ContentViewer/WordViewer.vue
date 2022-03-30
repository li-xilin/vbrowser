<template>
  This is a word
  <div id="doc"></div>
</template>
<script>
  import { defineComponent, onMounted, watch } from 'vue'
  import api from '@/api/index'
  export default defineComponent({
    name: 'WordViewer',
    props: {
      path: { type: String }
    },
    setup (props) {
      onMounted(() => {
        watch(() => props.path, (newPath, oldPath) => {
          console.log('watch :' + newPath)
          api.docxRender(newPath, '#doc').then(() => {
          })
        }, { immediate: true })
      })
      // eslint-disable-next-line vue/no-dupe-keys
      return { }
    }
  })
</script>
