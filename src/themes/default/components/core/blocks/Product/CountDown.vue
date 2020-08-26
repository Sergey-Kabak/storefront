<template>
    <div ref="countdown" class="countdown flex">
        <div class="countdown-number flex v-center relative">
            <span class="days countdown-time cl-main-red">{{days}}</span>
            <span class="countdown-text">дн.</span>
        </div>
        <div class="countdown-number flex v-center relative">
            <span class="hours countdown-time cl-main-red">{{hour}}</span>
            <span class="countdown-text">ч.</span>
        </div>
        <div class="countdown-number flex v-center relative">
            <span class="minutes countdown-time cl-main-red">{{min}}</span>
            <span class="countdown-text">мин.</span>
        </div>
        <div class="countdown-number flex v-center relative">
            <span class="seconds countdown-time cl-main-red">{{sec}}</span>
            <span class="countdown-text">сек.</span>
        </div>
          
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name : 'CountDown',
    props : {
        endDate : {
            type : String,
            required : true
        },
    },
    computed : {
        ...mapGetters({
            getNewDate : 'homepage/getNewDate'
        }),
        days(){
            let d = Math.trunc( (new Date(this.endDate) - this.getNewDate) / 1000 / 3600 / 24 );
            return d>9?d:'0'+d;
        },
        hour(){
        let h = Math.trunc((new Date(this.endDate) - this.getNewDate) / 1000 / 3600) % 24;
        return h>9?h:'0'+h;
        },
        min(){
        let m = Math.trunc((new Date(this.endDate) - this.getNewDate) / 1000 / 60) % 60;
        return m>9?m:'0'+m;
        },
        sec(){
        let s = Math.trunc((new Date(this.endDate) - this.getNewDate)/1000) % 60
        return s>9?s:'0'+s;
        }
    },
}
</script>

<style lang="scss" scoped>
$accent_color : #EE2C39;
.countdown{
    *{
        font-family: 'DIN Pro';
    }
    &-number{
        flex-direction: column;
        padding: 0 8px;
        &:not(:last-child):after{
            content : ':';
            position: absolute;
            color: $accent_color;
            right: 0;
            top: 0;
            font-weight: 700;
            font-size: 14px;
            line-height: 16px;
        }
    }
    &-time{
        font-weight: 700;
        font-size: 14px;
        line-height: 16px;
    }
    &-text{
        font-size: 12px;
        line-height: 12px;
        color: #1A1919;
    }
}
</style>