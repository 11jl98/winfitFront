<template>
  <b-collapse
    class="animate__animated animate__zoomInDown"
    style="
      background-color: #f2f2f2;
      border: none !important;
      border-radius: 5px;
    "
    id="accordion-pesquisa"
    accordion="my-accordion"
    role="tabpanel"
  >
    <b-card-body style="border: none !important; height: 400px">
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
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="input-group-1"
            label="Status"
            label-for="input-1"
            class="col-sm-3"
          >
            <b-form-select></b-form-select>
          </b-form-group>
          <div style="margin: auto 20px">
            <b-button variant="primary" class="mt-3">
              <b-icon-search class="mr-2" scale="0.8"></b-icon-search>
              Pesquisar</b-button
            >
          </div>
        </b-row>
      </div>
      <b-overlay
        :show="show"
        bg-color="#fff"
        rounded="sm"
        spinner-variant="info"
        opacity="1"
      >
        <div>
          <table class="table table-sm">
            <thead>
              <tr>
                <th>Nº Receita</th>
                <th>Nº NF</th>
                <th>ART/TRT</th>
                <th>Responsavel</th>
                <th>Cliente</th>
                <th>Data</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="receita in receitas" :key="receita.idReceita">
                <td class="textoGrande">{{ receita.numeroreceita }}</td>
                <td>{{ receita.notafiscal }}</td>
                <td
                  class="textoGrande"
                  v-b-popover.hover.top="{
                    variant: 'secondary',
                    content: receita.numeroart,
                  }"
                >
                  {{ receita.numeroart }}
                </td>
                <td
                  class="textoGrande"
                  v-b-popover.hover.top="{
                    variant: 'secondary',
                    content:
                      receita.responsavel.nome +
                      ' CPF: ' +
                      receita.responsavel.cpf,
                  }"
                >
                  {{ receita.responsavel.nome }}
                </td>
                <td
                  class="textoGrande"
                  v-b-popover.hover.top="{
                    variant: 'secondary',
                    content:
                      receita.cliente.nome +
                      ' CPF/CNPJ: ' +
                      receita.responsavel.cpf,
                  }"
                >
                  {{ receita.cliente.nome }}
                </td>
                <td>{{ receita.data.split("-").reverse().join("/") }}</td>
                <td>
                  <b-button
                    size="sm"
                    @click="editarReceita(receita)"
                    :id="receita.id_receita"
                    class="mr-2"
                    variant="info"
                    v-b-popover.hover.left="{
                      variant: 'info',
                      content: 'Editar',
                    }"
                  >
                    <b-icon-check
                      v-if="lastReceitaSelect === receita.id_receita"
                      scale="2"
                    ></b-icon-check>

                    <b-icon-pencil v-else scale="0.7"></b-icon-pencil>
                  </b-button>
                  <b-button
                    size="sm"
                    variant="secondary"
                    v-b-popover.hover.right="{
                      variant: 'secondary',
                      content: 'Excluir',
                    }"
                    @click="excluir(receita)"
                  >
                    <b-icon-trash scale="0.7"></b-icon-trash
                  ></b-button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </b-overlay>
    </b-card-body>
  </b-collapse>
</template>

<script>
// import moment from 'moment';
import { httpEmpresa as Empresa } from "../../services/configEmpresa";
export default {
  mounted() {
    this.listReceita();
  },

  data() {
    return {
      show: false,
      receitas: [],
      lastReceitaSelect: "",
    };
  },
  computed: {
    dataFormatada(data) {
      console.log(data);
      return data.split("-").reverse().join("/");
    },
  },
  methods: {
    async excluir(receita) {
      this.$swal({
        title: "Deseja excluir a receita",
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
            await Empresa.delete(`/receitas/${receita.id_receita}`);
            this.listReceita();
          } catch (error) {
            if (error.response.status === 409) {
              this.$toast.open({
                message:
                  "Para apagar a receita você deve excluir os agrotoxicos pertencentes a ela",
                type: "error",
              });
              await this.editarReceita(receita);
            }
          }
        }
      });
    },

    editarReceita(receita) {
      //   this.$emit("dadosFornecedor", fornecedor);
      if (this.lastReceitaSelect === "") {
        document.getElementById(receita.id_receita).disabled = true;
        document.getElementById(receita.id_receita).style.backgroundColor =
          "#2E8B57";
        this.lastReceitaSelect = receita.id_receita;
        this.readInfortecnica(receita.id_receita);
        this.$emit("dadosReceita", receita);
        this.$store.commit("ID_RECEITUARIO", receita.id_receita);
        this.$root.$emit("bv::toggle::collapse", "accordion-agrotoxico");
        return;
      }
      document.getElementById(this.lastReceitaSelect).disabled = false;
      document.getElementById(this.lastReceitaSelect).style.backgroundColor =
        "#17a2b8";
      document.getElementById(receita.id_receita).disabled = true;
      document.getElementById(receita.id_receita).style.backgroundColor =
        "#2E8B57";
      this.lastReceitaSelect = receita.id_receita;
      this.readInfortecnica(receita.id_receita);
      this.$emit("dadosReceita", receita);
      this.$root.$emit("bv::toggle::collapse", "accordion-agrotoxico");
    },


    async readInfortecnica(idReceita) {
      try {
        const { data } = await Empresa.get(`/infortecnica/${idReceita}`);
        this.$emit("dadosInfortecnica", data);
        console.log(data);
      } catch (error) {
        console.log(error)
      }
    },


    async listReceita(page = 1) {
      try {
        const { data } = await Empresa.get(`/receitas/pesquisa/${page}`);
        this.receitas = data.data;
      } catch (error) {
        console.log(error)
      }
    },
  },
};
</script>

<style>
.textoGrande {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 100px;
}
</style>