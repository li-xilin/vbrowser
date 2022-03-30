<template>
    <a-card>
        <template v-for="(item, index) in files" :key="index">
            <a-card-grid class="card">
                <a @click="openFile(item)">
                    <a-tooltip placement="bottom">
                    <img :src="item.icon" class="icon" />
                        <div class="file-name">
                            {{item.name}}
                        </div>
                        <template #title>{{item.name}}</template>
                    </a-tooltip>
                </a>
            </a-card-grid>
        </template>
    </a-card>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'

const files = ref()

export default defineComponent({
    components: { },
    props: {
        files: {
            type: Array
        }
    },
    setup (props, ctx) {
        watch(() => props.files, (dst, src) => {
            files.value = dst
        })
        const openFile = (index) => {
            ctx.emit('clickItem', index)
        }
        return {
            openFile
        }
    }
})
</script>

<style scoped>
.card {
    width: 120px;
    height: 150px;
    text-align: center;
}
.file-name {
    word-wrap: break-word;
    white-space: normal;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    display: -webkit-box;
    text-overflow: ellipsis;
}

.icon {
    width: 50px;
    height: 50px;
}

</style>
