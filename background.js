'use strict';

chrome.browserAction.onClicked.addListener(function (tab) {
  const url = tab.url;
  const title = tab.title;

  chrome.tabs.query({active: true, lastFocusedWindow: true}, () => {
    chrome.tabs.create({ url: "https://app.standardnotes.org" }, (tab) => {
      const injectedCode = `
        document.getElementsByClassName('sk-button')[1].click();
        setTimeout(function() {
          var title = document.getElementById('note-title-editor');
          title.value = "${title}";
          title.dispatchEvent(new Event('change'));

          var note = document.getElementById('note-text-editor');
          note.value = "${url}";
          note.dispatchEvent(new Event('change'));
        }, 100);
      `;

      chrome.tabs.executeScript(tab.id, { code: injectedCode });
    });
  });
});
