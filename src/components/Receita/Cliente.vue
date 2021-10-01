<template>
 
    <b-collapse style="background-color: #f2f2f2; border-radius: 5px" class="animate__animated animate__zoomInDown"  id="accordion-cliente" accordion="my-accordion" role="tabpanel">
 <b-overlay :show="show" bg-color="#fff" rounded="sm" spinner-variant="info" opacity="1">
      <b-card-body style="height: 255px">
        <b-form-group
          id="sele"
          label="Selecione Cliente"
          class="col-sm"
          label-for="input-3"
        >
          <b-form-select
            class="mt-1 sele"
            value-field="id_cliente"
            text-field="nome"
            size="sm"
            v-model="clienteSelect"
            @change="loadPropriedade(clienteSelect)"
            :options="clientes"
          ></b-form-select>
        </b-form-group>
    
        <b-form-group
          id="sele"
          label="Selecione a Propriedade"
          class="col-sm-6"
          label-for="input-3"
        >
          <b-form-select
            class="mt-1 sele"
            v-model="propriedadeSelect"
            value-field="id_propriedade"
            text-field="nomepropriedade"
            :options="propriedadeCliente"
            size="sm"

          ></b-form-select>
        </b-form-group>

        <b-button
          @click="proximoPasso('accordion-3')"
          style="
            float: right;
            background-color: #ff6400 !important; background-color: #ff6400 !important;;
            border: none;
          "
          class="mt-4 mb-3"
          >Próximo <b-icon-arrow-down></b-icon-arrow-down
        ></b-button>
         <b-button
            style="border: none; float: left; background-color: #ff6400 !important;"
            class="mt-4 mb-3"
            @click="anterior"
            >Anterior <b-icon-arrow-up class="ml-2"></b-icon-arrow-up>
          </b-button>
      </b-card-body>
           </b-overlay>
    </b-collapse>

</template>

<script>
import { httpEmpresa as Empresa } from '../../services/configEmpresa';
export default {
  props:{
    responsavelEmit:{
      type: Object,

    }
  },
  created() {
      this.cliente()
  },
  data() {
    return {
      show: false,
      clienteSelect: null,
      clientes: [],
      propriedadeSelect: null,
      propriedadeCliente: [],
    };
  },

 

  methods: {
    anterior(){
      this.$root.$emit('bv::toggle::collapse', 'accordion-responsavel')
      document.getElementsByClassName("btnReceita")[0].focus()
    },
   async proximoPasso(){
     try {
       this.show = true
       const { data } = await Empresa.post('/receitas', {id_cliente: this.clienteSelect, id_propriedade: this.propriedadeSelect,
      ...this.responsavelEmit})
       this.$root.$emit('bv::toggle::collapse', 'accordion-agrotoxico')
       console.log(data)
       this.$store.commit("ID_RECEITUARIO", data.id_receita)
       document.getElementsByClassName("btnReceita")[2].focus()
         this.show = false
     } catch (error) {
       console.log(error.response)
        this.show = false
     }
    },
    async loadPropriedade(id) {
        try {
            const { data } = await Empresa.get(`propriedade/schema/${id}`);
            console.log(data);
            this.propriedadeCliente = data;
        } catch (error) {
            console.log(error)
        }
    },
    async cliente() {
        try {
            const { data } = await Empresa.get("/cliente");
            this.clientes = data;
            console.log(data);
        } catch (error) {
            console.log(error)
        }
    },
  },
  watch:{
    responsavelEmit(){
      console.log(this.responsavelEmit)
    }
  }
};
</script>

<style>
</style>