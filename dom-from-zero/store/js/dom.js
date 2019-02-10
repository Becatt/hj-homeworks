'use strict';

function createElement(node) {

  if ((node === undefined) || (node === null) || (node === false)) {
    return document.createTextNode('');
  }

  if(typeof node === 'string') {
    return document.createTextNode(node);
  }

  const element = document.createElement(node.name);

  if (node.props) {
    Object.keys(node.props).forEach(key => {
      element.setAttribute(key, node.props[key]);
    });
  }

   if (Array.isArray(node.childs)) {
    element.appendChild(
       node.childs.reduce((f, item) => {
        f.appendChild(
          createElement(item)
        );

        return f;
      }, document.createDocumentFragment())
    );
  }

  return element;

};
