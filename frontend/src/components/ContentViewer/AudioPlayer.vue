<template>
    This is audio player
   <VueAudioPlayer v-model:option="options" @pause="pause" />
</template>

<script>
import { defineComponent, ref, onMounted, onBeforeUnmount, watch } from 'vue'
import VueAudioPlayer from 'vue3-audio-player'
import 'vue3-audio-player/dist/style.css'
import api from '@/api'

const options = ref()

function pause () {
}

export default defineComponent({
    name: 'AudioPlayer',
    components: {
        VueAudioPlayer
    },
    props: {
      path: { type: String }
    },
    setup (props) {
      onMounted(() => {
        ;
      })
      onBeforeUnmount(() => {
          console.log('hello')
          console.log(VueAudioPlayer)
      })
      watch(() => props.path, (newPath, oldPath) => {
            console.log('audio1 +' + newPath)
            options.value = {
                src: api.api.defaults.baseURL + '/preview?where=' + newPath,
                title: newPath
            }
      }, { immediate: true })
      return { options, pause }
    }
})
</script>

<style scoped>
</style>
