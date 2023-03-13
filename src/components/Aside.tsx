import { memo } from "react";
import BlogMenuItem from "./BlogMenuItem";
import blogMenuContext, { defaultMenuContextValue } from "@/context/blogs";
import "./Aside.scss";

function MainAside() {
  return (
    <blogMenuContext.Provider value={defaultMenuContextValue}>
      <div className="s-blog-aside-menu">
        <BlogMenuItem path="/" />
      </div>
    </blogMenuContext.Provider>
  );
}

export default memo(MainAside);
