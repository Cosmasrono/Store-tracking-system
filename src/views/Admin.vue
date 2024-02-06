<template>
  <div>
    <h2 class="text-2xl font-semibold mb-4">Admin Page</h2>
    <ul>
      <li v-for="item in cartItems" :key="item.product_id" class="mb-2">
        <div>
          <span class="font-semibold">{{ item.name }}</span>
          <span class="text-gray-500"> - ${{ item.cost }} - Quantity: {{ item.quantity }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartItems: []
    };
  },
  created() {
  if (this.$route.params.cartItems) {
    this.cartItems = JSON.parse(this.$route.params.cartItems);
  } else {
    console.warn('Route parameter "cartItems" is not provided.');
  }
}
,

  methods: {
    parseRouteParams() {
      try {
        // Check if the cartItems parameter exists
        if (this.$route.params.cartItems) {
          // Parse the JSON string from route params
          this.cartItems = JSON.parse(this.$route.params.cartItems);
        } else {
          console.error('Route parameter "cartItems" is undefined');
        }
      } catch (error) {
        console.error('Error parsing route parameter "cartItems":', error);
      }
    }
  }
};
</script>
