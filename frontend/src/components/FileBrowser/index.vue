<template>
    <div style="height:30px;">
        <div class="breadcrumb">
            <router-link to="/tree"><home-outlined /></router-link> /
        </div>
        <a-breadcrumb :routes="routes" class="breadcrumb">
            <template #itemRender="{ route }">
                <span v-if="routes.indexOf(route) === routes.length - 1">
                    {{ route.breadcrumbName }}
                </span>
                <router-link v-else :to="`/tree?where=/${dirArray.slice(0, routes.indexOf(route) + 1).join('/')}`">
                    {{ route.breadcrumbName }}
                </router-link>
            </template>
        </a-breadcrumb>

        <div class='view-button'>
          <a-radio-group v-model:value="viewMode" @change="onChange">
            <a-radio-button value="list">
              List view
            </a-radio-button>
            <a-radio-button value="tile">
              Tile view
            </a-radio-button>
          </a-radio-group>
        </div>
    </div>

    <a-divider />

    <template v-if="viewMode === 'list'">
      <list-view :files="fileList" @clickItem="openFile" />
    </template>
    <template v-else-if="viewMode === 'tile'">
      <tile-view :files="fileList" @clickItem="openFile" />
    </template>
    <template v-else>
      view mode unsupported
    </template>
</template>

<script>
import { defineComponent, ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import router from '@/router'
import ListView from './ListView.vue'
import TileView from './TileView.vue'
import { HomeOutlined } from '@ant-design/icons-vue'
import api from '@/api'

const routes = ref([])
const path = ref('')
const fileList = ref()
const viewMode = ref('list')
const dirArray = ref([])

function iconUri (isDir, mime) {
    if (isDir) {
        return require('../../assets/icons/directory.png')
    }

    switch (mime) {
        case 'audio/x-aac':
        case 'audio/mpeg':
        case 'audio/x-aiff':
        case 'audio/vnd.digital-winds':
        case 'audio/x-ms-wma':
        case 'audio/x-ms-wax':
        case 'audio/midi':
            return require('../../assets/icons/audio.png')
        case 'image/x-png':
        case 'image/x-citrix-jpeg':
        case 'image/gif':
        case 'image/tiff':
            return require('../../assets/icons/image.png')
        case 'text/x-c':
        case 'text/x-cpp':
        case 'text/x-h':
            return require('../../assets/icons/c.png')
        case 'text/x-python':
            return require('../../assets/icons/python.png')
        case 'text/x-go':
            return require('../../assets/icons/go.png')
        case 'application/x-cd-image':
            return require('../../assets/icons/cdrom.png')
        case 'application/zip':
            return require('../../assets/icons/zip.png')
        case 'application/pdf':
            return require('../../assets/icons/pdf.png')
        case 'application/x-msdownload':
        case 'application/x-pie-executable':
            return require('../../assets/icons/executable.png')
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            return require('../../assets/icons/document.png')
        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
            return require('../../assets/icons/sheet.png')
        case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
            return require('../../assets/icons/ppt.png')
        case 'video/mp4':
        case 'video/avi':
            return require('../../assets/icons/video.png')
        default:
            return require('../../assets/icons/regular.png')
    }
}

function listDirectory () {
    api.listDirectory(path.value).then((data) => {
        fileList.value = data.files
        for (const i in data.files) {
            fileList.value[i].icon = iconUri(data.files[i].is_dir, data.files[i].mime)
        }

        dirArray.value = data.dir
        routes.value = data.dir.map((dir, idx) => {
            return {
                key: idx,
                path: dir,
                breadcrumbName: dir
            }
        })
    })
}

function openFile (file) {
    if (file.is_dir) {
        path.value += '/' + file.name
        router.push({ path: '/tree', query: { where: path.value } })
        listDirectory()
    } else {
        const filename = path.value + '/' + file.name
        const type = file.type
        router.push({ path: '/file', query: { where: filename, type: type } })
    }
}

function onChange () {

}

export default defineComponent({
    name: 'FileBrowser',
    components: { ListView, TileView, HomeOutlined },
    props: {
      path: {
        type: String
      }
    },
    setup (props, ctx) {
      onMounted(() => {
          const where = useRouter().currentRoute.value.query.where
          if (where === undefined) {
              path.value = ''
          } else {
              path.value = where
          }
          listDirectory()
      })
      watch(() => props.path, (dst, src) => {
        ;
      })
      return { viewMode, listDirectory, openFile, routes, onChange, fileList, dirArray }
    }
})
</script>

<style scoped>
.view-button {
  float: right;
}
.breadcrumb {
    float: left;
    margin-right: 8px;
}
</style>
