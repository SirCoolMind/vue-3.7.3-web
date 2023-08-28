<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-header d-flex justify-content-between">
        <RouterLink to="/tasks/create" class="btn btn-success min-width-5em">
          New
        </RouterLink>
        <h4>Edit Task</h4>
        <button class="btn btn-danger min-width-5em"
          @click="showDialog"
        > Delete </button>
      </div>
      <div class="card-body">
        <div class="mb-3">
          <label for="">Name</label>
          <input v-model="record.name" type="text" class="form-control"/>
          <error-message :field="'name'" :error-messages="errorMessages"/>
        </div>
        <div class="mb-3">
          <label for="">Is Completed</label>
          <select v-model="record.is_completed" class="form-control">
            <option disabled value="" >Please select one </option>
            <option :value="true">True</option>
            <option :value="false">False</option>
          </select>
        </div>
        <div class="d-flex justify-content-end">
            <button type="button" @click="saveData" class="btn btn-primary min-width-5em"> Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { getValue } from "@helpers/helpers";
import ErrorMessage from "@forms/ErrorMessage.vue";
import ModalDialog from '@forms/ModalDialog.vue'
import { createConfirmDialog } from 'vuejs-confirm-dialog'

export default {
  name: "task-edit",
  components: {
    ErrorMessage,
  },
  created() {
    this.getData();
  },
  data() {
    return {
      recordId: this.$route.params.recordId,
      record: {
        name: "",
        is_completed: false,
      },

      errorMessages: {},
      showConfirmDeleteRecord: false,
      deleteDialog: null,
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

    showDialog(){
      this.deleteDialog = createConfirmDialog(ModalDialog, {question: 'Are you sure to delete this data?'});

      this.deleteDialog.onConfirm(() => {
        this.deleteData();
      })

      this.deleteDialog.reveal()
    },

    getData() {
      axios
        .get("http://laravel-10-api.test/api/v1/tasks/"+ this.recordId)
        .then((res) => {

          console.log(res.data);
          this.record = getValue(res, 'data.data');
        })
        .catch((err) => {
          console.log(err);
          // this.errorMessages = getValue(err, "response.data.errors");
        });
    },

    saveData() {

      this.errorMessages = {};

      axios
        .put("http://laravel-10-api.test/api/v1/tasks/"+ this.recordId, this.record)
        .then((res) => {
          console.log(res.data);
          alert(getValue(res, "data.message"));

          this.$router.replace({
            name: "task-edit",
            params: { recordId: this.recordId }
          });

        })
        .catch((err) => {
          console.log(err);
          this.errorMessages = getValue(err, "response.data.errors") ?? {};
        });
    },

    deleteData() {

      this.errorMessages = {};

      axios
        .delete("http://laravel-10-api.test/api/v1/tasks/"+ this.recordId)
        .then((res) => {
          console.log(res.data);
          alert(getValue(res, "data.message"));

          this.$router.replace({
            name: "tasks",
          });

        })
        .catch((err) => {
          console.log(err)
          // this.errorMessages = getValue(err, "response.data.errors");
          this.deleteDialog.closeAll();
        });
    },
  },
};
</script>
