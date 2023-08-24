"use client";
import "./globals.css";
import CreateTask from "@/components/CreateTask";
import { useEffect, useState } from "react";
import TaskList from "@/components/TaskList";
import { ITask } from "@/interfaces/interfaces";

export default function Home() {
    const [tasks, setTasks] = useState<ITask[]>([]);

    useEffect(() => {
        //@ts-ignore
        let parsed: ITask[] = JSON.parse(localStorage.getItem("tasks"));

        if (parsed.length) {
            setTasks(parsed);
        }
    }, []);

    return (
        <main className=" flex flex-col items-center">
            <h1>To Do List</h1>
            <CreateTask tasks={tasks} setTasks={setTasks} />
            <TaskList tasks={tasks} setTasks={setTasks} />
        </main>
    );
}
