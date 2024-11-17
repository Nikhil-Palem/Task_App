// Simulate data in-memory
let tasks = [
    {
      id: 1,
      title: "Sample Task 1",
      description: "This is the first sample task",
      due_date: "2024-11-20",
      status: "pending",
    },
    {
      id: 2,
      title: "Sample Task 2",
      description: "This is the second sample task",
      due_date: "2024-11-22",
      status: "in_progress",
    },
  ];
  
  // Simulate fetching all tasks
  export const getTasks = () => {
    return Promise.resolve({ data: tasks });
  };
  
  // Simulate fetching a task by ID
  export const getTaskById = (id) => {
    const task = tasks.find((task) => task.id === parseInt(id));
    return Promise.resolve({ data: task });
  };
  
  // Simulate creating a new task
  export const createTask = (task) => {
    const newTask = { ...task, id: tasks.length + 1 };
    tasks.push(newTask);
    return Promise.resolve({ data: newTask });
  };
  
  // Simulate marking a task as complete
  export const markTaskComplete = (id) => {
    tasks = tasks.map((task) =>
      task.id === parseInt(id) ? { ...task, status: "completed" } : task
    );
    return Promise.resolve();
  };
  