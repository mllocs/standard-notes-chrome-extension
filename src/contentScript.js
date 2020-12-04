'use strict';

chrome.runtime.onMessage.addListener((message) => {
  if (typeof message !== 'object') return;

  const { id, url, title } = message;

  if (id !== 'CREATE_NOTE') return;

  const titleEl = document.getElementById('note-title-editor');

  titleEl.value = title;
  titleEl.dispatchEvent(new Event('change'));

  const noteEl = document.getElementById('note-text-editor');

  noteEl.value = url;
  noteEl.dispatchEvent(new Event('change'));
});
