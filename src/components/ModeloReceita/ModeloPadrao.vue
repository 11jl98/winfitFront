<template>
  <div id="modelopadrao" >
    <div>
      <div>
        <div>
          <div
            style="display: flex; justify-content: space-between"
            class="col-sm-12 mt-4"
          >
            <div class="col-sm-6">
              <h6>Receita Agronômica:</h6>
            </div>
            <div class="col-sm-6">
              <span
                style="
                  vertical-align: center;
                  padding-top: 10px;
                  font-size: 10px;
                  font-weight: normal;
                  text-align: right;
                "
              >
                1º Via - Estabelecimento Comercial / 2º Via - Usuário / 3º Via -
                CREA-CFTA / 4º Via - Profissional / 5º Via - Fiscalização
              </span>
            </div>
          </div>
        </div>
        <table class="table" style="margin: 0">
          <thead>
            <tr>
              <th>Receita Agronômica nº: {{receita.numeroreceita}}</th>
              <th>ART/TRT nº: {{receita.numeroart}}</th>
              <th>Nota Fiscal: {{receita.notafiscal}}</th>
            </tr>
          </thead>
        </table>
        <table class="table" style="margin: 0">
          <thead>
            <tr>
              <!-- <th class="eight wide">{{empresa.razaosocial}}</th>
              <th class="eight wide">{{empresa.cpfcnpj}}</th> -->
            </tr>
          </thead>
        </table>
        <table class="table table-bordered" style="margin: 0">
          <tbody>
            <tr>
              <td style="width: 50%">Resp. Téc.: {{receita.responsavel.nome}}</td>
              <td style="width: 50%">Nome Cliente: {{receita.cliente.nome}}</td>
            </tr>
            <tr>
              <td style="width: 50%">End.: {{receita.responsavel.endereco}}</td>
              <td style="width: 50%">Propriedade: {{receita.propriedade.nomepropriedade}}</td>
            </tr>
            <tr>
              <td style="width: 50%">Município: {{receita.responsavel.cidade}}</td>
              <td style="width: 50%">End.: {{receita.propriedade.endereco}}</td>
            </tr>
            <tr>
              <td style="width: 50%">Telefone: {{receita.responsavel.telefone}}</td>
              <td style="width: 50%">Município: {{receita.propriedade.cidade}}</td>
            </tr>
            <tr>
              <td style="width: 50%">
                CPF: {{receita.responsavel.cpf}} - CREA/CFTA: {{receita.responsavel.crea}}
              </td>
              <td style="width: 50%">
                CPF/CNPJ: {{receita.cliente.cpfcnpj}}- IPR: {{receita.cliente.iepr}}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>



        <div v-for="(infortecnica, index) in infortecnicas" :key="index">
        <table class="table table-bordered" style="margin: 0">
          <thead>
            <tr>
              <th colspan="4" style="text-align: center">DADOS TÉCNICOS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Cultura: {{infortecnica.nomecultura}}</strong>
              </td>
              <td style="width: 50%">
                <strong>Area: {{infortecnica.areatratar}}</strong>
              </td>
            </tr>
            <tr>
              <td colspan="1">
                Diagnóstico: {{infortecnica.problemacomum}} (<i>{{infortecnica.problemacientifico}}</i>)
              </td>
              <td>
                <strong>Estagio: {{infortecnica.estagiocultura}}</strong>
              </td>
            </tr>
            <!-- <tr>
              <td class="eight wide">Área: 5 (ha)</td>
              <td class="eight wide">
                Diagnóstico: Mosca branca (<i>Alingnus - Stratyllis</i>)
              </td>
            </tr> -->
          </tbody>
        </table>
        <table class="ui compact table" style="margin: 0">
          <thead>
            <tr>
              <th colSpan="2" style="text-align: center">
                RECOMENDAÇÕES TÉCNICAS
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <h2>EPI:</h2>
              </td>
              <td style="font-size: 9px; text-align: justify">
                Respiradores semifaciais ou faciais com filtros P2 ou P3. Óculos
                de segurança ou viseira facial. Macacão de algodão
                hidro-repelente e impermeável. Avental de bagum e/ou tecido
                emborrachado aluminizado. Bota impermeável de cano alto (PVC).
                Ao surgimento de qualquer dúvida, leia as recomendações do
                rótulo e bula.
              </td>
            </tr>
          </tbody>
        </table>
        <table class="table table-bordered" style="margin: 0">
          <thead>
            <tr>
              <th colSpan="2" style="text-align: center">CONTROLE</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="eight wide" style="width: 50%">
                <strong>Def. Agrícola: {{infortecnica.nomeagrotoxico}} - {{infortecnica.registroagrotoxico}}</strong>
              </td>
              <td class="eight wide">
                Época de Aplicação: {{infortecnica.epocaaplicacao}}
              </td>
            </tr>
            <tr>
              <td>Ingrediente ativo: {{infortecnica.ingredienteativo}}</td>
              <td>Mod. Aplicação: {{infortecnica.modaplicacao}}</td>
            </tr>
            <tr>
              <td>Classe: {{infortecnica.nomeclasse}}</td>
              <td>Dose de aplicação: {{infortecnica.dosagem}}</td>
            </tr>
            <tr>
              <td>Grupo químico: {{infortecnica.nomegrupoquimico}}</td>
              <td>Número de aplicações: {{infortecnica.numeroaplicacoes}}</td>
            </tr>
            <tr>
              <td>Formulação: {{infortecnica.formulacao}}</td>
              <td>Intervalo de aplicações (dias): {{infortecnica.intervaloaplicacao}}</td>
            </tr>
            <tr>
              <td>Concentração: {{infortecnica.concentracao}}</td>
              <td>Período de carência (dias): {{infortecnica.intervaloseguranca}}</td>
            </tr>
            <tr>
              <td>Classe toxicológica: {{infortecnica.classetoxico}}</td>
              <td colSpan="2">Quantidade: {{infortecnica.quantembal}} {{infortecnica.unidademmbalagem}} 
                  ({{infortecnica.quantembal}} Embalagens de {{infortecnica.tipoembalagem}} {{infortecnica.unidademmbalagem}})</td>
            </tr>
          </tbody>
        </table>
        <table class="table" style="margin: 0">
          <thead>
            <tr>
              <th style="text-align: center">
                MODO DE APLICAÇÃO + Época de Aplicação
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                style="font-size: 9px; text-align: justify; vertical-align: top"
              >
                {{infortecnica.modoaplicacao}}
              </td>
            </tr>

            <tr>
              <td
                style="font-size: 9px; text-align: justify; vertical-align: top"
              >
                <strong>MIP :</strong>{{receita.obsmip}}
              </td>
            </tr>

             <tr>
              <td
                style="font-size: 9px; text-align: justify; vertical-align: top"
              >
                <strong>OBS: :</strong>{{receita.observacao}}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>

        <table class="table" style="margin: 0">
          <thead>
            <tr>
              <th class="eight wide">Local: VIÇOSA - MG</th>
              <th class="eight wide">Data: HOJE</th>
            </tr>
          </thead>
        </table>
      </div>
