import { createContext, useEffect } from "react";

const blogMenuMap = new Map<string, Menu>();
const openedMenus = new Set<string>();

export const defaultMenuContextValue = {
  menus: blogMenuMap,
  /**
   * 因为 react 组件在卸载时无法保存这个组件的状态（内存中也不行，即没有类似 vue keep-alive 的效果）
   * 所以我们需要在展开一个子目录时将它记下来，并在关闭时删除
   * 从而在关闭父目录并重新打开时恢复原样
   */
  openedMenus,
  update: function (key: string, value: Menu) {
    console.log("update", key, value);
    blogMenuMap.set(key, value);
  },
};

// 用来更新 openedMenus 的勾子
export function useOpenedFolders(path: string, dep: boolean) {
  useEffect(() => {
    if (dep) {
      openedMenus.add(path);
    } else {
      openedMenus.delete(path);
    }
  }, [dep]);
}

const blogMenuContext = createContext(defaultMenuContextValue);

export default blogMenuContext;
