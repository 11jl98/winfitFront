<template>
  <!-- <b-card
    style="background-color: #f2f2f2; border: none !important"
    no-body
    class="mb-1 shadow rounded"
  >
    <b-card-header header-tag="header" class="p-0" role="tab"> </b-card-header> -->
    <b-collapse
      id="accordion-dadostecnicos"
      accordion="my-accordion"
      role="tabpanel"
       class="animate__animated animate__zoomInDown"
       style="background-color: #f2f2f2; border: none!important; border-radius: 5px"
    >
     <b-overlay :show="show" bg-color="#fff" rounded="sm" spinner-variant="info" opacity="1">

      <b-card-body style="height: 610px ">
        <b-row style="display: flex; align-items: baseline">
          <b-form-group
            id="sele"
            class="col-sm-3"
            label="Area Tratar"
            label-for="input-3"
          >
            <b-form-input
              v-model="dadosTecnicos.areatratar"
              size="sm"
              class="mt-3 sele"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="sele"
            class="col-sm-3"
            label="Quantidade Produto"
            label-for="input-3"
          >
            <b-form-input
              size="sm"
              v-model="dadosTecnicos.quantidadeadquirir"
              class="mt-3 sele"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="sele"
            class="col-sm-3"
            label="Quant. Embalagem"
            label-for="input-3"
          >
            <b-form-input
              size="sm"
              v-model="dadosTecnicos.quantembal"
              class="mt-3 sele"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="sele"
            label="Selecione Embalagem"
            label-for="input-3"
            class="col-sm-3"
          >
            <b-form-select
              size="sm"
              class="mt-2 sele"
              v-model="embalagemSelect"
              @change="embSelecionada"
            >
              <b-form-select-option
                v-for="(embalagem, index) in embalagens"
                :key="index"
                :value="embalagem"
                >{{
                  embalagem.CAPACIDADE +
                  " " +
                  embalagem.UNIDADE +
                  " - " +
                  embalagem.NOME
                }}</b-form-select-option
              >
            </b-form-select>
          </b-form-group>
        </b-row>

        <b-row class="d-flex">
          <b-form-group
            id="sele"
            label="Selecione Modalidade de Aplicação"
            label-for="input-3"
            class="col-sm-6"
          >
            <b-form-select
              size="sm"
              class="mt-2 sele"
              v-model="aplicacaoSelect"
              @change="readModoAplicacao"
            >
              <b-form-select-option
                v-for="(aplicacao, index) in aplicacoes"
                :key="index"
                :value="aplicacao"
                >{{ aplicacao.NOMEAPLICACAO }}</b-form-select-option
              >
            </b-form-select>
            <!--             
            <b-form-select
              @change="readModoAplicacao"
              v-model="aplicacaoSelect"
              size="sm"
              :options="aplicacoes"
              text-field="NOMEAPLICACAO"
              value-field="IDAPLICACAO"
              class="mt-2 sele"
            ></b-form-select> -->
          </b-form-group>

          <b-form-group
            id="sele"
            label="Lote do Produto"
            label-for="input-3"
            class="col-sm-3"
          >
            <b-form-select size="sm" class="mt-2 sele"></b-form-select>
          </b-form-group>

          <b-form-group
            id="sele"
            class="col-sm-3"
            label="Horario"
            label-for="input-3"
          >
            <b-form-input
              size="sm"
              v-model="dadosTecnicos.horario"
              class="mt-3 sele"
            ></b-form-input>
          </b-form-group>
        </b-row>

        <div class="col-sm">
          <label for="">Modo de Aplicação</label>
          <b-form-textarea
            id="textarea"
            placeholder="Enter something..."
            rows="6"
            max-rows="6"
            v-model="modoDeAplicacao"
          ></b-form-textarea>
        </div>

        <div class="col-sm mt-2">
          <label for="">EPI</label>
          <b-form-textarea
            id="textarea"
            placeholder="Enter something..."
            rows="3"
            max-rows="6"
            v-model="epi"
          ></b-form-textarea>
        </div>
        <div class="d-flex justify-content-around">
          <b-button
            style="border: none; background-color: #ff6400 !important;"
            class="mt-4 mb-3"
            @click="anterior"
            >Anterior <b-icon-arrow-up class="ml-2"></b-icon-arrow-up>
          </b-button>

          <b-button
             style="background-color: #038c5a; border: none"
            
            class="mt-4 mr-3 mb-3"
            @click="save"
            >Salvar Receituário
            <img class="ml-2" :src="saveReceita" alt="" srcset=""
          /></b-button>
          <b-button
            style="background-color: #038c5a; border: none"
            class="mt-4 mb-3"
            @click="save"
            >Adicionar novo produto
            <img class="ml-2" :src="plusIcon" alt="" srcset=""
          /></b-button>

          <b-button
             style="background-color: #038c5a; border: none"
            class="mt-4 mb-3"
            @click="imprimir"
            >Imprimir Receita <b-icon-printer class="ml-2"></b-icon-printer>
          </b-button>
        </div>
      </b-card-body>
     </b-overlay>
    </b-collapse>
   
     

   

   
  <!-- </b-card> -->
