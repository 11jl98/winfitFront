<template>
  <div
    class="mt-5"
    id="divContainer"
    style="display: flex; justify-content: space-between"
  >
    <div
      class="row ml-2"
      id="menuReceita"
      style="border-radius: 10px; height: 600px; background: #f6f6f6"
    >
      <div class="col-12 mt-4">
        <div class="list-group" id="list-tab" role="tablist">
          <b-button block  ref="submitBtn" class="shadow" id="btnReceita" v-b-toggle.accordion-dadosCadastrais
            >Cadastro Fornecedor
            <b-icon-person-lines-fill
              class="float-right"
            ></b-icon-person-lines-fill>
          </b-button>
         
          <b-button block v-b-toggle.accordion-pesquisaFornecedor class="shadow" id="btnReceita"
            >Pesquisa <b-icon-search class="float-right"></b-icon-search
          ></b-button>
        </div>
      </div>
    </div>
    <div class="accordion col-sm-10" id="receita" role="tablist">
      <DadosCadastrais/>
      <!-- <Propriedade/> -->
      <Pesquisa/>
    </div>
  </div>
</template>

<script>
import DadosCadastrais from '../../components/Fornecedor/DadosCadastrais.vue'
// import Propriedade from '../../components/Cliente/Propriedade.vue'
import Pesquisa from '../../components/Fornecedor/Pesquisa.vue'

export default {
  mounted(){
    document.getElementById("btnReceita").focus()
  },
  components: {
    DadosCadastrais,
    // Propriedade,
    Pesquisa
  },
};
</script>

<style>
</style>