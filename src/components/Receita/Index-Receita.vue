<template>
  <div
    class="mt-5"
    id="divContainer"
    style="display: flex; justify-content: space-between"
  >
    <div
      class="row ml-2"
      id="menuReceita"
      style="border-radius: 10px; height: 600px; background: #f6f6f6"
    >
      <div class="col-12 mt-4">
        <div class="list-group" id="list-tab" role="tablist">
          <b-button block class="shadow btnReceita"  v-b-toggle.accordion-responsavel
            >Responsavel Técnico
            <b-icon-person-lines-fill class="float-right"></b-icon-person-lines-fill>
          </b-button>
          <b-button
            block
          
            v-b-toggle.accordion-cliente
            class="shadow btnReceita"
            style=""
            >Cliente
            <b-icon-person-circle class="float-right"></b-icon-person-circle
          ></b-button>

          <b-button block v-b-toggle.accordion-agrotoxico class="shadow btnReceita" 
            >Agrotóxico
            <b-icon-cart-check class="float-right"></b-icon-cart-check
          ></b-button>
          <b-button
            block
            class="shadow btnReceita"
          
            v-b-toggle.accordion-culturas
            >Cultura <b-icon-flower1 class="float-right"></b-icon-flower1
          ></b-button>
          <b-button
            block
            class="shadow btnReceita"
            v-b-toggle.accordion-diagnostico
            >Diagnostico
            <b-icon-shield-slash class="float-right"></b-icon-shield-slash
          ></b-button>

          <b-button
            block
            class="shadow btnReceita"
            v-b-toggle.accordion-dadostecnicos
            >Dados Técnicos
            <b-icon-file-earmark-medical
              class="float-right"
            ></b-icon-file-earmark-medical
          ></b-button>

           <b-button
            block
            class="shadow btnReceita"
            v-b-toggle.accordion-pesquisa
            >Pesquisa
            <b-icon-search
              class="float-right"
            ></b-icon-search
          ></b-button>
          <hr />
          <div>
            <b-dropdown
              menu-class="w-100 "
              id="dropdown-1"
              variant="info"
              text="Relatórios"
              block
              class="mt-2 shadow"
            >
              <b-dropdown-item class="text">First Action</b-dropdown-item>
              <b-dropdown-item>Second Action</b-dropdown-item>
              <b-dropdown-item>Third Action</b-dropdown-item>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item active>Active action</b-dropdown-item>
              <b-dropdown-item disabled>Disabled action</b-dropdown-item>
            </b-dropdown>
          </div>
        </div>
      </div>
    </div>

    <div class="accordion col-sm-10" id="receita" role="tablist">
      <!-- <Cliente /> -->
      
      <ResponsavelTecnico :dadosReceitaProps="dadosReceita" @responsavelEmit="responsavelEmit = $event"/>
      <Cliente :dadosClienteProps="dadosReceita" :responsavelEmit="responsavelEmit"/>
      <Agrotoxico @idAgrotoxicoSelectEvent="eventIdAgrot($event)" 
      :dadosInfortecnicaProps="dadosInfortecnica"
      :limparInforTecnica="limparInforTecnica"
      @dadosInfortecnicaByAgrotoxico="dadosInfortecnicaByAgrotoxico = $event" />


      <Cultura
      :limparInforTecnica="limparInforTecnica"
        :idAgrotoxicoSelectEvent="idAgrotoxicoSelectEvent"
        :dadosInfortecnicaByAgrotoxico="dadosInfortecnicaByAgrotoxico"
        @idCulturaEvent="eventIdCultura($event)"
      />

      <Diagnostico
      :limparInforTecnica="limparInforTecnica"
        :dadosInfortecnicaByAgrotoxico ="dadosInfortecnicaByAgrotoxico"
        :idAgrotoxicoSelectEvent="idAgrotoxicoSelectEvent"
        :idCulturaSelecEvent="idCulturaSelectEvent"
      />
      <DadosTecnicos
      @limparInforTecnica="limparInforTecnica = !limparInforTecnica"
        :dadosInfortecnicaByAgrotoxico ="dadosInfortecnicaByAgrotoxico"
        :idAgrotoxicoSelectEvent="idAgrotoxicoSelectEvent"
        :idCulturaSelectEvent="idCulturaSelectEvent" />

      <Pesquisa @dadosReceita="dadosReceita = $event" @dadosInfortecnica="dadosInfortecnica = $event"/>
    </div>
  </div>
</template>

<script>
// import { http } from "../../services/configCompendio";
// import { httpEmpresa } from "../../services/configEmpresa";
import Agrotoxico from "./Agrotoxico.vue";
import Cultura from "./Cultura.vue";
import Diagnostico from "./Diagnostico.vue";
import ResponsavelTecnico from "./ResponsavelTecnico.vue";
import Cliente from "./Cliente.vue";
import DadosTecnicos from "./DadosTecnicos.vue";
import Pesquisa from "./Pesquisa.vue";

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
    DadosTecnicos,
    Pesquisa
  },

  data() {
    return {
    limparInforTecnica: true,
      dadosInfortecnicaByAgrotoxico :{},
      dadosInfortecnica:[],
      dadosReceita: {},
      responsavelEmit:{},
      idAgrotoxicoSelectEvent: 0,
      idCulturaSelectEvent: null,
      idAgrotoxico: null,
    };
  },

  created() {},

  methods: {
    eventIdCultura(ev) {
      console.log("aquuuuuuuuuuuuuuuui")
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
<style scoped>
.btnReceita {
  background-color: #038c5a;
  border: none !important;
  transition: 1s;
}
.btnReceita:hover {
  background-color: #004526 !important;
}

.btnReceita:focus {
  background-color: #004526 !important;
}

.card {
  border: 0px solid #ffff !important;
}

#menuReceita {
  width: 18% !important;
}

@media (max-height: 696px) {
  #menuReceita {
    height: 500px !important;
  }
  #divContainer {
    margin-top: 1% !important;
  }
}

/* @media (max-width: 950px) {
  #menuReceita {
    width: 99% !important;
    height: 600px !important;
    margin-left: 2px!important;
  }
  #divContainer {
    display: flex;
    flex-direction: column;
  }
  #receita {
    width: 100% !important;
  }

  .card {
    border-radius: 10px;
  }
} */



@media (min-width: 1120px) {
  div #receita {
    max-width: 80% !important;
  }
}
</style>
