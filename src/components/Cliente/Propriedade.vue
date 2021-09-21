<template>
  <div>
    <b-collapse
      id="accordion-propriedade"
      accordion="my-accordion"
      role="tabpanel"
      class="mt-2"
    >
      <b-card class="shadow">
        <h3>Propriedade</h3>
        <hr />

        <div>
          <b-row>
            <b-form-input
              id="input-1"
              placeholder="Nome"
              hidden
              v-model="propriedade.id_propriedade"
            ></b-form-input>
            <b-form-group
              id="input-group-1"
              label="Nome Propriedade"
              label-for="input-1"
              class="col-sm-4"
            >
              <b-form-input
                id="input-1"
                placeholder="Nome"
                required
                v-model="propriedade.nomepropriedade"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-1"
              label="Endereço"
              label-for="input-1"
              class="col-sm-5"
            >
              <b-form-input
                id="input-1"
                placeholder="Endereço"
                required
                v-model="propriedade.endereco"
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
                v-model="propriedade.bairro"
              ></b-form-input>
            </b-form-group>
          </b-row>

          <b-row>
            <b-form-group
              id="input-group-1"
              label="Número"
              label-for="input-1"
              class="col-sm-2"
            >
              <b-form-input
                id="input-1"
                placeholder="Número"
                required
                v-model="propriedade.numero"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-1"
              label="Cidade"
              label-for="input-1"
              class="col-sm-5"
            >
              <b-form-input
                id="input-1"
                placeholder="Cidade"
                required
                v-model="propriedade.cidade"
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
                v-model="propriedade.uf"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-1"
              label="CEP"
              label-for="input-1"
              class="col-sm-2"
            >
              <b-form-input
                id="input-1"
                placeholder="CEP"
                required
                v-model="propriedade.cep"
              ></b-form-input>
            </b-form-group>
          </b-row>

          <b-row>
            <b-form-group
              id="input-group-1"
              label="Latitude"
              label-for="input-1"
              class="col-sm-3"
            >
              <b-form-input
                id="input-1"
                placeholder="Latitude"
                required
                v-model="propriedade.latitude"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-1"
              label="Longitude"
              label-for="input-1"
              class="col-sm-3"
            >
              <b-form-input
                id="input-1"
                placeholder="Longitude"
                required
                v-model="propriedade.longitude"
              ></b-form-input>
            </b-form-group>
          </b-row>
        </div>
        <div class="d-flex justify-content-end">
          <div>
            <b-button
              class="mr-4"
              style="
                border: none !important;
                background-color: #ff6400 !important;
              "
              @click="savePropriedade"
              >Adicionar Propriedade <b-icon-plus class="ml-1"></b-icon-plus
            ></b-button>
            <b-button
              style="
                border: none !important;
                background-color: #038c5a !important;
              "
              @click="limpar"
              >Limpar <b-icon-arrow-clockwise class="ml-1"></b-icon-arrow-clockwise
            ></b-button>
          </div>
        </div>

        <hr />
        <h5 class="m-2">Propriedades Adicionadas</h5>
        <div class="containerTable">

   
        <table class="table table-sm">
          <thead>
            <tr>
              <th scope="col">Nome Propiedade</th>
              <th scope="col">Cidade</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(propriedade, index) in propriedades" :key="index">
              <td>{{propriedade.nomepropriedade}}</td>
              <td>{{propriedade.cidade}}</td>
              <td>
                <b-button size="sm" class="mr-2" variant="info" @click="editPropriedade(propriedade.id_propriedade)"
                  >Editar
                  <b-icon-pencil scale="0.7" class="ml-2"></b-icon-pencil
                ></b-button>
                <b-button size="sm" variant="secondary" @click="deletePropriedade(propriedade.id_propriedade)"
                  >Excluir <b-icon-trash scale="0.7" class="ml-2"></b-icon-trash
                ></b-button>
              </td>
            </tr>
          </tbody>
        </table>
             </div>
      </b-card>
    </b-collapse>
  </div>
</template>

<script>
import { httpEmpresa as Empresa } from "../../services/configEmpresa";

export default {
  props: {
    idClienteEvent: {
      type: String,
    },
  },
  data() {
    return {
      propriedades: [],
      propriedade: {
        id_propriedade: -1,
        id_cliente: "",
        nomepropriedade: "",
        endereco: "",
        bairro: "",
        numero: "",
        cidade: "",
        uf: "",
        cep: "",
        latitude: "",
        longitude: "",
      },
    };
  },

  methods: {
    limpar(){
      this.propriedade = {
        id_propriedade: -1,
        nomepropriedade: "",
        endereco: "",
        bairro: "",
        numero: "",
        cidade: "",
        uf: "",
        cep: "",
        latitude: "",
        longitude: "",
      }
    },

    async editPropriedade(idPropriedade){
      const { data } = await Empresa.get(`/propriedade/${idPropriedade}`)
      console.log(data)
      Object.assign(this.propriedade, data[0])
    },
    async listPropriedade() {
      const { data } = await Empresa.get(
        `/propriedade/schema/${this.propriedade.id_cliente}`
      );
      this.propriedades = data
      console.log(data);
      
    },

    async deletePropriedade(idPropriedade){
      try {
      await Empresa.delete(`/propriedade/${idPropriedade}`)
          this.listPropriedade()
          this.$toast.open({
            message: "Propriedade Deletada com Sucesso",
            type: "success",
          });
      } catch (error) {
          console.log(error)
        
      }

    },
    async updatePropriedade(idPropriedade){
      try {
        const { data } = await Empresa.put(`/propriedade/${idPropriedade}`, this.propriedade)
        console.log(data)
        this.listPropriedade()
          this.limpar()
          this.$toast.open({
            message: "Propriedade Atualizada com Sucesso",
            type: "success",
          });
      } catch (error) {
          console.log(error)
      }
    },
    async savePropriedade() {
      try {
        if(this.propriedade.id_propriedade === -1){
          const { data } = await Empresa.post("/propriedade", this.propriedade);
          console.log(data);
          this.listPropriedade()
          this.limpar()
          this.$toast.open({
            message: "Propriedade Adicionada com Sucesso",
            type: "success",
          });
          return 
        }
        this.updatePropriedade(this.propriedade.id_propriedade)
      } catch (error) {
        console.log(error.response);
      }
    },
  },

  watch: {
    idClienteEvent() {
      this.propriedade.id_cliente = this.idClienteEvent;
      this.listPropriedade();
      console.log(this.propriedade.id_cliente);
    },
  },
};
</script>

<style>
.containerTable{
  max-height: 150px;
  overflow-x: auto;
}
</style>