</template>

<script>
import { http } from "../../services/configCompendio";
import saveReceita from "../../assets/saveReceita.png";
import plusIcon from "../../assets/mais.png";
import { mapState } from "vuex";
// import printjs from 'print-js'
// import ModeloReceita from '../../components/ModeloReceita/ModeloPadrao.vue'
import { httpEmpresa as Empresa } from '../../services/configEmpresa';
export default {
  props: {
    idAgrotoxicoSelectEvent: {
      type: Number,
    },
    idCulturaSelectEvent: {
      type: Number,
    },
  },

  components:{
    // ModeloReceita
  },
  data() {
    return {
      show: false,
      idReceituario: 0,
      plusIcon: plusIcon,
      dadosInforTecnica: [],
      dadosTecnicos: {
        areatratar: "",
        quantidadeadquirir: "",
        quantembal: 0,
        horario: "",
        modaplicacao: "",
        modoaplicacao: "",
      },
      embalagemInforTec: {
        nomeembalagem: "",
        tipoembalagem: "",
        unidademmbalagem: "",
      },
      saveReceita,
      modoDeAplicacao: "",
      embalagens: [],
      embalagemSelect: null,
      aplicacoes: [],
      aplicacaoSelect: null,
      epi: "RESPIRADORES SEMIFACIAIS OU FACIAIS COM FILTROS P2 OU P3. ÓCULOS DE SEGURANÇA OU VISEIRA FACIAL. MACACÃO DE ALGODÃO HIDRO-REPELENTE E IMPERMEÁVEL. AVENTAL DE BAGUM E/OU TECIDO EMBORRACHADO ALUMINIZADO. BOTA IMPERMEÁVEL DE CANO ALTO (PVC). AO SURGIMENTO DE QUALQUER DÚVIDA, LEIA AS RECOMENDAÇÕES DO RÓTULO E BULA.",
    };
  },
  watch: {
    idAgrotoxicoSelectEvent() {
      this.readEmbalagemSelect();
      this.readModalidadeAplicacao();
    },
  },
  computed: {
    ...mapState({
      agrotoxico: (state) => state.agrotoxicos,
      cultura: (state) => state.culturas,
      diagnostico: (state) => state.diagnosticos,
      dadosTecnico: (state) => state.dadosTecnico,
      idReceita: (state) => state.idReceituario,
    }),
  },
  methods: {
    imprimir(){
      window.open(`/ModeloPadrao/${this.idReceita}`, 'popup', "width=950, height=655, top=100, left=370")
      console.log(this.$route.path)
    },
    anterior(){
      this.$root.$emit('bv::toggle::collapse', 'accordion-diagnostico')
      document.getElementsByClassName("btnReceita")[4].focus()
    },
    async save() {
      try {
        this.show = true;
        this.$store.commit("REGISTER_DADOSTECNICOS", [
          { ...this.dadosTecnicos, ...this.embalagemInforTec, epi: this.epi },
        ]);
        this.dadosInforTecnica.push({
          id_receita: this.idReceita,
          ...this.agrotoxico[0],
          ...this.cultura[0],
          ...this.diagnostico[0],
          ...this.dadosTecnico[0],
        });
         await Empresa.post('/infortecnica', this.dadosInforTecnica[0])
        console.log(this.dadosInforTecnica);
        this.idReceituario = this.idReceita
        console.log( this.idReceituario, this.idReceita)
        this.show = false;

      } catch (error) {
        console.log(error.response);
      }
    },
    embSelecionada() {
      console.log(this.embalagemSelect);
      this.embalagemInforTec.nomeembalagem = this.embalagemSelect.NOME;
      this.embalagemInforTec.tipoembalagem =
        this.embalagemSelect.CAPACIDADE.toString();
      this.embalagemInforTec.unidademmbalagem = this.embalagemSelect.UNIDADE;
    },
    async readModalidadeAplicacao() {
      const { data } = await http.get(
        `custom/gestao/aplicacao/${this.idAgrotoxicoSelectEvent}`
      );
      console.log(data);
      // this.dadosTecnicos.modaplicacao = data
      this.aplicacoes = data;
    },
    async readEmbalagemSelect() {
      const { data } = await http.get(
        `custom/gestao/embalagem/${this.idAgrotoxicoSelectEvent}`
      );
      this.embalagens = data;
    },
    async readModoAplicacao() {
      const { data } = await http.get(
        `custom/gestao/modoaplicacao/${this.idAgrotoxicoSelectEvent}/${this.idCulturaSelectEvent}/${this.aplicacaoSelect.IDAPLICACAO}`
      );
      console.log(data);
      this.dadosTecnicos.modaplicacao = this.aplicacaoSelect.NOMEAPLICACAO;
      var a =
        data.aplicacao +
        " " +
        data.descricao +
        " " +
        data.OBSERVACAO +
        " " +
        data.descricaoaplicacao;
      console.log(data);
      this.dadosTecnicos.modoaplicacao = a.toUpperCase();
      this.modoDeAplicacao = a.toUpperCase();
    },
  },
};
</script>

<style >

</style>