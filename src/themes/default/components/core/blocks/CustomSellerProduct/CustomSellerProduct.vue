<template>
  <modal name="modal-custom-seller-product" class="modal-custom-seller-product" :width="550">
    <div class="modal-custom-city-picker_content modal-seller-content">
      <div class="seller-header">
        {{ $t('Seller of goods') }}
        <i
          slot="close"
          class="modal-close material-icons cl-bg-tertiary"
          @click="close"
          data-testid="closeModalButton"
        >
          close
        </i>
      </div>
      <div class="seller-content" v-if="customSeller">

        <div class="seller-name-row">
          <div class="seller-name-col">
            <div class="seller-name">
              {{ $t("Seller:") }} <span>{{ customSeller.name }}</span>
            </div>
            <div class="seller-rating">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.6315 5.11934C13.5896 4.99592 13.5125 4.88747 13.4096 4.80738C13.3068 4.72729 13.1828 4.67908 13.0528 4.66868L9.25218 4.36668L7.60751 0.72601C7.55514 0.608751 7.46994 0.509157 7.36221 0.439248C7.25448 0.369339 7.12882 0.332102 7.0004 0.332031C6.87197 0.331961 6.74627 0.36906 6.63846 0.438851C6.53066 0.508642 6.44535 0.608142 6.39285 0.725343L4.74818 4.36668L0.947514 4.66868C0.819817 4.67879 0.697739 4.72548 0.595884 4.80316C0.494028 4.88084 0.416709 4.98622 0.373176 5.1067C0.329643 5.22717 0.321739 5.35763 0.35041 5.48248C0.379082 5.60733 0.443114 5.72127 0.534847 5.81068L3.34351 8.54868L2.35018 12.85C2.32002 12.9802 2.32969 13.1165 2.37793 13.2411C2.42617 13.3657 2.51076 13.473 2.62072 13.549C2.73067 13.6249 2.86093 13.6661 2.99457 13.6671C3.12821 13.6681 3.25908 13.629 3.37018 13.5547L7.00018 11.1347L10.6302 13.5547C10.7437 13.6301 10.8777 13.6689 11.0139 13.6659C11.1502 13.6629 11.2823 13.6183 11.3924 13.538C11.5026 13.4577 11.5855 13.3456 11.63 13.2167C11.6746 13.0879 11.6786 12.9485 11.6415 12.8173L10.4222 8.55068L13.4462 5.82934C13.6442 5.65068 13.7168 5.37201 13.6315 5.11934Z" fill="#FFCA41"/>
              </svg>
              <span class="seller-data">{{ customSeller.rate }} ({{ customSeller.marks }} {{ $t("marks") }})</span>
            </div>
          </div>
          <div class="seller-logo">
            <img v-lazy="customSeller.logo" alt="custom-seller-logo">
          </div>
        </div>

        <div class="seller-data-row">
          <div class="seller-data-title">
            {{ $t("About seller:") }}
          </div>
          <div class="seller-info">
            {{ $t(customSeller.description) }}
          </div>
        </div>

        <div class="seller-data-row">
          <div class="seller-data-title">
            {{ $t("Seller contacts:") }}
          </div>
          <div class="seller-contacts">
            <div class="seller-contact">
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.3332 1.99967C17.3332 1.08301 16.5832 0.333008 15.6665 0.333008H2.33317C1.4165 0.333008 0.666504 1.08301 0.666504 1.99967V11.9997C0.666504 12.9163 1.4165 13.6663 2.33317 13.6663H15.6665C16.5832 13.6663 17.3332 12.9163 17.3332 11.9997V1.99967ZM15.6665 1.99967L8.99984 6.16634L2.33317 1.99967H15.6665ZM15.6665 11.9997H2.33317V3.66634L8.99984 7.83301L15.6665 3.66634V11.9997Z" fill="#BDBDBD"/>
              </svg>
              <a :href="`mailto:${customSeller.email}`" class="seller-data">
                {{ customSeller.email }}
              </a>
            </div>

            <div class="seller-contact seller-phones">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.45 2.16667C3.5 2.90833 3.625 3.63333 3.825 4.325L2.825 5.325C2.48333 4.325 2.26667 3.26667 2.19167 2.16667H3.45ZM11.6667 12.1833C12.375 12.3833 13.1 12.5083 13.8333 12.5583V13.8C12.7333 13.725 11.675 13.5083 10.6667 13.175L11.6667 12.1833ZM4.25 0.5H1.33333C0.875 0.5 0.5 0.875 0.5 1.33333C0.5 9.15833 6.84167 15.5 14.6667 15.5C15.125 15.5 15.5 15.125 15.5 14.6667V11.7583C15.5 11.3 15.125 10.925 14.6667 10.925C13.6333 10.925 12.625 10.7583 11.6917 10.45C11.6083 10.4167 11.5167 10.4083 11.4333 10.4083C11.2167 10.4083 11.0083 10.4917 10.8417 10.65L9.00833 12.4833C6.65 11.275 4.71667 9.35 3.51667 6.99167L5.35 5.15833C5.58333 4.925 5.65 4.6 5.55833 4.30833C5.25 3.375 5.08333 2.375 5.08333 1.33333C5.08333 0.875 4.70833 0.5 4.25 0.5Z" fill="#BDBDBD"/>
              </svg>
              <div class="seller-phones-list">
                <div class="seller-phone" v-for="phone in customSeller.phones">
                  <a :href="`tel:${phone}`" class="seller-data">
                    {{ phone }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="seller-data-row">
          <div class="seller-data-title">
            {{ $t("Working schedule:") }}
          </div>
          <div class="seller-contact">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.9915 0.666992C4.3915 0.666992 0.666504 4.40033 0.666504 9.00033C0.666504 13.6003 4.3915 17.3337 8.9915 17.3337C13.5998 17.3337 17.3332 13.6003 17.3332 9.00033C17.3332 4.40033 13.5998 0.666992 8.9915 0.666992ZM8.99984 15.667C5.3165 15.667 2.33317 12.6837 2.33317 9.00033C2.33317 5.31699 5.3165 2.33366 8.99984 2.33366C12.6832 2.33366 15.6665 5.31699 15.6665 9.00033C15.6665 12.6837 12.6832 15.667 8.99984 15.667ZM9.4165 4.83366H8.1665V9.83366L12.5415 12.4587L13.1665 11.4337L9.4165 9.20866V4.83366Z" fill="#BDBDBD"/>
            </svg>
            <div class="seller-working-times">
              <div class="seller-data work-time" v-for="(workTime, index) in customSeller.workTimes" :key="index">
                {{ workTime }}
              </div>
            </div>
          </div>
        </div>
        <div class="seller-data-row">
          <router-link class="seller-items-link" :to="customSeller.link" >
            {{ $t("All seller items") }}
          </router-link>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import Modal from 'theme/components/core/Modal.vue';
import config from 'config';

export default {
  components: {
    Modal
  },
  data () {
    return {
      loading: false,
    }
  },
  computed: {
    customSeller () {
      return config && config.customSeller
    }
  },
  mounted () {},
  methods: {
    close () {
      this.$bus.$emit('modal-hide', 'modal-custom-seller-product')
    },
    onSubmit () {}
  },
}
</script>
<style lang="scss" scoped>
.seller-name-row {
  cursor: pointer;
  border: 1px solid #E0E0E0;
  border-radius: 4px;
  padding: 16px;
  align-items: center;

  .seller-name-col {
    display: flex;
    align-items: center;
  }
  .seller-name span {
    border-bottom: 1px dashed #1A1919;
    padding-bottom: 4px;
  }
  .seller-rating {
    margin-top: 0!important;
    margin-left: 10px;
  }
  .seller-data {
    margin-left: 10px;
    padding-bottom: 0;
    border-bottom: none;
  }
}
  .modal-seller-content {
    border-radius: 4px;
    background: #fff;
    padding: 0!important;
  }
  .seller-header {
    padding: 13px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: "DIN Pro";
    font-size: 24px;
    line-height: 30px;
    color: #1A1919;
    border-bottom: 1px solid #E0E0E0;
    .modal-close {
      cursor: pointer;
    }
  }
  .seller-content {
    padding: 24px;
    display: flex;
    flex-direction: column;
  }

  .seller-logo {
    align-self: center;
    max-width: 50%;
    max-height: 60px;
    width: auto;
    img {
      display: block;
      width: auto;
      height: 100%;
      max-height: 60px;
    }
  }

  .seller-name-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 12px;

    .seller-name {
      font-family: "DIN Pro";
      font-size: 15px;
      line-height: 16px;
      color: #1A1919;

      span {
        font-weight: bold;
      }
    }
  }

  .seller-rating {
    margin-top: 7px;
    display: flex;
    align-items: center;
  }

  .seller-data-row {
    margin: 12px 0;
    .seller-data-title {
      font-family: "DIN Pro";
      font-size: 13px;
      line-height: 16px;
      color: #1A1919;
      margin-bottom: 16px;
      font-weight: bold;
    }
    .seller-info {
      font-family: "DIN Pro";
      font-size: 14px;
      line-height: 16px;
      color: #1A1919;
    }
  }

  .seller-data {
    font-family: "DIN Pro";
    font-size: 13px;
    line-height: 16px;
    color: #595858;
    border-bottom: 1px dashed #595858;
    padding-bottom: 4px;
    margin-left: 15px;
    text-decoration: none!important;
    &:hover {
      text-decoration: none!important;
    }
  }

  .seller-phones-list {
    display: flex;
    flex-wrap: wrap;

    .seller-phone {
      margin-bottom: 5px;
    }
  }

  .seller-contact {
    display: flex;
    align-items: flex-start;

    //svg {
    //  margin-top: 3px;
    //}
  }
  .seller-phones {
    margin-top: 16px;
  }

  .seller-working-times {
    .work-time {
      border-bottom: none;
      margin-bottom: 5px;
    }
  }

  .seller-items-link {
    font-family: "DIN Pro";
    font-size: 12px;
    line-height: 13px;
    text-transform: uppercase;
    color: #23BE20;
    border-bottom: 1px dashed #23BE20;
    padding-bottom: 4px;
  }

  .modal-custom-city-picker {
    .modal-container {
      border-radius: 5px;
    }
    h3 {
      font-family: DIN Pro;
      font-style: normal;
      font-weight: 500;
      font-size: 24px;
      line-height: 30px;
      padding: 13px 24px;
      margin: 0;
    }
    h4 {
      font-family: DIN Pro;
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 24px;
      color: #000000;
      margin: 30px 0 10px;
      padding: 0;
    }
    .modal-header {
      padding: 0;
    }
    .modal-content {
      padding: 0;
    }
    &_content {
      padding: 24px;
      .action {
        background: #23BE20;
        border-radius: 4px;
        font-family: DIN Pro;
        font-style: normal;
        font-weight: 0;
        font-size: 15px;
        line-height: 16px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #FFFFFF;
        padding: 12px 26px;
        border: 1px solid transparent;
        margin-top: 20px;
        &:hover {
          border-color: #23BE20;
          background-color: transparent;
          color: #23BE20;
        }
      }
    }
  }
</style>
