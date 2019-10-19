<template>
    <div>
        <ul class="movie-box">
            <li class="movieList" v-for="(obj,index) in movieList" :key="index" @click="goDetail(index)">
                <img :src="obj.images.medium" alt="" >
                <div>
                    <h2>{{obj.original_title}}</h2>
                    <p>{{obj.collect_count}}已收藏</p>
                    <!-- {{obj.casts}} -->
                    <p>演员：<span v-for="(cast,index) in obj.casts" :key="index">{{cast.name}}</span></p>
                    <p>上映时间：{{obj.year}}</p>
                </div>
            </li>
        </ul>
        <!-- "..\images\ajax-loading-gif-11.gif" -->
        <img src= "..\images\ajax-loading-gif-11.gif"  alt="" class="loading" v-show="isShow">
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        data(){
            return {
                movieList:[],
                num:10,//count参数
                isShow:false,
                flag:true,
                // loadImg:"..\\images\\ajax-loading-gif-11.gif"
            }
        },
        created(){
           
            this.getList(this.num);
            // console.log(this.num);
            var that = this;
            window.onscroll = function(){
                 // 判断滚动条是否滑动到底部  
                //变量scrollTop是滚动条滚动时，距离顶部的距离
                var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
                // console.log(scrollTop);
                //变量windowHeight是可视区的高度
                var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
                //变量scrollHeight是滚动条的总高度
                var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
                //滚动条到底部的条件
                var differ = Math.abs((scrollTop+windowHeight)-scrollHeight);
                if(differ<=1){
                // 写后台加载数据的函数
                that.num+=10;
                that.getList(that.num);
                }   
                // that.num+=10;
                // that.getList(that.num);
            }

        },
        methods: {
            getList(num){
                this.isShow=true;
                let numS=this.num;
                if(this.flag){
                    this.flag=false;
                    // console.log(this.num);
                    axios.get('https://bird.ioliu.cn/v1?url=https://api.douban.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count='+numS)
                    // axios.get('./data/movie0.json')
                    .then((res)=>{
                    console.log(res.data.subjects);
                        this.movieList= res.data.subjects;
                        this.isShow=false;
                        this.flag=true;
                    }).catch((err)=>{
                        console.log(err);
                    })
                }
               
            },
            goDetail(index){
                var ID = this.movieList[index].id;
                console.log(ID);
                this.$router.push({ name: 'moveDetails', params: {paicheId: ID}});
            },
        },
    }
</script>

<style lang="scss" scoped>
.movie-box{
    padding: 0.2rem;
    .movieList{
        display: flex;
        img{
            width:2rem;
            margin-right:0.2rem;
        }
        margin-bottom:0.2rem;
        border-bottom: 1px solid #000;
    }
}
 .loading{
        position: fixed;
        top:4rem;
        width:7.5rem;
    }

</style>