import { Dispatch, SetStateAction } from 'react';
import { type Task } from '../Type';
import AddTaskForm from '../components/AddTaskForm';
import IdeaList from '../components/IdeaList';

interface HomePageProps {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
}

function HomePage({ tasks, setTasks }: HomePageProps) {
  const handleAddTask = (title: string) => {
    const newTask: Task = {
      id: Date.now(),
      name: title,
      completed: false,
      description: "",
      dueDate: ""
    };
    setTasks([...tasks, newTask]);
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