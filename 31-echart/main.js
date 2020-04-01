$(function(){

  function roundFractional(x, n) {
    return Math.round(x * Math.pow(10, n)) / Math.pow(10, n);
  }

  var myChart = echarts.init(document.getElementById('main'));

  var xData = [],
      yData = [];
  
  for(var p=0;p<=1;p+=0.1){
    xData.push(roundFractional(p,1));
    if(p === 1 || p===0){
      yData.push(0);
    }else{
      yData.push(roundFractional(-1*p*Math.log2(p) - (1-p)*Math.log2(1-p),2));
    }
  }

  var option = {
    title: {
      text: '二进熵函数曲线'
    },
    tooltip: {},
    legend: {
      data:['信息量']
    },
    xAxis: {
      data: xData
    },
    yAxis: {},
    series: [{
      name: '信息量',
      type: 'line',
      smooth:true,
      data: yData

    }]
  };

  myChart.setOption(option);
})