interface ItemParams {
  id: string;
  title: string;
  details: string;
  assignee?: string;
}

interface Item {
  readonly id: string;
  readonly title: string;
  readonly details: string;
  readonly assignee?: string;
}

interface itemsResponse {
  readonly todo: Item[];
  readonly assigned: Item[];
  readonly inProgress: Item[];
  readonly completed: Item[];
}

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

type laneName = 'todo' | 'assigned' | 'inProgress' | 'completed';

const itemClickHandler = (e: Event) => {
  (e.currentTarget as HTMLElement).style.backgroundColor = 'red';
};

const itemMouseDown = (e: Event) => {
  const item = e.currentTarget as HTMLElement;
  const id = item.id;
  const title = item.querySelector<HTMLElement>('h1.title')!.innerHTML;
  const details = item.querySelector<HTMLElement>('p.details')!.innerHTML;
  const assignee = item.querySelector<HTMLElement>('p.assignee')?.innerHTML;
  const newItemHtml = itemHtml({id, title, details, assignee});
  console.log(newItemHtml);

  item.style.transform = 'rotate(1deg) scale(1.05)';
  item.style.boxShadow = '5px 5px 25px';
  item.style.userSelect = 'none';
};

const itemMouseUp = (e: Event) => {
  const item = e.currentTarget as HTMLElement;
  console.log(item.querySelector('h1.title'));
  item.style.transform = 'rotate(0deg) scale(1.0)';
  item.style.boxShadow = 'none';
};

const itemHtml = ({id, title, details, assignee}: Item): string => {
  const assigneeP = assignee
    ? `<p class="assignee">Assigned to: ${assignee}</p>`
    : '';
  return `<div id=${id} class="item" onmousedown="mdHandler(event)" onmouseup="muHandler(event)">
  <h1 class="title">${title}</h1>
  <p class="details">${details}</p>
  ${assigneeP}
  </div>`;
};

const insertItemsIntoSwimlanes = async (allItems: itemsResponse) => {
  const board = document.querySelector('#board') as HTMLElement;
  for (const [lane, items] of Object.entries(allItems)) {
    const targetLane = board.querySelector(`#${lane} > .items`) as HTMLElement;
    items.forEach((item: Item) => {
      const itemContainer = document.createElement('div');
      itemContainer.innerHTML = itemHtml(item);
      targetLane.appendChild(itemContainer);
    });
  }
};

const items = JSON.parse(itemsGqlResponse);
insertItemsIntoSwimlanes(items);

let hoverEl: HTMLElement | null | undefined = null;
let currentItem: HTMLElement | null = null;
let startingPos: HTMLElement | null = null;

const mdHandler = (e: Event): void => {
  const el = e.currentTarget as HTMLElement;
  currentItem = el;
  const body = document.querySelector('.content') as HTMLElement;
  const oldParent = el.parentElement as HTMLElement;
  startingPos = oldParent;
  oldParent.removeChild(el);
  body.appendChild(el);
  el!.style.background = '#aaa';
  el!.style.borderRadius = '10px';
  el.style.position = 'absolute';
  el.style.transform = 'rotate(15deg)';
};

const muHandler = (e: Event): void => {
  const el = currentItem;
  const body = document.querySelector('.content') as HTMLElement;
  if (hoverEl?.className === 'items') {
    body.removeChild(el!);
    hoverEl?.appendChild(el!);
    el!.style.position = '';
  } else if (hoverEl?.className === 'item') {
    body.removeChild(el!);
    hoverEl?.parentElement?.parentElement?.appendChild(el!);
    el!.style.position = '';
  }
  if (el!.parentElement?.className === 'content') {
    body.removeChild(el!);
    startingPos?.appendChild(el!);
  }
  el!.style.transform = 'rotate(0deg)';
  el!.style.position = '';
  currentItem = null;
};

const mouseMoveHandler = (e: MouseEvent) => {
  const el = currentItem;
  console.log(el);
  if (el !== null) {
    el!.style.background = '#aaa';
    el!.style.borderRadius = '10px';
    el!.style.top = e.pageY + 20 + 'px';
    el!.style.left = e.pageX + 20 + 'px';
  }
};

const hoverHandler = (e: MouseEvent) => {
  hoverEl = e.target as HTMLElement;
  if (
    hoverEl?.className === 'title' ||
    hoverEl?.className === 'details' ||
    hoverEl?.className === 'assignee'
  ) {
    hoverEl = hoverEl?.parentElement?.parentElement;
  }
  if (hoverEl!.className === 'items' && currentItem !== null) {
    hoverEl!.style.border = '1px solid green';
  }
};

const normalBorder = (e: Event) => {
  (e.currentTarget as HTMLElement).style.border = 'none';
};

document.addEventListener('mouseup', muHandler);
document.addEventListener('mousemove', mouseMoveHandler);
document.addEventListener('mouseover', hoverHandler);
