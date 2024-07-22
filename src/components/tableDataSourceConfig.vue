<template>
  <div>
    <a-modal v-model:open="modalOpen" title="编辑数据" @ok="handleModalOk">
      <a-textarea
        v-model:value="textareaValue"
        placeholder="请输入"
        :auto-size="{ minRows: 2, maxRows: 5 }"
      />
    </a-modal>
    <a-button type="primary" @click="modalOpen = true">编辑数据</a-button>
  </div>
</template>
<script lang="ts" setup>
import { message } from 'ant-design-vue'
const modalOpen = ref<boolean>(false)
const dataSource = defineModel<Record<string, any>[]>('value', {
  required: true
})
const textareaValue = ref(JSON.stringify(dataSource.value))
watch(modalOpen, (val) => {
  if (!val) return
  textareaValue.value = JSON.stringify(dataSource.value)
})
const handleModalOk = () => {
  try {
    dataSource.value = JSON.parse(textareaValue.value)
  } catch (error) {
    console.error(error)
    message.error('请输入合法的json数据')
  }
  modalOpen.value = false
}
</script>

<style lang="scss" scoped></style>
