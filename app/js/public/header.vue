<template>
    <div :class="$style.header">
        <div :class="$style.center">
            <div :class="$style.navbar">
                <span>首页</span>
                <span>作业本</span>
                <span>成长报告</span>
                <span>互动练习</span>
                <span>名师课堂</span>
            </div>
            <div :class="$style.message">
                <img src="../../images/ionic_message.png"/>
                <em>消息</em>
            </div>
        </div>
    </div>
</template>
<script>
</script>
<style lang="scss" module>
    .header{
        color: #666;
        background: #fff;
        height: 100px;
        font-size: 20px;
        .center{
            width: 1000px;
            height: 100%;
            margin: 0px auto;
            background: #fff url(../../images/ionic-favicon.png) left center no-repeat;
            background-size: auto 50%;
            position: relative;
            .navbar{
                position: absolute;
                left: 150px;;
                top: 50%;
                transform: translate(0, -50%);
                span{
                    float: left;
                    margin-left: 30px;
                }
            }
            .message{
                position: absolute;
                top: 50%;
                transform: translate(0, -50%);
                right: 20px;
                width: 200px;
                img{
                    width: 40px;
                    height: 40px;
                }
                em{
                    position: absolute;
                    left: 60px;
                    top: 50%;
                    transform: translate(0, -50%);
                }
            }
        }
    }
</style>
