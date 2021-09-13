<template>
  <div class="mt-5" style="display: flex; justify-content: space-between">
    <div class="row ml-2">
      <div class="col-12">
        <div class="list-group" id="list-tab" role="tablist">
          <b-button
            block
            v-b-toggle.accordion-2
            style="background-color: #038c5a !important"
            >Responsavel Técnico</b-button
          >
          <b-button
            block
            v-b-toggle.accordion-cliente
            style="background-color: #038c5a !important"
            >Cliente</b-button
          >
          <b-button
            block
            v-b-toggle.accordion-3
            style="background-color: #038c5a !important"
            >Agrotóxico</b-button
          >
          <b-button
            block
            v-b-toggle.accordion-culturas
            style="background-color: #038c5a !important"
            >Cultura</b-button
          >
          <b-button
            block
            v-b-toggle.accordion-diagnostico
            style="background-color: #038c5a !important"
            >Diagnostico</b-button
          >

          <b-button
            block
            v-b-toggle.accordion-dadostecnicos
            style="background-color: #038c5a !important"
            >Dados Técnicos</b-button
          >
        </div>
      </div>
      <div class="col-8"></div>
    </div>

    <div class="accordion col-sm-10" role="tablist">
      <Cliente />
      <ResponsavelTecnico />
      <Agrotoxico @idAgrotoxicoSelectEvent="eventIdAgrot($event)" />
      <Cultura
        :idAgrotoxicoSelectEvent="idAgrotoxicoSelectEvent"
        @idCulturaEvent="eventIdCultura($event)"
      />

      <Diagnostico
        :idAgrotoxicoSelectEvent="idAgrotoxicoSelectEvent"
        :idCulturaSelecEvent="idCulturaSelectEvent"
      />
      <DadosTecnicos :idAgrotoxicoSelectEvent="idAgrotoxicoSelectEvent" :idCulturaSelectEvent="idCulturaSelectEvent"/>
    </div>
  </div>
</template>

<script>
// import { http } from "../../services/configCompendio";
// import { httpEmpresa } from "../../services/configEmpresa";
import Agrotoxico from "../Receita/Agrotoxico.vue";
import Cultura from "../Receita/Cultura.vue";
import Diagnostico from "../Receita/Diagnostico.vue";
import ResponsavelTecnico from "../Receita/ResponsavelTecnico.vue";
import Cliente from "../Receita/Cliente.vue";
import DadosTecnicos from "../Receita/DadosTecnicos.vue";

export default {
  name: "Component-Receita",
  props: {
    msg: String,
  },

  components: {
    Agrotoxico,
    Cultura,
    Diagnostico,
    ResponsavelTecnico,
    Cliente,
    DadosTecnicos
  },

  data() {
    return {
      idAgrotoxicoSelectEvent: 0,
      idCulturaSelectEvent: null,
      idAgrotoxico: null,
    };
  },

  created() {},

  methods: {
    eventIdCultura(ev) {
      this.idCulturaSelectEvent = ev;
    },
    eventIdAgrot(ev) {
      console.log(ev);
      this.idAgrotoxicoSelectEvent = ev;
    },

    proximoPasso(idAcordion) {
      this.$root.$emit("bv::toggle::collapse", idAcordion);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.teste {
  background: #59c9a5;
}
</style>
