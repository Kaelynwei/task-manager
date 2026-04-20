import { type Task } from '../Type';
import { Link } from 'react-router-dom';

interface IdeaProps{
    task: Task;
    onToggleStatus:(id: number) => void;
    onDelete:(id: number) => void;
}

function Idea({ task, onToggleStatus, onDelete }: IdeaProps) {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center', 
            padding: '10px', 
            borderBottom: '1px solid #eee',
            marginBottom: '10px'
        }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <input 
                    type="checkbox" 
                    id={`check-${task.id}`} 
                    onChange={() => onToggleStatus(task.id)} 
                    checked={task.completed}
                    style={{ cursor: 'pointer' }}
                />
                <label 
                    htmlFor={`check-${task.id}`}
                    style={{ 
                        marginLeft: '10px',
                        textDecoration: task.completed ? 'line-through' : 'none',
                        color: task.completed ? '#888' : '#000',
                        cursor: 'pointer'
                    }}

                >
                    <Link 
                        to={`/task/${task.id}`}
                        style={{ color: 'inherit', textDecoration: 'none' }}
                    >
                        {task.name}
                    </Link>
                </label>
            </div>
            <button
                onClick={() => onDelete(task.id)}
                style={{
                    backgroundColor: 'transparent',
                    border: '1px solid #ff4d4f',
                    color: '#ff4d4f',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '12px'
                }}
            >
                Delete
            </button>
        </div>
    );
}


export default Idea;