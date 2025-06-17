import { createStore } from 'vuex'
import type { TaskStore } from '../interfaces/tasks-store.interface'

const store = createStore({
    state(): TaskStore {
        return {
            tasks: null,
            loading: false,
            error: false,
        }
    },
    getters: {
        getTasks: (state: TaskStore) => state.tasks,
        getLoading: (state: TaskStore) => state.loading,
        getError: (state: TaskStore) => state.error,
    },
    mutations: {},
    actions: {
        async fetchTasks() {
            await new Promise((resolve) => setTimeout(resolve, 1000))
        },
    },
})

export default store
