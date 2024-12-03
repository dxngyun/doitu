<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  background-color: #25cd94;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>