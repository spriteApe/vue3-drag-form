<template>
  <div>
    <a-modal v-model:open="modalOpen" title="列表管理" @ok="handleModalOk">
      <a-table :columns="columns" :data-source="tableDataSourceShow" :pagination="false">
        <template #bodyCell="{ column, index }">
          <template v-if="column.key === 'title'">
            <a-input
              v-model:value="tableDataSourceShow[index][column.key as keyof IDataSourceItem]"
            />
          </template>
          <template v-else-if="column.key === 'dataIndex'">
            <a-select
              v-model:value="tableDataSourceShow[index][column.key as keyof IDataSourceItem]"
              style="width: 120px"
              :options="selectOptions"
            ></a-select>
          </template>
          <template v-else-if="column.key === 'action'">
            <a-button type="link" @click="handleDelete(index)">删除</a-button>
          </template>
        </template>
      </a-table>
      <a-button type="primary" @click="handleAdd">添加一项</a-button>
    </a-modal>
    <a-button type="primary" @click="modalOpen = true">配置表格列表</a-button>
  </div>
</template>
<script lang="ts" setup>
import { cloneDeep, isEmpty } from 'lodash-es'
import type { SelectProps } from 'ant-design-vue'
const tableDataSource = defineModel<IDataSourceItem[]>('columns', {
  required: true
})
const dataSource = defineModel<Record<string, any>[]>('dataSource', {
  required: true
})
const modalOpen = ref<boolean>(false)
const tableDataSourceShow = ref(cloneDeep(tableDataSource.value))
watch(modalOpen, (val) => {
  if (!val) return
  tableDataSourceShow.value = cloneDeep(tableDataSource.value)
})
const handleModalOk = () => {
  tableDataSource.value = cloneDeep(tableDataSourceShow.value)
  modalOpen.value = false
}
const columns = [
  {
    title: '标题',
    key: 'title'
  },
  {
    title: 'key',
    key: 'dataIndex'
  },

  {
    title: '操作',
    key: 'action'
  }
]
type IDataSourceItem = {
  dataIndex: string
  title: string
}

const selectOptions = computed<SelectProps['options']>(() => {
  if (isEmpty(dataSource.value)) return []
  const first = dataSource.value[0]
  return Object.keys(first).map((key) => ({
    value: key,
    label: key
  }))
})
const handleDelete = (index: number) => {
  tableDataSourceShow.value = tableDataSourceShow.value.filter((_, i) => i !== index)
}
const handleAdd = () => {
  tableDataSourceShow.value.push({
    dataIndex: '',
    title: ''
  })
}
</script>

<style lang="scss" scoped></style>
