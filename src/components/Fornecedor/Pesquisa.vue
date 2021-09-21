<template>
  <div>
    <b-collapse
      visible
      id="accordion-pesquisaFornecedor"
      accordion="my-accordion"
      role="tabpanel"
      class="mt-2"
    >
      <b-card class="shadow">
        <h3>Pesquisa</h3>
        <hr />
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
              <b-form-select
                v-model="selected"
                :options="options"
              ></b-form-select>
            </b-form-group>
            <div style="margin: auto 20px">
            <b-button variant="primary" class="mt-3"> <b-icon-search class="mr-2" scale="0.8"></b-icon-search> Pesquisar</b-button>
            </div>
          </b-row>

        </div>
         <table class="table table-sm">
          <thead>
            <tr>
              <th scope="col">Nome Cliente</th>
              <th scope="col">CNPJ/CPF</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>
                <b-button size="sm" class="mr-2" variant="info"
                  >Editar
                  <b-icon-pencil scale="0.7" class="ml-2"></b-icon-pencil
                ></b-button>
                <b-button size="sm" variant="secondary"
                  >Excluir <b-icon-trash scale="0.7" class="ml-2"></b-icon-trash
                ></b-button>
              </td>
            </tr>
          </tbody>
        </table>
      </b-card>
    </b-collapse>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>