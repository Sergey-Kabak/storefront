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
    $hover : #20af1d;
    $focus : #1fa71c;
    $active : #1d9f1b;
    button{
        &:hover{
            background-color : $hover;
        }
        &:focus{
            background-color : $focus;
        }
        &:active{
            background-color : $active;
        }
        transition: ease-in 0.2s;
        padding: 12px 28px;
        font-family: 'DIN Pro';
        font-size: 15px;
        line-height: 16px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #FFFFFF;
        background-color: #23BE20;
        border: none;
        border-radius: 4px;
    }
</style>