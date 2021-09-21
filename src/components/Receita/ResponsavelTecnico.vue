<template>
    <b-card
        style="background-color: #f2f2f2; border:none!important"
        no-body
        class="mb-1 shadow rounded"
      >
        <b-card-header
          header-tag="header"
          style="border: none !important"
          class="p-0"
          role="tab"
        >
        </b-card-header>
        <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-form-group
              id="sele"
              label="Selecione Responsavel Técnico"
              label-for="input-3"
            >
              <b-form-select
                @change="responsavelSelecionado(responsavelSelect)"
                :options="responsavelTecnico"
                v-model="responsavelSelect"
                class="mt-3 p-2 sele"
                value-field="id_responsavel"
                text-field="nome"
              ></b-form-select>
            </b-form-group>
            <b-row class="d-flex align-items-baseline">
              <b-form-group label="Nº Receita" class="col-sm-3">
                <b-form-input
                  v-model="responsavelDados.receitasart"
                ></b-form-input>
              </b-form-group>

              <b-form-group label="Complemento" class="col-sm-3">
                <b-form-input
                  v-model="responsavelDados.complementoreceita"
                ></b-form-input>
              </b-form-group>

              <b-form-group label="Nº ART" class="col-sm-3">
                <b-form-input
                  v-model="responsavelDados.artatual"
                ></b-form-input>
              </b-form-group>

              <b-form-group label="Nº Documento Fiscal" class="col-sm-3">
                <b-form-input></b-form-input>
              </b-form-group>

              <b-form-group label="Série Documento Fiscal" class="col-sm-3">
                <b-form-input></b-form-input>
              </b-form-group>

              <b-form-group label="Valor (R$)" class="col-sm-3">
                <b-form-input></b-form-input>
              </b-form-group>
            </b-row>
            <div>
              <label for="">Mensagem</label>
              <b-form-textarea
                id="textarea"
                placeholder="Enter something..."
                rows="3"
                max-rows="6"
              ></b-form-textarea>
            </div>

            <div class="mt-3">
              <label for=""
                >Informações sobre MIP (Manejo Integrado de Pragas)</label
              >
              <b-form-textarea
                id="textarea"
                placeholder="Enter something..."
                rows="3"
                max-rows="6"
              ></b-form-textarea>
            </div>
            <b-button
              @click="proximoPasso('accordion-cliente')"
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
import { httpEmpresa } from '../../services/configEmpresa';
export default {
created(){
    this.responsavelTec();
},
data(){
    return {
        responsavelTecnico: [],
      responsavelSelect: null,
      responsavelDados: {
        receitasart: 0,
        artatual: 0,
        complementoreceita: 0,
      },
    }
},
methods:{
     async responsavelTec() {
      const { data } = await httpEmpresa.get("/responsavel");
      this.responsavelTecnico = data;
      console.log(data);
      
    },
    async responsavelSelecionado(id) {
      const { data } = await httpEmpresa.get(`responsavel/schema/${id}`);
      console.log(data);
      this.responsavelDados.artatual = data.artatual;
      this.responsavelDados.receitasart = data.receitasart;
      this.responsavelDados.complementoreceita = data.complementoreceita;
    },
}
}
</script>

<style>

</style>