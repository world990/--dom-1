window.dom = {
  create(string) {
    const container = document.createElement("template");
    container.innerHTML = string.trim();
    return container.content.firstChild;
  },
  after(node, node2) {
    node.parentNode.insertBefore(node2, node.nextSibling);
  }, //新增弟弟
  before(node, node2) {
    node.parentNode.insertBefore(node2, node);
  }, //新增哥哥
  append(parent, node) {
    parent.appendChild(node);
  }, //新增子标签
  wrap(node, parent) {
    dom.before(node, parent);
    dom.append(parent, node);
  }, //先变哥哥再变儿子
  remove(node) {
    node.parentNode.removeChild(node);
    return node; //删除一个节点并保留引用
  },
  empty(node) {
    const { childNodes } = node;
    const array = [];
    let x = node.firstChild;
    while (x) {
      array.push(dom.remove(node.firstChild));
      x = node.firstChild;
    }
    return array; //删除一个节点的所有子元素
  },
  attr(node, name, value) {
    //重载，根据参数、个数写不同的代码
    if (arguments.length === 3) {
      node.setAttribute(name, value); //接受三个参数添加
    } else if (arguments.length === 2) {
      return node.getAttribute(name); //接受两个参数返回
    }
  },
  text(node, string) {
    // 适配
    if (arguments.length === 2) {
      if ("innerText" in node) {
        node.innerText = string;
      } else {
        node.textContent = string;
      }
    } else if (arguments.length === 1) {
      if ("innerText" in node) {
        return node.innerText;
      } else {
        return node.textContent;
      }
    }
  },
  html(node, string) {
    if (arguments.length === 2) {
      node.innerHTML = string;
    } else if (arguments.length === 1) {
      return node.innerHTML;
    }
  },
  style(node, name, value) {
    if (arguments.length === 3) {
      //dom.style(div,'color','red')
      node.style[name] = value;
    } else if (arguments.length === 2) {
      if (typeof name === "string") {
        //dom.style(div,'color')
        return node.style[name];
      } else if (name instanceof Object) {
        //dom.style(div,{color:'red'})
        const object = name;
        for (let key in object) {
          node.style[key] = object[key];
        }
      }
    }
  },
  class: {
    add(node, className) {
      node.classList.add(className); //添加class
    },
    remove(node, className) {
      node.classList.remove(className); //删除class
    },
    has(node, className) {
      return node.classList.contains(className); //一个值是否存在
    },
  },
  on(node, eventName, fn) {
    node.addEventListener(eventName, fn);
  }, //开启事件监听
  off(node, eventName, fn) {
    node.removeEventListener(eventName, fn);
  }, //关闭事件监听
  find(selector, scope) {
    return (scope || document).querySelectorAll(selector);
  },
  parent(node) {
    return node.parentNode;
  }, //查父元素
  children(node) {
    return node.children;
  }, //查子元素
  siblings(node) {
    return Array.from(node.parentNode.children).filter((n) => n != node);
  }, //查上下元素，需要把children从伪数组变成数组
  next(node) {
    let x = node.nextSibling;
    while (x && x.nodeType === 3) {
      x = x.nextSibling;
    }
    return x; //查弟弟元素
  },
  previous(node) {
    let x = node.previousSibling;
    while (x && x.nodeType === 3) {
      x = x.previousSibling;
    }
    return x; //查哥哥元素
  },
  each(nodeList, fn) {
    for (let i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList[i]);
    } //用于遍历
  },
  index(node) {
    const list = dom.children(node.parentNode);
    let i;
    for (i = 0; i < list.length; i++) {
      if (list[i] === node) {
        break;
      }
    }
    return i;
  },
};
