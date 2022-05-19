export  function getCenter(pointArray) {
    var sortedLongitudeArray = pointArray.map(item => item.longitude).sort();//首先对经度进行排序，红色部分是array中经度的名称
    var sortedLatitudeArray = pointArray.map(item => item.latitude).sort();//对纬度进行排序，红色部分是array中纬度的名称
    var centerLongitude = ((parseFloat(sortedLongitudeArray[0]) + parseFloat(sortedLongitudeArray[sortedLongitudeArray.length - 1])) / 2).toFixed(4);
    const centerLatitude = ((parseFloat(sortedLatitudeArray[0]) + parseFloat(sortedLatitudeArray[sortedLatitudeArray.length - 1])) / 2).toFixed(4);
    return [centerLongitude, centerLatitude];
}
export function getNowDate() {
    var myDate = new Date;
    var year = myDate.getFullYear(); //获取当前年
    var mon = myDate.getMonth() + 1; //获取当前月
    if(mon<10){
        mon="0"+mon;
    }
    var date = myDate.getDate(); //获取当前日
    if(date<10){
        date="0"+date;
    }
    var hours = myDate.getHours(); //获取当前小时
    if(hours<10){
        hours="0"+hours;
    }
    var minutes = myDate.getMinutes(); //获取当前分钟
    if(minutes<10){
        minutes="0"+minutes;
    }
    var seconds = myDate.getSeconds(); //获取当前秒
    if(seconds<10){
        seconds="0"+seconds;
    }
    var now = year + "-" + mon + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    return now;
}

