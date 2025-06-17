<template>
    <div class="base-input">
        <label v-if="label" class="base-input__label">{{ label }}</label>
        <input
            :type="type"
            :value="modelValue"
            :placeholder="placeholder"
            @input="$emit('update:modelValue', $event.target.value)"
            class="base-input__control"
        />
    </div>
</template>

<script setup lang="ts">
defineProps<{
    modelValue: string | number
    label?: string
    placeholder?: string
    type?: string
}>()

defineEmits(['update:modelValue'])
</script>
