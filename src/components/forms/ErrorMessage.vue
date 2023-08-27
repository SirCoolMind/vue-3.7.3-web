<!-- ErrorMessage.vue -->
<template>
    <p v-if="hasError" class="error-message">{{ errorMessage }}</p>
</template>

<script>
export default {
props: {
    field: String,
    errorMessages: Object,
},
computed: {
    hasError() {
    return this.errorMessages.hasOwnProperty(this.field) && this.errorMessages[this.field].length > 0;
    },
    errorMessage() {
    return this.errorMessages[this.field];
    },
},
};
</script>

<style>
.error-message {
    color: red;
}
</style>
  