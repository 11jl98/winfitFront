<template>
  <!-- <b-card
    style="background-color: #f2f2f2; border: none !important"
    no-body
    class="mb-1 shadow rounded"
  >
    <b-card-header header-tag="header" class="p-0" role="tab"> </b-card-header> -->
    <b-collapse
      id="accordion-diagnostico"
      accordion="my-accordion"
      role="tabpanel"
      class="animate__animated animate__zoomInDown"
       style="background-color: #f2f2f2; border: none!important; border-radius: 5px"
    >
    <b-overlay :show="show" bg-color="#fff" rounded="sm" spinner-variant="info" opacity="1">
      <b-card-body style="height: 565px">
        <b-form-group
          id="sele"
          label="Selecione Diagnostico"
          label-for="input-3"
        >
          <b-form-select
            @change="loadDiagnostico"
            v-model="diagnosticoSelect"
            class="mb-3"
          >
            <b-form-select-option
              v-for="(diag, index) in diagnostico"
              :key="index"
              :value="diag"
              >{{
                diag.NOMECOMUM + " - " + diag.NOMECIENTIFICO
              }}</b-form-select-option
            >
          </b-form-select>
        </b-form-group>

        <div
          style="
            display: flex;
            flex-wrap: wrap;
            align-items: baseline;
            justify-content: center;
          "
        >
          <div class="col-sm-10">
            <div style="display: flex">
              <b-form-group
                id="sele"
                label="Dose/Bula"
                class="col-sm-6"
                label-for="input-3"
              >
                <b-form-input
                  size="sm"
                  disabled
                  class="mt-2 col-sm-12"
                  v-model="dadosDiagnostico.doseBula"
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="sele"
                class="col-sm-6"
                label="Dose/Utilizar"
                label-for="input-3"
              >
                <b-form-input
                  size="sm"
                  v-model="dadosDiagnostico.dosagem"
                  class="mt-2 col-sm-12"
                ></b-form-input>
              </b-form-group>
            </div>

            <div style="display: flex">
              <b-form-group
                id="sele"
                label="Volume de Calda"
                class="col-sm-6"
                label-for="input-3"
              >
                <b-form-input
                  size="sm"
                  disabled
                  class="mt-2 col-sm-12"
                  v-model="dadosDiagnostico.volumecaldacompendio"
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="sele"
                class="col-sm-6"
                label="Vol. Calda a ser Utilizada"
                label-for="input-3"
              >
                <b-form-input
                  v-model="dadosDiagnostico.volumecalda"
                  size="sm"
                  class="mt-2 col-sm-12"
                ></b-form-input>
              </b-form-group>
            </div>

            <div style="display: flex">
              <b-form-group
                id="sele"
                label="Solo"
                class="col-sm-6"
                label-for="input-3"
              >
                <b-form-input
                  size="sm"
                  disabled
                  class="mt-2 col-sm-12"
                  v-model="dadosDiagnostico.solo"
                ></b-form-input>
              </b-form-group>
            </div>
            <div class="col-sm mt-3">
              <label for=""
                >Formas de Aplicação (Observações sobre Aplicação)</label
              >
              <b-form-textarea
                id="textarea"
                placeholder="Enter something..."
                rows="3"
                max-rows="6"
                v-model="dadosDiagnostico.aplicacao"
              ></b-form-textarea>
            </div>
          </div>
        </div>
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
    </b-collapse>
  <!-- </b-card> -->
</template>

<script>
import { http } from "../../services/configCompendio";
export default {
  props: {
    idAgrotoxicoSelectEvent: {
      type: Number,
    },
    idCulturaSelecEvent: {
      type: Number,
    },
  },
  data() {
    return {
      show: false,
      diagnosticoSelect: null,
      diagnostico: [],
      dadosDiagnostico: {
        doseBula: "0 - 0",
        volumecalda: 0,
        volumecaldacompendio: 0,
        solo: "",
        aplicacao: "",
        dosagem: "",
        problemacomum: "",
        problemacientifico: "",
      },
    };
  },
  watch: {
    idCulturaSelecEvent() {
      this.readDiagnosticoSelectBox();
    },
  },
  methods: {
    anterior() {
      this.$root.$emit("bv::toggle::collapse", "accordion-culturas");
      document.getElementsByClassName("btnReceita")[3].focus();
    },
    proximoPasso() {
      this.$root.$emit("bv::toggle::collapse", "accordion-dadostecnicos");
      delete this.dadosDiagnostico.volumecaldacompendio;
      this.$store.commit("REGISTER_DIAGNOSTICO", [this.dadosDiagnostico]);
      document.getElementsByClassName("btnReceita")[5].focus();
    },
    async readDiagnosticoSelectBox() {
      try {
        const { data } = await http.get(
          `custom/gestao/diagnostico/${this.idAgrotoxicoSelectEvent}/${this.idCulturaSelecEvent}`
        );
        this.diagnostico = data;
      } catch (error) {
        console.log(error);
      }
    },

    async readUnidadeDose(idUnidadeDose) {
      try {
        const { data } = await http.get(
          `items/unidadesdose?filter[IDUNIDADEDOSE][_eq]=${idUnidadeDose}&fields[]=DESCRICAO`
        );
        return data.data[0].DESCRICAO;
      } catch (error) {
        console.log(error);
      }
    },

    async readVolumeCalda(idVolumeCalda) {
      try {
        const { data } = await http.get(
          `items/unidadesvolumecalda?filter[IDUNIDADEVOLUMECALDA][_eq]=${idVolumeCalda}&fields[]=DESCRICAO`
        );
        return data.data[0].DESCRICAO;
      } catch (error) {
        console.log(error);
      }
    },

    async readSolo(idSolo) {
      try {
        const { data } = await http.get(
          `items/solos?filter[IDSOLO][_eq]=${idSolo}&fields[]=DESCRICAO`
        );
        return data.data[0].DESCRICAO;
      } catch (error) {
        console.log(error);
      }
    },

    async loadDiagnostico(diagnostico) {
      try {
        this.show = true;
        let unidadeDose = await this.readUnidadeDose(diagnostico.IDUNIDADEDOSE);
        let volumeCalda = await this.readVolumeCalda(
          diagnostico.IDUNIDADEVOLUMECALDA
        );
        let solo = await this.readSolo(diagnostico.IDSOLO);
        this.dadosDiagnostico.doseBula = `${diagnostico.DOSEMINIMA} - ${diagnostico.DOSEMAXIMA} ${unidadeDose}`;
        this.dadosDiagnostico.volumecaldacompendio = `${diagnostico.DOSEMINIMAVOLUMECALDA} - ${diagnostico.DOSEMAXIMAVOLUMECALDA} ${volumeCalda}`;
        this.dadosDiagnostico.solo = solo;
        this.dadosDiagnostico.aplicacao = diagnostico.OBSERVACAO;
        this.dadosDiagnostico.problemacomum = diagnostico.NOMECOMUM;
        this.dadosDiagnostico.problemacientifico = diagnostico.NOMECIENTIFICO;
        this.show = false;
      } catch (error) {
        console.log(error);
        this.show = false;

      }
    },
  },
};
</script>

<style>
</style>