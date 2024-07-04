import mitt, { type Emitter } from 'mitt'
import type { IItemContent } from './types'
type Events = {
  foo: string
  'update:configList': IItemContent
}

export const emitter: Emitter<Events> = mitt<Events>()
