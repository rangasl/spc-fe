
<template>
<div>

 <div class="mainSection" align="left">

<img class="spchart" src="../assets/spcchart.png">
</div>
<div class="menu" align="left">
    <a class="signAnchor" @click="navigateToLogin">Sign In</a> | <a class="support" href="#">Contact Sopport</a> |
    <a class="knowladge" href="knowledgebase.spccharts.com">Knowledgebase</a>
</div>

<img class="laptop" src="../assets/computer.png">
      
        <div class="loginSection">

            <h1 class="sign">SIGN IN</h1>

            
            <form>

<p style="padding-top: 12px;" align="left">Email Address</p>
<input @change="validateEmail" for="email" type="email" @keyup.enter="signIn" @blur="validateEmail" v-model="login.email" name="">

<p align="left">Password</p>
<input @keyup.enter="signIn"  v-model="login.password"
            type="password"
            id="password" name=""><br><br>


            <input type="button" v-on:keyup.enter="signIn" @keyup.enter="signIn" @click="signIn" name="" value="Login"><br>
      
            <div v-if="initializing">
        <div style="align-items:center;text-align:center">
        </div>
      </div>
      
            <div v-else-if="verified">
              <div style="align-items:center;text-align:center">
              <md-chip class="md-primary">Login Successfull!</md-chip>
              </div>
            </div>

            <div v-else="verified">
              <div style="align-items:center;text-align:center">
              <md-chip class="md-accent" >Please enter valid email and password.</md-chip>
              </div>
            </div>

<h5>OR</h5><br><br />

<input type="button"  @click="navigateToRegister" name="" value="Sign Up"><br>


<p>By login, you agree to our communications and usage terms.<br>
    <br>
    <!-- <button class="fogetpw">Forgot Password</button> -->

</p>

</form>
        </div>
</div>

</template>
  
<script>

import storageHelper from "../utils/storageHelper.util";
import { userApi } from "../api";

export default {
  name: "Login",
  data() {
    return {
      initializing:true,
      verified:false,
      loading: false,
      login: {
        email: "",
        password: ""
      },
      showSnackbar: false,
      errorMsg: "",
      position: "center",
      duration: 4000
    };
  },
  created() {
    const userObj = storageHelper.getUserObj();
    if (userObj) this.$router.push("/dashboard");
  },
  mounted() {
    document.getElementById("email").focus();
    document.getElementById("password").addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.signIn();
      }
    });
  },
  methods: {
    navigateToRegister() {
      this.$router.push("/register");
    },
    navigateToLogin() {
      this.$router.push("/login");
    },
    navigateToHome() {
      let redirectPath = storageHelper.getStoredData(
        storageHelper.LOGIN_REDIRECT_PATH_KEY
      );
      if (redirectPath)
        storageHelper.removeStoredData(storageHelper.LOGIN_REDIRECT_PATH_KEY);
      else redirectPath = "/dashboard";

      this.$router.push(redirectPath);
    },
    reset() {
      this.login.email = "";
      this.login.password = "";
      this.errorMsg = "";
      this.showSnackbar = false;
      this.loading = false;
    },
    validateEmail() {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
        this.msg['email'] = 'Please enter a valid email address';
    } else {
        this.msg['email'] = '';
    }
    },
    signIn() {
      this.loading = true;

      userApi.login(this.login.email, this.login.password, (res) => {
        console.log(res)
        if (res && res.response && res.response.data) {
          this.initializing =false;
          this.verified = true;
          this.reset();
          this.navigateToHome();
          this.$router.push("/dashboard");
        } else if (res && res.error) {
          this.initializing =false;
          this.verified = false;
          this.errorMsg = res.error.response.data || "something went wrong";
          this.showSnackbar = true;
          this.loading = false;
        }

        this.loading = false;
      });
    }
  }
};
</script>

<style scoped>
.div1 {
  width: 60%;
  height: 120px;
  text-align: right;
  /* border: 1px solid blue; */
}

.div2 {
  width: 28%;
  height: 100px;  
  align-items: left;
  /* border: 1px solid red; */
}
.centered-container {
  display: flex;
  position: relative;
  height: 100vh;
  padding-right: 10%;
  padding-top: 10%;
}
.centered-container .title {
  text-align: center;
  margin-bottom: 30px;
}
.centered-container .title img {
  margin-bottom: 16px;
  max-width: 80px;
}
.centered-container .actions .md-button {
  margin: 0;
}
.centered-container .form {
  margin-bottom: 60px;
}
.centered-container .background {
  background: skyblue;
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 0;
}
.centered-container .md-content-trasparent {
  background-color: rgba(255, 255, 255, 1);
  z-index: 1;
  width: 100%;
  max-width: 400px;
  position: relative;
}
.centered-container .md-content {
  z-index: 1;
  padding: 40px;
  width: 100%;
  max-width: 400px;
  position: relative;
}
.centered-container .loading-overlay {
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
}

