export interface TaskStore {
    tasks: null | Array<Task>
    loading: false
    error: false
}

export interface Task {
    id: number
    title: string
    completed: boolean
}
