<template>
    <div>
        <div class="item" v-for="item in goods" :key="item.id">
            <router-link :to="`/deatil/${item.id}`">
                <div class="left">
                    <!-- 点击图片显示预览图 -->
                    <img :src="item.img" @click.stop.prevent="imgPreview(item.img)" alt="">
                </div>
                <div class="right">
                    <div class="title">{{item.title}}</div>
                    <div class="info">
                        <i class="cubeic-add" @click.stop.prevent="addCart(item)"></i>
                        <span>{{item.count}}人购买</span>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            goods: {
                type: Array,
                default: []
            }
        },
        methods: {
            addCart (item) {
                // 加入购物车 
                this.$store.commit('addCart', item)
            },
            imgPreview (img) {
                // 调用cube-ui全局api动态添加图片预览组件
                this.$createImagePreview({
                    imgs: [img]
                }).show()
            }
        },
    }
</script>

<style scoped lang="scss">
.item {
    padding: 10px;
    overflow: hidden;
    .left {
        width: 100px;
        float: left;
        img {
            width: 100%;
        }
    }
    .right {
        margin-left: 120px;
        text-align: left;
        .title {
            line-height: 30px;
        }
        .cubeic-add {
            font-size: 22px;
        }
    }
}

</style>