import { useEffect, useRef } from "preact/hooks";
import Loading from "../loading/loading";
import style from './infinite-scroll.module.css'; 

/**
 * 无限滚动组件
 * @param {boolean} hasMore - 是否还有更多数据
 * @param {boolean} loading - 是否正在加载中
 * @param {Function} onLoadMore - 加载更多数据的回调函数
 * @param {number} [threshold=0.1] - Intersection Observer 的阈值 (0-1之间)
 * @param {string} [rootMargin='100px'] - Intersection Observer 的根边距
 * @param {JSX.Element} children - 子组件内容
 */
const InfiniteScroll = ({ 
  hasMore, 
  loading, 
  onLoadMore, 
  threshold = 0.1, 
  rootMargin = '100px',
  children 
}) => {
  const loadMoreRef = useRef(null);

  useEffect(() => {
    if (!hasMore || loading || !loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          onLoadMore();
        }
      },
      { 
        root: null, // 使用视口作为根
        rootMargin: rootMargin, // 在距离底部rootMargin时触发
        threshold: threshold // 当threshold比例的元素可见时触发
      }
    );

    observer.observe(loadMoreRef.current);

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [hasMore, loading, onLoadMore, rootMargin, threshold]);

  return (
    <>
      {children}
      {hasMore && !loading && <div ref={loadMoreRef} className={style['infinite-scroll-trigger']} />}
      {loading && (
        <div className={style['loading-state']}>
          <Loading />
        </div>
      )}
      {!hasMore && !loading && (
        <div className={style['no-more-state']}>
          <span>没有更多数据了</span>
        </div>
      )}
    </>
  );
};

export default InfiniteScroll;
