const input = document.querySelector("#todo-text");
let text;
const button = document.querySelector("#submit-button");
const list = document.querySelector(".todo-list");
const up = document.querySelector("#up");

const submit = (e) => {
  if (input.value.trim() == "") {
    input.value = "";

    return;
  }

  text = input.value;

  addTodo(text);
  save();

  input.value = "";
};
const addTodo = (text) => {
  let i = document.createElement("i");
  i.className = "fa-solid fa-check";
  let li = document.createElement("li");
  let span = document.createElement("span");
  li.classList.add("todo");
  span.textContent = text;
  li.appendChild(span);
  li.appendChild(i);
  list.appendChild(li);
};

button.addEventListener("click", submit);

list.addEventListener("click", (e) => {
  if (e.target.localName == "i") {
    list.removeChild(e.target.parentElement);
    save();
  }
});

document.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    up.style.display = "block";
  } else {
    up.style.display = "none";
  }
});

window.onload = () => {
  if (localStorage.getItem("data") === null) addTodo("Spor yap");
  else {
    let todos = JSON.parse(localStorage.getItem("data"));
    todos.forEach((el) => {
      addTodo(el);
    });
  }
};

const save = () => {
  let todos = [];
  list.childNodes.forEach((todo) => {
    todos.push(todo.textContent);
  });
  console.log(todos);
  localStorage.setItem("data", JSON.stringify(todos));
};
