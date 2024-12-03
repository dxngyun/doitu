<template>
  <div class="sidebar">
    <div class="title-container">
      <label for="title" class="label">제목</label>
      <input
        id="title"
        v-model="newTask.title"
        type="text"
        class="input"
        placeholder="Enter title"
      />
    </div>

    <div class="content-container">
      <label for="content" class="label">내용</label>
      <textarea
        id="content"
        v-model="newTask.content"
        class="textarea"
        placeholder="Enter content"
      ></textarea>
    </div>

    <div>
      <label class="label">루틴</label>
      <div class="routine-container">
        <button
          v-for="(day, i) in days"
          :key="i"
          :class="['routine-button', { active: newTask.routine.includes(day) }]"
          @click="toggleRoutine(day)"
        >
          {{ day }}
        </button>
      </div>
    </div>

    <div>
      <label class="label">태그</label>
      <div class="tags">
        <button
          v-for="(tag, i) in tagColors"
          :key="i"
          :style="{ backgroundColor: tag }"
          class="tag-button"
          :class="{ active: newTask.tag === tag }"
          @click="selectTag(tag)"
        ></button>
      </div>
    </div>

    <button class="add-button" @click="addTask">add</button>
  </div>
</template>

<script>
export default {
  name: "TaskSidebar",
  props: {
    days: Array,
    tagColors: Array,
  },
  data() {
    return {
      newTask: {
        title: "",
        content: "",
        routine: [],
        tag: null,
      },
    };
  },
  methods: {
    toggleRoutine(day) {
      const index = this.newTask.routine.indexOf(day);
      if (index > -1) {
        this.newTask.routine.splice(index, 1);
      } else {
        this.newTask.routine.push(day);
      }
    },
    selectTag(tag) {
      this.newTask.tag = this.newTask.tag === tag ? null : tag;
    },
    addTask() {
      console.log("Task being sent:", this.newTask);
      if (this.newTask.title && this.newTask.content) {
        this.$emit("addTask", { ...this.newTask });
        this.newTask = { title: "", content: "", routine: [], tag: null };
      } else {
        alert("제목과 내용을 입력해주세요!");
      }
    },
  },
};
</script>

<style scoped>
.sidebar {
  background: #25cd94;
  border-radius: 10px;
  padding: 15px;
  width: 20%;
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
}

.title-container{
  height: 20%;
}
.content-container{
  height: 30%;

}
.input {
  width: 90%;
  border-radius: 15px;
  border: none;
  padding: 10px;
  background-color: #f9f9f9;
  margin: 10px 5px;
  resize: none;
}
.textarea {
  width: 90%;
  height: 150px;
  border-radius: 15px;
  border: none;
  padding: 10px;
  margin: 10px 5px;
  resize: none;
}
.routine-container{
  display: flex;
  gap: 1px;
  margin-top: 10px;
}
.tags {
  display: flex;
  gap: 15px;
  margin-top: 10px;
}
.routine-button{
  width: 25px;
  height: 25px;
  border-radius: 10px;
  margin: 5px;
  border: none;
  background-color: white;
  line-height: auto;
}
.tag-button {
  width: 25px;
  height: 25px;
  border-radius: 10px;
  margin: 5px;
  border: none;
  background-color: white;
  line-height: auto;
}
.routine-button.active {
  background-color: #00c389;
  color: white;
}
.tag-button.active {
  border: 2px solid black;
}
.add-button {
  width: 100%;
  padding: 10px;
  background-color: #008a65;
  border: none;
  border-radius: 10px;
  color: white;
  cursor: pointer;
  font-size: 16px;
}
</style>