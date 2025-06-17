import { createStore } from 'vuex'
import type { Task, TaskStore } from '../interfaces/tasks-store.interface'
import { tasks } from '../constants'
import { Filters } from '../enums/filters.enum'

const store = createStore({
    state(): TaskStore {
        return {
            tasks: [],
            loading: false,
            error: false,
            addBtnLoading: false,

            filters: [Filters.ALL, Filters.COMPLETED, Filters.UNCOMPLETED],
            selectedFilter: Filters.ALL,
        }
    },
    getters: {
        getTasks: (state: TaskStore) => state.tasks,
        getCompletedTasks: (state: TaskStore) => state.tasks?.filter((task) => task.completed) || [],
        getUncompletedTasks: (state: TaskStore) => state.tasks?.filter((task) => !task.completed) || [],
        getLoading: (state: TaskStore) => state.loading,
        getError: (state: TaskStore) => state.error,

        getFilters: (state: TaskStore) => state.filters,
        getSelectedFilter: (state: TaskStore) => state.selectedFilter,
    },
    mutations: {
        setTasks: (state: TaskStore, data: Array<Task>) => (state.tasks = data),
        setCompletedTasks: (state: TaskStore, data: Array<Task>) => (state.tasks = data),
        setUncompletedTasks: (state: TaskStore, data: Array<Task>) => (state.tasks = data),
        setTasksLoading: (state: TaskStore, loading: boolean) => (state.loading = loading),
        setTasksError: (state: TaskStore, error: boolean) => (state.loading = error),

        setAddBtnLoading: (state: TaskStore, loading: boolean) => (state.addBtnLoading = loading),
        setFilter: (state: TaskStore, filter: Filters) => (state.selectedFilter = filter),
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
