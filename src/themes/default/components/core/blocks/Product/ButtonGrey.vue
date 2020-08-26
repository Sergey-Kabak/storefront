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
    $hover : #F9F9F9;
    $focus : rgba(0, 0, 0, 0.08);
    $active : rgba(0, 0, 0, 0.12);
    button{
        &:not(:disabled){
            &:hover{
                background-color : $hover;
            }
            &:focus{
                background-color : $focus;
            }
            &:active{
                background-color : $active;
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