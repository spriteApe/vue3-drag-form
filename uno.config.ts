import {
  defineConfig,
  presetUno,
  presetAttributify,
  // presetTypography,
  presetIcons,
  transformerVariantGroup,
  transformerAttributifyJsx,
  transformerCompileClass,
  transformerDirectives
} from 'unocss'
// import presetRemToPx from "@unocss/preset-rem-to-px";
export default defineConfig({
  //自定义规则
  // rules: [[/^bg-?([0123456789abcdef]+)$/i, ([_, rgb]) => ({ background: `#${rgb}` })]],
  //预设规则 有前两个预设可以满足95%以上的需求
  presets: [
    //此预设规则可以看Tailwind CSS、Windi CSS、Bootstrap、Tachyons官网了解相关规则
    presetUno(), //m-10 理解为 margin:10rem 或者 m-10px 理解为 margin:10px
    presetAttributify(), //归因模式 bg="blue-400 hover:blue-500 dark:blue-500 dark:hover:blue-600" 背景颜色的简写  也可以再元素上不加class 直接写属样式 例如 <div m-2 p-10 bg-000></div>
    // presetTypography(), //排版预设 详细排版看https://unocss.dev/presets/typography#colors 使用这个前两个必须
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle'
      }
    }) //css图标 支持图标看 https://icones.js.org/ 需要下载

    // 这里看个人需求是否要使用px
    // presetRemToPx({
    //   baseFontSize: 4, //基准字体大小  官方的默认预设（1单位 = 0.25rem） html的字体是16  所以这里为4
    // }), //默认unocss默认是rem 转换成 px单位
  ],
  //看个人需求添加转换器
  transformers: [
    transformerVariantGroup(),
    transformerAttributifyJsx(),
    transformerCompileClass(),
    transformerDirectives()
  ],
  //以下可以按个人需求添加
  shortcuts: {},
  layers: {},
  theme: {},
  variants: [],
  extractors: [],
  preflights: []
})
