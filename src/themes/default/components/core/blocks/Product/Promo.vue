<template>
    <div class="promo-block flex w-100">
        <div class="promo-block-gift relative flex v-center">
            <img src="/assets/ProductCard/Bitmap.png" alt="">
            <div class="promo-block-gift-icon absolute flex h-center v-center">
                <img src="/assets/ProductCard/Gift.svg" alt="">
            </div>
        </div>
        <div class="promo-block-description">
            <span class="promo-block-description-text block">
                Покупайте мобильный телефон {{getCurrentProduct.name}} и получайте повербанк в подарок!
            </span>
            <div class="promo-block-actions flex">
                <button-grey @click.native="showDetails" class="details">
                    <span>Детальнее</span>
                </button-grey>
                
                <div class="timer flex v-center">
                    <count-down endDate="9/5/2020" />
                </div>
            </div>
        </div>  
    </div>
</template>

<script>

import { mapGetters } from 'vuex'
import CountDown from './CountDown'
import ButtonGrey from './ButtonGrey'

export default {
    components : {
        CountDown,
        ButtonGrey,
    },
    computed : {
        ...mapGetters({
            getCurrentProduct: 'product/getCurrentProduct',
        })
    },
    methods : {
        showDetails(){
            this.$bus.$emit('modal-toggle', 'modal-terms-of-action')
        }
    }
}
</script>

<style lang="scss" scoped>
.promo-block{
    padding: 16px;
    margin-bottom: 14px;
    background: #FFFFFF;
    border: 1px solid #E0E0E0;
    box-sizing: border-box;
    border-radius: 4px;
    &-gift{
        @media (max-width : 575px){
            display: none;
        }
        margin-right: 16px;
        max-height: 88px;
        img{
            max-width: 88px;
            max-height: 88px;
            object-fit: contain;
            object-position: center;
        }
        &-icon{
            width: 40px;
            height: 40px;
            top: -11px;
            right: -11px;
            background-color: #fff;
            border-radius: 50%;
        }
    }
    &-description{
        &-text{
            font-family: DIN Pro;
            font-size: 14px;
            line-height: 20px;
            font-weight: 700;
            color: #1A1919;
            margin-bottom: 16px;
        }
    }
    &-actions{
        button.details{
            @media (max-width : 575px){
                width: 100%;
                display: flex;
                justify-content: center;
            }
        }
        @media (max-width : 1199px){
            flex-direction: column-reverse;
        }
        .timer{
            @media (min-width : 1200px){
                margin-left: 8px;
            }
            @media (max-width : 1199px){
                margin-bottom: 16px;
                margin-left: -8px;
            }
        }
    }
}
</style>