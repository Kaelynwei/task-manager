import type { Dispatch, SetStateAction } from 'react';
import { useEffect } from 'react';
import { type Task } from '../Type';
import AddTaskForm from '../components/AddTaskForm';
import IdeaList from '../components/IdeaList';
import { createTask, fetchAllTasks } from '../api/tasks';

interface HomePageProps {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
}

function HomePage({ tasks, setTasks }: HomePageProps) {
  useEffect(() => {
    const reloadTasks = async () => {
      try {
        const latestTasks = await fetchAllTasks();
        setTasks(latestTasks);
      } catch (error) {
        console.error('Failed to refresh tasks:', error);
      }
    };

    reloadTasks();
  }, [setTasks]);

  const handleAddTask = async (title: string) => {
    try {
      const savedTask = await createTask({
        title: title,
        description: '',
        dueDate: ''
      });

      setTasks([...tasks, savedTask]);
    } catch (error) {
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