<template>
  <b-modal id="modal-pesquisaCultura" hide-header size="lg">
    <template #modal-footer>
      <b-button size="sm" @click="fechar">
        <b-icon-x scale="2"></b-icon-x
      ></b-button>
    </template>
    <b-card class="text-center">
      <div class="col-sm-12">
        <h4 class="text-center">Cultura</h4>
      </div>
      <div style="max-height: 20rem; overflow: auto">
        <table class="table table-sm">
          <thead>
            <tr class="table-info">
              <th>Descrição</th>
              <th>Selecione</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(cultura, index) in culturas" :key="index">
              <td>{{ cultura.IDCULTURA.NOME }}</td>
              <td>
                <b-button
                  variant="success"
                  size="sm"
                  @click="culturaSelecionada(cultura)"
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
    idAgrotoxico: {
      type: Number,
    },

    idAgrotoxicoNew: {
      type: Number,
    },
  },
  data() {
    return {
      culturas: [],
    };
  },

  methods: {
    fechar() {
      this.$bvModal.hide("modal-pesquisaCultura");
    },
    culturaSelecionada(cultura) {
      this.$emit("culturaSelect", cultura);
      this.$bvModal.hide("modal-pesquisaCultura");
    },
    async readCultura(idAgrotoxico) {
      try {
        const { data } = await http.get(
          `items/agrotoxicosculturas?limit=100&fields[]=DESCRICAOAPLICACAO&fields[]=INTERVALOSEGURANCA&fields[]=INTERVALOENTRADA&fields[]=INTERVALOENTREAPLICACOES&fields[]=NUMEROAPLICACAO&fields[]=IDCULTURA.NOME&fields[]=IDCULTURA.IDCULTURA&fields[]=IDAGROTOXICO.NOMECOMUM&fields[]=IDAGROTOXICO.IDAGROTOXICO&sort=IDAGROTOXICOSCULTURAS&filter={"IDAGROTOXICO":{"IDAGROTOXICO":{"_eq":${idAgrotoxico}}}}`
        );
        this.culturas = data.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  watch: {
    idAgrotoxicoNew() {
      console.log("entrou cultura new");
      this.readCultura(this.idAgrotoxicoNew);
    },
    idAgrotoxico() {
      console.log("entrou cultura");

      this.readCultura(this.idAgrotoxico);
    },
  },
};
</script>

<style>
</style>