<template>
  <b-card style="background-color: #f2f2f2" no-body class="mb-1 shadow rounded">
    <b-card-header header-tag="header" class="p-0" role="tab"> </b-card-header>
    <b-collapse
      id="accordion-dadosTecnicos"
      accordion="my-accordion"
      role="tabpanel"
    >
      <h3 class="m-3">Dados Técnicos</h3>
      <hr />
      <b-card-body>
        <div>
          <b-row>
            <b-form-group
              id="sele"
              class="col-sm-2"
              label="Receitas por ART"
              label-for="input-3"
            >
              <b-form-input
                size="sm"
                v-model="dadosResponsavelData.receitasart"
                class="mt-3 sele"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="sele"
              class="col-sm-2"
              label="Nº da Receita"
              label-for="input-3"
            >
              <b-form-input
                size="sm"
                v-model="dadosResponsavelData.proximareceita"
                class="mt-3 sele"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="sele"
              class="col-sm-2"
              label="ART/TRT"
              label-for="input-3"
            >
              <b-form-input
                size="sm"
                v-model="dadosResponsavelData.artatual"
                class="mt-3 sele"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="sele"
              class="col-sm-3"
              label="Complemento Receita"
              label-for="input-3"
            >
              <b-form-input
                size="sm"
                v-model="dadosResponsavelData.complementoreceita"
                class="mt-3 sele"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="sele"
              class="col-sm-3"
              label="Profissão"
              label-for="input-3"
            >
              <b-form-input
                size="sm"
                v-model="dadosResponsavelData.profissao"
                class="mt-3 sele"
              ></b-form-input>
            </b-form-group>
          </b-row>

          <b-row>
            <b-form-group
              id="sele"
              class="col-sm-2"
              label="Token SC"
              label-for="input-3"
            >
              <b-form-input
                size="sm"
                v-model="dadosResponsavelData.tokensc"
                class="mt-3 sele"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="sele"
              class="col-sm-2"
              label="Serie SC"
              label-for="input-3"
            >
              <b-form-input
                size="sm"
                v-model="dadosResponsavelData.seriesc"
                class="mt-3 sele"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="sele"
              class="col-sm-2"
              label="Conselho"
              label-for="input-3"
            >
              <b-form-input
                size="sm"
                v-model="dadosResponsavelData.conselho"
                class="mt-3 sele"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="sele"
              class="col-sm-2"
              label="Contrato"
              label-for="input-3"
            >
              <b-form-input
                size="sm"
                v-model="dadosResponsavelData.contrato"
                class="mt-3 sele"
              ></b-form-input>
            </b-form-group>
          </b-row>
        </div>
        <div class="d-flex justify-content-end">
          <div class="d-flex justify-content-end mr-2">
            <b-button
              style="
                background-color: #ff6400 !important;
                border: none !important;
              "
              @click="saveResponsavel"
              >Salvar<b-icon-check class="ml-3" scale="2"></b-icon-check
            ></b-button>
          </div>

          <div class="d-flex justify-content-end">
            <b-button
              style="
                background-color: #038c5a !important;
                border: none !important;
              "
              @click="limpar"
              >Limpar<b-icon-arrow-clockwise
                class="ml-3"
                scale="1.1"
              ></b-icon-arrow-clockwise
            ></b-button>
          </div>

          <div class="d-flex justify-content-end ml-2">
            <b-button
              variant="info"
              style="border: none !important"
              @click="limpar"
              >Novo<b-icon-plus class="ml-3" scale="2"></b-icon-plus
            ></b-button>
          </div>
        </div>
      </b-card-body>
    </b-collapse>
  </b-card>
</template>

<script>
import { httpEmpresa as Empresa } from "../../services/configEmpresa";
export default {
  props: {
    dadosResponsavelTecnico: {
      type: Object,
    },
    dadosPesquisa: {
      type: Object,
    },

    dadosPesquisaMobile: {
      type: Object,
    },

   
  },
  data() {
    return {
      testeEvent: "",
      dadosResponsavelData: {
        receitasart: "",
        proximareceita: "",
        artatual: "",
        profissao: "",
        tokensc: "",
        complementoreceita: "",
        seriesc: "",
        conselho: "",
        contrato: "",
      },
    };
  },

  methods: {
    limpar() {
      this.dadosResponsavelData = {
        receitasart: "",
        proximareceita: "",
        artatual: "",
        profissao: "",
        tokensc: "",
        complementoreceita: "",
        seriesc: "",
        conselho: "",
        contrato: "",
      };
    },
    async saveResponsavel() {
      try {
        if (this.dadosResponsavelTecnico.id_responsavel === -1) {
          await Empresa.post("/responsavel", {
            ...this.dadosResponsavelData,
            ...this.dadosResponsavelTecnico,
          });
          return this.$toast.open({
            message: "Responsavel Técnico Salvo com Sucesso",
            type: "success",
          });
        }
        const { data } = await Empresa.put(
          `/responsavel/${this.dadosResponsavelTecnico.id_responsavel}`,
          { ...this.dadosResponsavelData, ...this.dadosResponsavelTecnico }
        );
         this.$toast.open({
          message: "Responsavel Técnico Atualizado com Sucesso",
          type: "success",
        });
        this.$emit("reloadPesquisa")
        console.log(data);
      } catch (error) {
        console.log(error.response);
      }
    },
  },
  watch: {
    dadosResponsavelTecnico() {
      // this.dadosResponsavelData = this.dadosResponsavelTecnico
    },

    dadosPesquisaMobile(){
      this.dadosResponsavelData.receitasart = this.dadosPesquisaMobile.receitasart;
      this.dadosResponsavelData.proximareceita =
        this.dadosPesquisaMobile.proximareceita;
      this.dadosResponsavelData.artatual = this.dadosPesquisaMobile.artatual;
      this.dadosResponsavelData.profissao = this.dadosPesquisaMobile.profissao;
      this.dadosResponsavelData.tokensc = this.dadosPesquisaMobile.tokensc;
      this.dadosResponsavelData.complementoreceita = this.dadosPesquisaMobile.cidade;
      this.dadosResponsavelData.seriesc = this.dadosPesquisaMobile.seriesc;
      this.dadosResponsavelData.conselho = this.dadosPesquisaMobile.conselho;
      this.dadosResponsavelData.contrato = this.dadosPesquisaMobile.contrato;
    },


    dadosPesquisa() {
      this.dadosResponsavelData.receitasart = this.dadosPesquisa.receitasart;
      this.dadosResponsavelData.proximareceita =
        this.dadosPesquisa.proximareceita;
      this.dadosResponsavelData.artatual = this.dadosPesquisa.artatual;
      this.dadosResponsavelData.profissao = this.dadosPesquisa.profissao;
      this.dadosResponsavelData.tokensc = this.dadosPesquisa.tokensc;
      this.dadosResponsavelData.complementoreceita = this.dadosPesquisa.cidade;
      this.dadosResponsavelData.seriesc = this.dadosPesquisa.seriesc;
      this.dadosResponsavelData.conselho = this.dadosPesquisa.conselho;
      this.dadosResponsavelData.contrato = this.dadosPesquisa.contrato;
      console.log(this.dadosResponsavelData);
    },
  },
};
</script>

<style>
</style>