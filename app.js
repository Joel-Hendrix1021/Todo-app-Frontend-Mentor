const $form = document.querySelector(".form");
const $tb = document.getElementById("tbody");
const $table = document.querySelector(".table");
const $actionFilter = document.getElementById('action__filter')

window.addEventListener("DOMContentLoaded", () => {
  renderTable(tasks);
  
});

let tasks = [
  { id: 1629496203600, task: "study", done: false },
  { id: 1629496204361, task: "read", done: true },
  { id: 1629496209679, task: "run", done: false },
  { id: 1629496218136, task: "swinng", done: true },
  { id: 1629496207917, task: "task 1", done: false },
];

$form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(tasks);
  if (e.target.task.value === "") alert("debes llenar el formulario");
  let task = {
    id: Date.now(),
    [e.target.task.name]: e.target.task.value,
    done: false,
  };

  tasks.push(task);
  e.target.reset();

  renderTable(tasks);
});

let $frgmt = document.createDocumentFragment();

const renderTable = (n) => {
  console.log(n)
  $tb.innerHTML = "";
  n.forEach((item) => {
    $tb.innerHTML += `
     <tr >
        <th data-id=${item.id}>
        <input type="checkbox"  name="checked" ${
        item.done ? "checked" : "" }>
        <td >${item.task}</td>
        </th>
      </tr>
        `;
  });
  $table.appendChild($tb);
  
};
///event the table body 
$tb.addEventListener("click", (e) => {
  if (e.target.name === "checked") {
    //console.log(e.target.checked)
    taskId = e.target.parentNode.dataset.id;
    const newArray = tasks.map((task) =>
      task.id == taskId ? { ...task, done: !task.done } : task
    );
    tasks = newArray;   
  }
 
});

//event filter 
$actionFilter.addEventListener("click",(e)=>{
    if(e.target.id=='all'){
        renderTable(tasks)
    }else if(e.target.id == 'active'){
      filterTasks(tasks, true)
    }else if(e.target.id == 'completed'){
        filterTasks(tasks, false)
    }else if(e.target.id == 'clear_completed'){
      filterTasks(tasks, true, 'clear')
    }
})

const filterTasks=(n, typeFilter, clear)=>{
    if(!clear){
      const filterCompleted =  n.filter(item=> item.done !== typeFilter)
     console.log(tasks)
     renderTable(filterCompleted)
    }else {
      const filterCompleted =  n.filter(item=> item.done !== typeFilter)
      tasks = filterCompleted
      renderTable(tasks)
    }
}


