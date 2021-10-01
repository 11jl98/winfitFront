<template>
<!-- 
  <div class="shadow rounded" style="border:none!important">
    <b-card
      style="background-color: #f2f2f2; border:none!important"
      no-body
      class="mb-1"
    >
      <b-card-header style="border:none!important" header-tag="header" class="p-0" role="tab">
      </b-card-header> -->
      <b-collapse class="animate__animated animate__zoomInDown"
       style="background-color: #f2f2f2; border: none!important; border-radius: 5px" id="accordion-agrotoxico" accordion="my-accordion" role="tabpanel">
        <b-overlay :show="show" bg-color="#fff" rounded="sm" spinner-variant="info" opacity="1">
        <b-card-body style="border:none!important; height: 400px">
          <b-row class="col-sm-12" style="border:none!important">
            <b-form-group label="Tipo de Pesquisa" v-slot="{ ariaDescribedby }">
              <b-form-radio
                @change="limparPesquisa"
                v-model="selectedPesquisaAgrot"
                :aria-describedby="ariaDescribedby"
                name="some-radios"
                value="NOMECOMUM"
                >Nome Comum</b-form-radio
              >
              <b-form-radio
                @change="limparPesquisa"
                v-model="selectedPesquisaAgrot"
                :aria-describedby="ariaDescribedby"
                name="some-radios"
                value="REGISTRO"
                >Num. Registro</b-form-radio
              >
            </b-form-group>
            <b-form-group
              id="sele"
              class="col-sm-4"
              label="Nome Agrotóxico"
              label-for="input-3"
            >
              <b-form-input
                v-model="nomeAgrot"
                size="sm"
                class="mt-2"
                :disabled="selectedPesquisaAgrot === 'NOMECOMUM' ? false : true"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="sele"
              class="col-sm-4"
              label="Número de Registro"
              label-for="input-3"
            >
              <b-form-input
                size="sm"
                class="mt-2"
                v-model="registro"
                :disabled="selectedPesquisaAgrot === 'REGISTRO' ? false : true"
              ></b-form-input>
            </b-form-group>
            <b-form-group id="sele" class="col-sm-1" label-for="input-3">
              <template #label>
                <b-icon-search class="ml-4"></b-icon-search>
              </template>
              <b-button
                variant="primary"
                @click="readAgrotoxicoSelect"
                size="sm"
                >Pesquisar</b-button
              >
            </b-form-group>
          </b-row>

          <b-card bg-variant="success" style="width: 100%!important; height: 60%" text-variant="white"> 
            <table class="table table-sm  text-white table-borderless ">
              <thead class="">
                <tr>
                  <th scope="col">Nº Registro</th>
                  <th scope="col">Nome Comum</th>
                  <th scope="col">Excluir</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(agrot, index) in agrotoxicoSelect" :key="index">
                  <td>{{ agrot.REGISTRO }}</td>
                  <td>{{ agrot.NOMECOMUM }}</td>
                  <td>
                    <b-button variant="info" size="sm"
                      ><b-icon-trash></b-icon-trash
                    ></b-button>
                  </td>
                </tr>
              </tbody>
            </table>
          </b-card>

          <b-button
            style="
              float: right;
              background-color: #ff6400 !important;
              border: none;
            "
            @click="proximoPasso"
            class="mt-4 mb-3"
            >Próximo <b-icon-arrow-down></b-icon-arrow-down
          ></b-button>
           <b-button
            style="border: none; float: left; background-color: #ff6400 !important;"
            class="mt-4 mb-3"
            @click="anterior"
            >Anterior <b-icon-arrow-up class="ml-2"></b-icon-arrow-up>
          </b-button>
        </b-card-body>
        </b-overlay>
        <b-modal id="modal-agrot" title="Agrotóxicos">
      <b-card>
        <table class="table table-sm">
          <thead>
            <tr>
              <th scope="col">Nº Registro</th>
              <th scope="col">Nome Comum</th>
              <th scope="col">Selecionar</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(agrot, index) in agrotoxicos.data" :key="index">
              <td>{{ agrot.REGISTRO }}</td>
              <td>{{ agrot.NOMECOMUM }}</td>
              <td>
                <b-button
                  variant="success"
                  size="sm"
                  @click="selectAgrot(agrot)"
                  >Selecionar</b-button
                >
              </td>
            </tr>
          </tbody>
        </table>
      </b-card>
    </b-modal>
      </b-collapse>
    <!-- </b-card> -->

    
  <!-- </div> -->
</template>

<script>
import { http } from "../../services/configCompendio";
import { mapState } from 'vuex'

export default {
  data() {
    return {
      show: false,
      agrotoxicoSelect: [],
      dadosAgrotoxicos: {},
      selectedPesquisaAgrot: "NOMECOMUM",
      registro: "",
      nomeAgrot: "",
      agrotoxicos: [],
      nomeagrotoxicoselecionado: "",
      registroagrotoxicoselecionado: "",
      concentracao:""
    };
  },
computed:{
  ...mapState({
    agrotoxicoStore: (state) => state.agrotoxico
  })
},
  methods: {

      proximoPasso(){
      this.$root.$emit('bv::toggle::collapse', 'accordion-culturas')
      this.$store.commit("REGISTER_AGROTOXICO", [{...this.dadosAgrotoxicos, concentracao: this.concentracao ,nomeagrotoxico: this.nomeagrotoxicoselecionado, registroagrotoxico: this.registroagrotoxicoselecionado}])
   document.getElementsByClassName("btnReceita")[3].focus()
   },


       anterior(){
      this.$root.$emit('bv::toggle::collapse', 'accordion-cliente')
      document.getElementsByClassName("btnReceita")[1].focus()
    },
   async selectAgrot(agrotoxicos) {
      try {
        this.agrotoxicoSelect.push(agrotoxicos);
        this.$bvModal.hide("modal-agrot");
        this.$emit("idAgrotoxicoSelectEvent", agrotoxicos.IDAGROTOXICO);
        this.idAgrotoxico = agrotoxicos.IDAGROTOXICO;
        this.nomeagrotoxicoselecionado = agrotoxicos.NOMECOMUM;
        this.registroagrotoxicoselecionado = agrotoxicos.REGISTRO;
        this.concentracao = agrotoxicos.CONCENTRACAOIA +" "+ agrotoxicos.UNIDADEMEDIDA;
        console.log(agrotoxicos)
        const {data} = await http.get(`custom/gestao/agrotoxico/receita/${agrotoxicos.IDAGROTOXICO}`)
        console.log(data[0])
        this.dadosAgrotoxicos = data[0]
      } catch (error) {
          console.log(error)
      }
    },

    async readAgrotoxicoSelect() {
      try {
        this.show = true
        const { data } = await http.get(
          `items/agrotoxicos?filter[${this.selectedPesquisaAgrot}][_contains]=${
            this.selectedPesquisaAgrot === "NOMECOMUM"
              ? this.nomeAgrot
              : this.registro
          }&fields[]=NOMECOMUM&fields[]=REGISTRO&fields[]=IDAGROTOXICO&fields[]=CONCENTRACAOIA&fields[]=UNIDADEMEDIDA`
        );
        this.agrotoxicos = data;
        this.show = false
        this.$bvModal.show("modal-agrot");
        console.log(this.agrotoxicos);
      } catch (error) {
        console.log(error);
      }
    },
    limparPesquisa() {
      this.registro = "";
      this.nomeAgrot = "";
    },
  },
};
</script>

<style>
</style>