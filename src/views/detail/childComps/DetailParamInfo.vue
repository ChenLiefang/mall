<template>
    <div class="param-info" v-if="Object.keys(paramInfo).length !== 0" >
      <div v-for="(tables,index) in paramInfo.rule.tables" :key="index">
      <table class="parm-info-table" v-for="(table,index) in tables" :key="index">
        <tr v-for="(tr,indey) in table" :key="indey">
          <td v-for="(td,indez) in tr" :key="indez">{{td}}</td>
        </tr>
      </table>
      
        <table class="info-param" >
          <tr v-for="(info,index) in paramInfo.info.set" :key="index">
            <td class="info-param-key">{{info.key}}</td>
            <td class="param-value">{{info.value}}</td>
          </tr>
        </table>
      </div>
      
      <!-- <div class="info-img" v-if="paramInfo.image.length !==0">
        <img :src="paramInfo.image" alt="">
      </div> -->
      
    </div>
</template>
<script>
export default {
   name:'DetailParamInfo',
   props:{
     paramInfo:{
       trpe:Object,
       default(){
         return {}
       }
     }
   }
}
</script>
<style  scoped>
 .param-info {
    padding: 20px 15px;
    font-size: 14px;
    border-bottom: 5px solid #f2f5f8;
  }
  .parm-info-table{
  display: flex; 
  flex-wrap: wrap;
  }
  .param-info table {
    width: 100%;
    border-collapse: collapse;
  }
  .param-info table tr {
    flex:1;
    height: 42px;
  }
  .param-info table tr td {
    border-bottom: 1px solid rgba(100,100,100,.1);  
  }

  .info-param tr td {
   border-bottom: 1px solid rgba(100,100,100,.1);
   width: 48%;
   }
  .info-param-key {
   /* 当value的数据量比较大的时候, 会挤到key,所以给一个固定的宽度*/ 
    width: 95px; 
  
  }

  .param-value {
    color: #eb4868;
  }
  .info-img img {
    width: 100%;
  }
</style>
