<template>
  <div>
    <b-collapse
      visible
      id="accordion-pesquisa"
      accordion="my-accordion"
      role="tabpanel"
      class="mt-2"
    >
      <b-card class="shadow">
        <h3>Pesquisa</h3>
        <hr />
        <div class="d-flex align-items-center">
          <b-row class="col-sm-12">
            <b-form-group
              id="input-group-1"
              label="Pesquisa"
              label-for="input-1"
              class="col-sm-4"
            >
              <b-form-input
                id="input-1"
                type="email"
                placeholder="Pesquisa"
                required
                v-model="pesquisa"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-group-1"
              label="Status"
              label-for="input-1"
              class="col-sm-3"
            >
              <b-form-select
                v-model="tipoPesquisaSelect"
                :options="tipoPesquisaOptions"
              ></b-form-select>
            </b-form-group>
            <div style="margin: auto 20px">
              <b-button
                variant="primary"
                class="mt-3"
                :disabled="pesquisa === '' ? true : false"
                @click="listClientParams(1)"
              >
                <b-icon-search class="mr-2" scale="0.8"></b-icon-search>
                Pesquisar</b-button
              >
            </div>
          </b-row>
        </div>
        <table class="table table-sm">
          <thead>
            <tr>
              <th scope="col">Nome Cliente</th>
              <th scope="col">CNPJ/CPF</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cliente in clientes" :key="cliente.id_cliente">
              <td>{{ cliente.nome }}</td>
              <td>{{ cliente.cpfcnpj }}</td>
              <td>
                <b-button
                  size="sm"
                  @click="editarCliente(cliente)"
                  :id="cliente.id_cliente"
                  class="mr-2"
                  variant="info"
                  v-b-popover.hover.left="{
                    variant: 'info',
                    content: 'Editar',
                  }"
                >
                 <b-icon-check v-if="lastClienteSelect === cliente.id_cliente" scale="2"></b-icon-check
                >
                
                  <b-icon-pencil v-else scale="0.7"></b-icon-pencil
                >
                </b-button>
                <b-button
                  @click="deleteCliente(cliente.id_cliente)"
                  size="sm"
                  variant="secondary"
                  v-b-popover.hover.right="{
                    variant: 'secondary',
                    content: 'Excluir',
                  }"
                >
                  <b-icon-trash scale="0.7"></b-icon-trash
                ></b-button>
              </td>
            </tr>
          </tbody>
        </table>
        <hr />
        <div style="display: flex; justify-content: space-between">
          <b-button
            size="sm"
            variant="info"
            @click="anteriorPage"
            :disabled="page === 1 ? true : false"
          >
            <b-icon-arrow-left class="mr-2"></b-icon-arrow-left>
            Anterior</b-button
          >
          <b-button
            pill
            class="m-1"
            size="sm"
            style="background-color: #038c5a; cursor: default"
            >Pagina Atual {{ page }}</b-button
          >
          <b-button
            size="sm"
            variant="info"
            @click="proximaPage"
            :disabled="page === totalPage ? true : false"
            >Proximo <b-icon-arrow-right class="mr-2"></b-icon-arrow-right>
          </b-button>
        </div>
      </b-card>
    </b-collapse>
  </div>
</template>

<script>
import { httpEmpresa as Empresa } from "../../services/configEmpresa";

export default {
  props: {
    clienteUpdate: {
      type: Boolean,
    },
  },
  data() {
    return {
      page: 1,
      lastClienteSelect: "",
      clienteSelect: false,
      totalPage: 0,
      clientes: [],
      pesquisa: "",
      tipoPesquisaOptions: [
        { text: "Nome", value: "nome" },
        { text: "CNPJ/CPF", value: "cpfcnpj" },
      ],
      tipoPesquisaSelect: "nome",
    };
  },

  mounted() {
    this.listClient();
  },

  methods: {
    editarCliente(cliente) {
      console.log(cliente)
      this.$emit("clientEdit", cliente);
      if(this.lastClienteSelect === ""){
        document.getElementById(cliente.id_cliente).disabled = true;
        document.getElementById(cliente.id_cliente).style.backgroundColor = "#2E8B57"
       this.lastClienteSelect = cliente.id_cliente
       return
      }
      document.getElementById(this.lastClienteSelect).disabled = false;
      document.getElementById(this.lastClienteSelect).style.backgroundColor = "#17a2b8"
      document.getElementById(cliente.id_cliente).disabled = true;
      document.getElementById(cliente.id_cliente).style.backgroundColor = "#2E8B57"
      this.lastClienteSelect = cliente.id_cliente
    },

    async deleteCliente(idCliente) {
      this.$swal({
        title: "Deseja realmente Excluir",
        icon: "warning",
        confirmButtonColor: "#038c5a",
        cancelButtonColor: "#FF0000",
        showCancelButton: true,
        confirmButtonText: "Sim",
        cancelButtonText: "Não",
        type: "error",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await Empresa.delete(`/cliente/${idCliente}`);
            this.$toast.open({
              message: "Cliente Deletado com Sucesso",
              type: "info",
            });
            this.listClient();
          } catch (error) {
            console.log(error);
          }
        }
      });
    },

    proximaPage() {
      this.lastClienteSelect = ""
      this.page = this.page + 1;
      if (this.pesquisa === "") {
        this.listClient(this.page);
        return;
      }
      this.listClientParams(this.page);
    },

    anteriorPage() {
      this.page = this.page - 1;
      if (this.pesquisa === "") {
        this.listClient(this.page);
        return
      }
      this.listClientParams(this.page);
    },

    async listClientParams(page = 1) {
      try {
        const { data } = await Empresa.get(
          `/cliente/${this.pesquisa}/${this.tipoPesquisaSelect}/${page}`
        );

        console.log(data.meta.last_page);
        this.totalPage = data.meta.last_page;
        this.clientes = data.data;
        console.log(page);
        this.page = page;
      } catch (error) {
        console.log(error);
      }
    },

    async listClient(page = 1) {
      console.log(page);
      try {
        const { data } = await Empresa.get(`/cliente/${page}`);
        this.totalPage = data.meta.last_page;
        this.clientes = data.data;
        this.page = page;
      } catch (error) {
        console.log(error);
      }
    },
  },
  watch: {
    pesquisa() {
      if (this.pesquisa.length === 0) {
        this.listClient();
      }
    },
    clienteUpdate() {
      if (this.pesquisa === "") this.listClient();
      else this.listClientParams();
    },
  },
};
</script>

<style>
</style>