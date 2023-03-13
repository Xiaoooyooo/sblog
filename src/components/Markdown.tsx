import { marked, Renderer } from "marked";
import hljs from "highlight.js";
import { memo, useEffect, useRef } from "react";
import "./Markdown.scss";

class _Renderer extends Renderer {
  heading(text: string, level: 1 | 2 | 3 | 4 | 5 | 6, raw: string) {
    return `<h${level}><a href="#${raw}" id="${raw}" class="anchor">${raw}</a></h${level}>`;
  }
  code(code: string, language: string | undefined, isEscaped: boolean) {
    const rawCode = code;
    try {
      if (language) {
        code = hljs.highlight(code, { language }).value;
      }
    } catch (err) {} // eslint-disable-line
    return `<div class="code-contenxt">
        <pre><code class="hljs copy-target">${code}</code></pre>
        <code-copy value="${rawCode.replace(/"/g, "&quot;")}"></code-copy>
      </div>`;
  }
  link(href: string | null, title: string | null, text: string) {
    let rel: string;
    if (!href) {
      rel = "noopener nofollow noreferrer";
    } else if (/^http/.test(href)) {
      if (!href.startsWith(window.location.origin)) {
        rel = "noopener nofollow noreferrer";
      } else {
        rel = "";
      }
    } else {
      rel = "";
    }
    return `<a href="${href}" class="md-def-url" ${
      rel ? `rel="${rel}"` : ""
    }>${text}</a>`;
  }
}

const renderer = new _Renderer();

interface Props {
  text: string;
}

function Markdown(props: Props) {
  const { text } = props;
  const docNode = useRef(null);
  const html = marked(text, { renderer });

  useEffect(() => {
    if (location.hash) {
      const target = document.getElementById(
        decodeURIComponent(location.hash.replace(/^#/, ""))
      );
      if (target) {
        target.scrollIntoView({
          block: "start",
          behavior: "smooth",
        });
      }
    }
  }, []);

  useEffect(() => {
    window.MathJax.typeset([docNode.current]);
  }, [text]);
  return <div ref={docNode} dangerouslySetInnerHTML={{ __html: html }}></div>;
}

export default memo(Markdown);
