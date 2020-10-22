//LLAMAMOS FORMULARIO
document.getElementById('formNovedadAcademica').addEventListener('submit', saveTask);

// ASIGNAMOS VALORES A LAS VARIABLES DESDE EL FORMULARIO
function saveTask(e) {
  let codigo = document.getElementById('codigoAprendiz').value;
  let descripcion = document.getElementById('descripcionNovedad').value;
  console.log(descripcion)

  let task = {
    codigo,
    descripcion
  };
    
// GUARDAR VARIOS CAMPOS EN MEMORIA DEL NAVEGADOR 
  if(localStorage.getItem('tasks') === null) {
    let tasks = [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  } else {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  getTasks();
  document.getElementById('formTask').reset();
  e.preventDefault();
}

//ELIMINAR CAMPOS ANTERIORMENTE GUARDADOS
function eliminarNovedad(codigo) {
  console.log(codigo)
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  for(let i = 0; i < tasks.length; i++) {
    if(tasks[i].codigo == codigo) {
      tasks.splice(i, 1);
    }
  }
  
  localStorage.setItem('tasks', JSON.stringify(tasks));
  getTasks();
}

function getTasks() {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  let tasksView = document.getElementById('tasks');
  tasksView.innerHTML = '';
  for(let i = 0; i < tasks.length; i++) {
    let codigo = tasks[i].codigo;
    let descripcion = tasks[i].descripcion;

    tasksView.innerHTML += `<div class="card mb-3">
        <div class="card-body">
          <p>${codigo} - ${descripcion}
          <a href="#" onclick="eliminarNovedad('${codigo}')" class="btn btn-danger ml-5">Eliminar</a>
          </p>
        </div>
      </div>`;
  }
}

getTasks();
