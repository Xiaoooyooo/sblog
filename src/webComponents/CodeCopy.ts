import "./CodeCopy.scss";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16">
<path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
<path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
</svg>`;

const copiedSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-clipboard-check" viewBox="0 0 16 16">
<path fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
<path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
<path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
</svg>`;

export default class CodeCopy extends HTMLElement {
  value: string;
  timer: any; // eslint-disable-line
  constructor() {
    super();
    this.classList.add("code-copy");
    this.value = this.getAttribute("value") || "";
    this.innerHTML = svg;
  }
  connectedCallback() {
    console.log("CodeCopy mounted");
    this.addEventListener("click", () => {
      const type = "text/plain";
      const blob = new Blob([this.value], { type });
      const clipboardData = new ClipboardItem({ [type]: blob });
      navigator.clipboard
        .write([clipboardData])
        .then(() => {
          if (this.timer) clearTimeout(this.timer);
          else this.innerHTML = copiedSvg;
          this.timer = setTimeout(() => {
            this.timer = null;
            this.innerHTML = svg;
          }, 2000);
        })
        .catch(() => {}); // eslint-disable-line
    });
  }
  disconnectedCallback() {
    console.log("CodeCopy unmounted");
  }
}
