<template>
  <div class="container">

  </div>
</template>

<script>
  export default {
    name: "Tree",
    data() {
      return {}
    },
    methods: {
      getDefaultChecked(node, arr) {
        if (!node.children) {
          return arr.push(node.id);
        }
        node.children.forEach((item) => {
          this.getDefaultChecked(item, arr)
        })
      },

    }
  }
</script>

<style scoped>

</style>
