<template>
    
        <b-collapse visible id="accordion-responsavel" style="background-color: #f2f2f2; border:none!important; height: 630px"  class="mb-1 shadow rounded animate__animated animate__zoomInDown" accordion="my-accordion" role="tabpanel">
    <b-overlay :show="show" bg-color="#fff" rounded="sm" spinner-variant="info" opacity="1">
        
          <b-card-body  style="height: 618px">
             <b-form-group description="Data Receita" class="col-sm-2 p-0 mb-0">
                <b-form-input disabled type="date" v-model="responsavelDados.data" size="sm"></b-form-input>
              </b-form-group>
            <b-form-group
              id="sele"
              label="Selecione Responsavel Técnico"
              label-for="input-3"
            >
              
              <b-form-select
                @change="responsavelSelecionado(responsavelSelect)"
                :options="responsavelTecnico"
                v-model="responsavelSelect"
                class="sele"
                value-field="id_responsavel"
                text-field="nome"
                size="sm"
              ></b-form-select>
            </b-form-group>
            <b-row class="d-flex align-items-baseline">
              <b-form-group label="Nº Receita" class="col-sm-3">
                <b-form-input
                size="sm"
                  v-model="responsavelDados.numeroreceita"
                ></b-form-input>
              </b-form-group>

              <b-form-group label="Complemento" class="col-sm-3">
                <b-form-input
                size="sm"
                  v-model="responsavelDados.complementoreceita"
                ></b-form-input>
              </b-form-group>

              <b-form-group label="Nº ART" class="col-sm-3">
                <b-form-input
                 size="sm"
                  v-model="responsavelDados.numeroart"
                ></b-form-input>
              </b-form-group>

              <b-form-group label="Nº Documento Fiscal" class="col-sm-3">
                <b-form-input   v-model="responsavelDados.notafiscal" size="sm"></b-form-input>
              </b-form-group>

              <b-form-group label="Série Documento Fiscal" class="col-sm-3">
                <b-form-input v-model="responsavelDados.serie" size="sm"></b-form-input>
              </b-form-group>


              <b-form-group label="Valor (R$)" class="col-sm-3">
                <b-form-input v-model="responsavelDados.valor" size="sm"></b-form-input>
              </b-form-group>
               <b-form-group label="Data NF" class="col-sm-3">
                <b-form-input type="date" v-model="responsavelDados.datanfe" size="sm"></b-form-input>
              </b-form-group>
            </b-row>
            <div>
              <label for="">Mensagem</label>
              <b-form-textarea
                id="textarea"
                placeholder="Enter something..."
                rows="3"
                max-rows="6"
                v-model="responsavelDados.observacao"
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
                      v-model="responsavelDados.obsmip"
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
    </b-overlay>
        </b-collapse>
</template>

<script>
import { httpEmpresa } from '../../services/configEmpresa';
import saveReceita from '../../assets/saveReceita.png';
import moment from 'moment'
import 'animate.css'
export default {
created(){
    this.responsavelTec();
},
data(){
    return {
      show: false,
      teste: false,
        responsavelTecnico: [],
      responsavelSelect: null,
       saveReceita: saveReceita,
      responsavelDados: {
        id_responsavel:"",
        numeroreceita: 0,
        numeroart: 0,
        complementoreceita: 0,
        notafiscal: 0,
        serie: 0,
        valor: 0,
        obsmip: "",
        observacao:"",
        datanfe: "",
        data: moment().format("YYYY-MM-DD")
      },
    }
},


methods:{
     proximoPasso(){
      this.$root.$emit('bv::toggle::collapse', 'accordion-cliente')
      this.$emit("responsavelEmit", this.responsavelDados);
document.getElementsByClassName("btnReceita")[1].focus()
      console.log(this.responsavelDados)
    },
     async responsavelTec() {
      const { data } = await httpEmpresa.get("/responsavel");
      this.responsavelTecnico = data;
      console.log(data);
      
    },
    async responsavelSelecionado(id) {
      try {
         this.show = true;
      const { data } = await httpEmpresa.get(`responsavel/schema/${id}`);
      console.log(data);
      this.responsavelDados.id_responsavel = this.responsavelSelect;
      this.responsavelDados.numeroart = data.artatual;
      this.responsavelDados.numeroreceita = data.receitasart;
      this.responsavelDados.complementoreceita = data.complementoreceita;
      this.show = false;
      } catch (error) {
      this.show = false;
      }
     

    },
}
}
</script>

<style>

</style>