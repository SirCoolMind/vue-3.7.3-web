<template>
  <div class="container pt-4">
    <div class="card">
      <div class="card-header">
        <h4>
          Tasks
          <RouterLink to="/tasks/create" class="btn btn-primary float-end">
            Add Task
          </RouterLink>
        </h4>
      </div>
      <div class="card-body">
        <table class="table table-bordered table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Status</th>
              <th>Created At</th>
              <th class="text-center">Action</th>
            </tr>
          </thead>
          <tbody v-if="tasks.length > 0">
            <tr v-for="(task, index) in tasks" :key="index">
              <td>{{ index+1 }}</td>
              <td>{{ task.name }}</td>
              <td>{{ task.is_completed }}</td>
              <td>{{ task.created_at }}</td>
              <td>
                <div class="d-flex justify-content-center">
                  <RouterLink :to="{ path: '/tasks/' + task.id + '/edit' }" class="btn btn-info min-width-5em ms-3"> Edit </RouterLink>
                  <button v-show="!task.is_completed" type="button" class="btn btn-success min-width-5em ms-3" @click="completeTask(task.id)">
                    Complete
                  </button>
                  <button v-show="task.is_completed" disabled type="button" class="btn btn-secondary min-width-5em ms-3" @click="completeTask(task.id)">
                    Completed
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="5">Loading...</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "tasks",
  data() {
    return {
      tasks: [],
      is_completed: true,
    };
  },
  mounted() {
    this.getTasks();
    // console.log("i am here in mounted");
  },
  methods: {
    getTasks() {
      axios.get("http://laravel-10-api.test/api/v1/tasks").then((res) => {
        console.log(res);
        let data = res.data;
        this.tasks = data.data;
        console.log(this.tasks);
      });
    },

    completeTask(task_id) {

      let formData = new FormData();
      formData.append('_method', 'PATCH');
      formData.append('is_completed', 1 );

      axios
      .post("http://laravel-10-api.test/api/v1/tasks/"+task_id+"/complete", formData)
      .then((res) => {
        this.getTasks();
      })
      .catch((err) => {
        console.log(err);
      });
    },
  },
};
</script>
