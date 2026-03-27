interface Task{
    id: number;
    name: string;
}

function Idea() {
    return (
        <div className="container">
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="check1"/>
                <label className="form-check-label" htmlFor="check1">
                    TASK1
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="check2"/>
                <label className="form-check-label" htmlFor="check2">
                    TASK2
                </label>
                
            </div>
        </div>
    );

}


export default Idea;

/* get the value of an input element

const input = document.getElementID('taskname') as HTMLInputElment | null;
const value = input?.value;
console.log(value)
if (input != null) {
    console.log(input.value);
}

input?.addEventListener('input', function (event) {
    const target = event.target as HTMLInputElement;
    console.log(target.value);
});



get value => map
*/