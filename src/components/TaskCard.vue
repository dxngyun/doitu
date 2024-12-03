<template>
  <div class="task-card" :class="{ done: task.done, isRoutine: task.isRoutine }">
    <div class="task-header">
      <span class="task-tags" :style="{ backgroundColor: task.color }"> {{index +1}}
      </span>
      <div class="task-actions">
        <button v-if="!task.isRoutine" class="task-done" @click="markAsDone" >
          <img v-if="!task.done" src="@/assets/images/checked_black.png" alt="Done" class="done-icon" />
          <img v-if="task.done" src="@/assets/images/checked_green.png" alt="Task Done" class="done-icon"  />
        </button>
        
        <button class="task-delete" @click="deleteTask">
          <img src="@/assets/images/delete.png" alt="Done" class="done-icon" />
        </button>
      </div>
    </div>
    <div class="task-body">
      <h3 class="task-title">{{ task.title }}</h3>
      <p class="task-content">{{ task.content }}</p>
    </div>
    <div class="task-footer">
        <span v-for="(day, i) in task.day" :key="i" class="task-day">
          {{ day }}
        </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    task: Object,
    index: Number,
  },
  methods: {
    markAsDone() {
      this.$emit("markAsDone", this.task.id); // 부모 컴포넌트로 이벤트 전달
    },
    deleteTask() {
      this.$emit('deleteTask', this.task.id);
    },
  },
};
</script>

<style scoped>
.task-card {
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1px;
  font-family: Arial, sans-serif;
  width: 100%;
}
.task-card.isRoutine {
  background-color: #C9F4E9;
}
.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}
.task-tags {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 14px;
  font-weight: bold;
}
.task-delete, .task-done {
  background: none;
  border: none;
  cursor: pointer;
}
.task-body {
  margin-bottom: 12px;
}
.task-title {
  font-size: 18px;
  font-weight: bold;
  margin: 0 0 8px 0;
}
.task-content {
  font-size: 14px;
  color: #666;
  margin: 0;
}
.task-footer {
  display: flex;
  justify-content: flex-end;
}
.task-day {
  background-color: #31AF7F;
  color: #333;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
}
.done-icon {
  width: 20px;
  height: 20px;
}

</style>
