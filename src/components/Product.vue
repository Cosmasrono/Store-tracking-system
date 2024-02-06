<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <div class="gap-4 font-semibold mt-8 text-2xl flex">
      <h1>Choose the product</h1>
      <router-link to="/CartView" class="bg-blue-600 rounded-md">
        View Cart
      </router-link>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      <div
        v-for="product in products"
        :key="product.id"
        class="bg-gray-100 p-4 rounded shadow-md"
      >
        <h3 class="font-semibold">{{ product.name }}</h3>
        <p class="text-gray-500">Price: ${{ product.cost }}</p>
        <div class="flex justify-between mt-4">
          <button
            @click="addItemToCart(product)"
            class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Cart from "../components/Cart.vue";

export default {
  components: {},
  data() {
    return {
      products: [
        { id: 1, name: "audi", cost: 10 },
        { id: 2, name: "toyota", cost: 20 },
        { id: 3, name: "xtrail", cost: 30 },
        { id: 4, name: "markx", cost: 30 },
        { id: 5, name: "benz", cost: 30 },
        { id: 6, name: "vitz", cost: 30 },
        { id: 7, name: "demio", cost: 30 },
        { id: 8, name: "march", cost: 30 },
        { id: 9, name: "v8", cost: 30 },
        { id: 10, name: "fortuner", cost: 30 },
        { id: 11, name: "note", cost: 30 },
        { id: 12, name: "premio", cost: 30 },
        // Add more products here
      ],
    };
  },
  methods: {
    addItemToCart(product) {
      let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
      const existingItemIndex = cartItems.findIndex(
        (item) => item.product_id === product.id
      );
      if (existingItemIndex !== -1) {
        // Increment quantity if item already exists in cart
        cartItems[existingItemIndex].quantity++;
      } else {
        // Add new item to cart
        const newCartItem = {
          product_id: product.id,
          name: product.name,
          cost: product.cost,
          quantity: 1,
        };
        cartItems.push(newCartItem);
      }
      // Update local storage with updated cart items
      localStorage.setItem("cart", JSON.stringify(cartItems));
      alert("Item added to cart successfully!");
    },
  },
};
</script>

<style scoped>
/* Add custom scoped styles here */
</style>
