<template>
    <main>
        <AppNavbar />
        <slot></slot>
    </main>
</template>   
<script>
export default {
    components:{

    },
    data(){
        return{
            anoAtual: new Date().getFullYear()
        }
    },
    mounted() {
        document.title = 'PHD DO BRASIL'
    },
}
</script>
<style>
main {
    display: flex;
}
</style>