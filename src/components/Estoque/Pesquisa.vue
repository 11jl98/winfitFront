<template>
  <div>
    <b-collapse
      visible
      id="accordion-pesquisaEstoque"
      accordion="my-accordion"
      role="tabpanel"
      class="mt-2"
    >
      <b-card class="shadow">
        <b-row class="col-sm-12">
          <b-form-group
            id="input-group-1"
            label="Pesquisa"
            label-for="input-1"
            class="col-sm-3"
          >
            <b-form-input
              id="input-1"
              type="email"
              placeholder="Pesquisa"
              required
              size="sm"
              v-model="pesquisa"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="input-group-1"
            label="Status"
            label-for="input-1"
            class="col-sm-3"
            size="sm"
          >
            <b-form-select
              v-model="tipoPesquisa"
              :options="tipoPesquisaSelect"
              size="sm"
            ></b-form-select>
          </b-form-group>
          <b-form-group
            id="input-group-1"
            label="Data Inicial"
            label-for="input-1"
            class="col-sm-3"
          >
            <b-form-input
              id="input-1"
              v-model="dataInicial"
              type="date"
              size="sm"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-1"
            label="Data Final"
            label-for="input-1"
            class="col-sm-3"
          >
            <b-form-input
              id="input-1"
              v-model="dataFinal"
              type="date"
              size="sm"
            ></b-form-input>
          </b-form-group>
          <div style="margin: auto 20px">
            <b-button variant="primary" class="mt-3 mb-3" @click="typePesquisa()">
              <b-icon-search class="mr-2" scale="0.8"></b-icon-search>
              Pesquisar</b-button
            >
          </div>
        </b-row>
        <div>
          <table class="table table-sm">
            <thead>
              <tr>
                <th>Nº Controle</th>
                <th>Agrotóxico</th>
                <th>Tipo Movimentação</th>
                <th>Quant.</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="movimentacao in movimentacoes"
                :key="movimentacao.id_estoque"
              >
                <td>{{ movimentacao.numerocontrole }}</td>
                <td>{{ movimentacao.nomeagrotoxico }}</td>
                <td>{{ movimentacao.tipomovimentacao }}</td>
                <td>{{ movimentacao.quantidade }}</td>
                <td>
                  <b-button
                    size="sm"
                    @click="editarEstoque(movimentacao)"
                    :id="movimentacao.id_estoque"
                    class="mr-2"
                    variant="info"
                    v-b-popover.hover.left="{
                      variant: 'info',
                      content: 'Editar',
                    }"
                  >
                    <b-icon-check
                      v-if="lastEstoqueSelect === movimentacao.id_estoque"
                      scale="2"
                    ></b-icon-check>

                    <b-icon-pencil v-else scale="0.7"></b-icon-pencil>
                  </b-button>
                  <b-button
                    @click="excluirEstoque(movimentacao.id_estoque)"
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
        </div>
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
  data() {
    return {
      dataInicial: "",
      dataFinal: "",
      data: "",
      movimentacoes: [],
      lastEstoqueSelect: "",
      page: 1,
      totalPage: 0,
      pesquisa: "",
      tipoPesquisa: "",
      tipoPesquisaSelect: [
        { text: "Número de Controle", value: "numerocontrole" },
        { text: "Nome Agrotoxico", value: "nomeagrotoxico" },
        { text: "Tipo Movimentação", value: "tipomovimentacao" },
        { text: "Nome Responsavel", value: "nomeresponsaveltecnico" },
      ],
    };
  },
  mounted() {
    this.listEstoque();
  },
  methods: {
    typePesquisa(page = 1) {
      if (this.dataInicial === "" || this.dataFinal === "") {
        if (this.pesquisa === "") {
          this.listEstoque(page);
          return;
        }
        this.listEstoqueParams(page);
        return;
      }

      if (this.dataInicial != "" && this.dataFinal != "") {
        if (this.pesquisa != "") {
          this.listEstoqueParamsData(page);
          return;
        }
        this.listEstoqueData(page);
        return;
      }
    },

    async excluirEstoque(idEstoque) {
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
            await Empresa.delete(`estoque/${idEstoque}`);
            this.$toast.open({
              message: "Movimentação Deletada com Sucesso",
              position: "bottom",
              type: "info",
            });
            this.listEstoque();
          } catch (error) {
            console.log(error);
          }
        }
      });
    },
    listEstoquePeriodo() {},
    editarEstoque(estoque) {
      this.$emit("dadosEstoque", estoque);
      console.log(estoque);
      if (this.lastEstoqueSelect === "") {
        document.getElementById(estoque.id_estoque).disabled = true;
        document.getElementById(estoque.id_estoque).style.backgroundColor =
          "#2E8B57";
        this.lastEstoqueSelect = estoque.id_estoque;
        return;
      }
      document.getElementById(this.lastEstoqueSelect).disabled = false;
      document.getElementById(this.lastEstoqueSelect).style.backgroundColor =
        "#17a2b8";
      document.getElementById(estoque.id_estoque).disabled = true;
      document.getElementById(estoque.id_estoque).style.backgroundColor =
        "#2E8B57";
      this.lastEstoqueSelect = estoque.id_estoque;
    },

    anteriorPage() {
      this.lastEstoqueSelect = "";
      this.page = this.page - 1;
      this.typePesquisa(this.page)
    },
    proximaPage() {
      this.page = this.page + 1;
      this.lastEstoqueSelect = "";
      this.typePesquisa(this.page)
    },
    async listEstoque(page = 1) {
      const { data } = await Empresa.get(`/estoque/${page}`);
      this.totalPage = data.meta.last_page;
      this.page = page;
      this.movimentacoes = data.data;
    },

    async listEstoqueData(page = 1) {
      console.log(this.dataInicial, this.dataFinal);
      const { data } = await Empresa.get(
        `/estoque/pesquisa/${this.dataInicial}/${this.dataFinal}/${page}`
      );
      console.log(data);
      this.totalPage = data.meta.last_page;
      this.page = page;
      this.movimentacoes = data.data;
    },

    async listEstoqueParamsData(page = 1) {
      const { data } = await Empresa.get(
        `/estoque/${this.pesquisa}/${this.tipoPesquisa}/${this.dataInicial}/${this.dataFinal}/${page}`
      );
      this.totalPage = data.meta.last_page;
      this.page = page;
      this.movimentacoes = data.data;
      console.log(data);
    },

    async listEstoqueParams(page = 1) {
      const { data } = await Empresa.get(
        `/estoque/${this.pesquisa}/${this.tipoPesquisa}/${page}`
      );
      this.totalPage = data.meta.last_page;
      this.page = page;
      this.movimentacoes = data.data;
    },
  },
};
</script>

<style>
</style>