.sign {
    margin: 10px;
    padding: 0 0 2;
    text-align: center;
}

.paragraph {
    margin-left: 38px;
}

h5 {
    max-width: 500px;
    text-align: center;
    margin: auto;
    position: relative;
}

h5:before {
    content: "";
    width: 140px;
    height: 1px;
    display: block;
    background: black;
    position: absolute;
    top: 50%;
    margin-left: 38px;
    left: 0;
}

h5:after {
    content: "";
    width: 140px;
    height: 1px;
    display: block;
    background: black;
    position: absolute;
    top: 50%;
    margin-right: 41px;
    right: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

}


.mainSection {
  background: white;
  margin: 15px;

}

.spchart {
  width: 250px;
  margin: 10px;
  position: absolute;
  margin-left: 20px;
}

.menu {
  text-decoration: none;
  padding: 32px;
  font-family: arial;
  margin-left: 280px;
}


.menu a {
  text-decoration: none;
  font-family: arial;



}

.signAnchor a {
  color: skyblue;
  font-family: arial;
}




.subSection {
  background: white;
  width: 50%;
}



.loginSection {
  width: 400px;
  height: 520px;
  background: white;
  color: gray;
  top: 50%;
  left: 80%;
  position: absolute;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  border-radius: 40px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.10);
}

.laptop {
  margin-left: 120px;
  top: 50px;
  padding-top: 50px;
  width: 550px;
}

.sign {
  color: #0096FF;
  font-size: 50px;
  padding-top: 15px;
  font-weight: 100;

}


.loginSection input {
  border: none;
  width: 80%;
  height: 40px;
  margin-bottom: 8px;
  margin-left: 38px;
  margin-right: 40px;
  box-shadow: 0 0px 0px 0 rgba(0, 0, 0, 0.1), 0 0 4px 0 rgba(0, 0, 0, 0.20);
}

.loginSection form p {
  padding-left: 18px;
  padding-bottom: 6px;
  margin-left: 23px;
}

.loginSection input[type="button"] {
  border: none;
  border-radius: 10px;
  background: #0096FF;
  width: 80%;
  height: 40px;
  color: white;
  margin-bottom: 20px;
  margin-left: 38px;
  font-size: 14px;
  font-weight: 90;
  letter-spacing: 2px;
  cursor: pointer;

}

.loginSection input[type="button"]:hover {
  border: none;
  border-radius: 10px;
  background: #1382d1;
  width: 80%;
  height: 40px;
  color: white;
  margin-bottom: 20px;
  margin-left: 38px;
  font-size: 14px;
  font-weight: 90;
  letter-spacing: 2px;
  cursor: pointer;

}

.sign-in{
  border: none;
  border-radius: 10px;
  background: #0096FF;
  width: 80%;
  height: 40px;
  color: white;
  margin-bottom: 20px;
  margin-left: 38px;
  font-size: 14px;
  font-weight: 90;
  letter-spacing: 2px;
}
.loginSection input[type="submit"]:hover {
  cursor: pointer;
  background: skyblue;
}


.google {
  border: none;
  border-radius: 10px;
  background: white;
  width: 80%;
  height: 40px;
  color: gray;
  margin-bottom: 21px;
  margin-left: 38px;
  margin-right: 30px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.20);
  letter-spacing: 1px;
}

.fogetpw {
  border: none;
  border-radius: 5px;
  background: white;
  width: 50%;
  height: 25px;
  color: gray;
  margin-bottom: 20px;
  margin-left: 10px;
  margin-right: 30px;
  font-size: 12px;
  font-weight: 90;
  letter-spacing: 2px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.20);

}



.loginSection p {
  margin: 10px;
  font-size: 12px;
  padding: 0px;
  font-weight: 100;
  font-family: arial;
  margin-left: 10px;
  margin-right: 28px;
  padding-left: 18px;
}

.signAnchor {
    color: skyblue;
    font-family: sans-serif;
    letter-spacing: 1px;
    font-size: 15px;

}

.support {
    color: gray;
    font-family: sans-serif;
    letter-spacing: 1px;
    font-size: 15px;
}

.knowladge {
    color: gray;
    font-family: sans-serif;
    letter-spacing: 1px;
    font-size: 15px;

}



.menu a {
    padding: 8px;



}

