const taskInput = document.querySelector('#task-input');
const taskOl = document.querySelector("#task-ol");

let count = 0;

function addTaskList(task) {

  count = ++taskOl.children.length;

  // Create elements
  let taskLi = document.createElement("li");
  let taskNameSpan = document.createElement("span");
  let taskCompleteBtn = document.createElement('i');
  let taskDeleteBtn = document.createElement('i');
  let taskButtonsDiv = document.createElement('div');
  
  // Adding classes 
  taskLi.classList.add('task-list-li');
  taskCompleteBtn.classList.add('check-btn', 'fa-solid', 'fa-check', 'task-btns');
  taskDeleteBtn.classList.add('delete-btn', 'fa-solid', 'fa-minus', 'task-btns');
  taskButtonsDiv.classList.add('buttons-div');
  
  // Adding task name in a span element
  taskNameSpan.innerText = `${count}.${task}`;

  // Adding event listeners
  taskCompleteBtn.addEventListener('click', () => {
    taskNameSpan.classList.toggle('striked');
    taskCompleteBtn.classList.toggle('checked');
    addStrikedClass();
  });

  taskDeleteBtn.addEventListener('click', () => {
    taskDeleteBtn.classList.add('checked');
    setTimeout(() => {
      taskLi.remove();
      saveTasks();
    },300);
  });
  
  // Append child's to Buttons div 
  taskButtonsDiv.append(taskCompleteBtn);
  taskButtonsDiv.append(taskDeleteBtn);
  
  // Append childs to li
  taskLi.append(taskNameSpan);
  taskLi.append(taskButtonsDiv);

  // Append li to ol
  taskOl.append(taskLi);

  saveTasks();
};

const form = document.querySelector('form');

// Listen for submit 
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const task = taskInput.value.trim();
  if(task){
    addTaskList(task);
    taskInput.value = ''; // Clear input field
  }
});


// Saves tasks to local storage
function saveTasks() {
  const tasks = Array.from(taskOl.children).map(li => li.querySelector('span').innerText.slice(2));
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Saves striked classes to local storage 
function addStrikedClass(){
  const isStriked = Array.from(taskOl.children).map(li => li.querySelector('span').classList.contains('striked'));
  localStorage.setItem('strikedClass', JSON.stringify(isStriked));
}




// For loading saved tasks
function loadTasks(){
  // Adds tasks 
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach((task) => {
    addTaskList(task);
  });
  
  // Checks for striked tasks
  const strikedClass = JSON.parse(localStorage.getItem('strikedClass')) || [];
  strikedClass.forEach((isStriked, i) => {
    if(isStriked){
      taskOl.children[i].children[1].children[0].click();
    }
  });
}

// Retrieve tasks from local storage and add them to task list
window.addEventListener('load',() => {
    loadTasks();
    
});



const placeHolders = ['What\'s on your agenda for today?', 'What tasks do you need to complete?', 'What are your priorities for today?', 'What do you need to accomplish today?'];
let currentPlaceholderIndex = 0;
let currentCharacterIndex = 0;
let timeoutId;

function typeNextCharacter() {
  if (currentCharacterIndex < placeHolders[currentPlaceholderIndex].length){
    let currentText = taskInput.placeholder;
    let nextChar = placeHolders[currentPlaceholderIndex].charAt(currentCharacterIndex);
    taskInput.placeholder = currentText + nextChar;
    currentCharacterIndex++;
    timeoutId = setTimeout(typeNextCharacter,100);
  }else{
    clearTimeout(timeoutId);
    currentCharacterIndex = 0;
    currentPlaceholderIndex = (currentPlaceholderIndex + 1) < placeHolders.length ? currentPlaceholderIndex + 1 : 0;
    setTimeout(changePlaceHolder,1000 * 10);
  }
}
function changePlaceHolder(){
  taskInput.placeholder = '';
  typeNextCharacter();
}

changePlaceHolder();