<template>
  <div>
    <a-table :columns="columns" :data-source="tableDataSource" :pagination="false">
      <template #bodyCell="{ column, index }">
        <template v-if="column.key === 'title'">
          <a-input v-model:value="tableDataSource[index][column.key as keyof IDataSourceItem]" />
        </template>
        <template v-else-if="column.key === 'dataIndex'">
          <a-select
            v-model:value="tableDataSource[index][column.key as keyof IDataSourceItem]"
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
  </div>
</template>
<script lang="ts" setup>
import { isEmpty } from 'lodash-es'
import type { SelectProps } from 'ant-design-vue'
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
const tableDataSource = defineModel<IDataSourceItem[]>('columns', {
  required: true
})
const dataSource = defineModel<Record<string, any>[]>('dataSource', {
  required: true
})
const selectOptions = computed<SelectProps['options']>(() => {
  if (isEmpty(dataSource.value)) return []
  const first = dataSource.value[0]
  return Object.keys(first).map((key) => ({
    value: key,
    label: key
  }))
})
const handleDelete = (index: number) => {
  tableDataSource.value = tableDataSource.value.filter((_, i) => i !== index)
}
const handleAdd = () => {
  tableDataSource.value.push({
    dataIndex: '',
    title: ''
  })
}
</script>

<style lang="scss" scoped></style>
