import type { IListens, IItem, IFormProps } from './types'
export const handleOn = <T extends IItem = IItem>(item: T): T => {
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

export const getInitFormProps = (): IFormProps => ({
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
  layout: 'horizontal'
})

export const getModelKey = (component: string) => {
  if (['checkbox', 'switch'].some((item) => component.includes(item))) {
    return 'checked'
  }
  return 'value'
}
