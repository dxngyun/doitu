<template>
  <div class="calendar-wrapper">
    <vc-calendar
      v-model="currentDate"
      :is-expanded="true"
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
  methods: {
    // 특정 월 데이터를 가져오는 함수
    async fetchMonthData(year, month) {
      try {
        console.log(`Fetching data for ${year}-${month}`);
        const response = await axios.get(`/doitu/api/calender/${year}/${month}`);
        
        if (response.data.statusCode === 200) {
          return response.data.calenderDto.map((entry) => ({
            date: entry.date,
            emoji: entry.emoji,
            events: entry.todoDto.map((todo) => `${todo.title} (${todo.done ? "완료" : "미완료"})`),
            routine: this.processRoutine(entry.routineDto, entry.date),
          }));
        } else {
          console.error("월 데이터를 불러오는 데 실패했습니다:", response.data.msg);
          alert("월 데이터를 불러오는 데 실패했습니다.");
          return [];
        }
      } catch (error) {
        console.error("Error fetching month data:", error);
        alert("월 데이터를 불러오는 중 오류가 발생했습니다.");
        return [];
      }
    },

    // 모든 데이터를 통합해서 가져오는 함수
    async fetchCalendarData() {
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

      console.log("Combined day data:", this.dayData);
    },

    async onDayClick(day) {
      console.log("Day clicked:", day);
      const formattedDate = this.formatDateToISO(day.date);
      console.log("Formatted date:", formattedDate);

      const dayData = await this.fetchDiaryData(day.date);
      console.log("Selected day data:", dayData);

      this.selectedDayData = dayData || { events: [], routine: [], diary: "", emoji: "" };
      this.selectedDate = formattedDate;
      this.isModalOpen = true;
    },

    async fetchDiaryData(date) {
      try {
        console.log(`Fetching diary data for ${date}`);
        const response = await axios.get(`/doitu/api/calender/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`);
        console.log("API response for diary data:", response.data);

        if (response.data.statusCode === 200) {
          return {
            emoji: response.data.emoji || "",
            diary: response.data.diary || "",
            routines: response.data.routineDto || [],
            todos: response.data.todoDto || [],
          };
        } else {
          console.error("일기를 불러오는 데 실패했습니다:", response.data.msg);
          alert("일기를 불러오는 데 실패했습니다.");
        }
      } catch (error) {
        console.error("Error fetching diary data:", error);
        alert("일기를 불러오는 중 오류가 발생했습니다.");
      }
      return null;
    },

    processRoutine(routineDto, date) {
      const weekDay = new Date(date).getDay();
      const weekKeys = ["sun", "mon", "tue", "wed", "thr", "fri", "sat"];
      return routineDto
        .filter((routine) => routine[weekKeys[weekDay]])
        .map((routine) => ({
          title: routine.title,
          color: routine.color,
        }));
    },

    getDayData(date) {
      const formattedDate = this.formatDateToISO(date);
      return this.dayData.find((d) => d.date === formattedDate);
    },

    formatDateToISO(date) {
      const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
      return offsetDate.toISOString().split("T")[0];
    },

    handleModalClose({ emoji, diary }) {
    console.log("Modal closed with data:", { emoji, diary });

    // 선택된 날짜에 해당하는 dayData 업데이트
    const selectedDateData = this.dayData.find((d) => d.date === this.selectedDate);
    if (selectedDateData) {
      selectedDateData.emoji = emoji; // 이모지 업데이트
      if (diary) {
        selectedDateData.diary = diary; // 일기 업데이트 (필요 시)
      }
    }

    this.isModalOpen = false; // 모달 닫기
    },
  },
  mounted() {
    console.log("Mounted Calendar component");
    this.fetchCalendarData();
  },
  watch: {
    currentDate(newDate, oldDate) {
      if (newDate.getMonth() !== oldDate.getMonth() || newDate.getFullYear() !== oldDate.getFullYear()) {
        console.log("Date changed, fetching new calendar data");
        this.fetchCalendarData();
      }
    },
  },
};
</script>

<style scoped>
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
