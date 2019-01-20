'use strict';

function handleTableClick(event) {
  const el = event.target;
  if(el.tagName === 'TH') {
    if(el.getAttribute('data-dir') === '1') {
      el.setAttribute('data-dir', '-1');
    } else {
      el.setAttribute('data-dir', '1');
    }
    const table = document.querySelector('table');
    table.setAttribute('data-sort-by', el.getAttribute('data-prop-name'));
    sortTable(el.getAttribute('data-prop-name'), el.getAttribute('data-dir'));
  }
}
