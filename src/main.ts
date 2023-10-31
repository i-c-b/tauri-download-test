import { download } from "tauri-plugin-upload-api";

let urlInputEl: HTMLInputElement | null;
let jsMsgEl: HTMLElement | null;

async function downloadJs() {
  if (jsMsgEl && urlInputEl) {
    download(urlInputEl.value, "./download.txt", (progress) => {
      (jsMsgEl as HTMLElement).textContent = `Downloaded: ${progress}`;
    });
  }
}

window.addEventListener("DOMContentLoaded", () => {
  urlInputEl = document.querySelector("#url-input");
  jsMsgEl = document.querySelector("#js-msg");
  document.querySelector("#download-js")?.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    downloadJs();
  });
});
