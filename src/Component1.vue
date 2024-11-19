<template>
  <div>
    <img
      v-if="['one', 'six', 'two', 'three', 'four', 'five'].includes(variant)"
      :class="['component', variant]"
      alt="Checked"
      src="./assets/images/checked.png"
    />
  </div>
</template>

<script>
export default {
  name: "Component",
  props: {
    variant: {
      type: String,
      validator: function (value) {
        return ["two", "three", "four", "one", "five", "six"].indexOf(value) !== -1;
      },
    },
  },
};
</script>

<style>
.component {
  left: 0;
  position: absolute;
  top: 0;
}

.component.one,
.component.two,
.component.three,
.component.four,
.component.five,
.component.six {
  height: 30px;
  width: 30px; /* Ensures all variants use the same dimensions */
}
</style>
