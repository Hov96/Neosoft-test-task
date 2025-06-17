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
                        <Input v-model="t" placeholder="Task title" />
                        <Button>Add</Button>
                    </div>

                    <template v-if="store.state.tasks.length">
                        <Task v-for="task in tasks" :key="task.id" :title="task.title" class="main__tasks-item" />
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
                        {{ filter }}</Button
                    >
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

// Components
import Button from './components/base/button.vue'
import Loading from './components/base/loading.vue'
import Input from './components/base/input.vue'
import Task from './components/task.vue'

const store = useStore()

const loading = computed(() => store.getters.getLoading)
const filters = computed<Filters[]>(() => store.getters.getFilters)
const tasks = computed(() => {
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

const t = ref('')

onMounted(async () => {
    await store.dispatch('fetchTasks')
})
</script>
