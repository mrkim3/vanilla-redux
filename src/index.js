import { createStore } from "redux";
const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

number.innerText = 0;
const ADD = "ADD";
const MINUS = "MINUS";
const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";
const countModifier = (count = 0, action) => {
    switch (action.type) {
        case ADD:
            return count + 1;
        case MINUS:
            return count - 1;
        default:
            return count;
    }
};
const countStore = createStore(countModifier);

const onChange = () => {
    number.innerText = countStore.getState();
};

countStore.subscribe(onChange);

const handleAdd = () => {
    countStore.dispatch({ type: ADD })
};

const handleMinus = () => {
    countStore.dispatch({ type: MINUS })
};

add.addEventListener('click', handleAdd);
minus.addEventListener('click', handleMinus);


const txtTodo = document.getElementById("txtTodo");
const ulTodo = document.getElementById("ulTodo");
const btnTodo = document.getElementById("btnTodo");

const addTodo = text => {
    return {
        type: ADD_TODO,
        text
    };
};

const deleteTodo = id => {
    return {
        type: DELETE_TODO,
        id
    };
};


const reducer = (state = [], action) => {
    switch (action.type) {
        case ADD_TODO:
            const newToDoObj = { text: action.text, id: Date.now() };
            return [newToDoObj, ...state];
        case DELETE_TODO:
            const cleaned = state.filter(toDo => toDo.id !== action.id);
            return cleaned;
        default:
            return state;
    }
};

const dispatchAddTodo = (text) => {
    store.dispatch(addTodo(text));
};

const onClick = e => {
    e.preventDefault();
    const toDo = txtTodo.value;
    txtTodo.value = "";
    dispatchAddTodo(toDo);
};

const store = createStore(reducer);
store.subscribe(() => console.log(store.getState()));

const dispatchDleteTodo = (e) => {
    const id = parseInt(e.target.parentNode.id);
    store.dispatch(deleteTodo(id));
};

const paintTodos = () => {
    ulTodo.innerHTML = "";
    const toDos = store.getState();
    toDos.forEach(toDo => {
        const li = document.createElement("li");
        const btn = document.createElement("button");
        btn.innerText = "DEL";
        btn.addEventListener('click', dispatchDleteTodo);
        li.id = toDo.id;
        li.innerText = toDo.text;
        li.appendChild(btn);
        ulTodo.appendChild(li);
    });
};

store.subscribe(paintTodos);

btnTodo.addEventListener('click', onClick);