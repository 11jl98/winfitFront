<template>
  <div class="cardEmpresa">
      <Empresa  class="dadosEmpresa"/>
  </div>
</template>

<script>
import Empresa from '../Empresa/Empresa.vue'

export default {
    components:{
        Empresa,
    }
}
</script>

<style>
@media (max-width: 425px){
 .dadosEmpresa{
     width: 90%!important;
 }
}

   .dadosEmpresa{
    margin-top: 50px;
    width: 80%;
    
}

.cardEmpresa{
    width: 100%;
    display: flex;
    justify-content: center;
}
</style>