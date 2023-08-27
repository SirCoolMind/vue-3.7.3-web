<template>
    <div>
        <div class="card">
            <div class="card-header">
                <h4>Tasks
                    <RouterLink to="/tasks/create" class="btn btn-primary float-end"> 
                        Add Task
                    </RouterLink>
                </h4>
            </div>
            <div class="card-body">
                <table class="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Created At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            
                        </tr>
                    </tbody>

                </table>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'tasks',
    data(){
        return {
            tasks: []
        }
    },
    mounted(){
        console.log("i am here in mounted");
    }

}
</script>
   