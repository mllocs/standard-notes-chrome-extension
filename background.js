'use strict';

chrome.browserAction.onClicked.addListener(function (tab) {
  const url = tab.url;
  const title = tab.title;

  chrome.tabs.query({active: true, lastFocusedWindow: true}, () => {
    chrome.tabs.create({ url: "https://app.standardnotes.org" }, (tab) => {
      const injectedCode = `
        document.getElementsByClassName('sk-button')[1].click();
        setTimeout(function() {
          document.getElementById('note-title-editor').value = "${title}";
          document.getElementById('note-text-editor').value = "${url}";
        }, 100);
      `;

      chrome.tabs.executeScript(tab.id, { code: injectedCode });
    });
  });
});
