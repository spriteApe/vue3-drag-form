<template>
  <div>
    <a-modal v-model:open="modalOpen" title="列表管理" @ok="handleModalOk">
      <a-table :columns="columns" :data-source="tableDataSourceShow" :pagination="false">
        <template #bodyCell="{ column, index }">
          <template v-if="column.key === 'label' || column.key === 'value'">
            <a-input
              v-model:value="tableDataSourceShow[index][column.key as keyof IDataSourceItem]"
            />
          </template>
          <template v-else-if="column.key === 'action'">
            <a-button type="link" @click="handleDelete(index)">删除</a-button>
          </template>
        </template>
      </a-table>
      <a-button type="primary" @click="handleAdd">添加一项</a-button>
    </a-modal>
    <a-button type="primary" @click="modalOpen = true">修改选项数据</a-button>
  </div>
</template>
<script lang="ts" setup>
import { cloneDeep } from 'lodash-es'

type IDataSourceItem = {
  value: string
  label: string
}
const dataSource = defineModel<IDataSourceItem[]>('value', {
  required: true
})
const modalOpen = ref<boolean>(false)
const tableDataSourceShow = ref(cloneDeep(dataSource.value))
watch(modalOpen, (val) => {
  if (!val) return
  tableDataSourceShow.value = cloneDeep(dataSource.value)
})
const handleModalOk = () => {
  dataSource.value = cloneDeep(tableDataSourceShow.value)
  modalOpen.value = false
}
const columns = [
  {
    title: '标题',
    key: 'label'
  },
  {
    title: 'key',
    key: 'value'
  },

  {
    title: '操作',
    key: 'action'
  }
]
const handleDelete = (index: number) => {
  tableDataSourceShow.value = tableDataSourceShow.value.filter((_, i) => i !== index)
}
const handleAdd = () => {
  tableDataSourceShow.value.push({
    value: '',
    label: ''
  })
}
</script>

<style lang="scss" scoped></style>
