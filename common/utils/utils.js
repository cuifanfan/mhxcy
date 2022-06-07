import * as CryptoJS from "crypto-js";
export  function getCenter(pointArray) {
    var sortedLongitudeArray = pointArray.map(item => item.lng).sort();//首先对经度进行排序，红色部分是array中经度的名称
    var sortedLatitudeArray = pointArray.map(item => item.lat).sort();//对纬度进行排序，红色部分是array中纬度的名称
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
export const encryption = params => {
    let { data, type, param, key } = params;
    const result = JSON.parse(JSON.stringify(data));
    if (type === "Base64") {
      param.forEach(ele => {
        result[ele] = btoa(result[ele]);
      });
    } else {
      param.forEach(ele => {
        var data = result[ele];
        key = CryptoJS.enc.Latin1.parse(key);
        var iv = key;
        // 加密
        var encrypted = CryptoJS.AES.encrypt(data, key, {
          iv: iv,
          mode: CryptoJS.mode.CFB,
          padding: CryptoJS.pad.NoPadding
        });
        result[ele] = encrypted.toString();
      });
    }
    return result;
};
export  function btoa(str){  
    let val = ""  
    for (let i = 0; i < str.length; i++) {  
      if (val === '') {  
        val = str.charCodeAt(i).toString(16)  
      } else {  
        val += ',' + str.charCodeAt(i).toString(16)  
      }  
    }  
    return new Uint8Array(val.match(/[\da-f]{2}/gi).map(function (h) {  
      return parseInt(h, 16)  
    })).buffer  
}
export function weekDay(date){
    var dt = new Date(date.split("-")[0], date.split("-")[1]-1,date = date.split("-")[2]);
    var weekDay = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    return weekDay[dt.getDay()];
}



