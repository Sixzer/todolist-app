import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

const CreateTask = ({ tasks, setTasks }) => {
    interface ITask {
        id: string;
        title: string;
        status?: string;
    }

    const [task, setTask] = useState({
        id: "",
        title: "",
        status: "todo",
    });

    console.log("task", task);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setTasks((prev) => {
            const list = [...prev, task];

            localStorage.setItem("tasks", JSON.stringify(list));

            return list;
        });
    };

    return (
        <form className="bg-pink-500" onSubmit={handleSubmit}>
            <p>Create Task Component</p>
            <input
                className="px-1"
                type="text"
                value={task.title}
                onChange={(e) =>
                    setTask({ ...task, id: uuid(), title: e.target.value })
                }
            />
            <button type="submit">Create</button>
        </form>
    );
};

export default CreateTask;
