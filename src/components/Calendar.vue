<template>
  <div class="calendar-wrapper">
    <vc-calendar
      v-model="currentDate"
      :is-expanded="true"
      @update:model-value="onDateChange"
      @did-move="fetchCalendarData"
    >
      <template #day-content="{ day }">
        <div
          class="custom-day-cell"
          @click="onDayClick(day)"
        >
          <div class="day-text">{{ day.day }}</div>
          <div class="emoji" v-if="getDayData(day.date)?.emoji">
            {{ getDayData(day.date).emoji }}
          </div>
          <div class="events" v-if="getDayData(day.date)?.events">
            <span v-for="(event, index) in getDayData(day.date).events" :key="index">
              {{ event }}
            </span>
          </div>
          <div class="routine" v-if="getDayData(day.date)?.routine">
            <span
              v-for="(routine, index) in getDayData(day.date).routine"
              :key="index"
              :style="{ color: routine.color }"
            >
              {{ routine.title }}
            </span>
          </div>
        </div>
      </template>
    </vc-calendar>
    <EventModal
      v-if="isModalOpen"
      :is-visible="isModalOpen"
      :day-data="selectedDayData"
      :formatted-date="selectedDate"
      @close="handleModalClose"
    />
  </div>
</template>

<script>
import axios from "axios";
import EventModal from "./EventModal.vue";

export default {
  name: "Calendar",
  components: {
    EventModal,
  },
  data() {
    return {
      currentDate: new Date(),
      isModalOpen: false,
      selectedDayData: null,
      selectedDate: "",
      dayData: [],
    };
  },
  computed: {
    currentMonthYear() {
      return `${this.currentDate.getFullYear()}년 ${this.currentDate.getMonth() + 1}월`;
    },
  },
  methods: {
    async fetchCalendarData() {
      try {
        const currentYear = this.currentDate.getFullYear();
        const currentMonth = this.currentDate.getMonth() + 1;
        
        // 현재 월 데이터 가져오기
        const currentMonthData = await this.fetchMonthData(currentYear, currentMonth);
        
        // 이전 월 데이터 가져오기
        const prevMonth = currentMonth === 1 ? 12 : currentMonth - 1;
        const prevYear = currentMonth === 1 ? currentYear - 1 : currentYear;
        const prevMonthData = await this.fetchMonthData(prevYear, prevMonth);
        
        // 다음 월 데이터 가져오기
        const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;
        const nextYear = currentMonth === 12 ? currentYear + 1 : currentYear;
        const nextMonthData = await this.fetchMonthData(nextYear, nextMonth);
        
        // 데이터 통합
        this.dayData = [
          ...prevMonthData,
          ...currentMonthData,
          ...nextMonthData
        ];

        console.log("전체 캘린더 데이터:", this.dayData);
      } catch (error) {
        console.error("캘린더 데이터를 불러오는 중 오류:", error);
        alert("캘린더 데이터를 불러오는 중 오류가 발생했습니다.");
      }
    },

    async fetchMonthData(year, month) {
      try {
        console.log(`${year}-${month} 데이터 가져오는 중`);
        const response = await axios.get(`/doitu/api/calender/${year}/${month}`);
        
        if (response.data.statusCode === 200) {
          return response.data.calenderDto.map((entry) => ({
            date: entry.date,
            emoji: entry.emoji,
            events: entry.todoDto.map((todo) => 
              `${todo.title} (${todo.done ? "완료" : "미완료"})`
            ),
            routine: this.processRoutine(entry.routineDto, entry.date),
          }));
        }
        return [];
      } catch (error) {
        console.error(`${year}-${month} 데이터 로딩 실패:`, error);
        return [];
      }
    },

    async fetchDiaryData(date) {
      try {
        console.log(`일기 데이터 가져오기: ${date}`);
        const response = await axios.get(`/doitu/api/calender/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`);
        
        if (response.data.statusCode === 200) {
          const diaryData = {
            emoji: response.data.emoji || "",
            diary: response.data.diary || "",
            routines: response.data.routineDto || [],
            todos: response.data.todoDto || [],
          };
          console.log("일기 데이터:", diaryData);
          return diaryData;
        } else {
          console.error("일기를 불러오는 데 실패:", response.data.msg);
          alert("일기를 불러오는 데 실패했습니다.");
        }
      } catch (error) {
        console.error("일기 데이터 로딩 중 오류:", error);
        alert("일기를 불러오는 중 오류가 발생했습니다.");
      }
      return null;
    },

    async onDayClick(day) {
      console.log("선택된 날짜:", day);
      const formattedDate = this.formatDateToISO(day.date);
      console.log("포맷된 날짜:", formattedDate);

      const dayData = await this.fetchDiaryData(day.date);
      console.log("선택된 날 데이터:", dayData);

      this.selectedDayData = dayData || { events: [], routine: [], diary: "", emoji: "" };
      this.selectedDate = formattedDate;
      this.isModalOpen = true;
    },

    processRoutine(routineDto, date) {
      const weekDay = new Date(date).getDay();
      const weekKeys = ["sun", "mon", "tue", "wed", "thr", "fri", "sat"];
      const routines = routineDto
        .filter((routine) => routine[weekKeys[weekDay]])
        .map((routine) => ({
          title: routine.title,
          color: routine.color,
        }));
      console.log(`${date} 루틴:`, routines);
      return routines;
    },

    getDayData(date) {
      const formattedDate = this.formatDateToISO(date);
      const data = this.dayData.find((d) => d.date === formattedDate);
      return data;
    },

    formatDateToISO(date) {
      const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
      const isoDate = offsetDate.toISOString().split("T")[0];
      return isoDate;
    },

    handleModalClose({ emoji, diary }) {
      console.log("모달 닫힘 데이터:", { emoji, diary });
      this.fetchCalendarData(); // 데이터 새로고침
      this.isModalOpen = false;
    },

    onDateChange(newDate) {
      this.currentDate = newDate;
      console.log('날짜 변경:', newDate);
    },
  },

  mounted() {
    console.log("Calendar 컴포넌트 마운트됨");
    this.fetchCalendarData();
  },
};
</script>

<style scoped>
/* 기존 스타일 유지 */
.calendar-wrapper {
  max-width: 1000px;
  height: 500px;
  margin: 50px auto;
}

.custom-day-cell {
  width: 120px;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  position: relative;
}

.custom-day-cell:hover {
  background-color: #f5f5f5;
  transform: scale(1.05);
}

.day-text {
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 0.9rem;
  font-weight: bold;
  color: #333333;
}

.emoji {
  position: absolute;
  top: 5px;
  left: 5px;
  font-size: 0.8rem;
}

.events, .routine {
  font-size: 0.5rem;
  color: #666666;
  text-align: center;
  margin-top: 5px;
  padding: 5px;
  width: 90%;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-left: auto;
  margin-right: auto;
}

.events span, .routine span {
  display: block;
  margin-bottom: 2px;
}
</style>