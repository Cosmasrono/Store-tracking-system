<template>
  <div class="container mx-auto py-8">
    <h2 class="text-2xl font-semibold mb-4">Your Cart</h2>
    <ul>
      <li v-for="item in cartItems" :key="item.product_id" class="mb-4">
        <div class="flex justify-between items-center bg-white p-4 rounded shadow-md">
          <div>
            <h3 class="font-semibold">{{ item.name }}</h3>
            <p class="text-gray-600">
              Price: ${{ item.cost }} - Quantity: {{ item.quantity }}
            </p>
          </div>
          <button
            @click="removeItemFromCart(item.product_id)"
            class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Remove
          </button>
        </div>
      </li>
    </ul>
    <div class="mt-4 text-xl font-semibold">Total: ${{ totalCost }}</div>
    <button
      v-if="cartItems.length > 0"
      @click="checkout"
      class="mt-8 px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 shadow-lg"
    >
      Checkout with PayPal
    </button>
    <div v-else class="mt-4 text-gray-600">Your cart is empty</div>
  </div>
</template>

<script>
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  'https://swocaqwllmwkocyhqnhm.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3b2NhcXdsbG13a29jeWhxbmhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzExNzM2NDIsImV4cCI6MTk4Njc0OTY0Mn0.eE7E7QeAT2iGCsInhiPVjYqOEuyrfD0-OAKsKhuWVaI'
);

export default {
  data() {
    return {
      cartItems: [],
    };
  },
  created() {
    this.fetchCartItems();
  },
  computed: {
    totalCost() {
      return this.cartItems.reduce(
        (total, item) => total + item.cost * item.quantity,
        0
      );
    },
  },
  methods: {
    fetchCartItems() {
      this.cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    },
    removeItemFromCart(productId) {
      let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
      cartItems = cartItems.filter((item) => item.product_id !== productId);
      localStorage.setItem("cart", JSON.stringify(cartItems));
      this.fetchCartItems();
    },
    async checkout() {
      try {
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

        // Insert cart items into Supabase
        await supabase.from("cart").insert(cartItems);

        // Fetch cart items from Supabase after insertion
        const { data, error } = await supabase.from("cart").select("*");
        if (error) {
          throw new Error("Error fetching cart items from Supabase");
        }

        // Update component state with fetched cart items
        this.cartItems = data;

        // Send cart items to PayPal checkout page
        this.initiatePayPalCheckout(cartItems);

        // Clear cart after successful checkout
        localStorage.removeItem("cart");
      } catch (error) {
        console.error("Error during checkout:", error.message);
        alert("Error during checkout. Please try again.");
      }
    },
    initiatePayPalCheckout(_cartItems) {
      // Replace with your PayPal client ID
      const CLIENT_ID ='AcDsE05IQR8RgzNSoaPLQp6Kpebz2JVhQ1k72VgHL8aeaPWRWLD0MrlTL8DILB3tcf12FfJvpnqN8ET8';


      // Initialize PayPal script
      const script = document.createElement("script");
      script.src = `https://www.paypal.com/sdk/js?client-id=${CLIENT_ID}&currency=USD`;
      script.async = true;
      script.onload = () => {
        window.paypal
          .Buttons({
            createOrder: (_data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    description: "Your Cart",
                    amount: {
                      currency_code: "USD",
                      value: this.totalCost.toFixed(2),
                    },
                  },
                ],
              });
            },
            onApprove: async (_data, actions) => {
              const order = await actions.order.capture();
              console.log("Order completed:", order);
              alert("Payment successful! Order completed.");
            },
            onError: (err) => {
              console.error("PayPal error:", err);
              alert("An error occurred during checkout. Please try again.");
            },
          })
          .render("#paypal-button-container");
      };
      document.body.appendChild(script);
    },
  },
};
</script>

<style>
/* Add your custom styles here */
</style>
