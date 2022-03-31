<template>
  <div>
    <vue3VideoPlay v-bind="options" />
  </div>
</template>

<script>
import { defineComponent, reactive, watch, ref } from 'vue'

const srcUrl = ref()

const options = reactive({
  width: '800px',
  height: '450px',
  color: '#409eff',
  title: '',
  muted: false,
  webFullScreen: false,
  speedRate: ['0.75', '1.0', '1.25', '1.5', '2.0'],
  autoPlay: false,
  loop: false,
  mirror: false,
  ligthOff: false,
  volume: 0.3,
  control: true,
  src: '',
  controlBtns: [
    'audioTrack',
    'quality',
    'speedRate',
    'volume',
    'setting',
    'pip',
    'pageFullScreen',
    'fullScreen'
  ]
})

export default defineComponent({
    name: 'VideoPlayer',
    props: {
      path: { type: String }
    },
    setup (props) {
      watch(() => props.path, (dst, src) => {
        options.src = '/api/preview?where=' + dst
        // srcUrl.value = '/api/preview?where=' + dst
      })
      return { options, srcUrl }
    }
})
</script>

<style scoped>
</style>
