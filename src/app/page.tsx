"use client";
import "./globals.css";
import { v4 as uuid } from "uuid";
import CreateTask from "@/components/CreateTask";
import { useEffect, useState } from "react";
import TasksList from "@/components/TasksList";

export default function Home() {
    interface ITask {
        id: string;
        title: string;
        status?: string;
    }

    const [tasks, setTasks] = useState<any[]>([]);

    console.log("tasks", tasks);

    useEffect(() => {
        setTasks(JSON.parse(localStorage.getItem("tasks")));
    }, []);

    return (
        <>
            <header className="bg-yellow-400">
                <p>header</p>
            </header>
            <main className="bg-green-500 flex flex-col items-center">
                <p>main</p>
                <CreateTask tasks={tasks} setTasks={setTasks} />
                <TasksList tasks={tasks} setTasks={setTasks} />
            </main>
            <footer className="bg-blue-500">
                <p>footer</p>
            </footer>
        </>
    );
}
