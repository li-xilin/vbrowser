import axios from 'axios'
import { renderAsync } from 'docx-preview'

const api = axios.create({
  baseURL: '/api'
})

function formatDate (val) {
    const date = new Date(val)
    const Y = date.getFullYear() + '-'
    const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    const D = date.getDate() + ' '
    const h = date.getHours() + ':'
    const m = date.getMinutes()
    return Y + M + D + h + m
}

function mimeToType (mime) {
  switch (mime) {
    case 'text/plain':
    case 'text/x-c':
    case 'text/x-h':
    case 'text/x-cpp':
    case 'text/x-python':
    case 'text/x-go':
      return 'text'
    case 'video/mp4':
      return 'video'
    case 'audio/mpeg':
    case 'audio/x-ms-wma':
    case 'audio/x-ms-wm':
    case 'audio/midi':
      return 'audio'
    case 'image/x-citrix-jpeg':
    case 'image/x-png':
    case 'image/tiff':
    case 'image/webp':
    case 'image/x-xbitmap':
      return 'image'
    case 'application/pdf':
      return 'pdf'
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      return 'docx'
    default:
      return undefined
  }
}

const listDirectory = async (where) => {
    const data = await api.get('/list?where=' + where)
    const arr = data.data.files.map((item, idx) => {
        return {
            key: idx,
            name: item.name,
            size: item.size,
            time: formatDate(item.time),
            is_dir: item.is_dir,
            type: item.is_dir ? 'folder' : mimeToType(item.mime),
            mime: item.mime
        }
    })
    return { dir: data.data.dir, files: arr }
}
const getText = async (where) => {
  const data = await api.get('/preview?where=' + where)
  const text = data.data
  return text
}

const docxRender = async (where, id) => {
  const { data } = await api.get('/preview?where=' + where, { responseType: 'arraybuffer' })
  renderAsync(data, document.querySelector(id))
}
export default {
  listDirectory, getText, api, docxRender
}
