<template>
  <div class="shadow rounded" style="border:none!important">
    <b-card
      style="background-color: #f2f2f2; border:none!important"
      no-body
      class="mb-1"
    >
      <b-card-header style="border:none!important" header-tag="header" class="p-0" role="tab">
      </b-card-header>
      <b-collapse style="border:none!important" id="accordion-3" accordion="my-accordion" role="tabpanel">
        <b-card-body style="border:none!important">
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

          <b-card bg-variant="success" style="width: 100%!important;" text-variant="white"> 
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
            class="mt-3 mb-3"
            >Próximo <b-icon-arrow-down></b-icon-arrow-down
          ></b-button>
        </b-card-body>
      </b-collapse>
    </b-card>

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
  </div>
</template>

<script>
import { http } from "../../services/configCompendio";
export default {
  data() {
    return {
      agrotoxicoSelect: [],
      selectedPesquisaAgrot: "NOMECOMUM",
      registro: "",
      nomeAgrot: "",
      agrotoxicos: [],
    };
  },

  methods: {
    selectAgrot(agrotoxicos) {
      try {
        this.agrotoxicoSelect.push(agrotoxicos);
        this.$bvModal.hide("modal-agrot");
        this.$emit("idAgrotoxicoSelectEvent", agrotoxicos.IDAGROTOXICO);
        this.idAgrotoxico = agrotoxicos.IDAGROTOXICO;
      } catch (error) {
          console.log(error)
      }
    },

    async readAgrotoxicoSelect() {
      try {
        const { data } = await http.get(
          `items/agrotoxicos?filter[${this.selectedPesquisaAgrot}][_contains]=${
            this.selectedPesquisaAgrot === "NOMECOMUM"
              ? this.nomeAgrot
              : this.registro
          }&fields[]=NOMECOMUM&fields[]=REGISTRO&fields[]=IDAGROTOXICO`
        );
        this.agrotoxicos = data;
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