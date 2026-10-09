import Link from "@com/link";
import style from "./index.module.css";

// 使用 import.meta.glob 加载模块和配置
const modules = import.meta.glob("./**/index.jsx", {
  import: "default",
  eager: true,
});

const modConfigs = import.meta.glob("./**/config.js", {
  import: "default",
  eager: true,
});

// 提取函数来处理文件路径替换逻辑
const getPathFromFileName = (fileName, suffix) => {
  return `/${fileName.replace(
    new RegExp(`\\.\\/|\\/${suffix}`, "g"),
    ""
  )}`;
};

// 提取函数来获取模块配置
const getModuleConfigs = (modConfigs) => {
  const configs = {};
  Object.keys(modConfigs).forEach((item) => {
    const path = getPathFromFileName(item, "config.js");
    configs[path] = modConfigs[item];
  });
  return configs;
};

// 提取函数来生成路由配置
const generateRoutes = (modules, configs) => {
  return Object.keys(modules).map((item) => {
    const path = getPathFromFileName(item, "index.jsx");
    let title = getPathFromFileName(item, "index.jsx").replace("/", "");
    title = configs[path]?.title || title;
    const Comp = modules[item];
		const icon=configs[path]?.icon
    return { title, path, Comp ,icon};
  });
};

// 获取模块配置
const configs = getModuleConfigs(modConfigs);

// 生成路由配置
const routes = generateRoutes(modules, configs);

function Home() {
  // 提前过滤好路由，避免在渲染中写过多逻辑
  const visibleRoutes = routes.filter((v) => v.title?.lastIndexOf("/") <= 0);

  return (
    <div className={style.container}>
      <header className={style.header}>
        <h1 className={style.title}>导航中心</h1>
        <p className={style.subtitle}>选择一个模块开始探索</p>
      </header>
      
      <main className={style.grid}>
        {visibleRoutes.map((item) => (
          <Link className={style.cardLink} key={item.title} to={item.path}>
            <div className={style.card}>
              {/* 可以根据需要添加图标，这里用首字母作为视觉锚点 */}
              <div className={style.cardIcon}>
                {item.icon?item.icon:( item.title?.charAt(0)?.toUpperCase() || "N")}
              </div>
              <div className={style.cardTitle}>{item.title}</div>
              <div className={style.cardArrow}>→</div>
            </div>
          </Link>
        ))}
      </main>
      
      <footer className={style.footer}>
        <p>Powered by CodeGeeX</p>
      </footer>
    </div>
  );
}

export default Home;
