import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ITask } from "@/interfaces/interfaces";

const TaskList = ({
    tasks,
    setTasks,
}: {
    tasks: ITask[];
    setTasks: Dispatch<SetStateAction<ITask[]>>;
}) => {
    const [todos, setTodos] = useState<ITask[]>([]);
    const [working, setWorking] = useState<ITask[]>([]);
    const [done, setDone] = useState<ITask[]>([]);

    useEffect(() => {
        const filteredTodos = tasks.filter((task) => task.status === "todo");
        const filteredWorking = tasks.filter(
            (task) => task.status === "working"
        );
        const filteredDone = tasks.filter((task) => task.status === "done");

        setTodos(filteredTodos);
        setWorking(filteredWorking);
        setDone(filteredDone);
    }, [tasks]);

    enum Statuses {
        Todos = "TODOS",
        Working = "WORKING",
        Done = "DONE",
    }

    return (
        <section className="flex gap-10">
            {(Object.keys(Statuses) as Array<keyof typeof Statuses>).map(
                (key, index) => (
                    <SectionList
                        key={index}
                        status={Statuses[key]}
                        tasks={tasks}
                        setTasks={setTasks}
                        todos={todos}
                        working={working}
                        done={done}
                    />
                )
            )}
        </section>
    );
};

const SectionList = ({
    status,
    tasks,
    setTasks,
    todos,
    working,
    done,
}: {
    status: "TODOS" | "WORKING" | "DONE";
    tasks: any;
    setTasks: any;
    todos: any;
    working: any;
    done: any;
}) => {
    let bg: string = "bg-red-400";
    let taskList = todos;

    switch (status) {
        case "WORKING": {
            bg = "bg-yellow-400";
            taskList = working;
            break;
        }
        case "DONE": {
            bg = "bg-green-400";
            taskList = done;
            break;
        }

        default: {
            break;
        }
    }
    return (
        <section className="w-64">
            <Header text={status} bg={bg} count={taskList.length} />
            <ul>
                {taskList.length &&
                    taskList.map((task: ITask) => (
                        <SingleTask
                            key={task.id}
                            task={task}
                            tasks={tasks}
                            setTasks={setTasks}
                        />
                    ))}
            </ul>
        </section>
    );
};

const Header = ({ text, bg, count }: any) => {
    return (
        <>
            <h2
                className={`${bg} h-10 pl-4 rounded-full text-md flex items-center justify-center `}
            >
                {text}{" "}
                <p className="ml-2 bg-white w-5 h-5 text-black rounded-full flex items-center justify-center">
                    {count}
                </p>
            </h2>
        </>
    );
};

const SingleTask = ({ task, tasks, setTasks }: any) => {
    const deleteTask = (id: string) => {
        console.log("delete", id, task.title);

        const filteredTasks = tasks.filter((task: ITask) => task.id !== id);

        localStorage.setItem("tasks", JSON.stringify(filteredTasks));
        setTasks(filteredTasks);
    };

    return (
        <li className="relative p-4 mt-5 shadow-md rounded-md cursor-grab">
            <p className="pr-10 break-words">{task.title}</p>
            <button
                className="absolute bottom-4 right-4"
                onClick={() => deleteTask(task.id)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                </svg>
            </button>
        </li>
    );
};

export default TaskList;
