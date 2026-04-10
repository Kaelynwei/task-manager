import { type Task } from '../Type';

interface IdeaProps{
    task: Task;
    onDelete:(id: number) =>void;
}

function Idea({ task, onDelete }: IdeaProps) {
    return (
        <div className="form-check d-flex justify-content-between align-items-center mb-2">

            <div>
                <input 
                    className="form-check-input" 
                    type="checkbox" 
                    id={`check-${task.id}`} 
                />
                <label 
                    className={"form-check-label"} 
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