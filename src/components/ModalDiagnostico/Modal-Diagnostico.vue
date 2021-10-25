<template>
  <b-modal id="modal-pesquisaDiagnostico" hide-header size="lg">
    <template #modal-footer>
      <b-button size="sm" @click="fechar">
        <b-icon-x scale="2"></b-icon-x
      ></b-button>
    </template>
    <b-card class="text-center">
      <div class="col-sm-12">
        <h4 class="text-center">Diagnóstico</h4>
      </div>
      <div style="max-height: 28rem; overflow: auto">
        <table class="table table-sm">
          <thead>
            <tr class="table-info">
              <th>Descrição</th>
              <th>Selecione</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(diag, index) in diagnostico" :key="index">
              <td>{{ diag.NOMECOMUM + " - " + diag.NOMECIENTIFICO }}</td>
              <td>
                <b-button
                  variant="success"
                  size="sm"
                  @click="diagnosticoSelect(diag)"
                  >Selecione</b-button
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </b-card>
  </b-modal>
</template>

<script>
import { http } from "../../services/configCompendio";
export default {
  props: {
    ids: {
      type: Object,
    },
    idAgrotoxico: {
      type: Number,
    },
    idCultura: {
      type: Number,
    },
  },
  data() {
    return {
      diagnostico: [],
    };
  },
  methods: {
    fechar() {
      this.$bvModal.hide("modal-pesquisaDiagnostico");
    },
    diagnosticoSelect(diagnostico) {
      this.$emit("dadosDiagnostico", diagnostico);
      this.$bvModal.hide("modal-pesquisaDiagnostico");
    },

    async readDiagnosticoSelectBox(idAgrotoxico, idCultura) {
      try {
        const { data } = await http.get(
          `custom/gestao/diagnostico/${idAgrotoxico}/${idCultura}`
        );
        this.diagnostico = data;

      } catch (error) {
        console.log(error);
      }
    },
  },

  watch: {
    ids() {
      console.log(this.ids);
      this.readDiagnosticoSelectBox(
        this.ids.idAgrotoxicoSelectEvent,
        this.ids.idCulturaSelecEvent
      );
    },
    idCultura() {
      this.readDiagnosticoSelectBox(this.idAgrotoxico, this.idCultura);
      // console.log(this.idAgrotoxico, this.idCultura)
    },
  },
};
</script>

<style>
</style>