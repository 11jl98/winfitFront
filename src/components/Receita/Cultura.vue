<template>
  <b-card
    style="background-color: #f2f2f2; border: none!important"
    no-body
    class="mb-1 shadow rounded"
  >
    <b-card-header header-tag="header" class="p-0" role="tab"> </b-card-header>
    <b-collapse
      id="accordion-culturas"
      accordion="my-accordion"
      role="tabpanel"
    >
      <b-card-body>
        <label for="">Selecione a Cultura</label>
        <b-form-select
          size="sm"
          :options="culturas"
          value-field="IDCULTURA.IDCULTURA"
          text-field="IDCULTURA.NOME"
          v-model="culturaSelect"
          class="mt-1 sele"
          @change="readCultura"
        ></b-form-select>

        <div class="col-sm-10 mt-3" style="margin: 0 auto">
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
                v-model="dadosCultura.intervaloAplicacao"
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
                v-model="dadosCultura.intervaloSeguranca"
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
                v-model="dadosCultura.nMaxAplicacao"
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
                v-model="dadosCultura.nAplicacao"
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
                v-model="dadosCultura.estagioCultura"
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
              v-model="dadosCultura.epocaAplicacao"
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
  },
  data() {
    return {
      culturas: [],
      culturaSelect: null,
      dadosCultura: {
        intervaloAplicacao: "",
        intervaloSeguranca: "",
        nAplicacao: 0,
        nMaxAplicacao: 0,
        estagioCultura: "",
        epocaAplicacao: "",
        formasAplicacoes: "",
      },
    };
  },
  watch: {
    idAgrotoxicoSelectEvent() {
      this.readDiagnosticoSelectBox();
    },
  },

  methods: {
    async readCultura() {
      try {
        const { data } = await http.get(
          `items/agrotoxicosculturas?limit=1&fields[]=DESCRICAOAPLICACAO&fields[]=INTERVALOSEGURANCA&fields[]=INTERVALOENTRADA&fields[]=INTERVALOENTREAPLICACOES&fields[]=NUMEROAPLICACAO&fields[]=IDCULTURA&sort=IDAGROTOXICOSCULTURAS&filter={"_and":[{"IDAGROTOXICO":{"IDAGROTOXICO":{"_eq":${this.idAgrotoxicoSelectEvent}}}},{"IDCULTURA":{"IDCULTURA":{"_eq":${this.culturaSelect}}}}]}`
        );
        this.dadosCultura.intervaloAplicacao =
          data.data[0].INTERVALOENTREAPLICACOES;
        this.dadosCultura.intervaloSeguranca = data.data[0].INTERVALOSEGURANCA;
        this.dadosCultura.nMaxAplicacao = data.data[0].NUMEROAPLICACAO;
        this.$emit("idCulturaEvent", data.data[0].IDCULTURA);
      } catch (error) {
          console.log(error)

      }
    },

    async readDiagnosticoSelectBox() {
      try {
        const { data } = await http.get(
          `items/agrotoxicosculturas?limit=100&fields[]=DESCRICAOAPLICACAO&fields[]=INTERVALOSEGURANCA&fields[]=INTERVALOENTRADA&fields[]=INTERVALOENTREAPLICACOES&fields[]=NUMEROAPLICACAO&fields[]=IDCULTURA.NOME&fields[]=IDCULTURA.IDCULTURA&fields[]=IDAGROTOXICO.NOMECOMUM&sort=IDAGROTOXICOSCULTURAS&filter={"IDAGROTOXICO":{"IDAGROTOXICO":{"_eq":${this.idAgrotoxicoSelectEvent}}}}`
        );
        this.culturas = data.data;
      } catch (error) {
          console.log(error)
      }
    },
  },
};
</script>

<style>
</style>