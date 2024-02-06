<!-- <template>
    <div>
     
      
      <PayPalScriptProvider :options="{ 'client-id': CLIENT_ID }">
        <div
          style="
            display: flex;
            flex-direction: row; /* Display products in a row */
            flex-wrap: wrap; /* Allow wrapping when container width is exceeded */
          "
        >
          <div
            v-for="product in products"
            :key="product.id"
            style="flex: 1 0 300px; margin: 10px;"
            class="flex items-center justify-center flex-col hover:scale-105"
          >
            <div>
              <img :src="product.image" :alt="product.name" style="max-width: 100%; height: auto;" />
            </div>
            <div>
              <h1>{{ product.name }}</h1>
              <p>${{ product.price }}</p>
            </div>
            <div>
              <button
                type="submit"
                @click="setShow(product.id)"
                :disabled="purchasedProducts.includes(product.id) || success || orderID"
                class="bg-blue-600 p-2 m-3 rounded-md"
              >
                {{ purchasedProducts.includes(product.id) ? 'Already Purchased' : 'Buy now' }}
              </button>
            </div>
            <div v-if="show === product.id">
              <PayPalButtons
                style="{ layout: 'vertical' }"
                :createOrder="createOrder"
                :onApprove="onApprove"
              />
            </div>
          </div>
        </div>
      </PayPalScriptProvider>
    </div>
  </template>
  
  <script>
  import { ref, reactive, watchEffect } from 'vue';
 import { CLIENT_ID } from '../config';
   
  export default {
    components: {
      
      PayPalScriptProvider,
      PayPalButtons
    },
    setup() {
      const show = ref(null); // Store the ID of the product with the PayPalButtons displayed
      const success = ref(false);
      const orderID = ref(null); // Store the order ID after successful payment
      const purchasedProducts = ref([]); // Store the IDs of the products that have been purchased
  
      const createOrder = (data, actions) => {
        const currentProduct = products.find((product) => product.id === show.value);
  
        return actions.order.create({
          purchase_units: [
            {
              description: currentProduct.name,
              amount: {
                currency_code: 'USD',
                value: currentProduct.price,
              },
            },
          ],
        }).then((orderID) => {
          orderID.value = orderID;
          return orderID;
        });
      };
  
      const onApprove = (data, actions) => {
        return actions.order.capture().then(function (details) {
          const { payer } = details;
          success.value = true;
  
          // Add the ID of the purchased product to the 'purchasedProducts' state
          purchasedProducts.value.push(show.value);
        });
      };
  
      watchEffect(() => {
        if (success.value) {
          alert('Payment successful!!');
          console.log('Order successful. Your order id is--', orderID.value);
        }
      });
  
      return {
        show,
        success,
        orderID,
        purchasedProducts,
        createOrder,
        onApprove
      };
    },
    data() {
      return {
        products: [
          {
            id: 2,
            name: 'Shoe 1',
            image: 'https://cdn.pixabay.com/photo/2021/08/15/06/54/sunflower-6546993_1280.jpg',
            price: 310,
          },
          // Add other products here...
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  /* Add your component-specific styles here */
  </style>
   -->
   <template>
    </template>