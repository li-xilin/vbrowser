<template>
    {{ where }}
    <a-divider />
    <template v-if="type === 'text'"> <text-viewer :path=where /> </template>
    <template v-else-if="type === 'video'"> <video-player :path=where /> </template>
    <template v-else-if="type === 'audio'"> <audio-player :path=where /> </template>
    <template v-else-if="type === 'pdf'"> <pdf-viewer :path=where /> </template>
    <template v-else-if="type === 'docx'"> <word-viewer :path=where /> </template>
    <template v-else-if="type === 'image'"> <image-viewer :path=where /> </template>
    <template v-else> Download <a>{{ where }}</a> </template>
</template>

<script>
import { defineComponent, ref, onMounted, watch } from 'vue'
import VideoPlayer from '@/components/ContentViewer/VideoPlayer.vue'
import AudioPlayer from '@/components/ContentViewer/AudioPlayer.vue'
import TextViewer from '@/components/ContentViewer/TextViewer.vue'
import ImageViewer from '@/components/ContentViewer/ImageViewer.vue'
import PdfViewer from '@/components/ContentViewer/PdfViewer.vue'
import WordViewer from '@/components/ContentViewer/WordViewer'
import { useRouter } from 'vue-router'

const where = ref('')
const type = ref('')

export default defineComponent({
    name: 'ContentViewer',
    components: {
        VideoPlayer, ImageViewer, TextViewer, PdfViewer, AudioPlayer, WordViewer
    },
    setup (props) {
        onMounted(() => {
            const router = useRouter().currentRoute
            where.value = router.value.query.where
            type.value = router.value.query.type
            console.log(where.value)
            console.log(type.value)
        })
        watch(() => props.where, (dst, src) => {
        })
        return { where, type }
    }
})

</script>

<style scoped>

</style>
