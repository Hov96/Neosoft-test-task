<template>
    <button :disabled="disabled" class="base-btn" type="button">
        <Loading v-if="loading" />
        <slot v-else></slot>
    </button>
</template>

<script lang="ts" setup>
import Loading from './loading.vue'

const { disabled } = defineProps<{
    disabled?: boolean
    loading?: boolean
}>()
</script>
