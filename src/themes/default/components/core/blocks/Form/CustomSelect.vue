<template>
    <div class="custom-select" ref="select">
        <div @click="open = !open" class="custom-select__value" :class="{'active' : open}">
            {{selected.terms}}
        </div>
        <div v-if="open" class="options-wrap">
            <div class="select-options"
                v-for="option in options"
                :key="option.credit_id"
                @click="handleValue(option)"
                :class="{'active' : selected.terms === option.terms}"
            >
                {{option.terms}}

                <svg v-if="selected.terms === option.terms" class="icon-checked" width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.50016 9.50033L2.00016 6.00033L0.833496 7.16699L5.50016 11.8337L15.5002 1.83366L14.3335 0.666992L5.50016 9.50033Z" fill="#23BE20"/>
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  model: ['value'],
  props: {
    options: {
      type: Array,
      default: []
    },
    selectedIndex: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      selected: null,
      open: false
    }
  },
  created () {
    this.selected = this.options[this.selectedIndex];
  },
  mounted () {
    this.clickOutOfBlock()
  },
  methods: {
    handleValue (option) {
      this.selected = option;
      this.open = false;
      this.$emit('input', +option.terms )
    },
    clickOutOfBlock(){
      let _this = this
      document.addEventListener('click', function(e) {
        let isBlock = false
        for (let k in e.path) {
          if (e.path[k] == _this.$refs.select){
            isBlock = true
          }
        }
        if (!isBlock) {
          _this.open = false
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
    .icon-checked{
        margin: auto 0 auto auto;
    }
    .custom-select{
        display: flex;
        flex-direction: column;
        position: relative;
        width: 100%;
        &__value{
            background: #FFFFFF;
            border: 1px solid #E0E0E0;
            box-sizing: border-box;
            border-radius: 4px;
            font-family: 'DIN Pro';
            font-size: 14px;
            line-height: 16px;
            color: #1A1919;
            padding: 12px 16px;
            width: 100%;
            min-width: 132px;
            position: relative;
            cursor: pointer;
            &.active{
                border-color: #23BE20;
                &:after{
                    border-width: 0 4px 4px 4px;
                    border-color: transparent transparent #bdbdbd transparent;
                }
            }
            &:after{
                position: absolute;
                content: '';
                width: 0;
                height: 0;
                border-style: solid;
                border-width: 4px 4px 0 4px;
                border-color: #bdbdbd transparent transparent transparent;
                right: 17px;
                top: 50%;
                transform: translateY(-50%);
            }
        }
    }
    .options-wrap{
        position: absolute;
        left: 0;
        top: calc(100% + 3px);
        padding: 8px 0;
        background: #FFFFFF;
        border: 1px solid #E0E0E0;
        box-sizing: border-box;
        border-radius: 4px;
        width: 100%;
        display: flex;
        flex-direction: column;
        z-index: 3;
        max-height: 235px;
        overflow: auto;
        &::-webkit-scrollbar {
            width: 4px;
        }
        &::-webkit-scrollbar-thumb {
            border-radius: 4px;
            background-color: #E0E0E0;;
        }
        .select-options{
            width: 100%;
            padding: 8px 15px;
            font-family: 'DIN Pro';
            font-size: 14px;
            line-height: 16px;
            color: #1A1919;
            box-sizing: border-box;
            cursor: pointer;
            &:not(.active):hover{
                background-color: #F9F9F9;
            }
            &.active{
                background-color: #E4F9E4;
            }
        }
    }
</style>
    .icon-checked{
        margin: auto 0 auto auto;
    }
    .custom-select{
        display: flex;
        flex-direction: column;
        position: relative;
        width: 100%;
        &__value{
            background: #FFFFFF;
            border: 1px solid #E0E0E0;
            box-sizing: border-box;
            border-radius: 4px;
            font-family: 'DIN Pro';
            font-size: 14px;
            line-height: 16px;
            color: #1A1919;
            padding: 12px 16px;
            width: 100%;
            min-width: 132px;
            position: relative;
            cursor: pointer;
            &.active{
                border-color: #23BE20;
            }
            &:after{
                position: absolute;
                content: '';
                width: 0;
                height: 0;
                border-style: solid;
                border-width: 4px 4px 0 4px;
                border-color: #bdbdbd transparent transparent transparent;
                right: 17px;
                top: 50%;
                transform: translateY(-50%);
            }
        }
    }
    .options-wrap{
        position: absolute;
        left: 0;
        top: calc(100% + 3px);
        padding: 8px 0;
        background: #FFFFFF;
        border: 1px solid #E0E0E0;
        box-sizing: border-box;
        border-radius: 4px;
        width: 100%;
        display: flex;
        flex-direction: column;
        z-index: 3;
        max-height: 235px;
        overflow: auto;
        &::-webkit-scrollbar {
            width: 4px;
        }
        &::-webkit-scrollbar-thumb {
            border-radius: 4px;
            background-color: #E0E0E0;;
        }
        .select-options{
            width: 100%;
            padding: 8px 15px;
            font-family: 'DIN Pro';
            font-size: 14px;
            line-height: 16px;
            color: #1A1919;
            box-sizing: border-box;
            cursor: pointer;
            &:not(.active):hover{
                background-color: #F9F9F9;
            }
            &.active{
                background-color: #E4F9E4;
            }
        }
    }
</style>
