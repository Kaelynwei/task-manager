import { type Task } from '../Type';

interface IdeaProps{
    task: Task;
    onToggleStatus:(id: number) =>void;
    onDelete:(id: number) =>void;
}

function Idea({ task, onToggleStatus, onDelete }: IdeaProps) {
    return (
        <div className="form-check d-flex justify-content-between align-items-center mb-2">
            <div>
                <input 
                    className="form-check-input" 
                    type="checkbox" 
                    id={`check-${task.id}`} 
                    onChange={() => onToggleStatus(task.id)} 
                    checked={task.completed}
                />
                <label 
                    className={`form-check-label ${task.completed ? 'text-decoration-line-through text-muted' : ''}`} 
                    htmlFor={`check-${task.id}`}
                >
                    {task.name}
                </label>
            </div>
            <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => onDelete(task.id)}
            >
                Delete
            </button>
        </div>
    );
}


export default Idea;