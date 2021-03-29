buttonMarkdown = document.getElementById("downloadMarkdown");

buttonMarkdown.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['downloadMarkdown.js'],
  });
});

buttonCSV = document.getElementById("downloadCSV");

buttonCSV.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['downloadCSV.js'],
  });
});
