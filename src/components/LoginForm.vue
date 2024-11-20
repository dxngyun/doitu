<template>
  <div class="background-border">
    <div class="form">
      <div class="label-username">ID</div>
      <div class="input" />
      <div class="label-password">Password</div>
      <div class="input" />
      <!-- <Component class="component-4" :hover="false" text="Sign in" variant="two" /> -->
    </div>
  </div>
</template>

<script>
import { Component } from './Component';

export default {
  name: 'BackgroundBorder',
  components: {
    Component,
  },
};
</script>

<style scoped>
.background-border {
  align-items: flex-start;
  background-color: #f6f8fa;
  border: 1px solid #d1d9e0b2;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  height: 230px;
  padding: 17px;
  position: relative;
}

.background-border .form {
  align-self: stretch;
  height: 186px;
  position: relative;
  width: 100%;
}

.background-border .label-username {
  color: #1f2328; /* GitHub shark color */
  font-family: 'Noto Sans', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
  position: absolute;
  top: -1px;
  width: 177px;
  white-space: nowrap;
}

.background-border .input {
  background-color: #ffffff;
  border: 1px solid #d1d9e0;
  border-radius: 6px;
  box-shadow: inset 0px 1px 0px 1px #1f23280a;
  height: 32px;
  position: absolute;
  width: 254px;
}

.background-border .input:nth-child(1) {
  top: 29px;
}

.background-border .label-password {
  color: #1f2328; /* GitHub shark color */
  font-family: 'Noto Sans', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
  position: absolute;
  top: 76px;
  width: 62px;
  white-space: nowrap;
}

.background-border .input:nth-child(2) {
  top: 106px;
}

.background-border .component-4 {
  position: absolute;
  top: 154px;
  left: 0 !important;
}
</style>
