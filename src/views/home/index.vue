<template>
  <div>
    <quill-editor :disabled="true" v-model="placard.placardContent" ref="placardContentEditor" :options="editorOption" />
  </div>
</template>

<script>
import placardApi from '@/api/placard'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import '@/styles/editor.css'

export default {
  components: {
    quillEditor
  },
  data () {
    return {
      placard: {},
      editorOption: {
        modules: {
          toolbar: {
            container: []
          }
        },
        placeholder: '暂无公告'
      }
    }
  },
  created () {
    this.getFirst()
  },
  methods: {
    getFirst () {
      placardApi.first().then(response => {
        this.placard = response.data
      })
    }
  }
}
</script>

<style scoped>
</style>
