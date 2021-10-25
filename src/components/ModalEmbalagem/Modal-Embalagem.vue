<template>
  <b-modal id="modal-embalagem" hide-footer size="lg" title="BootstrapVue">
    <b-row class="p-3">
      <table class="table table-sm">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Capacidade</th>
            <th>Unidade</th>
            <th>Selecione</th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="embalagem in embalagens" :key="embalagem.IDEMBALAGEM">
                <td>{{embalagem.NOME}}</td>
                <td>{{embalagem.CAPACIDADE}}</td>
                <td>{{embalagem.UNIDADE}}</td>
                <td>
                    <b-button size="sm" variant="success" @click="selectEmbalagem(embalagem)">Selecionar</b-button>
                </td>
            </tr>
        </tbody>
      </table>
    </b-row>
  </b-modal>
</template>

<script>
import { http as Compendio } from "../../services/configCompendio";

export default {
  props: {
    idAgrotoxico: {
      type: Number,
    },
  },

  data(){
      return{
          embalagens: []
      }
  },
  methods: {
      selectEmbalagem(embalagem){
          this.$emit("embalagemSelecionada", embalagem)
           this.$bvModal.hide("modal-embalagem");
      },
    async readEmbalagemSelect(idAgrotoxico) {
      const { data } = await Compendio.get(
        `custom/gestao/embalagem/${idAgrotoxico}`
      );
      this.embalagens = data;
      console.log(data);
    },
  },

  watch: {
    idAgrotoxico() {
      this.readEmbalagemSelect(this.idAgrotoxico);
    },
  },
};
</script>

<style>
</style>