<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-header">
        <h4>Add Tasks</h4>
      </div>
      <div class="card-body">
        <div class="mb-3">
          <label for="">Name</label>
          <input v-model="record.name" type="text" class="form-control" />
          <error-message :field="'name'" :error-messages="errorMessages" />
        </div>
        <div class="mb-3">
          <label for="">Is Completed</label>
          <select v-model="record.is_completed" class="form-control">
            <option disabled value="">Please select one</option>
            <option :value="true">True</option>
            <option :value="false">False</option>
          </select>
        </div>
        <div class="mb-3">
          <button type="button" @click="saveData" class="btn btn-primary">
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { getValue } from "@helpers/helpers";
import ErrorMessage from "@forms/ErrorMessage.vue"; // Adjust the path

export default {
  name: "task-create",
  components: {
    ErrorMessage,
  },
  data() {
    return {
      record: {
        name: "",
        is_completed: false,
      },

      errorMessages: {},
    };
  },
  methods: {
    // * helpers
    getValue(resource, key) {
      return getValue(resource, key);
    },
    hasError(field) {
      return (
        this.errorMessages.hasOwnProperty(field) &&
        this.errorMessages[field].length > 0
      );
    },

    saveData() {
      axios
        .post("http://laravel-10-api.test/api/v1/tasks", this.record)
        .then((res) => {
          console.log(res.data);
          alert(res.data.message);

          this.record = {
            name: "",
            is_completed: false,
          };
        })
        .catch((err) => {
          this.errorMessages = getValue(err, "response.data.errors");
        });
    },
  },
};
</script>

<style scoped>
.error-message {
  color: red;
}
</style>
