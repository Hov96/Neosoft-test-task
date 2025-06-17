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

                    <div v-for="task in store.state.tasks" :key="task.id" class="main__tasks-item">
                        <span>{{ task.title }}</span>
                        <Button @click="increment">Increment</Button>
                    </div>
                </div>

                <div class="main__tasks-filters">filters</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { LoadingSize } from './enums/loading-size.enum'

// Components
import Button from './components/base/button.vue'
import Loading from './components/base/loading.vue'
import Input from './components/base/input.vue'

const store = useStore()

const loading = computed(() => store.getters.getLoading)

const increment = () => {
    store.dispatch('increment')
}

const t = ref('')

onMounted(async () => {
    await store.dispatch('fetchTasks')
})
</script>
