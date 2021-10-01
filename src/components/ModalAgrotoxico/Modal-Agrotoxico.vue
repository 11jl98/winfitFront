<template>
  <b-modal id="modal-1" hide-footer size="lg" title="BootstrapVue">
    <b-row class="p-3">
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
        id="input-group-1"
        label="Nome Agrotoxico"
        label-for="input-1"
        class="col-sm-5"
      >
        <b-form-input
          id="input-1"
          type="email"
          placeholder="Nome Agrotoxico"
          required
          size="sm"
          v-model="nomeAgrot"
          :disabled="selectedPesquisaAgrot === 'NOMECOMUM' ? false : true"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-1"
        label="Nº Registro"
        label-for="input-1"
        class="col-sm-5"
      >
        <b-form-input
          id="input-1"
          type="email"
          placeholder="Nº Registro"
          required
          size="sm"
          v-model="registro"
          :disabled="selectedPesquisaAgrot === 'REGISTRO' ? false : true"
        ></b-form-input>
      </b-form-group>

      <b-button size="sm" @click="readAgrotoxicoSelect" variant="primary"
        >Pesquisar</b-button
      >
    </b-row>
    <div class="tablePesquisa">
      <table class="table table-sm">
        <thead>
          <tr>
            <th>Nome Agrotóxico</th>
            <th>Nº Registro</th>
            <th>Adicionar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="agrotoxico in agrotoxicos" :key="agrotoxico.id_agrotoxico">
            <td>{{ agrotoxico.NOMECOMUM }}</td>
            <td>{{ agrotoxico.REGISTRO }}</td>
            <td>
              <b-button
                @click="adicionarAgrot(agrotoxico)"
                variant="success"
                size="sm"
              >
                Adicionar
              </b-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </b-modal>
</template>

<script>
import { http as Compendio } from "../../services/configCompendio";
export default {
  data() {
    return {
      selectedPesquisaAgrot: "NOMECOMUM",
      nomeAgrot: "",
      registro: "",
      agrotoxicos: [],
    };
  },

  methods: {
    adicionarAgrot(agrotoxico) {
      this.$emit("agrotoxicoSelect", agrotoxico);
       this.$bvModal.hide("modal-1")
    },
    limparPesquisa() {
      (this.nomeAgrot = ""), (this.registro = ""), (this.agrotoxicos = []);
    },
    async readAgrotoxicoSelect() {
      try {
        const { data } = await Compendio.get(
          `items/agrotoxicos?filter[${this.selectedPesquisaAgrot}][_contains]=${
            this.selectedPesquisaAgrot === "NOMECOMUM"
              ? this.nomeAgrot
              : this.registro
          }&fields[]=NOMECOMUM&fields[]=REGISTRO&fields[]=IDAGROTOXICO`
        );
        this.agrotoxicos = data.data;
        this.$bvModal.show("modal-agrot");
        console.log(this.agrotoxicos);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.tablePesquisa {
  max-height: 250px;
  overflow: auto;
}
</style>