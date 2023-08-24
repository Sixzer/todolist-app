import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ITask } from "@/interfaces/interfaces";
import SectionList from "./SectionList";

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

export default TaskList;
