<template>
  <b-card style="background-color: #f2f2f2; border: none" no-body class="mb-1">
    <b-card-header header-tag="header" class="p-0" role="tab"> </b-card-header>
    <b-collapse id="accordion-cliente" accordion="my-accordion" role="tabpanel">
      <b-card-body>
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
          ></b-form-select>
        </b-form-group>

        <b-button
          @click="proximoPasso('accordion-3')"
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
  created() {
      this.cliente()
  },
  data() {
    return {
      clienteSelect: null,
      clientes: [],
      propriedadeSelect: null,
      propriedadeCliente: [],
    };
  },

  methods: {
    async loadPropriedade(id) {
        try {
            const { data } = await httpEmpresa.get(`propriedade/schema/${id}`);
            console.log(data);
            this.propriedadeCliente = data;
        } catch (error) {
            console.log(error)
        }
    },
    async cliente() {
        try {
            const { data } = await httpEmpresa.get("cliente/schema");
            this.clientes = data;
            console.log(data);
        } catch (error) {
            console.log(error)
        }
    },
  },
};
</script>

<style>
</style>