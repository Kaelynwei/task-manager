import { useState } from "react"

interface AddTaskFormProps {
    onAdd: (title: string) => void
}

function AddTaskForm ({ onAdd }: AddTaskFormProps) {
    const [name, setName] = useState("");

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (name.trim()) {
            onAdd(name);
            setName("");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Task: </label>
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                />
            </div>
            <button type="submit">
                Add Task
            </button>
        </form>
    )
}


export default AddTaskForm