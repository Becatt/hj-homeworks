'use strict';
/*
В функциях getTabs и showArticle сознательно попробовал разные варинаты перебора дочерних элементов
тега <section class="tabs-content">.
Скорее всего ни один из них не является оптимальным.
*/


const container = document.getElementById('tabs');
const tabsNav = container.querySelector('.tabs-nav');
const content = container.querySelector('.tabs-content');

function getTabs(article) {
  if(article) {
    const firstTab = tabsNav.firstElementChild;
    const newTab = firstTab.cloneNode(true);
    tabsNav.insertBefore(newTab, null)
    newTab.querySelector('a').textContent = article.getAttribute('data-tab-title');
    newTab.querySelector('a').classList.add(article.getAttribute('data-tab-icon'));
    newTab.addEventListener('click', showArticle)
    getTabs(article.nextElementSibling);
  } else {
    tabsNav.removeChild(tabsNav.firstElementChild);
    tabsNav.firstElementChild.classList.add('ui-tabs-active');
    return;
  }
}

getTabs(content.firstElementChild);

function showArticle() {
  tabsNav.querySelector('.ui-tabs-active').classList.remove('ui-tabs-active');
  this.classList.add('ui-tabs-active');
  Array.from(content.childNodes).forEach(item => {
    if(item.nodeName !== '#text') {
      item.classList.add('hidden');
    }
  });

  const sections = document.querySelectorAll('section');
  console.log(sections.length);

  content.querySelector(`[data-tab-title = ${this.textContent}]`).classList.remove('hidden');
}
