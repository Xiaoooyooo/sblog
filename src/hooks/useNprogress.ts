import { useEffect, useLayoutEffect } from "react";
import nProgress from "nprogress";
import "nprogress/nprogress.css";

nProgress.configure({ showSpinner: false });
/**
 * 在路由切换时显示 loading
 * @param deps 依赖项
 */
export default function useNprogress(deps: unknown[]) {
  useLayoutEffect(() => {
    nProgress.start();
  }, deps);
  useEffect(() => {
    nProgress.done();
  }, deps);
}
