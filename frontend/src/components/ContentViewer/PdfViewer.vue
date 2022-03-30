<template>
  <div class="pdf-content">
    <VuePdf v-for="page in numOfPages" :key="page" :src="pdfurl" :page="page" :enableTextSelection="false"/>
  </div>
</template>
<script>
  import { defineComponent, onMounted, ref, watch } from 'vue'
  import { VuePdf, createLoadingTask } from 'vue3-pdfjs'
  import api from '@/api'
  const pdfurl = ref()
  export default defineComponent({
    name: 'PdfViewer',
    components: { VuePdf },
    props: {
      path: { type: String }
    },
    setup (props) {
      const numOfPages = ref(0)
      onMounted(() => {
        watch(() => props.path, (newPath) => {
          console.log('watch :' + newPath)
          pdfurl.value = api.api.defaults.baseURL + '/preview?where=' + newPath
        }, { immediate: true })
        const loadingTask = createLoadingTask(pdfurl.value)
        loadingTask.promise.then((pdf) => {
          numOfPages.value = pdf.numPages
        })
      })
      return {
        pdfurl,
        numOfPages
      }
    }
  })
</script>

<style scoped>
  .pdf-content {
    text-align: center;
  }
</style>