@media only screen and (max-width: 700px) {
  .div1 {
  width: 60%;
  height: 120px;
  text-align: right;
  /* border: 1px solid blue; */
}

.div2 {
  width: 28%;
  height: 100px;  
  align-items: left;
  /* border: 1px solid red; */
}
.centered-container {
  display: flex;
  position: relative;
  height: 100vh;
  padding-right: 10%;
  padding-top: 10%;
}
.centered-container .title {
  text-align: center;
  margin-bottom: 30px;
}
.centered-container .title img {
  margin-bottom: 16px;
  max-width: 80px;
}
.centered-container .actions .md-button {
  margin: 0;
}
.centered-container .form {
  margin-bottom: 60px;
}
.centered-container .background {
  background: skyblue;
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 0;
}
.centered-container .md-content-trasparent {
  background-color: rgba(255, 255, 255, 1);
  z-index: 1;
  width: 100%;
  max-width: 400px;
  position: relative;
}
.centered-container .md-content {
  z-index: 1;
  padding: 40px;
  width: 100%;
  max-width: 400px;
  position: relative;
}
.centered-container .loading-overlay {
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
}

.sign {
    margin: 10px;
    padding: 0 0 2;
    text-align: center;
}

.paragraph {
    margin-left: 38px;
}

h5 {
    max-width: 500px;
    text-align: center;
    margin: auto;
    position: relative;
}

h5:before {
    content: "";
    width: 140px;
    height: 1px;
    display: block;
    background: black;
    position: absolute;
    top: 50%;
    margin-left: 38px;
    left: 0;
}

h5:after {
    content: "";
    width: 140px;
    height: 1px;
    display: block;
    background: black;
    position: absolute;
    top: 50%;
    margin-right: 41px;
    right: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

}


.mainSection {
  background: white;
  margin: 15px;
  
}

.spchart {
  width: 250px;
  margin: 10px;
  position: absolute;
  margin-left: 20px;
}

.menu {
  text-decoration: none;
  padding: 32px;
  font-family: arial;
  margin-left: 280px;
  display: none;
}


.menu a {
  text-decoration: none;
  font-family: arial;



}

.signAnchor a {
  color: skyblue;
  font-family: arial;
}




.subSection {
  background: white;
  width: 50%;
}



.loginSection {
  width: 80%;
  height: 520px;
  background: white;
  color: gray;
  margin-left: -30%;

  box-sizing: border-box;
  border-radius: 40px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.10);
}

.laptop {
  display: none;
 
}

.sign {
  color: #0096FF;
  font-size: 50px;
  padding-top: 15px;
  font-weight: 100;

}


.loginSection input {
  border: none;
  width: 80%;
  height: 40px;
  margin-bottom: 8px;
  margin-left: 38px;
  margin-right: 40px;
  box-shadow: 0 0px 0px 0 rgba(0, 0, 0, 0.1), 0 0 4px 0 rgba(0, 0, 0, 0.20);
}

.loginSection form p {
  padding-left: 18px;
  padding-bottom: 6px;
  margin-left: 23px;
}

.loginSection input[type="button"] {
  border: none;
  border-radius: 10px;
  background: #0096FF;
  width: 80%;
  height: 40px;
  color: white;
  margin-bottom: 20px;
  margin-left: 38px;
  font-size: 14px;
  font-weight: 90;
  letter-spacing: 2px;
  cursor: pointer;

}

.sign-in{
  border: none;
  border-radius: 10px;
  background: #0096FF;
  width: 80%;
  height: 40px;
  color: white;
  margin-bottom: 20px;
  margin-left: 38px;
  font-size: 14px;
  font-weight: 90;
  letter-spacing: 2px;
}
.loginSection input[type="submit"]:hover {
  cursor: pointer;
  background: skyblue;
}


.google {
  border: none;
  border-radius: 10px;
  background: white;
  width: 80%;
  height: 40px;
  color: gray;
  margin-bottom: 21px;
  margin-left: 38px;
  margin-right: 30px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.20);
  letter-spacing: 1px;
}

.fogetpw {
  border: none;
  border-radius: 5px;
  background: white;
  width: 50%;
  height: 25px;
  color: gray;
  margin-bottom: 20px;
  margin-left: 10px;
  margin-right: 30px;
  font-size: 12px;
  font-weight: 90;
  letter-spacing: 2px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.20);

}



.loginSection p {
  margin: 10px;
  font-size: 12px;
  padding: 0px;
  font-weight: 100;
  font-family: arial;
  margin-left: 10px;
  margin-right: 28px;
  padding-left: 18px;
}

.signAnchor {
    color: skyblue;
    font-family: sans-serif;
    letter-spacing: 1px;
    font-size: 15px;

}

.support {
    color: gray;
    font-family: sans-serif;
    letter-spacing: 1px;
    font-size: 15px;
}

.knowladge {
    color: gray;
    font-family: sans-serif;
    letter-spacing: 1px;
    font-size: 15px;

}



.menu a {
    padding: 8px;



}

}
</style>
