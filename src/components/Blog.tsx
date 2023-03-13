import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router";
import useNprogress from "@/hooks/useNprogress";
import { getBlogInfo } from "@/api/blog";
import Markdown from "./Markdown";
import BlogSkeleton from "./BlogSkeleton";

export default function Blog() {
  const [loading, changeLoading] = useState(true);
  const [error, setError] = useState(false);
  const [md, setMd] = useState("");
  const location = useLocation();
  useNprogress([location.pathname]); // 仅在 pathname 更改时显示过渡

  const fetchDoc = useCallback((docPath: string) => {
    docPath = decodeURIComponent(docPath);
    setError(false);
    changeLoading(true);
    getBlogInfo(decodeURIComponent(docPath))
      .then((response) => {
        setMd(response.data.doc.contents);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      })
      .finally(() => {
        changeLoading(false);
      });
  }, []);

  useEffect(() => {
    //? 取消请求
    // const abort = new AbortController();
    const title = location.pathname.match(/(?<=\/)[^/]+$/)?.[0];
    if (title) {
      document.title = decodeURIComponent(`${title} ~ ${SITE_TITLE}`);
    } else {
      document.title = decodeURIComponent(SITE_TITLE);
    }
    fetchDoc(location.pathname);
    return () => {
      console.log("changed");
      // if (!loading) {
      //   abort.abort();
      // }
    };
  }, [location.pathname]);
  return (
    <div id="doc">
      {loading ? (
        <BlogSkeleton />
      ) : error ? (
        <div>
          获取内容失败，
          <span onClick={() => fetchDoc(location.pathname)}>点击这里重试</span>
        </div>
      ) : (
        <Markdown text={md} />
      )}
    </div>
  );
}
