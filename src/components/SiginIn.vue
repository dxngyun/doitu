<template>
  <div class="login-frame">
    <div class="link" />

    <div class="main">
        <div class="heading-sign-in-to"> Sign in to DoitU </div> 
    
    <!-- <img
        class="background-border"
        alt="Background border"
        :src="backgroundBorder"
        /> -->
  </div>

  <!-- <img class="border" alt="Border" :src="border" /> -->

  <Component1 class="component" color="white" />
  </div>

</template>

<script>
import Component1 from "./Component1";
// import backgroundBorder from "./background-border.png";
// import border from "./border.png";

export default {
    name: "LoginFrame",
    components: {
        Component1,
    },
    data(){
        return {
            // backgroundBorder,
            // border,
        };
    },
};
</script>

<style>
.login-frame{
    background-color: #31be86;
    height: 612px;
    position: relative;
    width: 1440px;
}

.login-frame .link{
    background-color: #1f6feb;
    height: 1px;
    left: 0;
    position: absolute;
    top: 0;
    width: 1px;
}

.login-frame .main {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 16px;
    left: 560px;
    padding: 0px 16px;
    position: absolute;
    top: 144px;
    width: 320px;
}

.login-frame .heading-sign-in-to{
color: var(--githubcompolar);
font-family: var(--github-com-semantic-geading-1-font-family);
font-size: var(--github-com-semantic-geading-1-font-size);
font-style: var(--github-com-semantic-geading-1-font-style);
font-weight: var(--github-com-semantic-geading-1-font-weight);
letter-spacing: var(--github-com-semantic-geading-1-letter-spacing);
line-height: var(--github-com-semantic-geading-1-line-height);
margin-top: -1.00px;
position: relative;
text-align: center;
white-space: nowrap;
width: fit-content;
}

.login-frame .background-border {
    align-self: stretch;
    height: 230px;
    position: relative;
    width: 100%;
}

.login-frame .border {
    height: 55px;
    left: 576px;
    position: absolute;
    top: 452px;
    position: absolute;
    top: 452px;
    width: 288px;
}

.login-frame .compoent {
    height: 32px !important;
    left: 704px !important;
    position: absolute !important;
    top: 112px !important;
    width: 32px !important;
}

</style>