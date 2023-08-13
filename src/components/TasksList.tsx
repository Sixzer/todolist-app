import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ITask } from "@/interfaces/interfaces";
import { log } from "console";
import { stat } from "fs";

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
    }, [tasks]);

    // const letask = tasks.map((task) => <li key={task.id}>{task.title}</li>);

    enum Statuses {
        Todos = "TODOS",
        Working = "WORKING",
        Done = "DONE",
    }

    return (
        <section className="bg-red-700 flex gap-10">
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
    return (
        <section>
            <h2>{status}</h2>
            <ul>
                <li>item</li>
            </ul>
        </section>
    );
};

export default TaskList;
