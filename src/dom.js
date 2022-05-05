window.dom = {
    create(string) {
        // 创建一个变量容器,用于存储一个元素,之后将其传过来的用html表示,
        //之后用children数组返回出去   
        // template存任意元素，专门容纳元素的
        const container = document.createElement("template");
        container.innerHTML = string.trim();  //trim可以防止有空格
        return container.content.firstChild;
    },
    // dom.after(node, node2) : 用于新增弟弟节点
    after(node, node2) {
        node.parentNode.insertBefore(node2, node.nextSilbing);
    },
    //dom.before：用于新增哥哥
    before(node, node2) {
        node.parentNode.insertBefore(node2, node);
    },
    //append:(parent，child) 用于新增儿子
    append(parent, node) {
        parent.appendChild(node);
    },
    //dom.wrap:用于新增爸爸
    wrap(node, parent) {
        dom.before(node, parent)
        dom.append(parent, node)
    },
    //删除：dom.remove(node)删除节点
    remove(node) {
        node.parentNode.removeChild(node)
        return node
    },
    //dom.empty(parent)用于删除后代
    empty(node) {
        // const childNodes=node.childNodes
        //const { childNodes } = node
        const array = []
        // for (let i = 0; i < childNodes.length; i++) {
        //     dom.remove(childNodes[i])
        //     array.push(childNodes[i])
        // }
        let x = node.firstChild
        while (x) {
            array.push(dom.remove(node.firstChild))
            x = node.firstChild
        }
        return array
    },

    //dom.attr(node,'title',?)用于读写属性
    attr(node, name, value) {     //重载
        if (arguments.length === 3) {
            node.setAttribute(name, value);
        } else if (arguments.length === 2) {
            return node.getAttribute(name);
        }
    },
    //dom.text(node,?)用于读写文本内容
    text(node, string) {   //适配
        if (arguments.length === 2) {
            if ('innerText' in node) {
                node.innerText = string   //ie
            } else {
                node.textContent = string
            }
        } else if (arguments.length === 1) {
            if ('innnerText' in node) {
                return node.innerText
            } else {
                return node.textContent
            }
            // node.innerText = string   //ie
        }
    },
    //dom.html(node,?)用于的读写HTML内容
    html(node, string) {
        if (arguments.length === 2) {
            node.innerHTML = string
        } else if (arguments.length === 1) {
            return node.innerHTML
        }
    },
    //dom.style(node,{color:'red'})用于修改style
    style(node, name, value) {
        if (arguments.length === 3) {
            node.style[name] = value
        } else if (arguments.length === 2) {
            if (typeof name === 'string') {
                //dom.style(div,{color:'red'})
                return node.style[name]
            }
        } else if (name instanceof Object) {
            //dom.style(div,{color:'red'})
            const object = name
            for (let key in object) {
                //node.style.border
                // node.style.color=
                //该key是变量，不能用.
                node.style[key] = object[key]
            }
        }
    },
    //dom.class.add(node,'blue')用于修改class
    class: {
        add(node, className) {
            node.classList.add(className)
        },
        //dom.class.remove(node,'blue')用于删除class
        remove(node, className) {
            node.classList.remove(className)
        },
        has(node, className) {
            return node.classList.contains(className)
        }
    },
    //dom.off(node,'click',fn)用于删除事件监听
    on(node, eventName, fn) {
        node.addEventListener(eventName, fn)
    },
    off(node, eventName, fn) {
        node.removeEventListener(eventName, fn)
    },

    //dom.find(‘选择器')用于获取标签或标签们
    find(selector, scope) {
        return (scope || document).querySelectorAll(selector)
    },
    //dom.parent(node)用于获取父元素
    parent(node) {
        return node.parentNode
    },
    //dom.children(node)用于获取子元素
    children(node) {
        return node.children
    },
    //dom.silbings(node)用于获取兄弟姐妹元素
    siblings(node) {
        return Array.from(node.parentNode.children)
            .filter(n => n !== node)
    },
    //dom.next(node)用于获取弟弟
    next(node) {
        let x = node.nextSibling
        while (x && x.nodeType === 3) {
            x = x.nextSibling
        }
        return x
    },
    //dom.previous(node)用于获取哥哥
    previous(node) {
        let x = node.previousSibling
        while (x && x.nodeType === 3) {
            x = x.previousSibling
        }
        return x
    },
    //dom.each(nodes.fn)用于获取遍历所有的节点
    each(nodeList, fn) {
        for (let i = 0; i < nodeList.length; i++) {
            fn.call(null, nodeList[i])
        }
    },
    //dom.index(node)用于获取排行老几
    index(node) {
        const list = dom.children(node.parentNode)
        let i
        for (i = 0; i < list.length; i++) {
            if (list[i] === node) {
                break
            }
        }
        return i
    },
};