</div>



      <div class="d-flex justify-content-around mt-5 mb-4">
        <div class="col-sm-5" style="border-top: 1px solid black">
          <span>JoaoLUiz</span><br />
          <span> CPF:09410796601 - CREA/CFTA: 09410796601</span>
        </div>
        <div class="col-sm-5" style="border-top: 1px solid black">
          <span>JoaoLUiz</span><br />
          <span> CPF:09410796601 - CREA/CFTA: 09410796601</span>
        </div>
      </div>

      <!-- <table className="table table-tableass" style="margin: 0 0 20px 0; border: none!important">
        <tbody>
          <tr>
            <td class="eight wide center aligned">
              <div class="assinatura">JoaoLUiz</div>
              CPF:09410796601 - CREA/CFTA: 09410796601
            </td>
            <td class="eight wide center aligned">
              <div class="assinatura">Joao luiz</div>
              CPF/CNPJ:09410796601 - IPR: 09410796601
            </td>
          </tr>
        </tbody>
      </table> -->

      <p style="text-align: justify; font-size: 8px">
        Precaução de uso, cuidados ao meio ambiente, tríplice lavagem, destino
        final de embalagens, constam em anexo a esta receita. A não observância
        das recomendações indicadas da Receita é passivel das sansões penais
        previstas na Lei 7.802 - art. 14/15 e Dec. Fed. 4.074/02 - art. 72 e
        legislação estadual pertinente. Atenção: A aplicação deverá ser
        acompanhada por um responsável técnico. Os EPIs são de uso obrigatório
        no preparo e na aplicação da calda. Guarde esta via até a aplicação
        total do produto.
      </p>
      <p style="text-align: justify; font-size: 8px">
        * Cuidado: Agrotóxico é Veneno. O uso indevido e/ou aplicação inadequada
        deste produto pode resultar em graves danos à saúde pública, ao meio
        ambiente, aos usuários e consumidores em geral. Qualquer dúvida com
        relação a esta receita procure o agronômo responsável. Ler atentamente o
        rótulo e bula do produto.
      </p>
      <p style="text-align: justify; font-size: 8px">
        Copyright 1997-2020 Grupo BMS - Todos os direitos reservados
        (www.bmsltda.com.br)
      </p>
    </div>
 
  </div>
</template>

<script>
import { httpEmpresa as Empresa } from "../../services/configEmpresa";
export default {
  props: {
    idReceita: {
      type: String,
    },
  },
  data() {
    return {
        infortecnicas:[],
        receita:{
           numeroreceita:"",
           numeroart:"",
           notafiscal: 0,
        }
    };
  },
  mounted() {
    this.readReceita();
  },
  methods: {
    async readReceita() {
      const { data } = await Empresa.get(
        `/receitas/${this.$route.params.idReceita}`
      );
      this.receita = data;
    this.readInfortecnica()

    //   window.print();
    },

    async readInfortecnica(){
         const { data } = await Empresa.get(
        `/infortecnica/${this.$route.params.idReceita}`
      );
     this.infortecnicas = data
    }
  },
  watch: {
    idReceita() {
      console.log(this.idReceita);
    },
  },
};
</script>

<style scoped>
#modelopadrao {
  background-color: rgb(255, 255, 255) !important;
  border: 3px solid rgb(255, 255, 255);
}
body {
  background-color: blanchedalmond !important;
}

.table thead th,
.table tbody td {
  padding: 2px !important;
}

* {
  font-family: arial, verdana, sans-serif !important;
}

.assinatura {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  text-align: center;
  margin-top: px;
  width: 300px;
  border-top: 1px solid black;
}

.tableass {
}

.header {
  counter-increment: asf;
}
</style>