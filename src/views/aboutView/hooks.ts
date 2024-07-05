import { handleOn, getInitFormProps } from './utils'
import { v4 as uuidv4 } from 'uuid'
import type { IConfigList, IFormProps, IFormState, IItemContent, IItem } from './types'
import type { Ref } from 'vue'
const getModelKey = (component: string) => {
  if (['checkbox', 'switch'].includes(component)) {
    return 'checked'
  }
  return 'value'
}

function toNestedRef(obj: Record<string, any>, path: string) {
  const keys = path.split('.')
  const lastKey = keys.pop()!
  const parent = keys.reduce((acc, key) => acc[key], obj)
  const nestedRef = ref(parent[lastKey])
  watch(nestedRef, (newValue) => {
    parent[lastKey] = newValue
  })
  watch(
    () => parent[lastKey],
    (newValue) => {
      nestedRef.value = newValue
    }
  )
  return nestedRef
}
const getComponent = (option: IItem, obj: Record<string, any>, key: string) => {
  // const dataRef = toRef(obj, key)
  const dataRef = toNestedRef(obj, key)
  const { component, componentProps = {}, on = {} } = option
  const modelKey = getModelKey(component)
  const updateModelKey = 'update:' + modelKey
  return {
    ...option,
    id: uuidv4(),
    component: 'a-' + component,
    componentProps: {
      ...componentProps,
      [modelKey]: dataRef
    },
    on: {
      ...on,
      [updateModelKey]: (val: number | string) => {
        dataRef.value = val
        if (option.on?.[updateModelKey]) {
          option.on[updateModelKey](val)
        }
      }
    }
  }
}
export const useCompileFormConfigList = (formProps: IFormProps) => {
  const res: IConfigList[] = []
  const widthComponent = getComponent(
    {
      component: 'slider',
      title: '宽度',
      componentProps: {
        min: 1,
        max: 24
      }
    },
    formProps,
    'labelCol.span'
  )
  const wrapperColSpanComponent = getComponent(
    {
      component: 'slider',
      title: 'wrapperCol',
      componentProps: {
        min: 1,
        max: 24
      }
    },
    formProps,
    'wrapperCol.span'
  )
  const layoutComponent = getComponent(
    {
      component: 'select',
      title: 'layout',
      componentProps: {
        options: [
          {
            value: 'horizontal',
            label: 'horizontal'
          },
          {
            value: 'vertical',
            label: 'vertical'
          },
          {
            value: 'inline',
            label: 'inline'
          }
        ]
      }
    },
    formProps,
    'layout'
  )
  res.push(widthComponent, wrapperColSpanComponent, layoutComponent)

  return ref(res.map((item) => handleOn(item) as IConfigList))
}
export const useCompileConfigList = () => {
  const configList = ref<IConfigList[]>([])

  const updateConfigList = (item: IItemContent) => {
    console.log('updateConfigList', item)
    const res: IConfigList[] = []
    const titleComponent = getComponent(
      {
        component: 'input',
        title: '标题',
        componentProps: {
          placeholder: '请输入'
        }
      },
      item,
      'title'
    )
    const gridComponent = getComponent(
      {
        component: 'slider',
        title: '栅格',
        componentProps: {
          min: 1,
          max: 24
        }
      },
      item,
      'span'
    )
    res.push(titleComponent, gridComponent)
    if (item.width) {
      const widthComponent = getComponent(
        {
          component: 'slider',
          title: '宽度',
          componentProps: {
            min: 100,
            max: 500
          }
        },
        item,
        'width'
      )
      res.push(widthComponent)
    }

    if (item.slot) {
      const slotComponent = getComponent(
        {
          component: 'input',
          title: '按钮文本'
        },
        item,
        'slot'
      )
      res.push(slotComponent)
    }
    if (!item.componentProps) return
    const { placeholder, showCount } = item.componentProps
    if (placeholder) {
      const placeholderComponent = getComponent(
        {
          component: 'input',
          title: 'placeholder',
          componentProps: {
            placeholder: '请输入'
          }
        },
        item,
        'componentProps.placeholder'
      )
      res.push(placeholderComponent)
    }
    if (showCount) {
      const numberComponent = getComponent(
        {
          component: 'checkbox',
          title: '显示数字'
        },
        item,
        'componentProps.showCount'
      )
      res.push(numberComponent)
    }
    configList.value = res.map((item) => handleOn(item)) as IConfigList[]
  }
  return {
    configList,
    updateConfigList
  }
}

const formStateKey = Symbol('formState')
export const useProvideFormState = (data: IFormState) => {
  provide(formStateKey, data)
}
export const useInjectFormState = (data: IFormState = {}) => {
  return inject(formStateKey, data) ?? data
}
const formPropsKey = Symbol('formProps')
export const useProvideFormProps = (data: IFormProps) => {
  provide(formPropsKey, data)
}
export const useInjectFormProps = (data = getInitFormProps()) => {
  return inject(formPropsKey, data) ?? data
}
const schemasKey = Symbol('schemas')
type ISchemasRef = Ref<IItemContent[]>
export const useProvideSchemas = (data: ISchemasRef) => {
  provide(schemasKey, data)
}
export const useInjectSchemas = (data: ISchemasRef = ref([])) => {
  return inject(schemasKey, data) ?? data
}
