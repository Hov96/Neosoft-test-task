<template>
    <div>
        <span>{{ title }}</span>
    </div>
</template>

<script setup lang="ts">
const { title } = defineProps<{
    title: string
}>()
</script>
