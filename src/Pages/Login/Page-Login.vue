<template>
  <b-overlay
    :show="show"
    bg-color="#fff"
    rounded="sm"
    spinner-variant="info"
    opacity="1"
    class="loading"
  >
    <div class="containerGeral">
      <div class="containerInputs">
        <form>
          <img class="logoBms" :src="plusIcon" alt="" />
          <h2>Faça seu Login</h2>
          <div class="input-field">
            <input
              id="text"
              type="text"
              name="login"
              placeholder="Login"
              v-model="Credencias.login"
            />
          </div>

          <div class="input-field">
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              v-model="Credencias.password"
            />
          </div>
          <div class="login-box-button" id="Login">
            <button @click="Login()" type="button">
              <i class="btn-login"></i>
              Acessar
            </button>
          </div>
        </form>
      </div>
      <div class="containerLogo">
        <img class="logoWinfit" :src="plusIconWinfit" alt="" />
      </div>
    </div>
  </b-overlay>
</template>

<script>
import plusIcon from "../../assets/LogoBms-min.png";
import plusIconWinfit from "../../assets/winfit-logo.png";
import { httpEmpresa as Empresa } from "../../services/configEmpresa";

export default {
  data() {
    return {
      plusIcon: plusIcon,
      plusIconWinfit: plusIconWinfit,
      Credencias: {
        login: "",
        password: "",
      },
      show: false,
    };
  },
  methods: {
    async Login() {
      try {
        this.show = true;
        const response = await Empresa.post("/auth", this.Credencias);
        console.log(response.data);
        sessionStorage.setItem("token", response.data.token);
        this.$router.push({
          path: "/Home",
        });
        this.show = false;
      } catch (error) {
        console.log(error);
        if (error.response.status == 400) {
          this.show = false;
          return this.$toast.open({
            message: "Usuário não Autorizado",
            type: "warning",
          });
        }
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@200&display=swap");
.containerGeral {
  display: flex;
}
.containerInputs {
  width: 35%;
  height: 100vh !important;
  background-color: #fff !important;
}
.containerLogo {
  width: 65%;
  height: 100vh !important;
  display: flex;
  align-items: center !important;
  justify-content: center !important;
}
.containerLogo .logoWinfit {
  width: 450px;
}
.logoBms {
  width: 200px;
  margin: 2rem;
  margin-top: 15%;
}
h2 {
  font-family: "Roboto", sans-serif;
  font-size: 30px;
  letter-spacing: 0.2rem;
  text-align: center;
  top: 30%;
  left: 24%;
  margin: 3rem;
}
form {
  background-color: white;
  max-width: 500px;
  width: 70%;
  height: 100%;
  position: absolute;
  text-align: center !important;
  align-items: center !important;
}
form input[type="text"]:focus,
form input[type="password"]:focus {
  outline: none;
}
form input[type="text"]:hover,
form input[type="password"]:hover {
  padding-left: 30px;
  color: turquoise;
}
form input[type="submit"]:hover {
  background-color: rgb(45, 167, 154);
}
form input[type="submit"] {
  width: 100%;
  height: 45px;
  border-radius: 5px;
  border: none;
  margin-top: 35px;
  background-color: turquoise;
  color: white;
  font-size: 18px;
  cursor: pointer;
  transition: 0.5s;
  letter-spacing: 0.1rem;
}
form input[type="text"],
form input[type="password"] {
  width: 80%;
  height: 45px;
  border: 1px solid #43c6ac;
  padding-left: 10px;
  margin: 10px 0;
  font-size: 15px;
  transition: 0.7s;
  color: #666;
  border-left: none;
  border-right: none;
  border-top: none;
  color: turquoise;
  text-decoration: none;
  letter-spacing: 0.1rem;
  background-color: white !important;
}
form button[type="button"] {
  width: 80%;
  height: 45px;
  border: 1px solid #43c6ac;
  background-color: #3eb39b;
  color: white;
  cursor: pointer;
  margin-top: 1rem;
  transition: 0.5;
}
form input[type="submit"]:hover {
  background-color: rgb(45, 167, 154);
}
form button[type="button"]:hover {
  background-color: rgb(45, 167, 154);
  transition: 0.5;

}
.loading {
  width: 100%;
  height: 100vh;
}
</style>