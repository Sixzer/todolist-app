import { Dispatch, SetStateAction } from "react";
import { ITask } from "@/interfaces/interfaces";
import TaskHeader from "./TaskHeader";
import SingleTask from "./SingleTask";
import { useDrop } from "react-dnd";

const SectionList = ({
    status,
    tasks,
    setTasks,
    todos,
    working,
    done,
}: {
    status: "TODOS" | "WORKING" | "DONE";
    tasks: ITask[];
    setTasks: Dispatch<SetStateAction<ITask[]>>;
    todos: ITask[];
    working: ITask[];
    done: ITask[];
}) => {
    let bgColor: string = "bg-red-400";
    let taskList = todos;

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "singleTask",
        drop: (item: ITask) => addItemToSection(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    const addItemToSection = (id: string) => {
        setTasks((prev) => {
            const modifiedTasks = prev.map((task) => {
                if (task.id === id) {
                    return { ...task, status: status };
                }
                return task;
            });

            localStorage.setItem("tasks", JSON.stringify(modifiedTasks));

            return modifiedTasks;
        });
    };

    switch (status) {
        case "WORKING": {
            bgColor = "bg-yellow-400";
            taskList = working;
            break;
        }
        case "DONE": {
            bgColor = "bg-green-400";
            taskList = done;
            break;
        }
        default: {
            break;
        }
    }
    return (
        <section
            ref={drop}
            className={`w-64 rounded-md p-2 ${isOver ? "bg-indigo-200" : ""}`}
        >
            <TaskHeader
                text={status}
                bgColor={bgColor}
                taskCount={taskList.length}
            />
            <ul>
                {taskList.length !== 0 &&
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

export default SectionList;
