<template>
    <div class="webcome">
        <div class="sayHello">
            <span>现在是-----{{time | timer}}</span>
            <div class="box">
                欢迎归来
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      time: new Date()
    }
  },
  filters: {
    timer (time) {
      var d = new Date(time)
      var year = d.getFullYear()
      var month = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : '' + d.getMonth() + 1
      var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate()
      var hour = d.getHours() < 10 ? '0' + d.getHours() : '' + d.getHours()
      var minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : '' + d.getMinutes()
      return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes
    }
  }
}
</script>

<style scoped>
.sayHello{
    text-align: center;
    color:red;
    margin-top:50px;
    font-size: 30px;
}
.box{
    font-size: 50px;
}
</style>
