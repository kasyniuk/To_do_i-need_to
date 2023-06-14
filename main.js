(() => {
  let toDoListArray = JSON.parse(localStorage.getItem('toDoList')) || [];
  const form = document.querySelector(".form");
  const input = form.querySelector(".form__input");
  const ul = document.querySelector(".toDoList");

  form.addEventListener('submit', e => {
    e.preventDefault();
    let itemId = String(Date.now());
    let toDoItem = input.value;
    addItemToDOM(itemId, toDoItem);
    addItemToArray(itemId, toDoItem);
    input.value = '';
  });

  ul.addEventListener('click', e => {
    let id = e.target.getAttribute('data-id');
    if (!id) return;
    if (e.detail === 1) {
      toggleItem(e.target);
    } else if (e.detail === 2) {
      removeItemFromDOM(id);
      removeItemFromArray(id);
    }
  });

  function addItemToDOM(itemId, toDoItem) {
    const li = document.createElement('li')
    li.setAttribute("data-id", itemId);
    li.innerText = toDoItem
    ul.appendChild(li);
  }

  function addItemToArray(itemId, toDoItem) {
    toDoListArray.push({ itemId, toDoItem });
    saveToDoList();
  }

  function removeItemFromDOM(id) {
    var li = document.querySelector('[data-id="' + id + '"]');
    ul.removeChild(li);
  }

  function removeItemFromArray(id) {
    toDoListArray = toDoListArray.filter(item => item.itemId !== id);
    saveToDoList();
  }

  function toggleItem(element) {
    element.style.textDecoration = element.style.textDecoration === 'line-through wavy red' ? 'none' : 'line-through wavy red';
  }

  function saveToDoList() {
    localStorage.setItem('toDoList', JSON.stringify(toDoListArray));
  }

  // Оновлюємо список завдань під час завантаження сторінки
  function updateToDoList() {
    ul.innerHTML = '';
    for (let i = 0; i < toDoListArray.length; i++) {
      const { itemId, toDoItem } = toDoListArray[i];
      addItemToDOM(itemId, toDoItem);
    }
  }

  updateToDoList();
})();

function zero_first_format(value) {
  if (value < 10) {
    value = '0' + value;
  }
  return value;
}

function date_time() {
  let current_datetime = new Date();
  let day = zero_first_format(current_datetime.getDate());
  let month = zero_first_format(current_datetime.getMonth() + 1);
  let year = current_datetime.getFullYear();

  return day + "." + month + "." + year;
}

document.getElementById('current_date_time_block').innerHTML = date_time();