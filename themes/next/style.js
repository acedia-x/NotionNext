/* eslint-disable react/no-unknown-property */
/**
 * 此处样式只对当前主题生效
 * 此处不支持tailwindCSS的 @apply 语法
 * @returns
 */
const Style = () => {
  return (
    <style jsx global>{`
      // 底色
      body {
        background-color: #eeedee;
      }
      .dark body {
        background-color: black;
      }

      // 菜单下划线动画
      #theme-next .menu-link {
        text-decoration: none;
        background-image: linear-gradient(#4e80ee, #4e80ee);
        background-repeat: no-repeat;
        background-position: bottom center;
        background-size: 0 2px;
        transition: background-size 100ms ease-in-out;
      }
      #theme-next .menu-link:hover {
        background-size: 100% 2px;
        color: #4e80ee;
      }
      
      // 解决白天模式文字不清晰问题 - 更精确的选择器
      #theme-next {
        color: #262626; // 使用更深的颜色确保对比度
      }
      
      .dark #theme-next {
        color: #e5e5e5; // 深色模式下使用较浅的颜色
      }
      
      // 特定元素颜色优化
      #theme-next .title,
      #theme-next h1,
      #theme-next h2,
      #theme-next h3,
      #theme-next h4,
      #theme-next h5,
      #theme-next h6,
      #theme-next .subtitle,
      #theme-next .description {
        color: #262626; // 标题和描述使用更深的颜色
      }
      
      .dark #theme-next .title,
      .dark #theme-next h1,
      .dark #theme-next h2,
      .dark #theme-next h3,
      .dark #theme-next h4,
      .dark #theme-next h5,
      .dark #theme-next h6,
      .dark #theme-next .subtitle,
      .dark #theme-next .description {
        color: #e5e5e5; // 深色模式下使用较浅的颜色
      }
      
      // 文本内容区域
      #theme-next .content,
      #theme-next p,
      #theme-next span,
      #theme-next div:not(.aplayer *) {
        color: #404040; // 内容文字使用稍浅但依然清晰的颜色
      }
      
      .dark #theme-next .content,
      .dark #theme-next p,
      .dark #theme-next span,
      .dark #theme-next div:not(.aplayer *) {
        color: #d4d4d4; // 深色模式下使用较浅的内容文字颜色
      }
    `}</style>
  )
}

export { Style }