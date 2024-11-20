<template>
  <div>
    <!-- Card Container for Logo and Navigation -->
    <div class="card">
      <div class="logo">
        <span><img src="./assets/images/checked_green.png" /></span> DoitU
      </div>
      <div class="navigation">
        <button class="calendar-btn">Calendar</button>
        <div class="status-filters">
          <button class="status all">All</button>
          <button class="status working">
            🔥 Working..! <span class="count">2</span>
          </button>
          <button class="status done">
            🌈 Done..! <span class="count">0</span>
          </button>
        </div>
      </div>
    </div>

    <!-- AddBar Component -->
    <div class="left_addbar">
      <addBar />
    </div>
  </div>
</template>


<script>
import addBar from "./components/addBar.vue";
export default {
  components: {
    addBar, // Register the component here
  },
};
</script>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: rgba(37, 205, 148, 1); /* 녹색 배경 */
}

.card {
  background-color: #fff; /* White background for the card */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 20px;
}

.Container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f4f4f4; /* 밝은 회색 배경 */
  padding: 15px 30px;
  border-radius: 10px;
  margin: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%; /* Ensure full width of the container */
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
  gap: 15px;
}

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

.status-filters {
  display: flex;
  gap: 10px;
}

.status {
  background-color: white;
  color: #43a047;
  border: none;
  padding: 10px 15px;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
}

.status .count {
  background-color: #e0e0e0;
  color: #43a047;
  padding: 3px 7px;
  border-radius: 50%;
  font-size: 12px;
  font-weight: bold;
}

.status:hover {
  background-color: #e8f5e9;
  color: #2e7d32;
}

/* Position the addBar component to the left */
.left_addbar {
  display: flex;
  justify-content: flex-start; /* Align to the left */
  flex: 1; /* Allow the left side to take up available space */
}

</style>
