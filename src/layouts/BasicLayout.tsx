import {
  MouseEventHandler,
  useCallback,
  useEffect,
  PropsWithChildren,
  useState,
} from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { acitons } from "@/store";

import "./BasicLayout.scss";

interface BasicLayoutProps extends PropsWithChildren {
  head: React.ReactNode;
  aside: React.ReactNode;
}

const initialaHeaderHeight = 60;

export default function BasicLayout(props: BasicLayoutProps) {
  const width = useAppSelector((state) => state.setting.asideWidth);
  const dispatch = useAppDispatch();
  const [scrollTop, changeScrollTop] = useState(
    initialaHeaderHeight - window.scrollY
  );
  const { head, aside } = props;
  const handleResize = useCallback((offset: number) => {
    dispatch(acitons.setting.resizeAside(offset));
  }, []);
  useEffect(() => {
    window.addEventListener("scroll", function (e) {
      changeScrollTop(Math.max(initialaHeaderHeight - window.scrollY, 0));
    });
  }, []);
  return (
    <div className="s-blog-basic_layout">
      <div className="s-blog-basic_layout_head">{head}</div>
      <div
        className="s-blog-basic_layout_aside"
        style={{ width: width, top: scrollTop }}
      >
        {aside}
        <Resizer onResize={handleResize} />
      </div>
      <div
        className="s-blog-basic_layout_main"
        style={{ marginLeft: `${width}px` }}
      >
        {props.children}
      </div>
    </div>
  );
}

interface ResizerProp {
  onResize(offset: number): void;
}
function Resizer(props: ResizerProp) {
  const { onResize } = props;
  let flag = false;
  const handleResizeStart: MouseEventHandler = useCallback(function () {
    flag = true;
    console.log("start");
    window.addEventListener("mousemove", handleResize);
    window.addEventListener("mouseup", handleResizeEnd);
    document.documentElement.style.userSelect = "none";
  }, []);
  const handleResize = useCallback(function (e: MouseEvent) {
    if (flag === false) return;
    const { movementX } = e;
    onResize(movementX);
  }, []);
  const handleResizeEnd = useCallback(function () {
    console.log("end");
    flag = false;
    window.removeEventListener("mousemove", handleResize);
    window.removeEventListener("mouseup", handleResizeEnd);
    document.documentElement.style.userSelect = "";
  }, []);
  return (
    <div
      className="s-blog-basic_layout_aside_resizer"
      onMouseDown={handleResizeStart}
    ></div>
  );
}
