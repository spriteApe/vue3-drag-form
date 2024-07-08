import type { IItem } from './types'
const options1 = [
  {
    value: 'jack',
    label: 'Jack'
  },
  {
    value: 'lucy',
    label: 'Lucy'
  },
  {
    value: 'disabled',
    label: 'Disabled',
    disabled: true
  },
  {
    value: 'yiminghe',
    label: 'Yiminghe'
  }
]
export const componentList: IItem[] = [
  {
    title: '按钮',
    component: 'a-button',
    width: 200,
    slot: '默认按钮',
    componentProps: {
      type: 'primary'
    },
    //     // 是否隐藏
    //     hidden: false,
    // // 组件显隐规则
    // hiddenRules: [],
    // // 是否必选
    required: false
    // // 必选提示
    // message: "数据缺失",
    // // 组件校验规则
    // validateRules: []
  },
  {
    title: '输入框',
    component: 'a-input',
    required: true,
    componentProps: {
      placeholder: '请输入内容',
      showCount: true
    }
  },
  {
    title: '开关',
    component: 'a-switch',
    componentProps: {
      checked: true
    }
  },
  {
    title: '选择器',
    component: 'a-select',
    componentProps: {
      placeholder: '请选择内容',
      options: options1
    }
  }
]
