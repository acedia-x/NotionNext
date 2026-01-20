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
      
      // 解决白天模式文字不清晰问题
      #theme-next {
        color: #333; // 确保白天模式文字清晰可见
      }
      
      .dark #theme-next {
        color: #ddd; // 深色模式下使用浅色文字
      }
      
      // 通用文字颜色设置
      #theme-next * {
        color: #333 !important;
      }
      
      .dark #theme-next * {
        color: #ddd !important;
      }
    `}</style>
  )
}

export { Style }