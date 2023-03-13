import mock from "mockjs";
console.log("setup mock");
mock.mock("/api/md", ({ url, type, body }) => {
  return `本文未包括服务端渲染的React版本。

## 安装

安装方面没有改动，依旧是\`react\`和\`react-dom\`两个npm包。

## 挂载节点

在React 17中，挂载节点使用的是\`react-dom\`暴露的\`render\`方法，在React 18中使用的是\`react-dom/client\`下的\`createRoot\`方法。

\`\`\`jsx
// Before
import { render } from 'react-dom';
const container = document.getElementById('app');
render(<App tab="home" />, container);

// After
import { createRoot } from 'react-dom/client';
const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App tab="home" />);
\`\`\`

并且新版的\`render\`方法不再支持传入回调函数，因为它在旧版的\`Suspense\`组件中表现有些怪异。

同时，卸载节点的方法也有所变化：

\`\`\`jsx
// Before
unmountComponentAtNode(container);

// After
root.unmount();
\`\`\`

## 自动批处理

在React 17中，React只会将合成事件中的多次state更新合并为一次dom更新，而在Promise、setTimeout、setInterval、以及原生dom事件中的state更新并不会（会触发多次更新）。React 18解决了这种问题，在任何地方的state更新都只会造成一次dom更新，同时在\`react-dom\`新增了一个\`flushSync\`方法，它可以打破本次\`automatic batching\`，并将在其之前的state更新即时同步在dom上，意味着本来只会触发一次dom更新的地方将会分成两次更新。

\`\`\`jsx
import { flushSync } from 'react-dom';

function handleClick() {
  flushSync(() => {
    setCounter(c => c + 1);
  });
  // React has updated the DOM by now
  flushSync(() => {
    setFlag(f => !f);
  });
  // React has updated the DOM by now
}
\`\`\`

## 新的hooks

### useId

生成唯一的id。

### useTransition

将内部的state更新设置为非紧急更新，并在更新state时标识状态。由于浏览器是单线程的，在处理一些非常耗时的任务时用户不能与页面进行交互，因而产生卡顿的现象。

\`useTransition\`就是用来解决这个问题的，将耗时的任务放在内部即可将该任务的更新设为非紧急更新，从而该任务的进行不会阻拦用户的后续交互。

\`\`\`jsx
function App() {
  const [isPending, startTransition] = useTransition();
  const [count, setCount] = useState(0);

  function handleClick() {
    startTransition(() => {
      // 当执行内部的state更新时，isPending的状态会被更改
      setCount(c => c + 1);
    })
  }

  return (
    <div>
      {isPending && <Spinner />}
      <button onClick={handleClick}>{count}</button>
    </div>
  );
}
\`\`\`

### useDeferredValue

接收一个值，返回该值的副本，该副本会在紧急更新之后才更新并渲染。

\`\`\`jsx
function UseDeferredValue() {
  const [input, setInput] = useState("");
  const deferredValue = useDeferredValue(input);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }
  // 在输入框键入内容时，input的值得到及时的更新并渲染，然而deferredValue此时的值为input的上一次的值
  // input更新完成之后，deferredValue才会更新并渲染
  console.log("input", input);
  console.log("deferredValue", deferredValue);
  return (
    <div>
      <label>
        input: <input type="text" value={input} onChange={handleChange} />
      </label>
      <p>value: {input}</p>
      <p>deferredValue: {deferredValue}</p>
    </div>
  );
}
\`\`\`

### useSyncExternalStore

待完善。

### useInsertionEffect

与\`useEffect\`类似，不过它在dom变更之前同步执行，可以用来向dom插入样式并在\`useLayoutEffect\`中读取。该hook不能访问refs和触发更新。

PS：它应被用于\`css-in-js\`库，普通开发者应倾向于\`useEffect\`或\`useLayoutEffect\`。

## 参考链接

- [react-18-upgrade-guide](https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html)
- [react-v18](https://reactjs.org/blog/2022/03/29/react-v18.html)`;
});
