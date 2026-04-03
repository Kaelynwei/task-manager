interface Task{
    id: number;
    name: string;
}

interface IdeaProps{
    task: Task;
}

function Idea({ task }: IdeaProps) {
    return (
        <div className="form-check">
            <input className="form-check-input" type="checkbox" id={`check-${task.id}`} />
            <label className="form-check-label" htmlFor={`check-${task.id}`}>
                {task.name}
            </label>
        </div>
    );

}

export default Idea;