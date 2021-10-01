<template>
  <div>
    <b-collapse
      visible
      id="accordion-pesquisaFornecedor"
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
                :options="optionsPesquisa"
                v-model="optionsPesquisaSelect"
              ></b-form-select>
            </b-form-group>
            <div style="margin: auto 20px">
              <b-button
                variant="primary"
                class="mt-3"
                @click="listFornecedorParams()"
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
              <th scope="col">CNPJ</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="fornecedor in fornecedores"
              :key="fornecedor.id_fornecedor"
            >
              <td>{{ fornecedor.nome }}</td>
              <td>{{ fornecedor.cpfcnpj }}</td>
              <td>
                <b-button
                  size="sm"
                  @click="editarFornecedor(fornecedor)"
                  :id="fornecedor.id_fornecedor"
                  class="mr-2"
                  variant="info"
                  v-b-popover.hover.left="{
                    variant: 'info',
                    content: 'Editar',
                  }"
                >
                  <b-icon-check
                    v-if="lastFornecedorSelect === fornecedor.id_fornecedor"
                    scale="2"
                  ></b-icon-check>

                  <b-icon-pencil v-else scale="0.7"></b-icon-pencil>
                </b-button>
                <b-button
                  @click="excluirFornecedor(fornecedor.id_fornecedor)"
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
        <div style="display: flex; justify-content: space-between">
          <b-button
            size="sm"
            variant="info"
            :disabled="page === 1 ? true : false"
            @click="anteriorPage"
          >
            <b-icon-arrow-left class="mr-2"></b-icon-arrow-left>
            Anterior</b-button
          >
          <b-button
            pill
            class="m-1"
            size="sm"
            style="
              background-color: #038c5a;
              cursor: default;
              border: none !important;
            "
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
    atualizarPesquisa: {
      type: Boolean,
    },
  },
  data() {
    return {
      page: 1,
      totalPage: 0,
      optionsPesquisa: [
        { text: "Nome", value: "nome" },
        { text: "CNPJ", value: "cpfcnpj" },
      ],
      optionsPesquisaSelect: "nome",
      pesquisa: "",
      lastFornecedorSelect: "",
      fornecedores: [],
    };
  },
  mounted() {
    this.listFornecedor();
  },
  methods: {
    proximaPage() {
      this.page = this.page + 1
      this.lastFornecedorSelect = ""
      if(this.pesquisa === ""){
        this.listFornecedor(this.page)
        return
      }
      this.listFornecedorParams(this.page)
    },

    anteriorPage() {
      this.page = this.page - 1
      this.lastFornecedorSelect = ""
      if(this.pesquisa === ""){
        this.listFornecedor(this.page)
        return
      }
      this.listFornecedorParams(this.page)
    },

    async excluirFornecedor(idFornecedor) {
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
            const { data } = await Empresa.delete(
              `/fornecedor/${idFornecedor}`
            );
            console.log(data);
            this.$toast.open({
              message: "Fornecedor Deletado com Sucesso",
              type: "success",
              position: "bottom",
            });
            this.$emit('limparForm')
               document.getElementById(this.lastFornecedorSelect).disabled = false;
      document.getElementById(this.lastFornecedorSelect).style.backgroundColor =
        "#17a2b8";
            this.lastFornecedorSelect = ""
            this.listFornecedor();
          } catch (error) {
            console.log(error);
          }
        }
      });
    },

    editarFornecedor(fornecedor) {
      this.$emit("dadosFornecedor", fornecedor);
      if (this.lastFornecedorSelect === "") {
        document.getElementById(fornecedor.id_fornecedor).disabled = true;
        document.getElementById(
          fornecedor.id_fornecedor
        ).style.backgroundColor = "#2E8B57";
        this.lastFornecedorSelect = fornecedor.id_fornecedor;
        return;
      }
      document.getElementById(this.lastFornecedorSelect).disabled = false;
      document.getElementById(this.lastFornecedorSelect).style.backgroundColor =
        "#17a2b8";
      document.getElementById(fornecedor.id_fornecedor).disabled = true;
      document.getElementById(fornecedor.id_fornecedor).style.backgroundColor =
        "#2E8B57";
      this.lastFornecedorSelect = fornecedor.id_fornecedor;
    },

    async listFornecedorParams(page = 1) {
      try {
        const { data } = await Empresa.get(
          `/fornecedor/${this.pesquisa}/${this.optionsPesquisaSelect}/${page}`
        );
          this.totalPage = data.meta.last_page;
        this.fornecedores = data.data;
        this.page = page;
      } catch (error) {
        console.log(error);
      }
    },

    async listFornecedor(page = 1) {
      try {
        const { data } = await Empresa.get(`/fornecedor/${page}`);
        this.totalPage = data.meta.last_page;
        this.fornecedores = data.data;
        this.page = page;
      } catch (error) {
        console.log(error);
      }
    },
  },
  watch: {
    atualizarPesquisa() {
      this.listFornecedor();
    },
  },
};
</script>

<style>
</style>