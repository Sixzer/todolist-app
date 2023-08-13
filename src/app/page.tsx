"use client";
import "./globals.css";
import CreateTask from "@/components/CreateTask";
import { useEffect, useState } from "react";
import TasksList from "@/components/TasksList";
import { ITask } from "@/interfaces/interfaces";
import { parse } from "path";

export default function Home() {
    const [tasks, setTasks] = useState<ITask[]>([]);

    console.log("tasks", tasks);

    useEffect(() => {
        //@ts-ignore
        let parsed: ITask[] = JSON.parse(localStorage.getItem("tasks"));

        if (parsed.length) {
            setTasks(parsed);
        }
    }, []);

    return (
        <main className="bg-green-500 flex flex-col items-center">
            <p>To Do List</p>
            <CreateTask tasks={tasks} setTasks={setTasks} />
            <TasksList tasks={tasks} setTasks={setTasks} />
        </main>
    );
}
