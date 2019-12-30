<template>
  <div>
    <assitant :modelId="modelId"></assitant>
  </div>
</template>

<script>
import assitant from '@/components/assitant'
export default {
  data(){
    return {
      modelId:2
    }
  },
  components:{
    assitant
  }
}
</script>

<style>

</style>