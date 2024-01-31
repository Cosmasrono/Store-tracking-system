<template>
  <div class="container mx-auto px-4">
    <div v-if="showed">
      <div class="mt-8">
        <div v-if="cartStore.length > 0">
          <h2 class="text-2xl font-semibold mb-4">Your Cart</h2>
          <ul>
            <li v-for="item in cartStore" :key="item.product_id" class="mb-2">
              <div class="flex justify-between items-center">
                <div>
                  <span class="font-semibold">{{ item.name }}</span>
                  <span class="text-gray-500"> - ${{ item.cost }} - Quantity: {{ item.quantity }}</span>
                </div>
                <button @click="removeItemFromCart(item.product_id)" class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Remove</button>
              </div>
            </li>
          </ul>
          <button @click="checkout" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Checkout</button>
        </div>
        <div v-else>
          <p>Your cart is empty.</p>
        </div>
      </div>
    </div>
    <div v-else>
      <h1 class="text-2xl font-semibold mt-8">Choose the product</h1>
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        <div v-for="product in products" :key="product.id" class="bg-gray-100 p-4 rounded shadow-md">
          <h3 class="font-semibold">{{ product.name }}</h3>
          <p class="text-gray-500">Price: ${{ product.cost }}</p>
          <div class="flex justify-between mt-4">
            <button @click="addItemToCart(product)" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Add to Cart</button>
            <button @click="deleteProduct(product.id)" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
            <button @click="updateProduct(product)" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Update</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://swocaqwllmwkocyhqnhm.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3b2NhcXdsbG13a29jeWhxbmhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzExNzM2NDIsImV4cCI6MTk4Njc0OTY0Mn0.eE7E7QeAT2iGCsInhiPVjYqOEuyrfD0-OAKsKhuWVaI'
);

export default {
  name: "cart",
  data() {
    return {
      cartStore: [],
      showed: false,
      products: [
        { id: 1, name: "cosmas", cost: 10 },
        { id: 2, name: "rono", cost: 20 },
        { id: 3, name: "cheruiyot", cost: 30 }
      ]
    };
  },
  created() {
    this.fetchCartItems();
  },
  methods: {
    async fetchCartItems() {
      const { data, error } = await supabase.from('cart').select('*');
      if (error) {
        console.error('Error fetching cart items:', error.message);
      } else {
        this.cartStore = data || [];
      }
    },
    async addItemToCart(product) {
      const existingItem = this.cartStore.find((item) => item.product_id === product.id);
      if (existingItem) {
        existingItem.quantity++;
        await supabase.from('cart').upsert([existingItem]);
      } else {
        const newCartItem = { ...product, product_id: product.id, quantity: 1 };
        await supabase.from('cart').insert([newCartItem]);
        this.cartStore.push(newCartItem);
      }
    },
    async removeItemFromCart(productId) {
      await supabase.from('cart').delete().match({ product_id: productId });
      this.cartStore = this.cartStore.filter(item => item.product_id !== productId);
    },
    async checkout() {
      // Implement checkout logic here
    },
    showCart() {
      this.showed = !this.showed;
    },
    async deleteProduct(productId) {
      await supabase.from('products').delete().eq('id', productId);
      this.products = this.products.filter(product => product.id !== productId);
    },
    async updateProduct(product) {
      // Implement update product logic here
    }
  }
};
</script>

<style scoped>
/* Add custom scoped styles here */
</style>
