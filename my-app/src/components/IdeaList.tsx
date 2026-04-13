import Idea from "./Idea";
import { type Task } from '../Type';
import { useState } from 'react';

function IdeaList() {
    const [tasks, setTasks] = useState<Task[]> ([
        {id: 1, name: "first task", completed: false},
        {id: 2, name: "second task", completed: false},
        {id: 3, name: "third task", completed: false}

    ]);
    const handleToggle = (id:number) =>{
        const updateTasks = tasks.map(task=> {
            if (task.id === id){
                return {...task, completed: !task.completed};
            }
            return task;
        });
        setTasks(updateTasks);
    };

    const handleDelete = (id:number) =>{
        setTasks(tasks.filter(task => task.id !== id))
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
