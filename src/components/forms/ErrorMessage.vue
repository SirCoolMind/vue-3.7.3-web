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
      const fieldErrors = this.errorMessages[this.field];
      return fieldErrors && fieldErrors.length > 0;
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
