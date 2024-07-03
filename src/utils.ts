import type { IListens, IItemContent } from '@/views/aboutView/types'
export const handleOn = (item: IItemContent): IItemContent => {
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
