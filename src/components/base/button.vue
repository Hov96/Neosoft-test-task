<template>
    <button
        :disabled="disabled"
        class="base-btn"
        :class="{
            'base-btn__secondary': variant === ButtonVariant.SECONDARY,
            'base-btn__danger': variant === ButtonVariant.DANGER,
        }"
        type="button"
    >
        <Loading v-if="loading" />
        <slot v-else></slot>
    </button>
</template>

<script lang="ts" setup>
import { ButtonVariant } from '../../enums/button-variant.enum'
import Loading from './loading.vue'

const {
    disabled,
    loading,
    variant = ButtonVariant.PRIMARY,
} = defineProps<{
    disabled?: boolean
    loading?: boolean
    variant?: ButtonVariant
}>()
</script>
