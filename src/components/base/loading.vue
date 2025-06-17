<template>
    <div
        class="spinner"
        :class="{
            spinner__sm: size === LoadingSize.SMALL,
            spinner__md: size === LoadingSize.MEDIUM,
            spinner__lg: size === LoadingSize.LARGE,
        }"
    ></div>
</template>

<script setup lang="ts">
import { LoadingSize } from '../../enums/loading-size.enum'

const { size = LoadingSize.SMALL } = defineProps<{
    size?: LoadingSize
}>()
</script>
