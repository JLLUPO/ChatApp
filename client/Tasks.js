document.addEventListener('DOMContentLoaded', () => {
    // Initialize variables
    let draggedTask = null;
    let taskIdCounter = 5; // Starting from 5 since we have 4 mock tasks

    // Task management functions
    function initializeTasks() {
        // Add drag and drop listeners to all task cards
        document.querySelectorAll('.task-card').forEach(taskCard => {
            addDragListeners(taskCard);
        });

        // Add drop zone listeners to all task lists
        document.querySelectorAll('.task-list').forEach(taskList => {
            addDropZoneListeners(taskList);
        });

        // Update all column task counts
        updateAllTaskCounts();

        // Initialize Add Task functionality
        initializeAddTaskForm();
    }

    function addDragListeners(taskCard) {
        taskCard.addEventListener('dragstart', (e) => {
            draggedTask = taskCard;
            taskCard.classList.add('dragging');
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', taskCard.getAttribute('data-task-id'));
        });

        taskCard.addEventListener('dragend', () => {
            draggedTask.classList.remove('dragging');
            draggedTask = null;
            // Update task counts after drag
            updateAllTaskCounts();
        });
    }

    function addDropZoneListeners(dropZone) {
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('drag-over');
        });

        dropZone.addEventListener('dragleave', () => {
            dropZone.classList.remove('drag-over');
        });

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('drag-over');
            if (draggedTask) {
                const afterElement = getDragAfterElement(dropZone, e.clientY);
                if (afterElement) {
                    afterElement.parentElement.insertBefore(draggedTask, afterElement);
                } else {
                    dropZone.appendChild(draggedTask);
                }
            }
        });
    }

    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.task-card:not(.dragging)')];
        
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    function updateAllTaskCounts() {
        document.querySelectorAll('.kanban-column').forEach(column => {
            const count = column.querySelector('.task-list').children.length;
            column.querySelector('.task-count').textContent = count;
        });
    }

    function initializeAddTaskForm() {
        const addTaskBtn = document.getElementById('showAddTaskForm');
        const addTaskForm = document.querySelector('.add-task-form');
        const cancelBtn = document.getElementById('cancelAddTask');
        const submitBtn = document.getElementById('submitAddTask');

        // Show form
        addTaskBtn.addEventListener('click', () => {
            addTaskBtn.style.display = 'none';
            addTaskForm.style.display = 'flex';
        });

        // Hide form
        cancelBtn.addEventListener('click', () => {
            addTaskForm.style.display = 'none';
            addTaskBtn.style.display = 'flex';
            resetForm();
        });

        // Submit form
        submitBtn.addEventListener('click', () => {
            const taskName = document.getElementById('taskName').value.trim();
            const assignee = document.getElementById('taskAssignee').value;
            const priority = document.getElementById('taskPriority').value;

            if (taskName && assignee && priority) {
                addNewTask(taskName, assignee, priority);
                resetForm();
                addTaskForm.style.display = 'none';
                addTaskBtn.style.display = 'flex';
            }
        });
    }

    function addNewTask(name, assignee, priority) {
        const today = new Date();
        const date = today.toLocaleDateString('en-US', {
            month: 'numeric',
            day: 'numeric',
            year: '2-digit'
        });

        const taskCard = document.createElement('div');
        taskCard.className = 'task-card';
        taskCard.draggable = true;
        taskCard.dataset.taskId = taskIdCounter++;

        taskCard.innerHTML = `
            <div class="task-content">
                <h4>${name}</h4>
                <p class="task-meta">${assignee} • ${date}</p>
                <div class="task-priority ${priority.toLowerCase()}">${priority} Priority</div>
            </div>
        `;

        // Add drag listeners to new task
        addDragListeners(taskCard);

        // Add to Todo column
        const todoList = document.querySelector('#todo .task-list');
        todoList.appendChild(taskCard);
        updateAllTaskCounts();
    }

    function resetForm() {
        document.getElementById('taskName').value = '';
        document.getElementById('taskAssignee').value = '';
        document.getElementById('taskPriority').value = '';
    }

    // Initialize tasks when loaded
    initializeTasks();
});
