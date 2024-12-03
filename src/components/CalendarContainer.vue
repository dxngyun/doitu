<template>
  <div class="calendar-container">
    <div class="header">
      <div class="logo">
        <span><img src="@/assets/images/checked_green.png" /></span> DoitU
      </div>
      <div class="navigation">
        <button class="calendar-btn" @click="goToMain">Main</button>
      </div>
    </div>

    <!-- 캘린더 추가 -->
    <div class="calendar-content">
      <Calendar />
    </div>
  </div>
</template>

<script>
import Calendar from "@/components/Calendar.vue";

export default {
  name: "CalendarContainer",
  methods: {
    goToMain() {
      this.$router.push("/mainContainer"); // Main으로 이동
    },
  },
  components: {
    Calendar,
  },
};
</script>

<style scoped>
/* 전체 컨테이너 스타일 */
.calendar-container {
  background-color: #e9f7ef;
  padding: 20px 30px;
  border-radius: 10px;
  margin: 50px auto; /* 상단과 하단에 50px 여백 추가 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 900px; /* 컨테이너 너비 제한 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}


/* 상단 헤더 스타일 */
.header {
  width: 100%; /* 헤더가 캘린더 전체 너비 차지 */
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.logo {
  font-size: 24px;
  font-weight: bold;
  color: rgba(37, 205, 148, 1);
  display: flex;
  align-items: center;
}

.logo span {
  font-size: 18px;
  margin-right: 5px;
}

.navigation {
  display: flex;
  align-items: center;
}

/* Main 버튼 스타일 */
.calendar-btn {
  background-color: #66bb6a;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.calendar-btn:hover {
  background-color: #43a047;
}

/* 캘린더 컨텐츠 스타일 */
.calendar-content {
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%; /* 캘린더가 컨테이너 너비를 채우도록 */
  display: flex;
  justify-content: center; /* 캘린더 내용 수평 중앙 정렬 */
}
</style>
