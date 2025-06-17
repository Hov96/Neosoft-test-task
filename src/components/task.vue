<template>
    <div class="task__wrapper">
        <Checkbox :modelValue="completed" @update:modelValue="(checked) => $emit('toggleCompleted', checked)" />
        <div class="task">
            <span>{{ title }}</span>

            <Button :variant="ButtonVariant.DANGER" @click="$emit('removeTask')">Remove</Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ButtonVariant } from '../enums/button-variant.enum'
import Button from './base/button.vue'
import Checkbox from './base/checkbox.vue'

const { title, completed } = defineProps<{
    title: string
    completed: boolean
}>()
</script>
