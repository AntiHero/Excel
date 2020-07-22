import {storage} from '@/core/utils';

export function toHTML(key) {
  const model = storage(key);

  return `
  <li class="db__record">
    <a href="#excel/${getMs(key)}">${model.title}</a>
    <span>${getDate(getMs(key))}</span>
  </li>`;
}

function getMs(key) {
  return key.split(':')[1];
}

function getDate(ms) {
  const date = new Date(Number(ms));
  return date.toLocaleString();
}

function getAllKeys() {
  const keys = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    if (!key.includes('excel')) {
      continue;
    } else {
      keys.push(key);
    }
  }
  return keys;
}

export function getAllRecords() {
  const keys = getAllKeys();
  if (keys !== undefined && keys.length) {
    return keys.map(toHTML).join('');
  }
  return '<li></li>';
}
