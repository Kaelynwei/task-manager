import Idea from "./Idea";
import { type Task } from '../Type';
import { useState } from 'react';

function IdeaList() {
    const [tasks, setTasks] = useState<Task[]> ([
        {id: 1, name: "first task"},
        {id: 2, name: "second task"},
        {id: 3, name: "third task"}

    ]);
    
    const handleDelete = (id:number) =>{
        setTasks(tasks.filter(task => task.id != id))
    };


    return (
        <div className="container" >
            <hr />
            {tasks.map((item) => (
                <Idea key={item.id} task={item}  onDelete={handleDelete}/>
            ))}
        </div>
    );
}

export default IdeaList;
