import { v4 as uuidv4 } from 'uuid'
import type { IListens, IItem, IItemContent, IConfigList, IFormProps } from './types'
export const handleOn = (item: IItem) => {
  const { componentProps = {}, on = {} } = item
  const listens = Object.keys(on).reduce((pre, key) => {
    const value = on[key]
    const props = `on${key.slice(0, 1).toUpperCase()}${key.slice(1)}`
    pre[props] = value
    return pre
  }, {} as IListens)
  return {
    ...item,
    componentProps: {
      ...componentProps,
      ...listens
    }
  }
}
export const compileConfigList = (item: IItemContent) => {
  const res: IConfigList[] = []
  const titleRef = ref(item.title)
  res.push({
    id: uuidv4(),
    component: 'a-input',
    title: '标题',
    componentProps: {
      placeholder: '请输入',
      value: titleRef
    },
    on: {
      'update:value': (val: string) => {
        item.title = val
        titleRef.value = val
      }
    }
  })
  const spanRef = ref(item.span)
  res.push({
    id: uuidv4(),
    component: 'a-slider',
    title: '栅格',
    componentProps: {
      value: spanRef,
      min: 1,
      max: 24
    },
    on: {
      'update:value': (val: number) => {
        item.span = val
        spanRef.value = val
      }
    }
  })
  if (item.width) {
    const widthRef = ref(item.width)
    res.push({
      id: uuidv4(),
      component: 'a-slider',
      title: '宽度',
      componentProps: {
        value: widthRef,
        min: 100,
        max: 500
      },
      on: {
        'update:value': (val: number) => {
          item.width = val
          widthRef.value = val
        }
      }
    })
  }

  if (item.slot) {
    const slotRef = ref(item.slot)
    res.push({
      id: uuidv4(),
      component: 'a-input',
      title: '按钮文本',
      componentProps: {
        placeholder: '请输入',
        value: slotRef
      },
      on: {
        'update:value': (val: string) => {
          item.slot = val
          slotRef.value = val
        }
      }
    })
  }
  if (!item.componentProps) return
  const { placeholder, showCount } = item.componentProps
  if (placeholder) {
    const placeholderRef = ref(item.componentProps!.placeholder)
    res.push({
      id: uuidv4(),
      component: 'a-input',
      title: 'placeholder',
      componentProps: {
        placeholder: '请输入',
        value: placeholderRef
      },
      on: {
        'update:value': (val: string) => {
          item.componentProps!.placeholder = val
          placeholderRef.value = val
        }
      }
    })
  }
  if (showCount) {
    const showCountRef = ref(item.componentProps!.showCount)
    res.push({
      id: uuidv4(),
      component: 'a-checkbox',
      title: '显示数字',
      componentProps: {
        checked: showCountRef
      },
      on: {
        'update:checked': (val: boolean) => {
          item.componentProps!.showCount = val
          showCountRef.value = val
        }
      }
    })
  }

  return res.map((item) => handleOn(item))
}

export const getInitFormProps = (): IFormProps => ({
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
  layout: 'horizontal'
})
