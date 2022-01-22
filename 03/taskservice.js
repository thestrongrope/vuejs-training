import SERVER_URL from './settings.js'; 

// Data Store
const TaskService = {
    tasks: [],
    async fetch() {
        this.tasks = await fetch(SERVER_URL)
            .then(response => response.json());
        return this.tasks;
    },
    async add(t) {
        return await fetch(SERVER_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(t),
            })
            .then(response => response.json())
            .then(task => {
                t.id = task.id;
                this.tasks.push(t);
                task.id
            });
    },
    async complete(t) {
    },
    async delete(t) {
    }
}

export { TaskService as default }