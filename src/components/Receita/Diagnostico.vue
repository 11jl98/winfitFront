<template>
  <b-card
    style="background-color: #f2f2f2; border: none !important"
    no-body
    class="mb-1 shadow rounded" 
  >
    <b-card-header header-tag="header" class="p-0" role="tab"> </b-card-header>
    <b-collapse
      id="accordion-diagnostico"
      accordion="my-accordion"
      role="tabpanel"
    >
      <b-card-body>
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
                <b-form-input size="sm" class="mt-2 col-sm-12"></b-form-input>
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
                  v-model="dadosDiagnostico.volumeCalda"
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="sele"
                class="col-sm-6"
                label="Vol. Calda a ser Utilizada"
                label-for="input-3"
              >
                <b-form-input size="sm" class="mt-2 col-sm-12"></b-form-input>
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
                v-model="dadosDiagnostico.formasAplicacoes"
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
          class="mt-3 mb-3"
          >Próximo <b-icon-arrow-down></b-icon-arrow-down
        ></b-button>
      </b-card-body>
    </b-collapse>
  </b-card>
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
      diagnosticoSelect: null,
      diagnostico: [],
      dadosDiagnostico: {
        doseBula: "0 - 0",
        volumeCalda: 0,
        solo: "",
        formasAplicacoes: "",
      },
    };
  },
  watch: {
    idCulturaSelecEvent() {
      this.readDiagnosticoSelectBox();
    },
  },
  methods: {
    async readDiagnosticoSelectBox() {
      try {
        const { data } = await http.get(
          `custom/gestao/diagnostico/${this.idAgrotoxicoSelectEvent}/${this.idCulturaSelecEvent}`
        );
        this.diagnostico = data;
      } catch (error) {
          console.log(error)
      }
    },

    async readUnidadeDose(idUnidadeDose) {
      try {
        const { data } = await http.get(
          `items/unidadesdose?filter[IDUNIDADEDOSE][_eq]=${idUnidadeDose}&fields[]=DESCRICAO`
        );
        return data.data[0].DESCRICAO;
      } catch (error) {
          console.log(error)

      }
    },

    async readVolumeCalda(idVolumeCalda) {
      try {
        const { data } = await http.get(
          `items/unidadesvolumecalda?filter[IDUNIDADEVOLUMECALDA][_eq]=${idVolumeCalda}&fields[]=DESCRICAO`
        );
        return data.data[0].DESCRICAO;
      } catch (error) {
          console.log(error)

      }
    },

    async readSolo(idSolo) {
      try {
        const { data } = await http.get(
          `items/solos?filter[IDSOLO][_eq]=${idSolo}&fields[]=DESCRICAO`
        );
        return data.data[0].DESCRICAO;
      } catch (error) {
          console.log(error)

      }
    },

    async loadDiagnostico(diagnostico) {
      try {
        let unidadeDose = await this.readUnidadeDose(diagnostico.IDUNIDADEDOSE);
        let volumeCalda = await this.readVolumeCalda(
          diagnostico.IDUNIDADEVOLUMECALDA
        );
        let solo = await this.readSolo(diagnostico.IDSOLO);
        this.dadosDiagnostico.doseBula = `${diagnostico.DOSEMINIMA} - ${diagnostico.DOSEMAXIMA} ${unidadeDose}`;
        this.dadosDiagnostico.volumeCalda = `${diagnostico.DOSEMINIMAVOLUMECALDA} - ${diagnostico.DOSEMAXIMAVOLUMECALDA} ${volumeCalda}`;
        this.dadosDiagnostico.solo = solo;
        this.dadosDiagnostico.formasAplicacoes = diagnostico.OBSERVACAO;
      } catch (error) {
          console.log(error)

      }
    },
  },
};
</script>

<style>
</style>