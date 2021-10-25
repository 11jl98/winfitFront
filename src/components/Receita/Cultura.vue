<template>
  <!-- <b-card
    style="background-color: #f2f2f2; border: none!important"
    no-body
    class="mb-1 shadow rounded"
  >
    <b-card-header header-tag="header" class="p-0" role="tab"> </b-card-header> -->
  <b-collapse
    id="accordion-culturas"
    accordion="my-accordion"
    role="tabpanel"
    class="animate__animated animate__zoomInDown"
    style="
      background-color: #f2f2f2;
      border: none !important;
      border-radius: 5px;
    "
  >
    <b-overlay
      :show="show"
      bg-color="#fff"
      rounded="sm"
      spinner-variant="info"
      opacity="1"
    >
      <b-card-body style="height: 540px">
        <!-- <b-form-select
          size="sm"
          :options="culturas"
          value-field="IDCULTURA.IDCULTURA"
          text-field="IDCULTURA.NOME"
          v-model="culturaSelect"
          class="mt-1 sele"
          @change="readCultura"
        ></b-form-select> -->
        <!-- 
         <b-form-select
            v-model="culturaSelect"
            class="mb-3"
            @change="readCultura(idAgrotoxicoSelectEvent)"
          >
            <b-form-select-option
              v-for="(cultura, index) in culturas"
              :key="index"
              :value="cultura"
              >{{
                cultura.IDCULTURA.NOME 
              }}</b-form-select-option
            >
          </b-form-select> -->

        <div class="col-sm-10 mt-3" style="margin: 0 auto">
          <label for="">Selecione a Cultura</label>
          <b-input-group size="sm" class="mb-3 col-sm-12">
            <template #append>
              <b-button
                v-b-modal.modal-pesquisaCultura
                size="sm"
                variant="primary"
                :disabled="editDisabled"
              >
                Pesquisar Cultura<b-icon-search class="ml-2"></b-icon-search>
              </b-button>
            </template>
            <b-form-input
              size="sm"
              class="col-sm-12"
              disabled
              v-model="dadosCultura.nomecultura"
            ></b-form-input>
          </b-input-group>

          <ModalCultura
            :idAgrotoxico="id_agrotoxicoEdit"
            :idAgrotoxicoNew="idAgrotoxicoSelectEvent"
            @culturaSelect="loadCultura($event)"
          />

          <div style="display: flex">
            <b-form-group
              id="sele"
              label="Intervalo de Aplicação"
              class="col-sm-6"
              label-for="input-3"
            >
              <b-form-input
                size="sm"
                class="mt-2 col-sm-12"
                v-model="dadosCultura.intervaloaplicacao"
                :disabled="editDisabled"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="sele"
              class="col-sm-6"
              label="Intervalo de Segurança"
              label-for="input-3"
            >
              <b-form-input
                size="sm"
                disabled
                class="mt-2 col-sm-12"
                v-model="dadosCultura.intervaloseguranca"
              ></b-form-input>
            </b-form-group>
          </div>

          <div style="display: flex; align-items: start">
            <b-form-group
              id="sele"
              label="Nº Max. de Aplicações/Bula"
              class="col-sm-6"
              label-for="input-3"
            >
              <b-form-input
                size="sm"
                disabled
                class="mt-2 col-sm-12"
                v-model="dadosCultura.numeroaplicacoescompendio"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="sele"
              class="col-sm-6"
              label="Nº de Aplicações"
              label-for="input-3"
            >
              <b-form-input
                size="sm"
                class="mt-2 col-sm-12"
                :disabled="editDisabled"
                v-model="dadosCultura.numeroaplicacoes"
              ></b-form-input>
            </b-form-group>
          </div>
          <div>
            <b-form-group
              id="sele"
              class="col-sm-12"
              label="Estágio da Cultura"
              label-for="input-3"
            >
              <b-form-input
                size="sm"
                class="mt-2 col-sm-12"
                :disabled="editDisabled"
                v-model="dadosCultura.estagiocultura"
              ></b-form-input>
            </b-form-group>
          </div>
          <div class="col-sm">
            <label for="">Epoca de Aplicação e Observações adicionais</label>
            <b-form-textarea
              id="textarea"
              placeholder="Enter something..."
              rows="3"
              max-rows="6"
              :disabled="editDisabled"
              v-model="dadosCultura.epocaaplicacao"
            ></b-form-textarea>
          </div>
        </div>
        <b-button
          style="
            float: right;
            background-color: #ff6400 !important;
            border: none;
          "
          class="mt-3 mb-3"
          @click="proximoPasso"
          >Próximo <b-icon-arrow-down></b-icon-arrow-down
        ></b-button>

        <b-button
          style="
            border: none;
            float: left;
            background-color: #ff6400 !important;
          "
          class="mt-3 mb-3"
          @click="anterior"
          >Anterior <b-icon-arrow-up class="ml-2"></b-icon-arrow-up>
        </b-button>
      </b-card-body>
    </b-overlay>
  </b-collapse>
  <!-- </b-card> -->
