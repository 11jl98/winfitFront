<template>
  <b-card
        style="background-color: #f2f2f2; border: none!important"
        no-body
        class="mb-1 shadow rounded"
      >
        <b-card-header header-tag="header" class="p-0" role="tab">
        </b-card-header>
        <b-collapse
          id="accordion-dadostecnicos"
          accordion="my-accordion"
          role="tabpanel"
        >
          <b-card-body>
            <b-row style="display: flex; align-items: baseline">
              <b-form-group
                id="sele"
                class="col-sm-3"
                label="Area Tratar"
                label-for="input-3"
              >
                <b-form-input size="sm" class="mt-3 sele"></b-form-input>
              </b-form-group>

              <b-form-group
                id="sele"
                class="col-sm-3"
                label="Quantidade Produto"
                label-for="input-3"
              >
                <b-form-input size="sm" class="mt-3 sele"></b-form-input>
              </b-form-group>

              <b-form-group
                id="sele"
                class="col-sm-3"
                label="Quant. Embalagem"
                label-for="input-3"
              >
                <b-form-input size="sm" class="mt-3 sele"></b-form-input>
              </b-form-group>

              <b-form-group
                id="sele"
                label="Selecione Embalagem"
                label-for="input-3"
                class="col-sm-3"
              >
                <b-form-select size="sm" class="mt-2 sele"  v-model="embalagemSelect">

                     <b-form-select-option
              v-for="(embalagem, index) in embalagens"
              :key="index"
              :value="embalagem"
              >{{
                embalagem.CAPACIDADE + " " + embalagem.UNIDADE + " - " + embalagem.NOME
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
                <b-form-select @change="readModoAplicacao" v-model="aplicacaoSelect" size="sm" :options="aplicacoes" text-field="NOMEAPLICACAO" value-field="IDAPLICACAO" class="mt-2 sele"></b-form-select>
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
                <b-form-input size="sm" class="mt-3 sele"></b-form-input>
              </b-form-group>
            </b-row>

            <div class="col-sm">
              <label for="">Modo de Aplicação</label>
              <b-form-textarea
                id="textarea"
                placeholder="Enter something..."
                rows="3"
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
            <b-button
              style="
                float: right;
                background-color: #ff6400 !important;
                border: none;
              "
              class="mt-3 mb-3"
              >Próximo <b-icon-arrow-down></b-icon-arrow-down
            ></b-button>
          </b-card-body>
        </b-collapse>
      </b-card>

</template>

<script>
import { http } from '../../services/configCompendio'
export default {
    props:{
        idAgrotoxicoSelectEvent:{
            type: Number
        },
        idCulturaSelectEvent:{
            type: Number
        }

    },
data(){
    return {
      modoDeAplicacao: "",
        embalagens: [],
        embalagemSelect: null,
        aplicacoes: [],
        aplicacaoSelect: null,
        epi:"RESPIRADORES SEMIFACIAIS OU FACIAIS COM FILTROS P2 OU P3. ÓCULOS DE SEGURANÇA OU VISEIRA FACIAL. MACACÃO DE ALGODÃO HIDRO-REPELENTE E IMPERMEÁVEL. AVENTAL DE BAGUM E/OU TECIDO EMBORRACHADO ALUMINIZADO. BOTA IMPERMEÁVEL DE CANO ALTO (PVC). AO SURGIMENTO DE QUALQUER DÚVIDA, LEIA AS RECOMENDAÇÕES DO RÓTULO E BULA."
    }
},
watch:{
idAgrotoxicoSelectEvent(){
    this.readEmbalagemSelect()
    this.readModalidadeAplicacao()
}
},
methods:{
    async readModalidadeAplicacao(){
  const { data } = await http.get(`custom/gestao/aplicacao/${this.idAgrotoxicoSelectEvent}`)
  console.log(data)
  this.aplicacoes = data
    },
  async readEmbalagemSelect(){
        const { data } = await http.get(`custom/gestao/embalagem/${this.idAgrotoxicoSelectEvent}`)
        this.embalagens = data
    },
    async readModoAplicacao(){
        const {data} = await http.get(`custom/gestao/modoaplicacao/${this.idAgrotoxicoSelectEvent}/${this.idCulturaSelectEvent}/${this.aplicacaoSelect}`)
    console.log(data)

    var a = data.aplicacao +" "+  data.descricao +" "+ data.OBSERVACAO +" "+ data.descricaoaplicacao
   
this.modoDeAplicacao = a.toUpperCase()
    }
}
}




</script>

<style>

</style>