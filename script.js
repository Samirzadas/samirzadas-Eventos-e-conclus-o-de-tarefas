// VARIÁVEIS DO DOM
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');

// taskList é o elemento PAI onde aplicaremos a delegação de eventos
const taskList = document.getElementById('taskList'); 

const filterButtons = document.querySelectorAll('.filter-btn');
let currentFilter = 'all'; // Estado inicial do filtro


// FUNÇÃO AUXILIAR: Cria o elemento LI da tarefa com seus botões
function createTaskElement(taskText) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span class="task-text">${taskText}</span>
        <div class="task-actions">
            <button class="complete-btn">Concluir</button>
            <button class="edit-btn">Editar</button>
            <button class="delete-btn">Excluir</button>
        </div>
    `;
    return li;
}

// FUNÇÃO PRINCIPAL: Adiciona uma nova tarefa à lista
function addTask(taskText) {
    if (taskText.trim() === '') return;
    
    const newTask = createTaskElement(taskText);
    taskList.appendChild(newTask);
    
    applyFilter(); // Garante que a nova tarefa seja visível de acordo com o filtro
}

// LÓGICA DO taskForm: Adiciona a tarefa ao submeter o formulário
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addTask(taskInput.value);
    taskInput.value = ''; // Limpa o input
});


// -----------------------------------------------------------
// AULA 3 - EVENTOS E DELEGAÇÃO
// -----------------------------------------------------------


// 1. DELEGAÇÃO DE EVENTOS para Marcar, Editar e Excluir
// Adicionamos um único 'click' listener ao elemento PAI (taskList)
taskList.addEventListener('click', (e) => {
    const target = e.target;
    // .closest('li') encontra o ancestral mais próximo que é um <li> (a tarefa)
    const taskItem = target.closest('li'); 
    
    if (!taskItem) return; // Se o clique não foi em um LI válido, ignora.
    
    // Marcar/Desmarcar como Concluída
    if (target.classList.contains('complete-btn')) {
        // Alterna a classe 'completed-task'
        taskItem.classList.toggle('completed-task');
        
        // Atualiza o texto do botão
        const isCompleted = taskItem.classList.contains('completed-task');
        target.textContent = isCompleted ? 'Pendente' : 'Concluir';
        
        applyFilter(); // Re-aplica o filtro para exibir/ocultar se necessário
    }
    
    // Editar Tarefa
    else if (target.classList.contains('edit-btn')) {
        const taskTextSpan = taskItem.querySelector('.task-text');
        const currentText = taskTextSpan.textContent;
        // Prompt é usado para simplificar a edição (em produção seria um campo de input)
        const newText = prompt('Editar tarefa:', currentText);
        
        if (newText !== null && newText.trim() !== '') {
            taskTextSpan.textContent = newText.trim();
        }
    }
    
    // Excluir Tarefa
    else if (target.classList.contains('delete-btn')) {
        taskList.removeChild(taskItem);
    }
});


// 2. LÓGICA DOS FILTROS
function applyFilter() {
    const tasks = taskList.querySelectorAll('li');
    
    tasks.forEach(task => {
        const isCompleted = task.classList.contains('completed-task');
        
        // Assume que a tarefa deve ser visível (display: flex;)
        task.style.display = 'flex'; 

        if (currentFilter === 'pending' && isCompleted) {
            // Se o filtro é Pendente e a tarefa está Concluída -> Esconde
            task.style.display = 'none';
        } else if (currentFilter === 'completed' && !isCompleted) {
            // Se o filtro é Concluída e a tarefa está Pendente -> Esconde
            task.style.display = 'none';
        }
        // Se currentFilter é 'all', todas são exibidas (display: flex)
    });
}

// 3. Event Listeners para os botões de filtro
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // 1. Gerencia a classe 'active' para indicar o filtro selecionado
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // 2. Define o filtro atual baseado no ID do botão
        if (button.id === 'filter-pending') {
            currentFilter = 'pending';
        } else if (button.id === 'filter-completed') {
            currentFilter = 'completed';
        } else {
            currentFilter = 'all';
        }
        
        // 3. Aplica o novo filtro
        applyFilter();
    });
});


// (Opcional) Adicionar algumas tarefas iniciais para teste
addTask("Concluir Aula 3 - Eventos");
addTask("Revisar Delegação de Eventos");
addTask("Fazer os exercícios de fixação");