import Idea from "./Idea";
import { type Task } from '../Type';
import { updateTask, deleteTask } from '../api/tasks';


interface IdeaListProps {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

function IdeaList({ tasks, setTasks }: IdeaListProps) {
    /* const [tasks, setTasks] = useState<Task[]> ([
        {id: 1, name: "first task", completed: false},
        {id: 2, name: "second task", completed: false},
        {id: 3, name: "third task", completed: false}
    ]);
    */ 

    const handleToggle = async (id:number) =>{
        const targetTask = tasks.find(task => task.id === id);
        if (!targetTask) return;

        try{
            const updatedFromServer = await updateTask(id, { completed: !targetTask.completed });

            const updateTasks = tasks.map(task=> {
                if (task.id === id){
                    return {...task, completed: updatedFromServer.completed};
                }
                return task;
            });
            setTasks(updateTasks);
        } catch (error) {
            console.error('Failed to toggle task status:', error);
            alert('Cannot update task status.');
        }
    };

    const handleDelete = async (id:number) =>{
        try {
            await deleteTask(id);
            setTasks(tasks.filter(task => task.id !== id));
        } catch (error) {
            console.error('Failed to delete task:', error);
            alert('Cannot delete task.')
        }
    };

    const sortedTasks = [...tasks].sort((a,b)=> Number(a.completed)-Number(b.completed));

    return (
        <div className="container" >
            <hr />
            {sortedTasks.map((item) => (
                <Idea key={item.id} task={item} onToggleStatus={handleToggle} onDelete={handleDelete}/>
            ))}
        </div>
    );
}

export default IdeaList;
