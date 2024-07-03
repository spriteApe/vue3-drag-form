export type IListens = Record<string, (...any: any[]) => void>
export type IItem = {
  title: string
  component: string
  width?: number
  slot?: string
  componentProps?: Record<string, any>
  on?: IListens
}
export type IItemContent = IItem & {
  id: string
  span: number
}
