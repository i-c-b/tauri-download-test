import { download } from "tauri-plugin-upload-api";
import { save } from "@tauri-apps/api/dialog";

let urlInputEl: HTMLInputElement | null;
let jsMsgEl: HTMLElement | null;

async function downloadJs() {
  if (jsMsgEl && urlInputEl) {
    let save_location: string | null;
    try {
      save_location = await save();
    } catch (e) {
      console.debug("exception from save dialog", e);
      return;
    }

    if (save_location !== null) {
      try {
        await download(urlInputEl.value, save_location, (progress, total) => {
          (jsMsgEl as HTMLElement).textContent = `Downloaded: ${progress} of ${total}`;
        });
      } catch (e) {
        console.debug("exception from download", e);
      }
      (jsMsgEl as HTMLElement).textContent = `Download complete: ${save_location}`;
    }
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
