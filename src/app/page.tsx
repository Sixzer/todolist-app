"use client";
import "./globals.css";
import { v4 as uuid } from "uuid";
import CreateTask from "@/components/CreateTask";
import { useState } from "react";
import ListTasks from "@/components/ListTasks";
import TaskList from "@/components/ListTasks";

export default function Home() {
    const [tasks, setTasks] = useState();
    let todos = [
        { name: "delo1" },
        { name: "delo2" },
        { name: "delo3" },
        { name: "delo4" },
    ];

    function addToDo() {
        let id = uuid();
        let delo = { id, name: prompt() };
        localStorage.setItem(id, delo);
        todos.push(delo);
        console.log(todos, delo, localStorage);
    }

    return (
        <>
            <header className="bg-yellow-400">header</header>
            <main className="bg-green-500 flex flex-col items-center">
                <p>main</p>
                <CreateTask />
                <TaskList />
                <button className="bg-red-500" onClick={addToDo}>
                    button
                </button>
                <ul>
                    {todos.map((item) => {
                        return <li key={uuid()}>{item.name}</li>;
                    })}
                </ul>
            </main>
            <footer className="bg-blue-500">footer</footer>
        </>
    );
}
