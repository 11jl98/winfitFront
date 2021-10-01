<template>
  <div>
    <b-collapse
      visible
      id="accordion-dadosCadastrais"
      accordion="my-accordion"
      role="tabpanel"
      class="mt-2"
    >
      <b-card class="shadow">
        <h3>Dados Cadastrais</h3>
        <hr />
        <div class="mt-4">
          <b-row class="d-flex justify-content-around">
            <b-form-input
              hidden
              class="col-sm-1"
              v-model="cliente.id_cliente"
            ></b-form-input>

            <b-form-group
              id="input-group-1"
              label="Nome Cliente"
              label-for="input-1"
              class="col-sm-5"
            >
              <b-form-input
                id="input-1"
                placeholder="Nome"
                required
                v-model="cliente.nome"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-1"
              label="CNPJ/CPF"
              label-for="input-1"
              class="col-sm-3"
            >
              <b-form-input
                id="input-1"
                placeholder="CNPJ/CPF"
                required
                v-model="cliente.cpfcnpj"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-1"
              label="Endereço"
              label-for="input-1"
              class="col-sm-4"
            >
              <b-form-input
                id="input-1"
                placeholder="Endereço"
                required
                v-model="cliente.endereco"
              ></b-form-input>
            </b-form-group>
          </b-row>

          <b-row class="d-flex justify-content-around">
            <b-form-group
              id="input-group-1"
              label="Bairro"
              label-for="input-1"
              class="col-sm-3"
            >
              <b-form-input
                id="input-1"
                placeholder="Bairro"
                required
                v-model="cliente.bairro"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-1"
              label="Número"
              label-for="input-1"
              class="col-sm-2"
            >
              <b-form-input
                id="input-1"
                type="email"
                placeholder="Número"
                required
                v-model="cliente.numero"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-1"
              label="Cidade"
              label-for="input-1"
              class="col-sm-3"
            >
              <b-form-input
                id="input-1"
                type="email"
                placeholder="Cidade"
                required
                v-model="cliente.cidade"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-1"
              label="UF"
              label-for="input-1"
              class="col-sm-1"
            >
              <b-form-input
                id="input-1"
                placeholder="UF"
                required
                v-model="cliente.uf"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-1"
              label="Telefone"
              label-for="input-1"
              class="col-sm-3"
            >
              <b-form-input
                id="input-1"
                type="email"
                placeholder="Telefone"
                required
                v-model="cliente.telefone"
              ></b-form-input>
            </b-form-group>
          </b-row>

          <b-row class="d-flex justify-content-around">
            <b-form-group
              id="input-group-1"
              label="Email"
              label-for="input-1"
              class="col-sm-3"
            >
              <b-form-input
                id="input-1"
                type="email"
                placeholder="Email"
                required
                v-model="cliente.email"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-1"
              label="IEPR"
              label-for="input-1"
              class="col-sm-3"
            >
              <b-form-input
                id="input-1"
                type="email"
                placeholder="IEPR"
                required
                v-model="cliente.iepr"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-1"
              label="RG/IE"
              label-for="input-1"
              class="col-sm-3"
            >
              <b-form-input
                id="input-1"
                type="email"
                placeholder="RG/IE"
                required
                v-model="cliente.rgie"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-1"
              label="Status"
              label-for="input-1"
              class="col-sm-3"
            >
              <b-form-select
                v-model="cliente.status"
                :options="statusSelect"
              ></b-form-select>
            </b-form-group>
          </b-row>
          <div>
            <b-form-group
              id="input-group-1"
              label="Observação"
              label-for="input-1"
              class="col-sm-12"
            >
              <b-form-textarea
                id="textarea"
                placeholder="Enter something..."
                rows="3"
                max-rows="6"
              ></b-form-textarea>
            </b-form-group>
            <div class="d-flex justify-content-end">
              <div>
                <b-button
                  class="mr-4"
                  style="
                    border: none !important;
                    background-color: #ff6400 !important;
                  "
                  @click="saveClient"
                  >Salvar
                  <b-icon-person-check class="ml-1"></b-icon-person-check
                ></b-button>
                <b-button
                  style="
                    border: none !important;
                    background-color: #038c5a !important;
                  "
                  >Limpar
                  <b-icon-arrow-clockwise class="ml-1"></b-icon-arrow-clockwise
                ></b-button>
              </div>
            </div>
          </div>
        </div>
      </b-card>
    </b-collapse>
  </div>
</template>

<script>
import { httpEmpresa as Empresa } from "../../services/configEmpresa";
export default {
  props: {
    clientEdit: {
      type: Object,
    },
  },
  data() {
    return {
      cliente: {
        id_cliente: -1,
        nome: "",
        cpfcnpj: "",
        endereco: "",
        bairro: "",
        numero: "",
        cidade: "",
        UF: "to",
        cep: "12311233",
        telefone: "",
        email: "",
        iepr: "",
        observacao: "",
        rgie: "",
        status: "ativo",
      },
      statusSelect: [
        { text: "Ativo", value: "ativo" },
        { text: "Desativado", value: "desativado" },
      ],
    };
  },

  methods: {
    async saveClient() {
      try {
        if (this.cliente.id_cliente === -1) {
          const { data } = await Empresa.post("/cliente", this.cliente);
          console.log(data);
          this.$toast.open({
            message: "Cliente Salvo com Sucesso",
            type: "success",
          });
          this.$emit("idClienteEvent", data.id_cliente);
        } else {
          this.updateCliente();
        }
      } catch (error) {
        console.log(error.response);
      }
    },

    async updateCliente() {
      try {
        await Empresa.put(`/cliente/${this.cliente.id_cliente}`, this.cliente);
        this.$toast.open({
          message: "Cliente Atualizado com Sucesso",
          type: "success",
        });
        this.$emit("updateCliente");
      } catch (error) {
        console.log(error);
      }
    },
  },

  watch: {
    clientEdit() {
      Object.assign(this.cliente, this.clientEdit);
      this.$emit("idClienteEvent", this.clientEdit.id_cliente);
      this.$root.$emit("bv::toggle::collapse", "accordion-dadosCadastrais");
      document.getElementById("btnReceita").focus();
    },
  },
};
</script>

<style>
</style>