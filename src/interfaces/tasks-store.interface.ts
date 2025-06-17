export interface TaskStore {
    tasks: null | Array<Task>
    loading: boolean
    error: boolean
    addBtnLoading: boolean
}

export interface Task {
    id: number
    title: string
    completed: boolean
}
