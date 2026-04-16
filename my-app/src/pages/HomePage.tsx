import IdeaList from '../components/IdeaList';
import { type Task } from '../Type';
import { Dispatch, SetStateAction } from 'react';

interface HomePageProps {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
}


function HomePage({ tasks, setTasks}: HomePageProps){
  return (
    <div>
      <h2>My Tasks</h2>
      <IdeaList tasks={tasks} setTasks = {setTasks} />
    </div>
  );
}

export default HomePage;