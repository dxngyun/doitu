<template>
  <div class="screen">
    <div class="main">
      <div>
        <img src="../assets/images/checked.png" />
      </div>
      <div>
        <p class="heading-sign-in-to">
          Congratulations !
          <br />
          <br />
          Now, use DoitU to manage your schedule efficiently
        </p>
      </div>

      <div class="component">
        <div class="text">Use it now</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyScreen",
  components: {},
};
</script>

<style>
body {
  padding: 0;
  margin: 0 auto;
}

.screen {
  background-color: #31be86;
  align-items: center;
  height: 100vh;
  justify-content: center;
  display: flex;
  text-align: center;
}

.screen .main {
  display: flex;
  align-items: center;
  text-align: center;
  flex-direction: column;
  gap: 16px;
}

.screen .heading-sign-in-to {
  align-self: stretch;
  color: white;
  font-family: "Noto Sans-Bold", Helvetica;
  font-size: 28.2px;
  font-weight: 700;
  letter-spacing: -0.5px;
  line-height: 36px;
  position: relative;
  text-align: center;
}

.screen .component {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1f883d;
  border: 1px solid;
  border-color: #1f232826;
  border-radius: 6px;
  flex-direction: column;
  overflow: hidden;
  width: 300px;
}

.screen .text {
  color: #ffffff;
  font-family: var(--github-com-noto-sans-display-medium-font-family);
  font-size: var(--github-com-noto-sans-display-medium-font-size);
  font-style: var(--github-com-noto-sans-display-medium-font-style);
  font-weight: var(--github-com-noto-sans-display-medium-font-weight);
  letter-spacing: var(--github-com-noto-sans-display-medium-letter-spacing);
  line-height: var(--github-com-noto-sans-display-medium-line-height);
  /* margin-left: -51.69px;
  margin-right: -51.69px;
  margin-top: -1px; */
  position: relative;
  text-align: center;
  white-space: nowrap;
  width: fit-content;
}

.screen .component-1 {
  height: 32px !important;
  left: 704px !important;
  position: absolute !important;
  top: 128px !important;
  width: 32px !important;
}
</style>