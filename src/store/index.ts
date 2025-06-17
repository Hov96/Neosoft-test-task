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
        getAddBtnloading: (state: TaskStore) => state.addBtnLoading,
    },
    mutations: {
        setTasks: (state: TaskStore, data: Array<Task>) => (state.tasks = data),
        setCompletedTasks: (state: TaskStore, data: Array<Task>) => (state.tasks = data),
        setUncompletedTasks: (state: TaskStore, data: Array<Task>) => (state.tasks = data),
        setTasksLoading: (state: TaskStore, loading: boolean) => (state.loading = loading),
        setTasksError: (state: TaskStore, error: boolean) => (state.loading = error),
        addTask: (state: TaskStore, task: Task) => state.tasks.push(task),
        removeTask: (state: TaskStore, taskId: number) => {
            state.tasks = state.tasks.filter((task) => task.id !== taskId)
        },

        setAddBtnLoading: (state: TaskStore, loading: boolean) => (state.addBtnLoading = loading),
        setFilter: (state: TaskStore, filter: Filters) => (state.selectedFilter = filter),
        toggleTaskCompleted: (state: TaskStore, data: { taskId: number; completed: boolean }) => {
            const task = state.tasks.find((task) => task.id === data.taskId)
            if (task) {
                task.completed = data.completed
            }
        },
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

        async addTask({ commit, dispatch }, task: Task) {
            commit('setAddBtnLoading', true)

            try {
                await dispatch('mockApiCall')
                commit('addTask', task)
            } catch (error) {
                commit('setTasksError', true)
            } finally {
                commit('setAddBtnLoading', false)
            }
            commit('setAddBtnLoading', false)
        },

        async mockApiCall() {
            return await new Promise((resolve) => setTimeout(resolve, 1500)) // Mock API call
        },
    },
})

export default store
