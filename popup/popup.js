const pickBtn = document.querySelector(".pickColorBtn");

pickBtn.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  //   console.log(tab);
  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      function: pickColor,
    },
    async () => {}
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
