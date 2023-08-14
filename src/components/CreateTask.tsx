import { useState, Dispatch, SetStateAction } from "react";
import { v4 as uuid } from "uuid";
import { ITask } from "@/interfaces/interfaces";

const CreateTask = ({
    tasks,
    setTasks,
}: {
    tasks: ITask[];
    setTasks: Dispatch<SetStateAction<ITask[]>>;
}) => {
    const [task, setTask] = useState({
        id: "",
        title: "",
        status: "todo",
    });

    console.log("task", task);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (task.title.trim().length < 3 && task.title.trim().length > 140) {
            return;
        }

        setTasks((prev: ITask[]) => {
            console.log("prev state", prev);
            const list: ITask[] = [...prev, task];

            localStorage.setItem("tasks", JSON.stringify(list));

            return list;
        });

        setTask({ id: "", title: "", status: "todo" });
    };

    return (
        <form className="mb-4" onSubmit={handleSubmit}>
            <p>Create Task Component</p>
            <input
                className="px-1"
                type="text"
                value={task.title}
                onChange={(e) =>
                    setTask({ ...task, id: uuid(), title: e.target.value })
                }
            />
            <button className="bg-pink-500">Create</button>
        </form>
    );
};

export default CreateTask;
