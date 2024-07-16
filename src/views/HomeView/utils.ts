import type { IListens, IItem, IFormProps, IExportAndImportJSON } from './types'
import { omit } from 'lodash-es'
import { EFormLabelAlign, EFormLayout } from './types'
export const handleOn = <T extends IItem = IItem>(item: T) => {
  const { componentProps = {}, on = {} } = item
  const listens = Object.keys(on).reduce((pre, key) => {
    const value = on[key]
    const props = `on${key.slice(0, 1).toUpperCase()}${key.slice(1)}`
    pre[props] = value
    return pre
  }, {} as IListens)
  return {
    ...omit(item, 'on'),
    componentProps: {
      ...componentProps,
      ...listens
    }
  } as T
}

export const getInitFormProps = (): IFormProps => ({
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
  layout: EFormLayout['HORIZONTAL'],
  labelAlign: EFormLabelAlign['RIGHT']
})

export const getModelKey = (component: string) => {
  if (['checkbox', 'switch'].some((item) => component.includes(item))) {
    return 'checked'
  }
  return 'value'
}
export const uploadJson = () => {
  return new Promise<IExportAndImportJSON>((resolve, reject) => {
    // 创建隐藏的文件输入元素
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.style.display = 'none'

    // 文件选择事件
    input.addEventListener('change', (event) => {
      const target = event.target as HTMLInputElement
      if (target.files?.length) {
        const file = target.files[0]
        const reader = new FileReader()
        reader.onload = function (e) {
          try {
            const json = JSON.parse(e.target?.result as string)
            resolve(json)
          } catch (error) {
            console.error('Error parsing JSON:', error)
            reject(error)
          }
        }
        reader.onerror = reject
        reader.readAsText(file)
      }
    })

    // 将文件输入元素添加到文档中
    document.body.appendChild(input)

    // 触发文件选择对话框
    input.click()

    // 移除文件输入元素（选择文件后或取消选择后）
    input.addEventListener('change', () => {
      document.body.removeChild(input)
    })
  })
}

export const downloadJson = (data: IExportAndImportJSON) => {
  // 2. 创建 Blob 对象
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })

  // 3. 创建 URL 对象
  const url = URL.createObjectURL(blob)

  // 4. 创建下载链接
  const a = document.createElement('a')
  a.href = url
  a.download = 'data.json' // 设置下载文件的文件名
  a.style.display = 'none' // 隐藏链接
  document.body.appendChild(a) // 将链接添加到文档中
  a.click() // 触发点击事件
  document.body.removeChild(a) // 移除链接
  URL.revokeObjectURL(url) // 释放 URL 对象
}
