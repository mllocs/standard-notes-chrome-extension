'use strict';

chrome.browserAction.onClicked.addListener((tab) => {
  const url = tab.url;
  const title = tab.title;
  const DELAY = 3000;

  chrome.tabs.create({ url: "https://app.standardnotes.org" }, (tab) => {
    chrome.tabs.executeScript(tab.id, { file: 'src/contentScript.js', runAt: 'document_end' });
    setTimeout(() => { chrome.tabs.sendMessage(tab.id, { id: 'CREATE_NOTE', url, title }); }, DELAY);
  });
});
