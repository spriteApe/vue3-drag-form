import { handleOn, getInitFormProps } from './utils'
import { v4 as uuidv4 } from 'uuid'
import { cloneDeep } from 'lodash-es'
import type {
  IConfigList,
  IFormProps,
  IFormState,
  IItemContent,
  IItem,
  IActiveComponent
} from './types'
import type { Ref } from 'vue'
const getModelKey = (component: string) => {
  if (['checkbox', 'switch'].some((item) => component.includes(item))) {
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

  const updateConfigList = (item?: IItemContent) => {
    if (!item) return (configList.value = [])
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
    item.required = item.required ?? false
    const requiredComponent = getComponent(
      {
        component: 'switch',
        title: '必填'
      },
      item,
      'required'
    )
    res.push(titleComponent, gridComponent, requiredComponent)
    if (item.width !== undefined) {
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

    if (item.slot !== undefined) {
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
    if (placeholder !== undefined) {
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
    if (showCount !== undefined) {
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

const activeComponentKey = Symbol('activeComponent')
type IActiveComponentKeyRef = Ref<IActiveComponent>
export const useProvideActiveComponent = (data: IActiveComponentKeyRef) => {
  provide(activeComponentKey, data)
}
export const useInjectActiveComponent = (data: IActiveComponentKeyRef = ref(null)) => {
  return inject(activeComponentKey, data) ?? data
}

export const useItemContent = (item: IItem, formState: IFormState): IItemContent => {
  const itemClone = cloneDeep(item)
  const { component, componentProps = {}, on = {} } = itemClone
  const id = uuidv4()
  const modelKey = getModelKey(component)
  const valRef = ref(undefined)
  const updateModelKey = 'update:' + modelKey
  const itemContent = {
    ...itemClone,
    id,
    span: 24,
    componentProps: {
      ...componentProps,
      [modelKey]: valRef
    },
    on: {
      ...on,
      [updateModelKey]: (val: any) => {
        formState[id] = val
        valRef.value = val
        if (itemClone.on?.[updateModelKey]) {
          itemClone.on[updateModelKey](val)
        }
      }
    }
  }
  return reactive(handleOn(itemContent) as IItemContent)
}

const previewKey = Symbol('preview')
export const useProvidePreview = (data: boolean) => {
  provide(previewKey, data)
}
export const useInjectPreview = (data = false) => {
  return inject(previewKey, data) ?? data
}