</template>

<script>
import ModalCultura from "../ModalCultura/Modal-Cultura.vue";
import { http } from "../../services/configCompendio";
export default {
  props: {
    limparInforTecnica: {
      type: Boolean,
    },
    dadosInfortecnicaByAgrotoxico: {
      type: Object,
    },
    idAgrotoxicoSelectEvent: {
      type: Number,
    },
  },
  data() {
    return {
      id_agrotoxicoEdit: 0,
      show: false,
      culturaInfortecnica: {},
      culturas: [],
      culturaSelect: {},
      editDisabled: false,
      dadosCultura: {
        id_cultura: -1,
        intervaloaplicacao: "",
        intervaloseguranca: "",
        numeroaplicacoes: 0,
        numeroaplicacoescompendio: 0,
        estagiocultura: "",
        epocaaplicacao: "",
        nomecultura: "",
        tipoaplicacao: "ha",
      },
    };
  },
  components: {
    ModalCultura,
  },

  watch: {
    //   idAgrotoxicoSelectEvent() {
    //     // this.readDiagnosticoSelectBox(this.idAgrotoxicoSelectEvent);
    //   },
    limparInforTecnica() {
      this.dadosCultura = {
        id_cultura: -1,
        intervaloaplicacao: "",
        intervaloseguranca: "",
        numeroaplicacoes: 0,
        numeroaplicacoescompendio: 0,
        estagiocultura: "",
        epocaaplicacao: "",
        nomecultura: "",
        tipoaplicacao: "ha",
      };
    },
    async dadosInfortecnicaByAgrotoxico() {
      //  await this.readDiagnosticoSelectBox(this.dadosInfortecnicaByAgrotoxico.id_agrotoxico);
      await this.readCulturaEdit(
        this.dadosInfortecnicaByAgrotoxico.id_cultura,
        this.dadosInfortecnicaByAgrotoxico.id_agrotoxico
      );
      await this.readCultura(this.dadosInfortecnicaByAgrotoxico.id_agrotoxico);
      console.log(this.dadosInfortecnicaByAgrotoxico);
      this.dadosCultura.id_cultura =
        this.dadosInfortecnicaByAgrotoxico.id_cultura;
      this.dadosCultura.intervaloaplicacao =
        this.dadosInfortecnicaByAgrotoxico.intervaloaplicacao;
      this.dadosCultura.numeroaplicacoes =
        this.dadosInfortecnicaByAgrotoxico.numeroaplicacoes;
      this.dadosCultura.estagiocultura =
        this.dadosInfortecnicaByAgrotoxico.estagiocultura;
      this.dadosCultura.epocaaplicacao =
        this.dadosInfortecnicaByAgrotoxico.epocaaplicacao;
      this.id_agrotoxicoEdit = this.dadosInfortecnicaByAgrotoxico.id_agrotoxico;
      this.editDisabled = true;
    },
  },

  methods: {
   async verificaRestricao(idAgrotoxico, idCultura) {
     try {
       const { data } = await http.get(
         `items/restricoesculturas?filter={"_and":[{"IDAGROTOXICO":{"IDAGROTOXICO":{"_eq":${idAgrotoxico}}}},{"IDCULTURA":{"IDCULTURA":{"_eq":${idCultura}}}}]}&fields[]=UF&fields[]=OBSERVACAO`
       );
       data.data.map(el => {
         if(el.UF === "RJ")
         this.$swal({
         title: `${el.OBSERVACAO}`,
         icon: "warning"
         })
       })
     } catch (error) {
       console.log(error)
     }
    },

    loadCultura(cultura) {
      this.culturaSelect = cultura;
      this.readCultura(cultura.IDAGROTOXICO.IDAGROTOXICO);
      console.log(cultura);
      this.verificaRestricao(
        cultura.IDAGROTOXICO.IDAGROTOXICO,
        cultura.IDCULTURA.IDCULTURA
      );
    },

    anterior() {
      this.$root.$emit("bv::toggle::collapse", "accordion-agrotoxico");
      document.getElementsByClassName("btnReceita")[2].focus();
    },
    proximoPasso() {
      this.$root.$emit("bv::toggle::collapse", "accordion-diagnostico");
      delete this.dadosCultura.numeroaplicacoescompendio;
      let dadosCultura = {
        id_cultura: this.culturaSelect.IDCULTURA.IDCULTURA,
      };
      this.$store.commit("REGISTER_CULTURA", [
        { ...this.culturaInfortecnica, ...dadosCultura, ...this.dadosCultura },
      ]);
      document.getElementsByClassName("btnReceita")[4].focus();
    },
    async readCultura(idAgrotoxico) {
      try {
        this.show = true;
        const { data } = await http.get(
          `items/agrotoxicosculturas?limit=1&sort=IDAGROTOXICOSCULTURAS&filter={"_and":[{"IDAGROTOXICO":{"IDAGROTOXICO":{"_eq":${idAgrotoxico}}}},{"IDCULTURA":{"IDCULTURA":{"_eq":${this.culturaSelect.IDCULTURA.IDCULTURA}}}}]}`
        );
        console.log(data.data[0]);

        this.culturaInfortecnica.fitoxidade = data.data[0].FITOTOXIDADE;
        this.culturaInfortecnica.intervaloseguranca =
          data.data[0].INTERVALOSEGURANCA;
        this.culturaInfortecnica.intervaloentrada =
          data.data[0].INTERVALOREENTRADA;
        this.culturaInfortecnica.intervaloaplicacao =
          data.data[0].INTERVALOENTREAPLICACOES;
        console.log(this.culturaInfortecnica);
        this.dadosCultura.intervaloaplicacao =
          data.data[0].INTERVALOENTREAPLICACOES;
        this.dadosCultura.id_cultura = data.data[0].IDCULTURA;
        this.dadosCultura.intervaloseguranca = data.data[0].INTERVALOSEGURANCA;
        this.dadosCultura.numeroaplicacoescompendio =
          data.data[0].NUMEROAPLICACAO;
        this.dadosCultura.nomecultura = this.culturaSelect.IDCULTURA.NOME;
        this.$emit("idCulturaEvent", data.data[0].IDCULTURA);
        console.log(this.dadosCultura, this.culturaInfortecnica);
        this.show = false;
      } catch (error) {
        console.log(error);
        this.show = false;
      }
    },
    async readCulturaEdit(idCultura, idAgrotoxico) {
      const { data } = await http.get(
        `items/agrotoxicosculturas?limit=100&fields[]=DESCRICAOAPLICACAO&fields[]=INTERVALOSEGURANCA&fields[]=INTERVALOENTRADA&fields[]=INTERVALOENTREAPLICACOES&fields[]=NUMEROAPLICACAO&fields[]=IDCULTURA.NOME&fields[]=IDCULTURA.IDCULTURA&fields[]=IDAGROTOXICO.NOMECOMUM&sort=IDAGROTOXICOSCULTURAS&filter={"_and":[{"IDAGROTOXICO":{"IDAGROTOXICO":{"_eq":${idAgrotoxico}}}},{"IDCULTURA":{"IDCULTURA":{"_eq":${idCultura}}}}]}`
      );
      this.culturaSelect = data.data[0];
      console.log(this.culturaSelect.IDCULTURA.IDCULTURA);
    },
    // async readDiagnosticoSelectBox(idAgrotoxico) {
    //   try {
    //     const { data } = await http.get(
    //       `items/agrotoxicosculturas?limit=100&fields[]=DESCRICAOAPLICACAO&fields[]=INTERVALOSEGURANCA&fields[]=INTERVALOENTRADA&fields[]=INTERVALOENTREAPLICACOES&fields[]=NUMEROAPLICACAO&fields[]=IDCULTURA.NOME&fields[]=IDCULTURA.IDCULTURA&fields[]=IDAGROTOXICO.NOMECOMUM&sort=IDAGROTOXICOSCULTURAS&filter={"IDAGROTOXICO":{"IDAGROTOXICO":{"_eq":${idAgrotoxico}}}}`
    //     );
    //     this.culturas = data.data;
    //   } catch (error) {
    //       console.log(error)
    //   }
    // },
  },
};
</script>

<style>
</style>