<template>
  <div class="card bg-transparent shadow-xl">
    <div
      class="overflow-hidden position-relative border-radius-xl"
      :style="{
        backgroundImage: `url(${bgImage})`,
      }"
    >
      <span class="mask" :class="`bg-gradient-${card.background}`"></span>
      <div class="card-body position-relative z-index-1 p-3">
        <i class="fas fa-wifi text-white p-2" aria-hidden="true"></i>
        <h5 class="text-white mt-4 mb-5 pb-2">
          {{ card.number }}
        </h5>
        <div class="d-flex">
          <div class="d-flex">
            <div :class="isRTL ? 'ms-4' : 'me-4'">
              <p class="text-white text-sm opacity-8 mb-0">
                {{ card.holderText }}
              </p>
              <h6 class="text-white mb-0">{{ card.holderName }}</h6>
            </div>
            <div>
              <p class="text-white text-sm opacity-8 mb-0">
                {{ card.expiryText }}
              </p>
              <h6 class="text-white mb-0">{{ card.expiryDate }}</h6>
            </div>
          </div>
          <div
            class="w-20 d-flex align-items-end justify-content-end"
            :class="isRTL ? 'me-auto' : 'ms-auto'"
          >
            <material-avatar class="w-60 mt-2" :img="img1" alt="logo" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MaterialAvatar from "@/components/MaterialAvatar.vue";
import { mapState } from "vuex";
import img1 from "../../assets/img/logos/mastercard.png";

const bgImage = new URL('@/assets/img/curved14.jpg', import.meta.url).href;

export default {
  name: "MasterCard",
  components: {
    MaterialAvatar,
  },
  props: {
    card: {
      type: Object,
      number: String,
      holderName: String,
      expiryDate: String,
      holderText: String,
      expiryText: String,
      background: String,
      default: () => ({
        number: "4562   1122   4594   7852",
        holderName: "Jack Peterson",
        expiryDate: "11/22",
        holderText: "Card Holder",
        expiryText: "Expires",
        background: "dark",
      }),
    },
  },
  data() {
    return {
      img1,
    };
  },
  computed: {
    ...mapState(["isRTL"]),
  },
};
</script>
