<template>
    <div class="subSection">
        <img class="laptop" src="../assets/computer.png">
        <div class="loginSection">

            <h1 class="sign">SIGN IN</h1>

            <form>

                <p align="left">User Name</p>
                <input type="text" name="">
                <p align="left">Password</p>
                <input type="password" name=""><br><br>


                <input type="submit" name="" value="Sign In"><br>
                <h5>OR</h5><br><br />

                <button class="google">Sign Up</button>


                <p>By sign up, you agree to our communications and usage terms<br>
                    <br>
                    <button class="fogetpw">Forgot Password</button>

                </p>

            </form>
        </div>
    </div>

</template>

<script>
</script>




<style>
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
</style>