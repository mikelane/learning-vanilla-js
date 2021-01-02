"use strict";
const itemsGqlResponse = JSON.stringify({
    todo: [
        {
            id: '0',
            title: 'test',
            details: 'this is a test',
        },
        {
            id: '1',
            title: 'Decorate the tree',
            details: "Let's get the tree decorated by the 20th!",
        },
        {
            id: '2',
            title: 'Wrap the gifts',
            details: "Don't forget the hidden ones!",
        },
    ],
    assigned: [
        {
            id: '3',
            title: 'Do the dishes',
            details: 'We cook, you clean',
            assignee: 'Will',
        },
    ],
    inProgress: [
        {
            id: '4',
            title: 'wow look at this',
            details: "I'm in progress!",
            assignee: 'Joshua',
        },
    ],
    completed: [],
});
const itemClickHandler = (e) => {
    e.currentTarget.style.backgroundColor = 'red';
};
const itemMouseDown = (e) => {
    var _a;
    const item = e.currentTarget;
    const id = item.id;
    const title = item.querySelector('h1.title').innerHTML;
    const details = item.querySelector('p.details').innerHTML;
    const assignee = (_a = item.querySelector('p.assignee')) === null || _a === void 0 ? void 0 : _a.innerHTML;
    const newItemHtml = itemHtml({ id, title, details, assignee });
    console.log(newItemHtml);
    item.style.transform = 'rotate(1deg) scale(1.05)';
    item.style.boxShadow = '5px 5px 25px';
    item.style.userSelect = 'none';
};
const itemMouseUp = (e) => {
    const item = e.currentTarget;
    console.log(item.querySelector('h1.title'));
    item.style.transform = 'rotate(0deg) scale(1.0)';
    item.style.boxShadow = 'none';
};
const itemHtml = ({ id, title, details, assignee }) => {
    const assigneeP = assignee
        ? `<p class="assignee">Assigned to: ${assignee}</p>`
        : '';
    return `<div id=${id} class="item" onmousedown="mdHandler(event)" onmouseup="muHandler(event)">
  <h1 class="title">${title}</h1>
  <p class="details">${details}</p>
  ${assigneeP}
  </div>`;
};
const insertItemsIntoSwimlanes = async (allItems) => {
    const board = document.querySelector('#board');
    for (const [lane, items] of Object.entries(allItems)) {
        const targetLane = board.querySelector(`#${lane} > .items`);
        items.forEach((item) => {
            const itemContainer = document.createElement('div');
            itemContainer.innerHTML = itemHtml(item);
            targetLane.appendChild(itemContainer);
        });
    }
};
const items = JSON.parse(itemsGqlResponse);
insertItemsIntoSwimlanes(items);
let hoverEl = null;
let currentItem = null;
let startingPos = null;
const mdHandler = (e) => {
    const el = e.currentTarget;
    currentItem = el;
    const body = document.querySelector('.content');
    const oldParent = el.parentElement;
    startingPos = oldParent;
    oldParent.removeChild(el);
    body.appendChild(el);
    el.style.background = '#aaa';
    el.style.borderRadius = '10px';
    el.style.position = 'absolute';
    el.style.transform = 'rotate(15deg)';
};
const muHandler = (e) => {
    var _a, _b, _c;
    const el = currentItem;
    const body = document.querySelector('.content');
    if ((hoverEl === null || hoverEl === void 0 ? void 0 : hoverEl.className) === 'items') {
        body.removeChild(el);
        hoverEl === null || hoverEl === void 0 ? void 0 : hoverEl.appendChild(el);
        el.style.position = '';
    }
    else if ((hoverEl === null || hoverEl === void 0 ? void 0 : hoverEl.className) === 'item') {
        body.removeChild(el);
        (_b = (_a = hoverEl === null || hoverEl === void 0 ? void 0 : hoverEl.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.appendChild(el);
        el.style.position = '';
    }
    if (((_c = el.parentElement) === null || _c === void 0 ? void 0 : _c.className) === 'content') {
        body.removeChild(el);
        startingPos === null || startingPos === void 0 ? void 0 : startingPos.appendChild(el);
    }
    el.style.transform = 'rotate(0deg)';
    el.style.position = '';
    currentItem = null;
};
const mouseMoveHandler = (e) => {
    const el = currentItem;
    console.log(el);
    if (el !== null) {
        el.style.background = '#aaa';
        el.style.borderRadius = '10px';
        el.style.top = e.pageY + 20 + 'px';
        el.style.left = e.pageX + 20 + 'px';
    }
};
const hoverHandler = (e) => {
    var _a;
    hoverEl = e.target;
    if ((hoverEl === null || hoverEl === void 0 ? void 0 : hoverEl.className) === 'title' ||
        (hoverEl === null || hoverEl === void 0 ? void 0 : hoverEl.className) === 'details' ||
        (hoverEl === null || hoverEl === void 0 ? void 0 : hoverEl.className) === 'assignee') {
        hoverEl = (_a = hoverEl === null || hoverEl === void 0 ? void 0 : hoverEl.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement;
    }
    if (hoverEl.className === 'items' && currentItem !== null) {
        hoverEl.style.background = '#555';
    }
};
const normalBorder = (e) => {
    e.currentTarget.style.background = '#333';
};
document.addEventListener('mouseup', muHandler);
document.addEventListener('mousemove', mouseMoveHandler);
document.addEventListener('mouseover', hoverHandler);
//# sourceMappingURL=index.js.map