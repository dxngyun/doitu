<template>
  <div class="login-frame">
    <div class="icon">
      <img src="./assets/images/checked.png" alt="Check Icon" />
    </div>
    <h2 class="title">Sign in to DoitU</h2>
    <div class="login-container">
      <form class="login-form">
        <label for="id">ID</label>
        <input type="text" id="id" name="id" placeholder="Enter your ID" />
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
        />
        <button type="submit" class="btn-login">Sign in</button>
      </form>
    </div>
    <div class="signup">
      <a href="#" class="create-account">Create an account</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginFrame",
  components: {},
  data() {
    return {};
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #5cb784;
}

.login-frame {
  background-color: #31be86;
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
.signup {
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

.create-account {
  display: block;
  font-size: 15px;
  color: #0969da;
  text-decoration: none;
}

.create-account:hover {
  text-decoration: underline;
}
</style>