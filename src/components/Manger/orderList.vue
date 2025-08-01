<template>
{{ getFormData().formData }}
{{ getFormData().orderData }}
</template>

<script setup>
import { getFormData } from '../../stores/store';
const store = getFormData()

</script>

<style scoped>

</style>