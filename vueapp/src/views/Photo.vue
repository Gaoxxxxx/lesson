<template>
    <div class="photo-box">
        <img v-for="(photo,index) in photoData" :key="index" :src="photo.src" alt="" @click="goDetail(index)">
    </div>
</template>

<script>
    import axios from 'axios'
     // vuex引入方法
    import {mapMutations} from 'vuex';
   
    export default {
        data(){
            return{
             photoData:[],
            }
        },
        created(){
            axios.get("../data/photodata.json").then((res)=>{
            // console.log(res.data);
            this.photoData = res.data.photoData;
            console.log(this.photoData);
            this.addPhotoList(res.data.photoData);
            });
        },
        methods: {
            ...mapMutations(['addPhotoList']),
            goDetail(index){
                // console.log(photo.src);
                this.$router.push({
                    path:'/photo/photo-detail',
                    query:{index}
                });
            },
            
        },
        
    }
</script>

<style lang="scss" scoped>
.photo-box{
        overflow: hidden;
        img{
            float: left;
            width:50%;
        }
    }
</style>