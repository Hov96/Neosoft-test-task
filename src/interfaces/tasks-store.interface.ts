import type { Filters } from '../enums/filters.enum'

export interface TaskStore {
    tasks: Array<Task>
    loading: boolean
    error: boolean
    addBtnLoading: boolean
    filters: Array<Filters>
    selectedFilter: Filters
}

export interface Task {
    id: number
    title: string
    completed: boolean
}
