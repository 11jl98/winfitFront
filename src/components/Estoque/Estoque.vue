<template>
  <div>
    <b-collapse
      visible
      id="accordion-dadosEstoque"
      accordion="my-accordion"
      role="tabpanel"
      class="mt-2"
    >
      <b-card class="shadow">
        <b-row class="d-flex">
          <b-form-group
            id="input-group-1"
            class="col-sm-3 ml-2 mb-0"
            description="Data da Movimentação"
          >
            <b-form-input
              disabled
              type="date"
              size="sm"
              v-model="estoque.data"
            ></b-form-input>
          </b-form-group>
          <h4 style="margin-left: 18%">Dados Cadastrais</h4>
        </b-row>

        <hr />
        <div class="d-flex col-sm-12">
          <div class="col-sm-4">
            <b-form-group id="input-group-1" class="col-sm-12">
              <template #label>
                Agrotóxico
                <b-button v-b-modal.modal-1 size="sm" variant="primary"
                  ><b-icon-search></b-icon-search>
                </b-button>
              </template>
              <b-form-input
                @blur="openAgrotoxico"
                v-model="agrotoxicoSelect"
                disabled
                size="sm"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="sele" class="col-sm-12">
              <template #label>
                Embalagem
                <b-button v-b-modal.modal-embalagem size="sm" variant="primary"
                  ><b-icon-search></b-icon-search>
                </b-button>
              </template>

              <b-form-input
                id="input-1"
                placeholder="Embalagem"
                required
                disabled
                size="sm"
                v-model="nomeEmbalagem"
              ></b-form-input>
              <!-- <b-form-select
                size="sm"
                class="mt-2 sele"
                v-model="embalagemSelect"
                 @change="loadEmbalagem"
              >
                <b-form-select-option
                  v-for="embalagem in embalagens"
                  :key="embalagem.IDEMBALAGEM"
                  :value="embalagem.IDEMBALAGEM"
                
                  >{{
                    embalagem.NOME +
                    " - " +
                    embalagem.CAPACIDADE +
                    " " +
                    embalagem.UNIDADE
                  }}</b-form-select-option
                >
              </b-form-select> -->
            </b-form-group>
            <b-form-group
              id="input-group-1"
              label="Tipo Movimentação"
              label-for="input-1"
              class="col-sm-12"
            >
              <b-form-select
                v-model="estoque.tipomovimentacao"
                :options="tipoMovimentacao"
                size="sm"
              ></b-form-select>
            </b-form-group>
          </div>
          <div class="col-sm-8 mt-2">
            <b-row>
              <b-form-group
                id="input-group-1"
                label="Quantidade"
                label-for="input-1"
                class="col-sm-3"
              >
                <b-form-input
                  id="input-1"
                  type="email"
                  placeholder="Quantidade"
                  required
                  size="sm"
                  v-model="estoque.quantidade"
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-1"
                label="Nº Receita"
                label-for="input-1"
                class="col-sm-3"
              >
                <b-form-input
                  id="input-1"
                  type="email"
                  placeholder="Nº Receita"
                  required
                  size="sm"
                  v-model="estoque.receita"
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-1"
                label="Nº NF"
                label-for="input-1"
                class="col-sm-3"
              >
                <b-form-input
                  id="input-1"
                  type="email"
                  placeholder="Nº NF"
                  required
                  size="sm"
                  v-model="estoque.notafiscal"
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-1"
                label="Serie"
                label-for="input-1"
                class="col-sm-3"
              >
                <b-form-input
                  id="input-1"
                  type="email"
                  placeholder="Serie"
                  required
                  size="sm"
                  v-model="estoque.serie"
                ></b-form-input>
              </b-form-group>
            </b-row>

            <b-row>
              <b-form-group
                id="input-group-1"
                label="Lote"
                label-for="input-1"
                class="col-sm-3"
              >
                <b-form-input
                  id="input-1"
                  type="email"
                  placeholder="Lote"
                  required
                  size="sm"
                  v-model="estoque.numlote"
                ></b-form-input>
              </b-form-group>
              <b-form-group
                id="input-group-1"
                label="Data Vencimento"
                label-for="input-1"
                class="col-sm-4"
              >
                <b-form-input
                  id="input-1"
                  type="date"
                  placeholder="Data Vencimento"
                  required
                  size="sm"
                  v-model="estoque.datavencimento"
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-1"
                label="Data NF"
                label-for="input-1"
                class="col-sm-4"
              >
                <b-form-input
                  id="input-1"
                  type="date"
                  placeholder="Data NF"
                  required
                  size="sm"
                  v-model="estoque.datanfe"
                ></b-form-input>
              </b-form-group>
            </b-row>

            <b-row>
              <b-form-group
                id="input-group-1"
                label="Responsavel Técnico"
                label-for="input-1"
                class="col-sm-6"
              >
                <b-form-select
                  :options="responsavel"
                  text-field="nome"
                  value-field="nome"
                  v-model="estoque.nomeresponsaveltecnico"
                  size="sm"
                ></b-form-select>
              </b-form-group>
              <b-form-group
                id="input-group-1"
                label="Fornecedor"
                label-for="input-1"
                class="col-sm-5"
              >
                <b-form-select
                  :options="fornecedor"
                  text-field="nome"
                  value-field="id_fornecedor"
                  v-model="estoque.id_fornecedor"
                  size="sm"
                ></b-form-select>
              </b-form-group>
            </b-row>
          </div>
        </div>
        <hr />
        <div class="d-flex justify-content-end">
          <div>
            <b-button
              class="mr-4"
              style="
                border: none !important;
                background-color: #ff6400 !important;
              "
              @click="saveEstoque"
              >Salvar <b-icon-cart-check class="ml-1"></b-icon-cart-check
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
      </b-card>
    </b-collapse>
    <ModalAgrotoxico @agrotoxicoSelect="loadAgrotSelect($event)" />
    <ModalEmbalagem
      :idAgrotoxico="estoque.id_agrotoxico"
      @embalagemSelecionada="loadEmbalagem($event)"
    />
  </div>
