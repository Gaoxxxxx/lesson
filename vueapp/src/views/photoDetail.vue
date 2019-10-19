<template>
    <v-touch v-on:swipeleft="next()" class="photo-detail" :style="{'background-image':'url('+$store.state.photoList[index].src+')'}" v-on:tap="goPhoto()">
    </v-touch>
</template>

<script>
    import Vue from 'vue';
    import VueTouch from 'vue-touch';
    Vue.use(VueTouch, {name: 'v-touch'})
    // import {mapState} from 'vuex'
    export default {
        data() {
            return {
                index:this.$route.query.index
            }
        },
        created() {
            console.log(this.index);
            // console.log($store.state.photoList);
        },
        // computed: {
        //     ...mapState(['photoList'])
        // },
        methods:{
            goPhoto(){
                // this.$router.push({
                //     path:'/photo'
                // });
                this.$router.push('/photo');
            },
            next(){
                // 显示下一张图
                this.index++;
                if(this.index == this.$store.state.photoList.length){
                    this.index = 0;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .photo-detail{
        background: #000 url("http://localhost:8080/img/photo/1.jpg") no-repeat center center;
        background-size:contain;
       
        // width:100%;
        // height:100%;
        position: absolute;
        left:0px;
        top:1rem;
        right:0px;
        bottom:1rem;
    }
</style>