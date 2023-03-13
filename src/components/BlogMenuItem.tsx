import {
  useContext,
  useState,
  useEffect,
  memo,
  useRef,
  useLayoutEffect,
} from "react";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import blogMenuContext, { useOpenedFolders } from "@/context/blogs";
import { getMenuList } from "@/api/menus";
import Loading from "./Loading";
import "./BlogMenuItem.scss";
import IconFile from "@/assets/svg/icon-file.svg";
import IconFolder from "@/assets/svg/icon-folder.svg";
import IconArrowRight from "@/assets/svg/icon-arrow-right.svg";

interface BlogMenuItemProps {
  path: string;
  name?: string;
}

function BlogMenuItem(props: BlogMenuItemProps) {
  const { path, name } = props;
  const {
    menus,
    openedMenus,
    update: updateMenus,
  } = useContext(blogMenuContext);
  const isRootDir = path === "/";
  const [isOpenSubMenu, setSubMenuOpenStatus] = useState(
    isRootDir ? true : false
  );
  const [isLoadSubMenu, setLoadSubMenuStatus] = useState(false);
  const location = useLocation();
  useLayoutEffect(() => {
    // 在组件挂载时，检查当前 location 是否和当前目录匹配
    // 或者当前目录是否在打开的目录集合中
    // 如果是，则打开当前目录
    const pathname = decodeURIComponent(location.pathname);
    if (
      (!isRootDir && pathname.startsWith(`${path}/`)) ||
      openedMenus.has(path)
    ) {
      setSubMenuOpenStatus(true);
    }
  }, []);
  const [errors, changeErrors] = useState(false);
  useEffect(() => {
    if (isOpenSubMenu && !isLoadSubMenu) {
      if (!menus.has(path) && !errors) {
        setLoadSubMenuStatus(true);
        getMenuList(path)
          .then((result) => {
            const { path: _path } = result.data;
            updateMenus(path, _path);
          })
          .catch((err) => {
            err;
            changeErrors(true);
          })
          .finally(() => {
            setLoadSubMenuStatus(false);
          });
      }
    }
  }, [isOpenSubMenu, isLoadSubMenu, errors]);

  useOpenedFolders(path, isOpenSubMenu);

  return (
    <>
      {!isRootDir && (
        <div
          className="folder"
          onClick={() => setSubMenuOpenStatus(!isOpenSubMenu)}
        >
          <IconArrowRight
            className={classNames("folder-open-flag", isOpenSubMenu && "open")}
          />
          <IconFolder />
          <span className="text">{name}</span>
        </div>
      )}
      {/* <Loading /> */}
      {isLoadSubMenu ? (
        <Loading />
      ) : errors ? (
        <div onClick={() => changeErrors(false)}>加载失败，点击重试</div>
      ) : (
        isOpenSubMenu && <SubMenu path={path} menus={menus} />
      )}
    </>
  );
}

interface SubMenuProps {
  path: string;
  menus: Map<string, Menu>;
}

function SubMenu(props: SubMenuProps) {
  const { path, menus } = props;
  const menu = menus.get(path);
  if (!menu) return null;
  const pathname = decodeURIComponent(location.pathname);
  const { subPaths, subDocs, fullPath } = menu;
  const dir = fullPath === "/" ? "/" : fullPath + "/";
  return (
    <ul className={classNames("s-blog-menu-list", path === "/" && "root")}>
      {subPaths.map((_path) => (
        <li key={dir + _path}>
          <BlogMenuItem path={dir + _path} name={_path} />
        </li>
      ))}
      {subDocs.map((_doc) => (
        <li key={dir + _doc}>
          <Link
            to={dir + _doc}
            className={classNames(
              "link-doc",
              pathname === dir + _doc && "active"
            )}
          >
            <IconFile />
            <span className="text">{_doc}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default memo(BlogMenuItem);
