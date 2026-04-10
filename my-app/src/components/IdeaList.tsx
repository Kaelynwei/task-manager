import Idea from "./Idea";

interface Task {
    id: number;
    name: string;

}

function IdeaList() {
    let myIdeas: Task[] = [
        {id: 1, name: "first task"},
        {id: 2, name: "second task"},
        {id: 3, name: "third task"}

    ];

    return (
        <div className="container">
            <hr />
            {myIdeas.map((item) => (
                <Idea key = {item.id} task = {item} />
            ))}
        </div>
    );

}

export default IdeaList;
