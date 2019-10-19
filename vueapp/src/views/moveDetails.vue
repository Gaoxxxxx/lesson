<template>
<div>
    <div class="container">
        <img :src = "coverimg" class="cover">
        <div class="brief">
            <p class="title">{{detailes.title}}</p>
            <p>({{detailes.year}})</p>
            <p>{{detailes.countries[0]}}/{{detailes.genres[0]}}/上映时间:{{detailes.mainland_pubdate}}/片长:{{detailes.durations[0]}}</p>
        </div>
        <div class="clear"></div>
        <div class="tag">
            <span>标签:</span>
            <ul>
                <li v-for="(obj,index) in detailes.tags" :key="index">{{obj}}/</li>
            </ul>
        </div>
        <div class="rating">豆瓣评分:{{detailes.rating.average}}</div>
        <div class="directors">
            <p>导演:</p>
            <ul>
                <li v-for="(obj,index) in detailes.directors" :key="index">
                    <img :src="(obj.avatars!=null)?obj.avatars.medium:'https://tse2-mm.cn.bing.net/th?id=OIP.7i6T7KI8ODeymBIwfG3z_gHaHa&w=184&h=181&c=7&o=5&dpr=1.25&pid=1.7'" alt="">
                    <p>{{obj.name}}</p>
                </li>
            </ul>
        </div>
        <div class="casts">
            <p>主要演员:</p>
            <ul>
                <li v-for="(obj,index) in detailes.casts" :key="index">
                    <img :src="(obj.avatars!=null)?obj.avatars.medium:'https://tse2-mm.cn.bing.net/th?id=OIP.7i6T7KI8ODeymBIwfG3z_gHaHa&w=184&h=181&c=7&o=5&dpr=1.25&pid=1.7'" alt="">
                    <p>{{obj.name}}</p>
                </li>
            </ul>
        </div>
        <div class="summary">
            <p>简介:</p>
            <p class="content">{{detailes.summary}}</p>
        </div> 
    </div>
    
</div>
</template>
<script>
import axios from 'axios';
export default {

    data(){
        return{
             id:this.$route.params.paicheId,
             detailes:{},
             coverimg:'',
             baseImg:"../images/5657474daecbe02.jpg"
             
        }
    },
    created() {
        this.getDetails()
    },
    methods: {
        getDetails(){
            var ID = this.id;
            // https://bird.ioliu.cn/v1?url=https://api.douban.com/v2/movie/subject/26942674
            axios.get('https://bird.ioliu.cn/v1?url=https://api.douban.com/v2/movie/subject/'+ID+'?apikey=0df993c66c0c636e29ecbb5344252a4a')
                // axios.get('./data/movie0.json')
                .then((res)=>{
                    console.log(res.data);
                    this.detailes = res.data;
                    // console.log(this.detailes.images.medium);
                    this.coverimg=this.detailes.images.medium;
                    // console.log(this.coverimg);
                    // this.movieList= res.data.subjects;
                }).catch((err)=>{
                    console.log(err);
                })
        }
    },
}
</script>

<style lang="scss" scoped>
.container{
    font-family:"Microsoft YaHei", "微软雅黑";
    padding: 0.2rem;
    .clear{
        clear: both;
    }
   .brief{
       float: left;
       margin-left: 0.4rem;
       width: 4rem;
   }
    .cover{
        float: left;
        width: 2.2rem;
        height: 3rem;
    }
    .tag{
        margin-top: 0.1rem;
        overflow: hidden;
        span{
            float: left;
        }
        li{
            float: left;
        }
    }
    .rating{
        margin-top: 0.1rem;
    }
    .directors,.casts{
        overflow: hidden;
        p{
            margin-bottom: 0.2rem;
        }
        li{
            float: left;
            margin-left: 0.2rem;
            img{
                width: 1rem;
                height: 1rem;
                border-radius:0.5rem
            }
        }
    }
    .summary{
        .content{
        text-indent: 0.4rem
        }
    }
    
}

</style>