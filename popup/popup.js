const pickBtn = document.querySelector(".pickColorBtn"),
  colorGrid = document.querySelector(".colorGrid"),
  colorValue = document.querySelector(".colorValue");

pickBtn.addEventListener("click", async () => {
  //   fetching color from background.js
  chrome.storage.sync.get("color", ({ color }) => {
    console.log(color);
  });

  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  //   console.log(tab);
  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      function: pickColor,
    },
    async (injectionResults) => {
      const [data] = injectionResults;
      if (data.result) {
        const color = data.result?.sRGBHex;
        colorGrid.style.backgroundColor = color;
        colorValue.innerText = color;
        // copying to clipboard
        try {
          await navigator.clipboard.writeText(color);
        } catch (err) {
          console.error(err);
        }
      }
      console.log(injectionResults);
    }
  );
});

async function pickColor() {
  //   console.log("scripting working");
  try {
    const eyeDropper = new EyeDropper();
    return await eyeDropper.open();
  } catch (err) {
    console.error(err);
  }
}
