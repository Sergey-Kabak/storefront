<template>
    <button>
        <slot/>
    </button>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
    $hover : #23BE20;
    $focus : #20af1d;
    $active : #1d9f1b;
    button{
        &:not(:disabled){
            &:hover{
                background-color : $hover;
                color: #fff;
            }
            &:focus{
                background-color : $focus;
                color: #fff;
            }
            &:active{
                background-color : $active;
                color: #fff;
            }
        }
        &:disabled{
            opacity: 0.38;
        }
        transition: ease-in 0.2s;
        padding: 0 28px;
        width: 131px;
        height: 32px;
        background: #FFFFFF;
        border: 1px solid #E0E0E0;
        box-sizing: border-box;
        border-radius: 4px;
        font-family: 'DIN Pro';
        font-style: normal;
        font-weight: 700;
        font-size: 15px;
        line-height: 16px;
        display: flex;
        align-items: center;
        color: #000000;
    }
</style>