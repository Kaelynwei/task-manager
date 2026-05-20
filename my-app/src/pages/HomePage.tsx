import { Dispatch, SetStateAction } from 'react';
import { type Task } from '../Type';
import AddTaskForm from '../components/AddTaskForm';
import IdeaList from '../components/IdeaList';
import { createTask } from '../api/tasks';

interface HomePageProps {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
}

function HomePage({ tasks, setTasks }: HomePageProps) {
  const handleAddTask = async (title: string) => {
   try {
    const saveTask = await createTask(title);
    setTasks([...tasks, savedTask]);
   }
   catch (error) {
    console.error('Failed to add task:', error);
    alert('Cannot create new task.');
   }
  };

  return (
    <div>
      <h2>My Tasks</h2>
      <AddTaskForm onAdd={handleAddTask} />
      <IdeaList tasks={tasks} setTasks={setTasks} />
    </div>
  );
}

export default HomePage;