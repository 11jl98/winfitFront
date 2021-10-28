<template>
  <b-card style="background-color: #f2f2f2" no-body class="mb-1 shadow rounded">
    <b-card-header header-tag="header" class="p-0" role="tab"> </b-card-header>

    <h3 class="m-3 teste">Cadastro da Empresa</h3>
    <div id="avatar">
      <b-avatar size="8rem"></b-avatar>
    </div>
    <hr />
    <b-card-body>
      <div>
        <b-form-input hidden v-model="dadosEmpresa.id_cadastro"> </b-form-input>
        <b-row>
          <b-form-group
            id="sele"
            class="col-sm-4 col-lg-5 col-md-5"
            label="Razão Social"
            label-for="input-3"
          >
            <b-form-input
              size="sm"
              class="mt-3 sele"
              v-model="dadosEmpresa.nomeempresa"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="sele"
            class="col-md-4 col-lg-4"
            label="Nome Fantasia"
            label-for="input-3"
          >
            <b-form-input
              size="sm"
              class="mt-3 sele"
              v-model="dadosEmpresa.nomefantasia"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="sele"
            class="col-sm-2 col-md-3 col-lg-3 col-xl-2"
            label="CPF/CNPJ"
            label-for="input-3"
          >
            <b-form-input
              size="sm"
              class="mt-3 sele"
              v-model="dadosEmpresa.cpfcnpj"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="sele"
            class="col-sm-3 col-md-5 col-xl-3"
            label="Endereço"
            label-for="input-3"
          >
            <b-form-input
              size="sm"
              class="mt-3 sele"
              v-model="dadosEmpresa.endereco"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="sele"
            class="col-sm-3 col-md-4"
            label="Bairro"
            label-for="input-3"
          >
            <b-form-input
              size="sm"
              class="mt-3 sele"
              v-model="dadosEmpresa.bairro"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="sele"
            class="col-sm-1 col-md-2 col-lg-2 col-xl-1 "
            label="Número"
            label-for="input-3"
          >
            <b-form-input
              size="sm"
              class="mt-3 sele"
              v-model="dadosEmpresa.numero"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="sele"
            class="col-sm-3"
            label="Cidade"
            label-for="input-3"
          >
            <b-form-input
              size="sm"
              class="mt-3 sele"
              v-model="dadosEmpresa.cidade"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="sele"
            class="col-sm-1 col-md-2 col-lg-2 col-xl-1"
            label="UF"
            label-for="input-3"
          >
            <b-form-input
              size="sm"
              class="mt-3 sele"
              v-model="dadosEmpresa.uf"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="sele"
            class="col-sm-2 col-md-3 col-xl-2"
            label="CEP"
            label-for="input-3"
          >
            <b-form-input
              size="sm"
              class="mt-3 sele"
              v-model="dadosEmpresa.cep"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="sele"
            class="col-sm-2 col-md-4 col-lg-3 col-xl-2"
            label="Telefone"
            label-for="input-3"
          >
            <b-form-input
              size="sm"
              class="mt-3 sele"
              v-model="dadosEmpresa.telefone"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="sele"
            class="col-sm-3 col-md-4 col-lg-3 col-xl-2"
            label="Email"
            label-for="input-3"
          >
            <b-form-input
              size="sm"
              class="mt-3 sele"
              v-model="dadosEmpresa.email"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="sele"
            class="col-sm-2 col-md-3 col-lg-2 col-xl-2"
            label="IE"
            label-for="input-3"
          >
            <b-form-input
              size="sm"
              class="mt-3 sele"
              v-model="dadosEmpresa.ie"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="sele" label="Logo" class="col-md-5 col-xl-3 col-lg-5">
              <b-form-file label="Logo"  placeholder="" class="mt-2" size="sm" drop-placeholder="Soltar"  browse-text="Escolher arquivo"></b-form-file>
          </b-form-group>
        </b-row>
      </div>
      <div class="d-flex justify-content-end">
        <div>
          <b-button
            style="
              background-color: #ff6400 !important;
              border: none !important;
            "
            @click="salvarEmpresa"
            class="mr-2"
            >Salvar <b-icon-person-check-fill></b-icon-person-check-fill
          ></b-button>
        </div>
      </div>
    </b-card-body>
  </b-card>
</template>

<script>
import { httpEmpresa as Empresa } from "../../services/configEmpresa";
export default {
  data() {
    return {
      dadosEmpresa: {
        nomeempresa: "",
        nomefantasia: "",
        cpfcnpj: "",
        endereco: "",
        bairro: "",
        numero: "",
        cidade: "",
        uf: "",
        cep: "",
        telefone: "",
        email: "",
        ie: "",
        id_cadastro: "",
      },
    };
  },
  methods: {
    async salvarEmpresa() {
      try {
        console.log(this.dadosEmpresa.id_cadastro);
        if (this.dadosEmpresa.id_cadastro === "") {
          const { data } = await Empresa.post("/empresa", this.dadosEmpresa);
          this.$toast.open({
            message: "Registro salvo!",
            type: "success",
          });
          return data;
        }
        this.atualizarEmpresa();
      } catch (error) {
        console.log(error.response);
      }
    },
    async atualizarEmpresa() {
      try {
        const { data } = await Empresa.put(
          `/empresa/${this.dadosEmpresa.id_cadastro}`,
          this.dadosEmpresa
        );
        console.log(data);
        this.$toast.open({
            message: "Cadastro atualizado!",
            type: "success",
          });
        return data;
      } catch (error) {
        console.log(error.response);
        if (error.response.status === 422) {
           error.response.data.errors.map(el => {
             this.$toast.open({
            message: el.message,
            type: "warning",
          });
          })
        }
      }
    },
    async buscarEmpresa() {
      try {
        // if(this.id_cadastro === '') return
        const { data } = await Empresa.get(`/empresa`);
        Object.assign(this.dadosEmpresa, data[0]);
        console.log(data[0]);
      } catch (error) {
        console.log(error.response);
      }
    },
  },
  mounted() {
    this.buscarEmpresa();
  },
};
</script>

<style>

#avatar {
  margin: 0 auto;
}
</style>

