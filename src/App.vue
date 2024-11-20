<template>
  <div id="app">
    <CalendarContainer />
  </div>
</template>

<script>
import CalendarContainer from "./components/CalendarContainer.vue";

export default {
  name: "App",
  components: {
    CalendarContainer,
  },
};
</script>

<style>
#app {
  margin: 0;
  padding: 0;
  background-color: rgba(37, 205, 148, 1); /* CalendarContainer와 동일한 배경색 */
  min-height: 100vh; /* 전체 화면 높이 유지 */
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
</style>
