<template>
  <div id="app">
    <div>
      <div v-if=" this.$route.path != `/ModeloPadrao/${this.$route.params.idReceita}`">
        <b-navbar
          toggleable="lg"
          style="background-color: #f6f6f6 !important"
          class="mb-1 shadow p-3 bg-white text-dark"
        >
          <b-navbar-brand href="#">{{idReceita}}</b-navbar-brand>

          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
              <b-nav-item href="#">Link</b-nav-item>
              <b-nav-item href="#" disabled>Disabled</b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
              <b-nav-item-dropdown text="Cadastro" class="mr-4" right>
                <b-dropdown-item to="/Cliente">Cliente</b-dropdown-item>
                <b-dropdown-item to="/Responsavel">Responsavel Técnico</b-dropdown-item>
                <b-dropdown-item to="/Receita">Receita</b-dropdown-item>
                <b-dropdown-item to="/Empresa">Empresa</b-dropdown-item>
              </b-nav-item-dropdown>

              <b-button variant="outline-secondary" class="mb-1">Sair</b-button>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>
    </div>

    <router-view></router-view>
   
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "App",
  components: {
  },

  computed:{
    ...mapState({
      idReceita: (state) => state.idReceituario
    })
  }
};
</script>

<style>

*::-webkit-scrollbar {
  width: 12px;               /* width of the entire scrollbar */
}

*::-webkit-scrollbar-track {
  background:  white;        /* color of the tracking area */
}

*::-webkit-scrollbar-thumb {
  background-color: rgba(0, 191, 165, 1) ;    /* color of the scroll thumb */
  border-radius: 20px;       /* roundness of the scroll thumb */
  border: 3px solid rgb(255, 255, 255);  /* creates padding around scroll thumb */
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  background: linear-gradient(
      180deg,
      rgba(0, 191, 165, 1) 11.2%,
      rgba(0, 140, 122, 1) 100.2%
    )
    fixed;
}
</style>
