import { createStore } from 'vuex'
import type { Task, TaskStore } from '../interfaces/tasks-store.interface'
import { tasks } from '../constants'

const store = createStore({
    state(): TaskStore {
        return {
            tasks: null,
            loading: false,
            error: false,
            addBtnLoading: false,
        }
    },
    getters: {
        getTasks: (state: TaskStore) => state.tasks,
        getLoading: (state: TaskStore) => state.loading,
        getError: (state: TaskStore) => state.error,
    },
    mutations: {
        setTasks: (state: TaskStore, data: Array<Task>) => (state.tasks = data),
        setTasksLoading: (state: TaskStore, loading: boolean) => (state.loading = loading),
        setTasksError: (state: TaskStore, error: boolean) => (state.loading = error),

        setAddBtnLoading: (state: TaskStore, loading: boolean) => (state.addBtnLoading = loading),
    },
    actions: {
        async fetchTasks({ commit, dispatch }) {
            commit('setTasksLoading', true)

            try {
                await dispatch('mockApiCall')
                commit('setTasks', tasks)
            } catch (error) {
                commit('setTasksError', true)
            } finally {
                commit('setTasksLoading', false)
            }
            commit('setTasksLoading', false)
        },

        async addTask({ commit, dispatch }) {
            commit('setAddBtnLoading', true)
            await dispatch('mockApiCall')
        },

        async mockApiCall() {
            return await new Promise((resolve) => setTimeout(resolve, 1500)) // Mock API call
        },
    },
})

export default store
