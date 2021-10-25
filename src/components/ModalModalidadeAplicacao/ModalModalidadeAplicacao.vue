<template>
  <b-modal id="modal-modalidadeAplicacao" hide-header size="lg">
    <template #modal-footer>
      <b-button size="sm" @click="fechar">
        <b-icon-x scale="2"></b-icon-x
      ></b-button>
    </template>
    <b-card class="text-center">
      <div class="col-sm-12">
        <h4 class="text-center">Modalidade de Aplicação</h4>
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
            <tr v-for="(aplicacao, index) in aplicacoes" :key="index">
              <td>{{ aplicacao.NOMEAPLICACAO }}</td>
              <td>
                <b-button
                  variant="success"
                  @click="modoSelect(aplicacao)"
                  size="sm"
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
      type: Number
    },

    idAgrotoxicoEdit: {
      type: Number
    },
  },

  data(){
    return{
      aplicacoes: []
    }
  },

  methods: {
    fechar() {
      this.$bvModal.hide("modal-modalidadeAplicacao");
    },
    modoSelect(modo){
      this.$emit("modoAplicacaoSelect", modo)
      this.$bvModal.hide("modal-modalidadeAplicacao")
    },
    async readModalidadeAplicacao(idAgrotoxico) {
      const { data } = await http.get(
        `custom/gestao/aplicacao/${idAgrotoxico}`
      );
      console.log(data);
      // this.dadosTecnicos.modaplicacao = data
      this.aplicacoes = data;
    },
  },

  watch:{
    idAgrotoxico(){
      console.log("entrou aqui idAGRO")
      this.readModalidadeAplicacao(this.idAgrotoxico)
    },

    idAgrotoxicoEdit(){
       console.log("entrou aqu")
       this.readModalidadeAplicacao(this.idAgrotoxicoEdit)
    }
  }
};
</script>

<style>
</style>