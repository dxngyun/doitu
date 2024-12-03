<template>
  <div class = "task-column">
      <TaskCard
        v-for="(task, taskIndex) in filteredRoutineTasks"
        :key="task.id"
        :task="task"
        :index="taskIndex"
        @markAsDone="markAsDone"
        @deleteTask="deleteRoutine"
      />
      <TaskCard
        v-for="(task, taskIndex) in filteredTodoTasks"
        :key= "task.id"
        :task="task"
        :index="taskIndex"
        @markAsDone="markAsDone"
        @deleteTask="deleteTodo"
      />   
  </div>
</template>

<script>
import TaskCard from './TaskCard.vue';

export default {
  components: {
    TaskCard,
  },
  props: {
    tasks: {
      type: Object,
    },
    col: {
      type: String, // "left" 또는 "right" 값을 받음
      required: true,
    },
  },
  computed: {
    filteredRoutineTasks() {
      if (this.col === "left") {
        // col이 "left"인 경우 특정 조건의 데이터를 반환
        return this.tasks.routineDto.filter((task, index) => index % 2 === 0);
      } else {
        // col이 "right"인 경우
        return this.tasks.routineDto.filter((task, index) => index % 2 !== 0);
      }
    },
    filteredTodoTasks() {
    const isTodoLengthOdd = this.tasks.routineDto.length % 2 !== 0;

    if (this.col === "left") {
      // todoDto의 길이가 홀수일 때 반전
      if (isTodoLengthOdd) {
        return this.tasks.todoDto.filter((task, index) => index % 2 !== 0); // 원래 routineDto의 로직
      } else {
        return this.tasks.todoDto.filter((task, index) => index % 2 === 0); // 원래 todoDto의 로직
      }
    } else {
      // this.col === "right"
      if (isTodoLengthOdd) {
        return this.tasks.todoDto.filter((task, index) => index % 2 === 0); // 원래 routineDto의 로직
      } else {
        return this.tasks.todoDto.filter((task, index) => index % 2 !== 0); // 원래 todoDto의 로직
      }
    }
  },
  },
  methods: {
    markAsDone(taskId) {
      this.$emit("markAsDone", taskId);
    },
    deleteTodo(taskId) {
      this.$emit("deleteTodo", taskId);
    },
    deleteRoutine(taskId) {
      this.$emit("deleteRoutine", taskId);
    },
  },
};

</script>

<style scoped>
.task-column {
  flex: 1;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 80%;
  overflow: hidden;
}
</style>
