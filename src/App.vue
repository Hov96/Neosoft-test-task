<template>
    <div class="main">
        <div class="main__loading" v-if="loading">
            <Loading :size="LoadingSize.LARGE" />
        </div>

        <div class="main__content" v-else>
            <div class="main__content-header">
                <h1>Tasks list should be done</h1>
                <span>Please check the tasks, that already done successfully</span>
            </div>

            <div class="main__tasks">
                <div class="main__tasks-list">
                    <div class="main__tasks-add">
                        <Input v-model="title" placeholder="Task title" />
                        <Button
                            :loading="store.getters.getAddBtnloading"
                            :disabled="store.getters.getAddBtnloading || !title.trim()"
                            @click="addTask"
                        >
                            Add
                        </Button>
                    </div>

                    <template v-if="tasks.length">
                        <Task
                            v-for="task in tasks"
                            :key="task.id"
                            :title="task.title"
                            :completed="task.completed"
                            @toggleCompleted="(checked) => toggleCompleted(task.id, checked)"
                            @removeTask="store.commit('removeTask', task.id)"
                        />
                    </template>

                    <div v-else class="main__tasks-empty">
                        <span>No tasks found</span>
                    </div>
                </div>

                <div class="main__tasks-filters">
                    <h2>Filters</h2>

                    <Button
                        v-for="filter in filters"
                        :key="filter"
                        :variant="ButtonVariant.SECONDARY"
                        :disabled="selectedFilter === filter"
                        @click="store.commit('setFilter', filter)"
                    >
                        {{ filter }}
                    </Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { LoadingSize } from './enums/loading-size.enum'
import { ButtonVariant } from './enums/button-variant.enum'
import { Filters } from './enums/filters.enum'
import type { Task as TaskType } from './interfaces/tasks-store.interface'

// Components
import Button from './components/base/button.vue'
import Loading from './components/base/loading.vue'
import Input from './components/base/input.vue'
import Task from './components/task.vue'

const store = useStore()

const loading = computed(() => store.getters.getLoading)
const filters = computed<Filters[]>(() => store.getters.getFilters)
const tasks = computed<TaskType[]>(() => {
    switch (selectedFilter.value) {
        case Filters.ALL:
            return store.getters.getTasks
        case Filters.COMPLETED:
            return store.getters.getCompletedTasks
        case Filters.UNCOMPLETED:
            return store.getters.getUncompletedTasks
        default:
            return []
    }
})
const selectedFilter = computed<Filters>(() => store.getters.getSelectedFilter)

const title = ref('')

const addTask = () => {
    const value = title.value.trim()
    if (value) {
        const task = {
            id: Date.now(),
            title: value,
            completed: false,
        }
        store.dispatch('addTask', task)
        title.value = ''
    }
}

const toggleCompleted = (taskId: number, completed: boolean) => {
    store.commit('toggleTaskCompleted', { taskId, completed })
}

onMounted(async () => {
    await store.dispatch('fetchTasks')
})
</script>
