import { Dispatch, SetStateAction } from "react";
import { ITask } from "@/interfaces/interfaces";
import TaskHeader from "./TaskHeader";
import SingleTask from "./SingleTask";

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
        <section className="w-64">
            <TaskHeader
                text={status}
                bgColor={bgColor}
                taskCount={taskList.length}
            />
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

export default SectionList;
