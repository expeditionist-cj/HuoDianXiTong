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
      modelId:1
    }
  },
  components:{
    assitant
  }
}
</script>

<style>

</style>