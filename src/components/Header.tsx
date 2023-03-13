import { memo } from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

function MainHead() {
  return (
    <header className="s-blog-main_header">
      <Link to="/">HOME</Link>
      <nav>this is head</nav>
    </header>
  );
}

export default memo(MainHead);
