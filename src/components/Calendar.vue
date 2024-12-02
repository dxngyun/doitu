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
    async fetchCalendarData() {
      try {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth() + 1;
        console.log(`Fetching calendar data for ${year}-${month}`);
        const response = await axios.get(`/doitu/api/calender/${year}/${month}`);
        console.log("API response for calendar data:", response.data);

        if (response.data.statusCode === 200) {
          this.dayData = response.data.calenderDto.map((entry) => ({
            date: entry.date,
            emoji: entry.emoji,
            events: [
              ...entry.todoDto.map((todo) => `${todo.title} (${todo.done ? "완료" : "미완료"})`),
            ],
            routine: this.processRoutine(entry.routineDto, entry.date),
          }));
          console.log("Processed day data:", this.dayData);
        } else {
          console.error("캘린더 데이터를 불러오는 데 실패했습니다:", response.data.msg);
          alert("캘린더 데이터를 불러오는 데 실패했습니다.");
        }
      } catch (error) {
        console.error("Error fetching calendar data:", error);
        alert("캘린더 데이터를 불러오는 중 오류가 발생했습니다.");
      }
    },
    async fetchDiaryData(date) {
      try {
        console.log(`Fetching diary data for ${date}`);
        const response = await axios.get(`/doitu/api/calender/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`);
        console.log("API response for diary data:", response.data);

        if (response.data.statusCode === 200) {
          const diaryData = {
            emoji: response.data.emoji || "",
            diary: response.data.diary || "",
            routines: response.data.routineDto || [],
            todos: response.data.todoDto || [],
          };
          console.log("Processed diary data:", diaryData);
          return diaryData;
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
    processRoutine(routineDto, date) {
      const weekDay = new Date(date).getDay();
      const weekKeys = ["sun", "mon", "tue", "wed", "thr", "fri", "sat"];
      const routines = routineDto
        .filter((routine) => routine[weekKeys[weekDay]])
        .map((routine) => ({
          title: routine.title,
          color: routine.color,
        }));
      console.log("Processed routines for date:", date, routines);
      return routines;
    },
    getDayData(date) {
      const formattedDate = this.formatDateToISO(date);
      const data = this.dayData.find((d) => d.date === formattedDate);
      console.log("Data for day:", formattedDate, data);
      return data;
    },
    formatDateToISO(date) {
      const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
      const isoDate = offsetDate.toISOString().split("T")[0];
      console.log("Formatted ISO date:", isoDate);
      return isoDate;
    },
    handleModalClose({ emoji, diary }) {
      console.log("Modal closed with data:", { emoji, diary });
      this.isModalOpen = false;
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
