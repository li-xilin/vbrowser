<template>
  <pre>{{text}}</pre>
</template>

<script>
import { defineComponent, onMounted, ref, watch } from 'vue'
import api from '@/api/index'
const text = ref()
export default defineComponent({
  name: 'TextViewer',
  // components: { pdf },
  props: {
    path: { type: String }
  },
  setup (props) {
    onMounted(() => {
      watch(() => props.path, (newPath, oldPath) => {
        console.log('watch :' + newPath)
        api.getText(newPath).then((a) => {
          text.value = a
        })
      }, { immediate: true })
    })
    return { text }
  }
})
</script>

<style scoped>
pre{
  white-space: pre-wrap;
  word-wrap: break-word;
  width: 500px;
  padding: .5rem;
  border: 1px solid #d0e579;
  margin: 1rem auto;
}
</style>
