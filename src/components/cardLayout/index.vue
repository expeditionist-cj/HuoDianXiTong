<template>
  <div class="cardLayout">
    <Card :cardStyles="cardStyles">
        <slot />
    </Card>
    <Foot />
  </div>
</template>

<script>
import Foot from "@/components/footer/index";
import Card from "@/components/card/index";
export default {
  props: {
      cardStyles:String, // Card 组件的style样式
  },
  data() {
    return {};
  },
  components: {
    Foot,
    Card
  },
  computed: {},
  created() {},
  mounted() {

  },
  watch: {},
  methods: {}
};
</script>

<style scoped lang="scss">
.cardLayout{
    height: 100%;
    // overflow-y: hidden;
}
</style>
