<template>
  <div>
    <h2 class="text-2xl font-semibold mb-4">Your Cart</h2>
    <ul>
      <li v-for="item in cartItems" :key="item.product_id" class="mb-2">
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
</template>

<script>
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://swocaqwllmwkocyhqnhm.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3b2NhcXdsbG13a29jeWhxbmhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzExNzM2NDIsImV4cCI6MTk4Njc0OTY0Mn0.eE7E7QeAT2iGCsInhiPVjYqOEuyrfD0-OAKsKhuWVaI'
);

export default {
  data() {
    return {
      cartItems: []
    };
  },
  created() {
    this.fetchCartItems();
  },
  methods: {
    fetchCartItems() {
      this.cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    },
    removeItemFromCart(productId) {
      let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
      cartItems = cartItems.filter(item => item.product_id !== productId);
      localStorage.setItem('cart', JSON.stringify(cartItems));
      this.fetchCartItems();
    },
    async checkout() {
      // Send cart items to Supabase
      try {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        await supabase.from('cart').insert(cartItems);
        alert('Checkout successful! Products added to Supabase.');
        // Send cart items to admin page
        this.sendToAdmin(cartItems);
        // Clear cart after successful checkout
        localStorage.removeItem('cart');
        this.cartItems = [];
      } catch (error) {
        console.error('Error during checkout:', error.message);
        alert('Error during checkout. Please try again.');
      }
    },
    sendToAdmin(cartItems) {
  // Convert cartItems to JSON string
  const cartItemsJson = JSON.stringify(cartItems);
  // Navigate to the admin page with cart items as route parameters
  this.$router.push({ name: 'Admin', params: { cartItems: cartItemsJson }});
}

  }
};
</script>

 