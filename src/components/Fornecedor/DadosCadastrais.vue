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
            <b-form-group
              id="input-group-1"
              label="Nome Fantasia"
              label-for="input-1"
              class="col-sm-5"
            >
              <b-form-input
                id="input-1"
                placeholder="Nome"
                required
                v-model="fornecedor.nome"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-1"
              label="Nome Fantasia"
              label-for="input-1"
              class="col-sm-4"
            >
              <b-form-input
                id="input-1"
                placeholder="Nome"
                required
                v-model="fornecedor.nomefantasia"
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
                v-model="fornecedor.cpfcnpj"
              ></b-form-input>
            </b-form-group>
          </b-row>

          <b-row class="d-flex justify-content-around">
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
                v-model="fornecedor.endereco"
              ></b-form-input>
            </b-form-group>

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
                v-model="fornecedor.bairro"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-1"
              label="Número"
              label-for="input-1"
              class="col-sm-1"
            >
              <b-form-input
                id="input-1"
                type="email"
                placeholder="Nº"
                required
                v-model="fornecedor.numero"
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
                v-model="fornecedor.cidade"
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
                v-model="fornecedor.uf"
              ></b-form-input>
            </b-form-group>
          </b-row>

          <b-row class="d-flex">
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
                v-model="fornecedor.telefone"
              ></b-form-input>
            </b-form-group>
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
                v-model="fornecedor.email"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-1"
              label="IE"
              label-for="input-1"
              class="col-sm-3"
            >
              <b-form-input
                id="input-1"
                type="email"
                placeholder="IE"
                required
                v-model="fornecedor.ie"
              ></b-form-input>
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
                v-model="fornecedor.observacao"
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
                  @click="saveFornecedor"
                  >Salvar
                  <b-icon-person-check class="ml-1"></b-icon-person-check
                ></b-button>
                <b-button
                  style="
                    border: none !important;
                    background-color: #038c5a !important;
                  "
                  >Limpar <b-icon-person-plus class="ml-1"></b-icon-person-plus
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
import { httpEmpresa as Empresa} from '../../services/configEmpresa';
export default {
  data() {
    return {
      fornecedor: {
        nome: "",
        nomefantasia: "",
        cpfcnpj: "",
        endereco: "",
        bairro: "",
        numero: "",
        cidade: "",
        uf: "",
        cep: "1133-121",
        telefone: "",
        email: "",
        ie: "",
        observacao: "",
      },
    };
  },
  methods: {
   async saveFornecedor(){
     try {
       const { data } = await Empresa.post('/fornecedor', this.fornecedor)
       console.log(data)
       this.$toast.open({
            message: "Fornecedor Salvo com Sucesso",
            type: "success",
          })
     } catch (error) {
       console.log(error.response)
     }
    }
  },
};
</script>

<style>
</style>