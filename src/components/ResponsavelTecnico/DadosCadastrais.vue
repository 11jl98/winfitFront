<template>
  <b-card style="background-color: #f2f2f2" no-body class="mb-1 shadow rounded">
    <b-card-header header-tag="header" class="p-0" role="tab"> </b-card-header>
    <b-collapse
      id="accordion-responsavel"
      accordion="my-accordion"
      role="tabpanel"
    >
      <h3 class="m-3">Dados do Responsavel Técnico</h3>
      <hr />
      <b-card-body>
        <div>
          <b-form-input
            v-model="dadosResponsavel.id_responsavel"
            hidden
          ></b-form-input>
          <b-row>
            <b-form-group
              id="sele"
              class="col-sm-4"
              label="Nome Responsavel"
              label-for="input-3"
            >
              <b-form-input
                v-model="dadosResponsavel.nome"
                size="sm"
                class="mt-3 sele"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="sele"
              class="col-sm-2"
              label="CPF"
              label-for="input-3"
            >
              <b-form-input
                size="sm"
                class="mt-3 sele"
                v-model="dadosResponsavel.cpf"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="sele"
              class="col-sm-2"
              label="CREA"
              label-for="input-3"
            >
              <b-form-input
                size="sm"
                v-model="dadosResponsavel.crea"
                class="mt-3 sele"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="sele"
              class="col-sm-4"
              label="Endereço"
              label-for="input-3"
            >
              <b-form-input
                size="sm"
                class="mt-3 sele"
                v-model="dadosResponsavel.endereco"
              ></b-form-input>
            </b-form-group>
          </b-row>

          <b-row>
            <b-form-group
              id="sele"
              class="col-sm-3"
              label="Bairro"
              label-for="input-3"
            >
              <b-form-input
                size="sm"
                class="mt-3 sele"
                v-model="dadosResponsavel.bairro"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="sele"
              class="col-sm-1"
              label="Número"
              label-for="input-3"
            >
              <b-form-input
                size="sm"
                class="mt-3 sele"
                v-model="dadosResponsavel.numero"
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
                v-model="dadosResponsavel.cidade"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="sele"
              class="col-sm-1"
              label="UF"
              label-for="input-3"
            >
              <b-form-input
                size="sm"
                class="mt-3 sele"
                v-model="dadosResponsavel.uf"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="sele"
              class="col-sm-2"
              label="CEP"
              label-for="input-3"
            >
              <b-form-input
                size="sm"
                class="mt-3 sele"
                v-model="dadosResponsavel.cep"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="sele"
              class="col-sm-2"
              label="Email"
              label-for="input-3"
            >
              <b-form-input
                size="sm"
                class="mt-3 sele"
                v-model="dadosResponsavel.email"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="sele"
              class="col-sm-3"
              label="Telefone"
              label-for="input-3"
            >
              <b-form-input
                size="sm"
                class="mt-3 sele"
                v-model="dadosResponsavel.telefone"
              ></b-form-input>
            </b-form-group>
          </b-row>

          <b-row>
            <b-form-group
              id="sele"
              class="col-sm-12"
              label="Observação"
              label-for="input-3"
            >
              <b-form-textarea
                id="textarea"
                placeholder="Enter something..."
                rows="3"
                max-rows="6"
                v-model="dadosResponsavel.observacao"
              ></b-form-textarea>
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
              class="mr-2"
              @click="proximoPasso('accordion-dadosTecnicos')"
              >Proxímo Passo <b-icon-arrow-down></b-icon-arrow-down
            ></b-button>
            
          </div>
          <div class="d-flex justify-content-end">
            <b-button
              style="
                background-color: #038c5a !important;
                border: none !important;
              "
              >Limpar<b-icon-arrow-clockwise
                class="ml-3"
                scale="1"
              ></b-icon-arrow-clockwise
            ></b-button>
          </div>
        </div>
      </b-card-body>
    </b-collapse>
  </b-card>
</template>

<script>
// import { httpEmpresa as Empresa } from '../../services/configEmpresa';
export default {
  props: {
    dadosPesquisa: {
      type: Object,
    },
  },
  data() {
    return {
      dadosResponsavel: {
        id_responsavel: -1,
        nome: "",
        cpf: "",
        endereco: "",
        bairro: "",
        numero: "",
        cidade: "",
        uf: "",
        telefone: "",
        email: "",
        observacao: "",
        crea: "",
        cep: "",
      },
    };
  },
  methods: {
    proximoPasso(idAcordion) {
        this.$emit("dadosResponsavel", this.dadosResponsavel);
      this.$root.$emit("bv::toggle::collapse", idAcordion);
      if (idAcordion === "accordion-dadosTecnicos") {
        document.getElementById("btnDadosResponsavel").focus();
      }
    },
  },

  watch: {
    dadosPesquisa() {
      this.dadosResponsavel.id_responsavel = this.dadosPesquisa.id_responsavel;
      this.dadosResponsavel.nome = this.dadosPesquisa.nome;
      this.dadosResponsavel.cpf = this.dadosPesquisa.cpf;
      this.dadosResponsavel.endereco = this.dadosPesquisa.endereco;
      this.dadosResponsavel.bairro = this.dadosPesquisa.bairro;
      this.dadosResponsavel.numero = this.dadosPesquisa.numero;
      this.dadosResponsavel.cidade = this.dadosPesquisa.cidade;
      this.dadosResponsavel.uf = this.dadosPesquisa.uf;
      this.dadosResponsavel.telefone = this.dadosPesquisa.telefone;
      this.dadosResponsavel.email = this.dadosPesquisa.email;
      this.dadosResponsavel.observacao = this.dadosPesquisa.observacao;
      this.dadosResponsavel.crea = this.dadosPesquisa.crea;
      this.dadosResponsavel.cep = this.dadosPesquisa.cep;

      this.$root.$emit("bv::toggle::collapse", "accordion-responsavel");
      document.getElementById("btnDadosCadastrais").focus();
      console.log(this.dadosPesquisa);
      console.log(this.dadosResponsavel);
    },
  },
};
</script>

<style>
</style>