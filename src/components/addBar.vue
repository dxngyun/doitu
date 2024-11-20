<template>
  <div class="container">
    <!-- Title Input -->
    <div>
      <label for="title" class="title-label">제목</label>
      <input id="title" type="text" class="input" />
    </div>

    <!-- Content Input -->
    <div>
      <label for="content" class="label">content</label>
      <textarea id="content" class="textarea"></textarea>
    </div>

    <!-- Routine Selector -->
    <div>
      <label class="label">routine</label>
      <div class="routine-container">
        <button
          v-for="(day) in days"
          :key="day"
          :class="['routine-button', { 'active': selectedDays.includes(day) }]"
          @click="toggleDay(day)"
        >
          {{ day }}
        </button>
      </div>
    </div>

    <!-- Tag Selector -->
    <div>
      <label class="label">tag</label>
      <div class="tags">
        <button
          v-for="(color) in colors"
          :key="color"
          :style="{ backgroundColor: color }"
          class="tag-button"
          :class="{'active': selectedTag === color}"
          @click="selectTag(color)"
        ></button>
      </div>
    </div>

    <!-- Add Button -->
    <button class="add-button" @click="addItem">add</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      days: ["일", "월", "화", "수", "목", "금", "토"], // 요일 배열
      selectedDays: [], // 선택된 요일들 배열
      colors: ["#80D8FF", "#FFD740", "#FFAB91", "#CE93D8", "#A5D6A7"], // 태그 색상 배열
      selectedTag: null, // 선택된 태그 색상 (하나만 선택됨)
    };
  },
  methods: {
    // 요일을 클릭 시 선택하거나 취소
    toggleDay(day) {
      if (this.selectedDays.includes(day)) {
        // 이미 선택된 요일이라면 삭제
        this.selectedDays = this.selectedDays.filter(d => d !== day);
      } else {
        // 선택되지 않은 요일이라면 추가
        this.selectedDays.push(day);
      }
    },
    // 태그를 클릭 시 선택 (하나만 선택됨)
    selectTag(color) {
      this.selectedTag = this.selectedTag === color ? null : color; // 이미 선택된 태그라면 취소, 아니면 선택
    },
  },
};
</script>

<style>
.container {
  width: 284px;
  height: 855px;
  padding: 20px;
  background-color: #00c389;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Title Input */
.title-label {
  display: block;
  margin-top: 10px;
  padding-left: 10px;
  font-size: 19px;
  color: white;
  font-weight: auto;
}
.input {
  width: 83%;
  height: 32px;
  border-radius: 15px;
  border: none;
  padding: 10px;
  margin: 10px 15px 10px 10px;
}

/* Content Input */
.label {
  display: block;
  margin-bottom: 3px;
  padding: 10px;
  font-size: 21px;
  color: white;
  font-weight: auto;
}
.textarea {
  width: 83%;
  height: 304px;
  border-radius: 15px;
  border: none;
  padding: 10px;
  margin: 10px;
  resize: none;
}

/* Routine Selector */
.routine-container {
  display: block;
  gap: 5px;
  margin: 5px;
}
.routine-button {
  width: 26px;
  height: 26px;
  border-radius: 10px;
  margin: 5px;
  border: none;
  background-color: white;
  line-height: auto;
}
.routine-button.active {
  background-color: #00c389; /* 초록색으로 활성화된 버튼 */
  color: white; /* 글씨 색상 */
}
.routine-button:hover {
  background-color: #ffeb3b;
}

/* Tag Selector */
.tags {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}
.tag-button {
  width: 30px;
  height: 30px;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  margin: 0px 10px;
}
.tag-button.active {
  border: 2px solid black; /* 클릭된 태그에 검정색 테두리 추가 */
}

/* Add Button */
.add-button {
  width: 100%;
  height: 40px;
  background-color: #00a876;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}
.add-button:hover {
  background-color: #008a65;
}


</style>