</template>

<script>
import ModalAgrotoxico from "../../components/ModalAgrotoxico/Modal-Agrotoxico.vue";
import ModalEmbalagem from "../../components/ModalEmbalagem/Modal-Embalagem.vue";
import { http as Compendio } from "../../services/configCompendio";
import { httpEmpresa as Empresa } from "../../services/configEmpresa";
import moment from "moment";
export default {
  props: {
    dadosEstoque: {
      type: Object,
    },
  },
  data() {
    return {
      responsavel: [],
      responsavelSelect: null,
      fornecedor: [],
      tipoMovimentacaoSelect: "",
      tipoMovimentacao: [
        { text: "Compra", value: "COMPRA" },
        { text: "Venda", value: "VENDA" },
        { text: "Inventário Entrada", value: "INVENTARIO-ENTRADA" },
        { text: "Inventário Saída", value: "INVENTARIO-SAIDA" },
        { text: "Devolução", value: "DEVOLUCAO" },
        { text: "Transferência Saída", value: "TRANSFERENCIA-SAIDA"},
        { text: "Transferência Entrada", value: "TRANSFERENCIA-ENTRADA"}
      ],
      embalagens: [],
      embalagemSelect: null,
      estoque: {
        id_estoque: -1,
        id_agrotoxico: -1,
        id_fornecedor: -1,
        id_embalagem: -1,
        data: "",
        datavencimento: "",
        datanfe: "",
        embalagemindea: "",
        enviado: "",
        nomeagrotoxico: "",
        nomeembalagem: "",
        tipoembalagem: "",
        unidademmbalagem: "",
        nomeresponsaveltecnico: "",
        tipomovimentacao: "",
        json: "",
        notafiscal: "",
        numlote: "",
        observacao: "",
        quantidade: "",
        receita: "",
        registroagrotox: "",
        serie: "",
        statussc: "",
      },
      agrotoxicoSelect: null,
      nomeAgrot: "",
      registro: "",
    };
  },
  components: {
    ModalAgrotoxico,
    ModalEmbalagem,
  },

  mounted() {
    this.listFornecedor();
    this.readResponsavel();
    this.estoque.data = moment(new Date()).format("yyyy-MM-DD");
    console.log(this.estoque.data);
  },

  computed: {
    nomeEmbalagem() {
      return (
        this.estoque.nomeembalagem +
        " " +
        this.estoque.tipoembalagem +
        " " +
        this.estoque.unidademmbalagem
      );
    },
  },

  methods: {
    loadEmbalagem(embalagem) {
      this.estoque.nomeembalagem = embalagem.NOME;
      this.estoque.tipoembalagem = embalagem.CAPACIDADE;
      this.estoque.unidademmbalagem = embalagem.UNIDADE;
    },
    async updateEstoque() {
      const { data } = await Empresa.put(
        `estoque/${this.estoque.id_estoque}`,
        this.estoque
      );
      this.$toast.open({
        message: "Movimentação Atualizada com Sucesso",
        position: "bottom",
      });
      console.log(data);
    },
    async saveEstoque() {
      try {
        if (this.estoque.id_estoque === -1) {
          this.estoque.datavencimento = moment(
            this.estoque.datavencimento
          ).format("yyyy-MM-DD");
          this.estoque.datanfe = moment(this.estoque.datanfe).format(
            "yyyy-MM-DD"
          );
          this.estoque.id_embalagem = this.embalagemSelect;
          await Empresa.post("/estoque", this.estoque);
          this.$toast.open({
            message: "Movimentação Salva com Sucesso",
            position: "bottom",
          });
          return;
        }
        this.updateEstoque();
      } catch (error) {
        console.log(error.response);
      }
    },
    async listFornecedor() {
      try {
        const { data } = await Empresa.get(`/fornecedor`);
        this.fornecedor = data;
      } catch (error) {
        console.log(error);
      }
    },
    loadAgrotSelect(agrotoxico) {
      this.agrotoxicoSelect = agrotoxico.NOMECOMUM;
      this.estoque.nomeagrotoxico = agrotoxico.NOMECOMUM;
      this.estoque.registroagrotox = agrotoxico.REGISTRO;
      this.estoque.id_agrotoxico = agrotoxico.IDAGROTOXICO;
      console.log(this.estoque);
      // this.readEmbalagemSelect(agrotoxico.IDAGROTOXICO);
    },

    async readEmbalagemSelect(idAgrotoxico) {
      const { data } = await Compendio.get(
        `custom/gestao/embalagem/${idAgrotoxico}`
      );
      this.embalagens = data;
      console.log(data);
    },

    async readResponsavel() {
      const { data } = await Empresa.get("/responsavel");
      console.log(data);
      this.responsavel = data;
    },
    openAgrotoxico() {
      this.$bvModal.show("modal-1");
    },
  },

  watch: {
    async dadosEstoque() {
      Object.assign(this.estoque, this.dadosEstoque);
      this.estoque.data = this.estoque.data.split("T")[0];
      this.estoque.datavencimento = this.estoque.datavencimento.split("T")[0];
      this.estoque.datanfe = this.estoque.datanfe.split("T")[0];
      this.agrotoxicoSelect = this.dadosEstoque.nomeagrotoxico;
      await this.readEmbalagemSelect(this.dadosEstoque.id_agrotoxico);
      this.embalagemSelect = this.dadosEstoque.id_embalagem;
      this.$root.$emit("bv::toggle::collapse", "accordion-dadosEstoque");
    },
  },
};
</script>

<style>
</style>