<template>
    <a-table class="dir" :dataSource="files" :columns="columns" :pagination="{ pageSize: 20 }" bordered>
        <template #bodyCell="{ column, text, record }">

            <template v-if="column.key === 'name'">
                <a @click="openFile(record)">
                    <a-tooltip >
                        <img class="icon" :src="record.icon" style="float: left"/>
                        <div class="file-name">
                            {{ text }}
                        </div>
                    </a-tooltip>
                </a>
            </template>
            <template v-else-if="column.key === 'size'">
                <template v-if="record.is_dir === true">
                        {{ column.key }}
                </template>
            </template>

        </template>
    </a-table>
</template>

<script>
import { defineComponent, onMounted, watch, ref } from 'vue'

const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name', slots: { customRender: 'bodyCell' } },
    { title: 'Size', dataIndex: 'size', key: 'size' },
    { title: 'Creation time', dataIndex: 'time', key: 'time' }
]

const files = ref([])

export default defineComponent({
    name: 'DirectoryViewer',
    components: {
    },
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
        onMounted(() => {
            ;
        })
        return {
            columns, openFile
        }
    }
})
</script>

<style scoped>
.file-icon {
    margin-right: 10px;
}
.icon {
    width: 30px;
    height: 30px;
    margin-right: 10px;
}
.file-name {
    max-width:  240px;
    word-wrap: break-word;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
