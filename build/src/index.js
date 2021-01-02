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
    return `<div id=${id} class="item" onmousedown="itemMouseDown(event)" onmouseup="itemMouseUp(event)">
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
//# sourceMappingURL=index.js.map