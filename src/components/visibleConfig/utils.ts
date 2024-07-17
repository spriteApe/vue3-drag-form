import type { ICondition, IRight } from './types'
import { ECondition, EType } from './types'

export const getCondition = (): IRight => ({
  type: EType['CONDITION']
})
export const getConditionGroup = (): IRight => ({
  type: EType['CONDITION_GROUP'],
  conditionGroup: getVisibleConfig()
})
export const getVisibleConfig = (): ICondition => ({
  left: ECondition['AND'],
  right: [getCondition()]
})
