import { useLocation } from "wouter-preact";

export default function Link({ to, replace = false, children, ...props }) {
  const [, navigate] = useLocation();

  const handleClick = (e) => {
    // 1. 如果用户传入了自定义的 onClick，先执行用户的逻辑
    if (props.onClick) {
      props.onClick(e);
    }

    // 2. 如果事件已经被阻止（比如用户的 onClick 里调用了 e.preventDefault()），则不再处理路由
    if (e.defaultPrevented) {
      return;
    }

    // 3. 判断是否为外部链接 (http://, https://, mailto: 等)
    // 外部链接或者非同源链接，应该让 <a> 标签执行默认行为，直接跳转并刷新页面
    const isExternalLink = 
      typeof to === "string" && (to.startsWith("http://") || to.startsWith("https://") || to.startsWith("mailto:"));

    if (isExternalLink) {
      return; // 不阻止默认行为，让浏览器原生跳转
    }

    // 4. 阻止 <a> 标签的默认跳转行为（防止页面刷新）
    e.preventDefault();

    // 5. 使用 wouter 的 navigate 进行路由跳转
    navigate(to, { replace });
  };

  return (
    <a href={to} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
