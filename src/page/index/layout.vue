<template>
   <keep-alive>
      <router-view  />
   </keep-alive>
</template>
<script>
export default {
  data(){
     return {}
  },
  mounted() {
    console.log(this.$route.meta)
  },
}
</script>
