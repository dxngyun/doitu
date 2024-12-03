<template>
  <div class="login-frame">
    <div class="icon">
      <img src="@/assets/images/checked_white.png" alt="Check Icon" />
    </div>
    <h2 class="title">Sign up to DoitU</h2>
    <div class="login-container">
      <form class="login-form" @submit.prevent="signUp">
        <label for="id">ID</label>
        <input
          type="text"
          id="id"
          name="id"
          v-model="formData.userId"
          placeholder="Enter your ID"
        />
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          v-model="formData.password"
          placeholder="Enter your password"
        />
        <button type="submit" class="btn-login">Sign up</button>
      </form>
    </div>
  </div>
</template>


<script>
 import axios from "axios";

export default {
  name: "LoginFrame",
  data() {
    return {
      formData: {
        userId: "", // ID 입력 필드와 일치
        password: "",
      },
    };
  },
  methods: {
    signUp() {
      
      axios
        .post("/signup", {
          userId: this.formData.userId,
          password: this.formData.password,
        })
        .then((response) => {
          if (response.data.statusCode === 200) {
            alert("Sign-up successful");
            this.$router.push("/success");
          } else {
            alert("Sign-up failed: " + response.data.message);
          }
        })
        .catch((error) => {
          alert("Sign-up failed: " + error.message);
        });
      // this.$router.push("/success");
    },
  },
};
</script>

<style>
.login-frame {
  background-color: #25cd94;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.login-container {
  width: 300px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}
.icon img {
  width: 40px;
  height: 40px;
  margin-bottom: 10px;
}

.title {
  font-size: 20px;
  font-weight: bold;
  color: white;
  margin-bottom: 20px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.login-form label {
  font-size: 14px;
  color: #333333;
  text-align: left;
}

.login-form input {
  padding: 8px;
  font-size: 14px;
  border: 1px solid #cccccc;
  border-radius: 4px;
}

.btn-login {
  margin-top: 10px;
  padding: 10px;
  font-size: 14px;
  color: #ffffff;
  background-color: #1f883d;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-login:hover {
  background-color: #146828;
}
</style>
