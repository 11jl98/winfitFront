<template>
  <b-card style="background-color: #f2f2f2" no-body class="mb-1 shadow rounded">
    <b-card-header header-tag="header" class="p-0" role="tab"> </b-card-header>
    <b-collapse
      id="accordion-pesquisa"
      accordion="my-accordion"
      role="tabpanel"
    >
      <h3 class="m-3">Pesquisa</h3>
      <hr />
      <b-card-body>
        <div>
          <b-row>
            <b-form-group
              id="sele"
              class="col-sm-4"
              label="Pesquisa"
              label-for="input-3"
            >
              <b-form-input v-model="pesquisa" class="mt-1 sele"></b-form-input>
            </b-form-group>

            <b-form-group
              id="sele"
              class="col-sm-4"
              label="Tipo de Pesquisa"
              label-for="input-3"
            >
              <b-form-select
                :options="optionsResponsavel"
                v-model="optionsResponsavelSelect"
              ></b-form-select>
            </b-form-group>

            <div style="margin: auto 20px">
              <b-button
                variant="primary"
                class="mt-3"
                :disabled="pesquisa === '' ? true : false"
                @click="readResponsaveisParams()"
              >
                <b-icon-search class="mr-2" scale="0.8"></b-icon-search>
                Pesquisar</b-button
              >
            </div>
          </b-row>

          <div>
            <table class="table table-sm">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>CPF</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="responsavel in responsaveis"
                  :key="responsavel.id_responsavel"
                >
                  <td>{{ responsavel.nome }}</td>
                  <td>{{ responsavel.cpf }}</td>
                  <td>
                    <b-button
                      size="sm"
                      @click="editarResponsavel(responsavel)"
                      :id="responsavel.id_responsavel"
                      class="mr-2"
                      variant="info"
                      v-b-popover.hover.left="{
                        variant: 'info',
                        content: 'Editar',
                      }"
                    >
                      <b-icon-check
                        v-if="
                          lastResposavelSelect === responsavel.id_responsavel
                        "
                        scale="2"
                      ></b-icon-check>

                      <b-icon-pencil v-else scale="0.7"></b-icon-pencil>
                    </b-button>
                    <b-button
                      @click="deleteResposavel(responsavel.id_responsavel)"
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
          </div>
        </div>
      </b-card-body>
    </b-collapse>
  </b-card>
</template>

<script>
import { httpEmpresa as Empresa } from "../../services/configEmpresa";

export default {
  props: {
    reloadPesquisa: {
      type: Boolean,
    },
  },
  data() {
    return {
      optionsResponsavel: [
        { text: "Nome", value: "nome" },
        { text: "CPF", value: "cpf" },
      ],
      optionsResponsavelSelect: "nome",
      pesquisa: "",
      responsaveis: [],
      lastResposavelSelect: "",
      page: 1,
      totalPage: 0,
    };
  },
  created() {
    this.readResponsaveis();
  },
  methods: {
    async readResponsaveisParams(page = 1) {
      try {
        const { data } = await Empresa.get(
          `/responsavel/${this.pesquisa}/${this.optionsResponsavelSelect}/${page}`
        );
        console.log(data);
        this.responsaveis = data.data;
        this.totalPage = data.meta.last_page;
      } catch (error) {
        console.log(error);
      }
    },

    async deleteResposavel(idResponsavel) {
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
            await Empresa.delete(`/responsavel/${idResponsavel}`);
            this.readResponsaveis();
            this.$toast.open({
              message: "Responsavel Técnico Deletado com Sucesso",
              type: "success",
            });
          } catch (error) {
            console.log(error);
          }
        }
      });
    },
    async proximaPage() {
      this.page = this.page + 1;
      if (this.pesquisa === "") {
        this.readResponsaveis(this.page);
        return;
      }
      this.readResponsaveisParams(this.page);
    },

    async anteriorPage() {
      this.page = this.page - 1;
      if (this.pesquisa === "") {
        this.readResponsaveis(this.page);
      }
      this.readResponsaveisParams(this.page);
    },

    editarResponsavel(resposavel) {
      console.log(resposavel);
      this.$emit("resposavelEdit", resposavel);
      if (this.lastResposavelSelect === "") {
        document.getElementById(resposavel.id_responsavel).disabled = true;
        document.getElementById(
          resposavel.id_responsavel
        ).style.backgroundColor = "#2E8B57";
        this.lastResposavelSelect = resposavel.id_responsavel;
        return;
      }
      document.getElementById(this.lastResposavelSelect).disabled = false;
      document.getElementById(this.lastResposavelSelect).style.backgroundColor =
        "#17a2b8";
      document.getElementById(resposavel.id_responsavel).disabled = true;
      document.getElementById(resposavel.id_responsavel).style.backgroundColor =
        "#2E8B57";
      this.lastResposavelSelect = resposavel.id_responsavel;
    },
    async readResponsaveis(page = 1) {
      const { data } = await Empresa.get(`/responsavel/${page}`);
      this.responsaveis = data.data;
      this.totalPage = data.meta.last_page;
    },
  },

  watch: {
    reloadPesquisa() {
      this.readResponsaveis();
    },
  },
};
</script>

<style>
</style>