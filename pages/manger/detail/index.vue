<template>
  <div class="wrap">
    <header-diy
      id="headerdiy"
      class="topbar"
      :type="2"
      :titleName="pageName"
    ></header-diy>
    <!-- <web-view
        src="http://121.36.247.77/tdt.html"
        @message="handleMessage"
      ></web-view> -->
    <!-- <map
        name=""
        class="map"
        :latitude="latitude"
        :longitude="longitude"
        scale="16"
        :markers="markers"
        :polygons="polygons"
      ></map> -->
    <!-- <image mode="widthFix" class="pic picab" src="@/static/image/xq.png" /> -->
    <div class="content">
      <div class="index1 index1clearbottom">
        <div class="header header3">
          <div class="header2">茶园信息</div>
          <image
            @click="goMap"
            mode="widthFix"
            class="set"
            src="@/static/image/map.png"
          />
        </div>
        <div class="info2" v-if="infoGet">
          <div class="info3 info7">
            <div class="info4">
              茶园名称：<span>{{ infoGet.name }}</span>
            </div>
            <div class="info4">
              茶园面积：<span>{{ infoGet.area }}</span
              >亩
            </div>
          </div>
          <div class="info3">
            种植品种：<span>{{ infoGet.species }}</span>
          </div>
          <div class="info3">
            茶园地址：<span>{{ infoGet.address }}</span>
          </div>
        </div>
        <div class="header">
          <div class="header2">视频监控</div>
        </div>
        <div class="test5">
          <div
            class="test6"
            @click="goDetail(videoListShow)"
          >
            <div>
              <div class="imgwraps">
                <image
                  mode="widthFix"
                  class="videopic"
                  :src="baseUrl+videoListShow.cover"
                />
                <image
                  mode="widthFix"
                  class="play"
                  src="@/static/image/play.png"
                />
              </div>
              <div class="text textflex">
                <div>
                 {{videoListShow.deviceName}}
                </div>
                {{ videoListShow.url == "" ? "离线" : "在线" }}
              </div>
            </div>
          </div>
        </div>
        <div class="header header3">
          <div class="header2">告警参数设置</div>
          <image
            @click="goSet"
            mode="widthFix"
            class="set"
            src="@/static/image/set.png"
          />
        </div>
        <div class="index1 index90" v-if="!notSetFlag">
          <div
            class="index91"
            :style="{ marginBottom: index == 6 || index == 7 ? '0' : '' }"
            v-for="(item, index) in list"
            :key="index"
          >
            <image mode="widthFix" class="pic92" :src="item.pic" />
            <div class="index92">
              <div class="index93">
                <span>{{ item.val[0] }}~{{ item.val[1] }}</span
                >{{ item.unit }}
              </div>
              {{ item.name }}
            </div>
          </div>
        </div>
        <div v-else class="index1 index90">暂未设置环境参数</div>
        <div>
          <div class="tabchange">
            <div
              @click="changeTabHandle(index)"
              :class="[activeTab == index ? 'activec' : '', 'c1']"
              v-for="(item, index) in tab"
              :key="index"
            >
              {{ item }}
            </div>
          </div>
          <div class="changechild" v-if="activeTab == 0">
            <div class="tabchild" v-if="activeTab == 0"></div>
            <div class="header header7">
              <div class="header2">15天天气预报</div>
            </div>
            <div class="weatherdiv">
              <weather ref="weather" :weatherData="weatherData" />
            </div>
            <!-- <image mode="widthFix" class="pic" src="@/static/image/tqyb.png" /> -->
            <div class="header header7">
              <div class="header2">气象站信息</div>
              <div class="cj">
                <span> 采集时间: </span>
                <span> {{ weatherCreateTime }} </span>
              </div>
            </div>
            <div class="index1 index90">
              <div
                class="index91"
                :style="{ marginBottom: index == 7 || index == 8 ? '0' : '' }"
                v-for="(item, index) in list2"
                :key="index"
              >
                <image mode="widthFix" class="pic92" :src="item.pic" />
                <div class="index92">
                  <div class="index93">
                    <span>{{ item.num }}</span
                    >{{ item.unit }}
                  </div>
                  {{ item.name }}
                </div>
              </div>
            </div>
            <div class="header header7">
              <div class="header2">积温变化</div>
            </div>
            <div class="cirbox" v-if="chartDataTemperatureFlag">
              <qiun-data-charts
                type="mix"
                canvasId="three_b"
                :resshow="false"
                :ontouch="true"
                :opts="{
                  legend: { position: 'top' },
                  yAxis: {
                    disableGrid: true,

                    data: [
                      {
                        axisLineColor: 'rgba(147,149,153,0.1)',
                        fontColor: '#939599',
                        position: 'left',
                        title: '单位(℃)',
                        titleOffsetX: -15,
                        titleOffsetY: -10,
                        titleFontColor: '#939599',
                        max: chartDataTemperature
                          ? chartDataTemperature.yAxis[0].max
                          : 0,
                        min: chartDataTemperature
                          ? chartDataTemperature.yAxis[0].min
                          : 0,
                      },
                    ],
                  },
                  xAxis: {
                    
          
                    axisLineColor: 'rgba(147,149,153,0.1)',
                    disableGrid: false,
                    gridColor: 'rgba(147,149,153,0.1)',
                    gridType: 'solid',
                    fontColor: '#939599',
                  },
                }"
                :chartData="chartDataTemperature"
              />
            </div>
            <div class="header header7">
              <div class="header2">积雨变化</div>
            </div>
            <div class="cirbox" v-if="chartDataRainFlag">
              <qiun-data-charts
                type="mix"
                canvasId="three_c"
                :resshow="false"
                :opts="{
                  legend: { position: 'top' },
                  yAxis: {
                    disableGrid: true,

                    data: [
                      {
                        axisLineColor: 'rgba(147,149,153,0.1)',
                        fontColor: '#939599',
                        position: 'left',
                        title: '单位(℃)',
                        titleOffsetX: -20,
                        titleOffsetY: -10,
                        titleFontColor: '#939599',
                        max: chartDataTemperature
                          ? chartDataTemperature.yAxis[0].max
                          : 0,
                        min: chartDataTemperature
                          ? chartDataTemperature.yAxis[0].min
                          : 0,
                      },
                    ],
                  },
                  xAxis: {
                    axisLineColor: 'rgba(147,149,153,0.1)',
                    disableGrid: false,
                    gridColor: 'rgba(147,149,153,0.1)',
                    gridType: 'solid',
                    fontColor: '#939599',
                  },
                }"
                :chartData="chartDataRain"
              />
            </div>
          </div>
          <div class="changechild" v-if="activeTab == 1">
            <div class="header header3">
              <div class="header2">长势监测</div>
              <image mode="widthFix" class="set" src="@/static/image/ss1.png" />
            </div>
            <div class="test1" v-if="fluoritescreenshotData">
              <div class="test5">
                <div class="test6">
                  <div class="imgwraps" @click="goDetailGrowth">
                    <image
                      mode="widthFix"
                      class="videopic"
                      :src="baseUrl+fluoritescreenshotData['url']"
                    />
                  </div>
                  <div class="text flextextadd">
                    <div>{{fluoritescreenshotData.createTime}}</div>
                    <div>查看详情</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="nodata" v-else>
              暂无数据
            </div>
            <!-- <div class="header header3">
              <div class="header2">遥感报告</div>
              <image mode="widthFix" class="set" src="@/static/image/ss1.png" />
            </div> -->
            <!-- <div class="test1">
              <div class="test5">
                <div class="test6" @click="goDetail">
                  <div class="imgwraps">
                    <image
                      mode="widthFix"
                      class="videopic"
                      src="@/static/image/yg.png"
                    />
                  </div>
                  <div class="text flextextadd">
                    <div>2021-11-05 08:30</div>
                    <div>查看详情</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="header header3">
              <div class="header2">巡检报告</div>
              <image mode="widthFix" class="set" src="@/static/image/ss1.png" />
            </div> -->
            <!-- <div class="test1">
              <div class="test5">
                <div class="test6" @click="goDetail">
                  <div class="imgwraps">
                    <image
                      mode="widthFix"
                      class="videopic"
                      src="@/static/image/xj.png"
                    />
                  </div>
                  <div class="text flextextadd">
                    <div>2021-11-05 08:30</div>
                    <div>查看详情</div>
                  </div>
                </div>
              </div> -->
            </div>
            <!-- <div class="test1">
              <div class="test5">
                <div class="test6" @click="goDetail">
                  <div class="imgwraps">
                    <image
                      mode="widthFix"
                      class="videopic"
                      src="@/static/image/xj.png"
                    />
                  </div>
                  <div class="text flextextadd">
                    <div>2021-11-05 08:30</div>
                    <div>查看详情</div>
                  </div>
                </div>
              </div>
            </div> -->
          </div>
          <div class="changechild" v-if="activeTab == 2">
            <div v-for="(item,index)  in farmList" :key="index">
               <div class="header header3">
              <div class="header2">{{item.time}}</div>
              <!-- <image mode="widthFix" class="set" src="@/static/image/ss1.png" /> -->
            </div>
            <div class="nsdiv">
              <div class="nschild">
                <div class="ns1">
                  <span class="nsdivspan">农事操作:</span>
                  {{item.content}}
                </div>
                <div class="ns1">
                  <span class="nsdivspan">农事内容:</span>
                  <div class="ns2">
                    <div class="ns3" v-for="(item2,index2) in item.contentSplit" :key="index2">
                      <div class="ns4">{{item2.split(':')[0]}}:</div>
                      {{item2.split(':')[1]}}KG;
                    </div>
                  </div>
                </div>
                <div class="ns1 ns1flex" v-if="item.imgArr.length>0">
                  <image
                    v-for="(item3,index3) in item.imgArr" :key="index3"
                    mode="widthFix"
                    class="zzpic"
                    :src="baseUrl+item3"
                  />
                </div>
              </div>
            </div>
            </div>
          </div>
          <div class="changechild" v-if="activeTab == 3">
            <div class="header header3">
              <div class="header2">气象监测</div>
            </div>
            <div  v-if="getEnInfo">
              <div class="detailwrap">
                <div class="d1wrap">
                  <div class="d1 flexcenter">
                    <div class="d2 flexcenter" v-if="getEnInfo.status=='online'">在线</div>
                    {{ getEnInfo.name }}
                  </div>
                  <div class="btnd flexcenter" @click="goDetail2(2,getEnInfo)">查看详情</div>
                </div>

                <div class="d3">
                  <div class="d4" flexcenter>
                    <image
                      mode="widthFix"
                      class="set"
                      src="@/static/image/adress2.png"
                    />
                    {{ getEnInfo.address ? getEnInfo.address : "-" }}
                  </div>
                  <div class="d4 flexcenter">
                    <image
                      mode="widthFix"
                      class="set"
                      src="@/static/image/time.png"
                    />
                    {{ getEnInfo.create_time }}
                  </div>
              </div>
            </div>
          <div class="index1add index90">
            <div
              class="index91"
              :style="{ marginBottom: index == 6 || index == 7 ? '0' : '' }"
              v-for="(getEnInfo, index) in getEnInfo.arr"
              :key="index"
            >
              <image mode="widthFix" class="pic92" :src="getEnInfo.pic" />
              <div class="index92">
                <div class="index93">
                  <span>{{ getEnInfo.num }}</span
                  >{{ getEnInfo.unit }}
                </div>
                {{ getEnInfo.name }}
              </div>
            </div>
          </div>
        </div>

            <div class="header header3 header3Top">
              <div class="header2">墒情监测</div>
            </div>
            <div class="detailwrap" v-if="soilInfo">
              <div class="d1wrap">
                <div class="d1 flexcenter">
                  <div class="d2 flexcenter">在线</div>
                   {{soilInfo.name}}
                </div>
                <div class="btnd flexcenter" @click="goDetail2(3,soilInfo)">查看详情</div>
              </div>

              <div class="d3">
                <div class="d4" flexcenter>
                  <image
                    mode="widthFix"
                    class="set"
                    src="@/static/image/adress2.png"
                  />
                  {{soilInfo.address?soilInfo.address:'-'}}
                </div>
                <div class="d4 flexcenter">
                  <image
                    mode="widthFix"
                    class="set"
                    src="@/static/image/time.png"
                  />
                  {{soilInfo.record_time}}
                </div>
              </div>
            </div>
            <div class="oftenpanle">
              <div class="oftenpanlechild flexcenter">
                <image
                  mode="widthFix"
                  class="oftenpic"
                  src="@/static/image/k4.png"
                  alt=""
                />
                <div class="oftenright">
                  <div class="oftenbold">{{soilInfo.ec}}uc/cm</div>
                  土壤EC值
                </div>
              </div>
              <div class="oftenpanlechild flexcenter">
                <image
                  mode="widthFix"
                  class="oftenpic"
                  src="@/static/image/k5.png"
                  alt=""
                />
                <div class="oftenright">
                  <div class="oftenbold">{{soilInfo.ph}}</div>
                  土壤PH值
                </div>
              </div>
              <div class="oftenpanlechild flexcenter">
                <image
                  mode="widthFix"
                  class="oftenpic"
                  src="@/static/image/s5.png"
                  alt=""
                />
                <div class="oftenright">
                  <div class="oftenbold">{{soilInfo.temperature}}</div>
                  土壤温度
                </div>
              </div>
              <div class="oftenpanlechild flexcenter">
                <image
                  mode="widthFix"
                  class="oftenpic"
                  src="@/static/image/s6.png"
                  alt=""
                />
                <div class="oftenright">
                  <div class="oftenbold">{{soilInfo.humidity}}</div>
                  土壤湿度
                </div>
              </div>
              
            </div>

            <div class="header header3 header3Top">
              <div class="header2">虫情监测</div>
              <image mode="widthFix" class="set" src="@/static/image/ss1.png" />
            </div>
            <div class="detailwrap">
              <div class="d1wrap">
                <div class="d1 flexcenter">
                  <div class="d2 flexcenter">在线</div>
                  1号虫情仪
                </div>
                <div class="btnd flexcenter">查看详情</div>
              </div>

              <div class="d3">
                <div class="d4" flexcenter>
                  <image
                    mode="widthFix"
                    class="set"
                    src="@/static/image/adress2.png"
                  />
                  (鄂托克前旗三段村)
                </div>
                <div class="d4 flexcenter">
                  <image
                    mode="widthFix"
                    class="set"
                    src="@/static/image/time.png"
                  />
                  2022.02.10 16:25
                </div>
              </div>
            </div>
            <div class="cirbox">
              <qiun-data-charts
                type="ring"
                canvasId="four_a"
                :resshow="false"
                :opts="{
                  legend: { position: 'bottom' },
                  title: { name: '' },
                  centerColor: 'red',
                  title: { name: '总数' },
                  subtitle: {
                    name: '100',
                    color: '#12A669',
                    fontSize: 20,
                  },
                }"
                :chartData="chartDataInsect"
              />
            </div>
          </div>
          <div class="changechild" v-if="activeTab == 4">
            <div class="header header7">
              <div class="header2">人力投入</div>
            </div>
            <div class="cirbox" v-if="humanResourcesFlag">
                <qiun-data-charts
                  type="mix"
                  :chartData="humanResources"
                  canvasId="one_b"
                  :opts="{
                    legend: { position: 'top' },
                    xAxis: {
                      axisLineColor: 'rgba(147,149,153,0.1)',
                      disableGrid: false,
                      gridColor: 'rgba(147,149,153,0.1)',
                      gridType: 'solid',
                      fontColor: '#939599',
                    },
                    yAxis: {
                      data: [
                        {
                          axisLineColor: 'rgba(147,149,153,0.1)',
                          fontColor: '#939599',
                          titleFontColor: '#939599',
                          title: '单位(KG)',
                          titleOffsetX: -5,
                          titleOffsetY: -10,
                        },
                      ],
                    },
                  }"
                />
            </div>
            <div class="header header7">
            <div class="header2">灌溉投入</div>
          </div>
          <div>
            <div class="cirbox" v-if="ggFlag">
              <qiun-data-charts
                type="mix"
                canvasId="three_gg"
                :resshow="false"
                :opts="{
                  legend: { position: 'top' },
                  yAxis: {
                    disableGrid: true,

                    data: [
                      {
                        axisLineColor: 'rgba(147,149,153,0.1)',
                        fontColor: '#939599',
                        position: 'left',
                        title: '单位(KG)',
                        titleOffsetX: -10,
                        titleOffsetY: -10,
                        titleFontColor: '#939599',
                      },
                    ],
                  },
                  xAxis: {
                    axisLineColor: 'rgba(147,149,153,0.1)',
                    disableGrid: false,
                    gridColor: 'rgba(147,149,153,0.1)',
                    gridType: 'solid',
                    fontColor: '#939599',
                  },
                }"
                :chartData="chartDatagg"
              />
            </div>
          </div>
            <div class="header header7">
              <div class="header2">施肥投入</div>
            </div>
            <div>
              <div class="cirbox" v-if="sfFlag">
                <qiun-data-charts
                  type="mix"
                  canvasId="three_fertilizer"
                  :reshow="false"
                  :opts="{
                    legend: { position: 'top' },
                    yAxis: {
                      data: [
                        {
                          axisLineColor: 'rgba(147,149,153,0.1)',
                          fontColor: '#939599',
                          titleFontColor: '#939599',
                          position: 'left',
                          title: '销售额/万',
                          // max: fertilizer ? fertilizer.yAxis[0].max : 0,
                          // min: fertilizer ? fertilizer.yAxis[0].min : 0,
                        },
                        {
                          axisLineColor: 'rgba(147,149,153,0.1)',
                          fontColor: '#939599',
                          titleFontColor: '#939599',
                          position: 'right',
                          title: '',
                          // max: fertilizer ? fertilizer.yAxis[0].max : 0,
                          // min: fertilizer ? fertilizer.yAxis[0].min : 0,
                          disabled: true,
                        },
                      ],
                    },
                    xAxis: {
                      axisLineColor: 'rgba(147,149,153,0.1)',
                      disableGrid: false,
                      gridColor: 'rgba(147,149,153,0.1)',
                      gridType: 'solid',
                      fontColor: '#939599',
                    },
                  }"
                  :chartData="fertilizer"
                />
              </div>
            </div>
            <div class="header header7">
              <div class="header2">施药投入</div>
            </div>
            <div>
              <div class="cirbox" v-if="syFlag">
                <qiun-data-charts
                  type="mix"
                  canvasId="three_fertilizer2"
                  :reshow="false"
                  :opts="{
                    legend: { position: 'top' },
                    yAxis: {
                      data: [
                        {
                          axisLineColor: 'rgba(147,149,153,0.1)',
                          fontColor: '#939599',
                          titleFontColor: '#939599',
                          position: 'left',
                          title: '销售额/万',
                          // max: fertilizer ? fertilizer.yAxis[0].max : 0,
                          // min: fertilizer ? fertilizer.yAxis[0].min : 0,
                        },
                        {
                          axisLineColor: 'rgba(147,149,153,0.1)',
                          fontColor: '#939599',
                          titleFontColor: '#939599',
                          position: 'right',
                          title: '',
                          // max: fertilizer ? fertilizer.yAxis[0].max : 0,
                          // min: fertilizer ? fertilizer.yAxis[0].min : 0,
                          disabled: true,
                        },
                      ],
                    },
                    xAxis: {
                      axisLineColor: 'rgba(147,149,153,0.1)',
                      disableGrid: false,
                      gridColor: 'rgba(147,149,153,0.1)',
                      gridType: 'solid',
                      fontColor: '#939599',
                    },
                  }"
                  :chartData="fertilizerSy"
                />
              </div>
            </div>
            <div class="header header7">
              <div class="header2">鲜叶产出</div>
            </div>
            <div class="cirbox" v-if="xyFlag">
              <qiun-data-charts
                type="mix"
                canvasId="three_leaf3"
                :resshow="false"
                :opts="{
                  legend: { position: 'top' },
                  yAxis: {
                    disableGrid: true,
                    data: [
                      {
                        axisLineColor: 'rgba(147,149,153,0.1)',
                        fontColor: '#939599',
                        position: 'left',
                        title: '单位(KG)',
                        titleOffsetX: -10,
                        titleOffsetY: -10,
                        titleFontColor: '#939599',
                      },
                    ],
                  },
                  xAxis: {
                    axisLineColor: 'rgba(147,149,153,0.1)',
                    disableGrid: false,
                    gridColor: 'rgba(147,149,153,0.1)',
                    gridType: 'solid',
                    fontColor: '#939599',
                  },
                }"
                :chartData="chartDataXy"
              />
            </div>
          </div>
          <div class="changechild" v-if="activeTab == 5">
            <div class="header header7">
              <div class="header2">基础信息</div>
            </div>
            <div class="basic">
              <div class="flexcenter">
                <div class="basicchild">
                  <div class="bc1">
                    <image
                      mode="widthFix"
                      class="fullw"
                      src="@/static/image/ad1.png"
                    />
                    <div>积温监测</div>
                  </div>
                </div>
                <div class="basicchild">
                  <div class="bc1 bc3">
                    <div class="basictext">
                      <span class="bold"> {{allOther.TotalTmpThisAndLastYear.thisYear}} </span>
                      ℃
                    </div>
                    <div>当前积温</div>
                  </div>
                </div>
              </div>
              <div class="flexcenter">
                <div class="bc1 bc4">
                  <div class="bc2 flexcenter" v-if="allOther.TotalTmpThisAndLastYear.compare">
                    <image
                      mode="widthFix"
                      class="bc2img"
                      src="@/static/image/ad5.png"
                      v-if="allOther.TotalTmpThisAndLastYear.compare>0"
                    />
                    <image
                      mode="widthFix"
                      class="fullw"
                      src="@/static/image/ad2.png"
                      v-else
                    />
                    <div>
                      <span class="red" v-if="allOther.TotalTmpThisAndLastYear.compare>0"> 25 </span>
                      <span class="red green" v-else> {{allOther.TotalTmpThisAndLastYear.compare}} </span>
                      <span class="redspan">℃</span>
                    </div>
                  </div>
                  <div class="nocompare" v-else>-</div>
                  较去年同期
                </div>
                <u-icon color="#C4C7CC" size="20" name="arrow-right"></u-icon>
              </div>
            </div>
            <div class="basic">
              <div class="flexcenter">
                <div class="basicchild">
                  <div class="bc1">
                    <image
                      mode="widthFix"
                      class="fullw"
                      src="@/static/image/ad2.png"
                    />
                    <div>积雨监测</div>
                  </div>
                </div>
                <div class="basicchild">
                  <div class="bc1 bc3">
                    <div class="basictext">
                      <span class="bold">  {{allOther.TotalRainThisAndLastYear.thisYear}}</span>
                      mm
                    </div>
                    <div>当前积雨</div>
                  </div>
                </div>
              </div>
              <div class="flexcenter">
                <div class="bc1 bc4">
                  <div class="bc2 flexcenter" v-if="allOther.TotalRainThisAndLastYear.compare">
                    <image
                      mode="widthFix"
                      class="bc2img"
                      src="@/static/image/ad5.png"
                      v-if="allOther.TotalRainThisAndLastYear.compare>0"
                    />
                    <image
                      mode="widthFix"
                      class="fullw"
                      src="@/static/image/ad2.png"
                      v-else
                    />
                    <div>
                      <span class="red" v-if="allOther.TotalRainThisAndLastYear.compare>0"> 25 </span>
                      <span class="red green" v-else> {{allOther.TotalRainThisAndLastYear.compare}} </span>
                      <span class="redspan">℃</span>
                    </div>
                  </div>
                  <div class="nocompare" v-else>-</div>
                  较去年同期
                </div>
                <u-icon color="#C4C7CC" size="20" name="arrow-right"></u-icon>
              </div>
            </div>
            <div class="basic">
              <div class="flexcenter">
                <div class="basicchild">
                  <div class="bc1">
                    <image
                      mode="widthFix"
                      class="fullw"
                      src="@/static/image/ad3.png"
                    />
                    <div>年辐射量</div>
                  </div>
                </div>
                <div class="basicchild">
                  <div class="bc1 bc3">
                    <div class="basictext">
                      <span class="bold"> {{allOther.TotalPhotosyntheticThisAndLastYear.thisYear}}</span>
                      MJ/㎡
                    </div>
                    <div>当前辐射总量</div>
                  </div>
                </div>
              </div>
              <div class="flexcenter">
                <div class="bc1 bc4">
                  <div class="bc2 flexcenter" v-if="allOther.TotalPhotosyntheticThisAndLastYear.compare">
                    <image
                      mode="widthFix"
                      class="bc2img"
                      src="@/static/image/ad5.png"
                      v-if="allOther.TotalPhotosyntheticThisAndLastYear.compare>0"
                    />
                    <image
                      mode="widthFix"
                      class="fullw"
                      src="@/static/image/ad2.png"
                      v-else
                    />
                    <div>
                      <span class="red" v-if="allOther.TotalPhotosyntheticThisAndLastYear.compare>0"> 25 </span>
                      <span class="red green" v-else> {{allOther.TotalPhotosyntheticThisAndLastYear.compare}} </span>
                      <span class="redspan">℃</span>
                    </div>
                  </div>
                  <div class="nocompare" v-else>-</div>
                  较去年同期
                </div>
                <u-icon color="#C4C7CC" size="20" name="arrow-right"></u-icon>
              </div>
            </div>
            <div class="basic">
              <div class="flexcenter">
                <div class="basicchild">
                  <div class="bc1">
                    <image
                      mode="widthFix"
                      class="fullw"
                      src="@/static/image/ad4.png"
                    />
                    <div>年蒸发量</div>
                  </div>
                </div>
                <div class="basicchild">
                  <div class="bc1 bc3">
                    <div class="basictext">
                      <span class="bold"> -</span>
                      <!-- mm -->
                    </div>
                    <div>当前蒸发总量</div>
                  </div>
                </div>
              </div>
              <div class="flexcenter">
                <div class="bc1 bc4">
                  <div class="bc2 flexcenter">
                    
                    <!-- <image
                      mode="widthFix"
                      class="bc2img"
                      src="@/static/image/ad5.png"
                    />
                    <div>
                      <span class="red"> 25 </span>
                      <span class="redspan">mm</span>
                    </div> -->
                  </div>
                  <div class="nocompare">-</div>
                  较去年同期
                </div>
                <u-icon color="#C4C7CC" size="20" name="arrow-right"></u-icon>
              </div>
            </div>
            <div class="header header7">
              <div class="header2">土壤信息</div>
            </div>
            <div class="cirbox">
              <qiun-data-charts
                type="radar"
                :chartData="RadarModel"
                background="none"
                canvasId="radar1"
                :animation="false"
                :opts="{
                  legend: { show: false },
                }"
                :resshow="false"
              />
            </div>
            <div class="jdt" v-for="(item, index) in redarArr" :key="index">
              <div class="jdtchild">
                <div>{{ item.name }}</div>
                <div class="jdttext">{{ item.value }}%</div>
              </div>
              <div class="jdtwrap">
                <u-line-progress
                  height="8"
                  activeColor="#3199F5"
                  inactiveColor="rgba(0,102,255,0.3)"
                  :percentage="item.value"
                  :showText="false"
                ></u-line-progress>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import headerDiy from "../../component/header/header.vue";
import weather from "../../component/weather";
import { getCenter, weekDay } from "../../../common/utils/utils";
import request from "../../../common/utils/request";
import moment from "moment";
import { weatherIdToName, wind } from "../../../common/utils/weather";
import { BASE_URL } from "../../../common/utils/config";
export default {
  components: {
    headerDiy,
    weather,
  },
  data() {
    return {
      sfFlag: false,
      soilInfo: null,
      allOther: null,
      fluoritescreenshotData: null,
      baseUrl: BASE_URL,
      infoGet: null,
      videoListShow: [],
      weatherCreateTime: "",
      moment,
      weatherData: [],
      longitude: "",
      latitude: "",
      markers: [],
      polyline: [],
      chartDataTemperatureFlag: false,
      polygons: [],
      fertilizer: {
        categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        series: [],
        yAxis: [],
      },
      chartDataXy: {
        categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        series: [
          {
            name: "去年",
            data: [],
            type: "column",
            color: "#17E5A1",
            unit: "",
          },
          {
            name: "今年",
            data: [],
            type: "column",
            color: "#3199F5",
            unit: "",
          },
        ],
      },
      humanResources: {
        categories: [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
        ],
        series: [
          {
            name: "去年",
            data: [
              {
                value: 1,
                color: "#17E5A1",
              },
              {
                value: 4,
                color: "#17E5A1",
              },
              {
                value: 5,
                color: "#17E5A1",
              },
              {
                value: 1,
                color: "#17E5A1",
              },
              {
                value: 3,
                color: "#17E5A1",
              },
              {
                value: 2,
                color: "#17E5A1",
              },
              {
                value: 2,
                color: "#17E5A1",
              },
              {
                value: 2,
                color: "#17E5A1",
              },
              {
                value: 2,
                color: "#17E5A1",
              },
              {
                value: 2,
                color: "#17E5A1",
              },
              {
                value: 2,
                color: "#17E5A1",
              },
              {
                value: 2,
                color: "#17E5A1",
              },
            ],
            type: "column",
            color: "#17E5A1",
            unit: "",
          },
          {
            name: "今年",
            data: [
              {
                value: 2,
                color: "#3199F5",
              },
              {
                value: 1,
                color: "#3199F5",
              },
              {
                value: 4,
                color: "#3199F5",
              },
              {
                value: 3,
                color: "#3199F5",
              },
              {
                value: 4,
                color: "#3199F5",
              },
              {
                value: 3,
                color: "#3199F5",
              },
              {
                value: 4,
                color: "#3199F5",
              },
              {
                value: 2,
                color: "#3199F5",
              },
              {
                value: 2,
                color: "#3199F5",
              },
              {
                value: 2,
                color: "#3199F5",
              },
              {
                value: 2,
                color: "#3199F5",
              },
              {
                value: 2,
                color: "#3199F5",
              },
            ],
            type: "column",
            color: "#3199F5",
            unit: "",
          },
        ],
      },
      chartDataInsect: {
        series: [
          {
            name: "红蜘蛛",
            data: 50,
            color: "#17E5CA",
          },
          {
            name: "草地贪叶蛾",
            data: 62,
            color: "#3199F5",
          },
          {
            name: "蝗虫",
            data: 23,
            color: "#F5A631",
          },
          {
            name: "玉米蓟马",
            data: 96,
            color: "#8F30BF",
          },
          {
            name: "黏虫",
            data: 42,
            color: "#17CAE5",
          },
        ],
      },
      redarArr: [
        {
          name: "氮",
          value: "0",
        },
        {
          name: "有机质",
          value: "0",
        },
        {
          name: "有效磷",
          value: "0",
        },
        {
          name: "PH",
          value: "0",
        },
        {
          name: "缓效钾",
          value: "0",
        },
        {
          name: "速效钾",
          value: "0",
        },
      ],
      RadarModel: {
        categories: [
          "氮(中)",
          "有机物(中)",
          "缓效钾(中)",
          "PH(高)",
          "有磷钾(中下)",
          "速效钾(中上)",
        ],
        series: [
          {
            name: "一班",
            area: [123.45, 234, 192.5, 245],
            color: "#1890ff",
            data: [0, 0, 0, 0, 0, 0],
            index: 0,
            legendShape: "circle",
            pointShape: "",
            show: true,
            type: "radar",
          },
        ],
      },
      fertilizerSy: {
        categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        series: [],
        yAxis: [
          {
            max: 20,
            min: 0,
          },
          {
            max: 200,
            min: 0,
          },
        ],
      },
      chartDataTemperature: {
        categories: [],
        series: [
          {
            name: "今年",
            data: [],
            type: "line",
            addPoint: true,
            color: "#F56262",
            textSize: 8,
          },
          {
            name: "去年",
            data: [],
            type: "line",
            addPoint: true,
            color: "#FFB900",
            textSize: 8,
          },
        ],
        yAxis: [
          {
            // "max": 60,
            // "min": 0
          },
        ],
      },
      chartDataRain: {
        categories: [],
        series: [
          {
            name: "今年",
            data: [],
            type: "line",
            addPoint: true,
            color: "#29CC96",
            textColor: "#17E6A1",
            textSize: 8,
          },
          {
            name: "去年",
            data: [],
            type: "line",
            addPoint: true,
            color: "#3199F5",
            textColor: "#3199F5",
            textSize: 8,
          },
        ],
        yAxis: [
          {
            // "max": 60,
            // "min": 0
          },
        ],
      },
      value: "",
      tab: [
        "茶园天气",
        "长势监测",
        "农事记录",
        "物联设备",
        "投入产出",
        "其他信息",
      ],
      activeTab: 0,
      list: [
        {
          num: 15,
          unit: "℃",
          name: "温度",
          val: ["", ""],
          pic: require("@/static/image/new5.png"),
        },
        {
          num: 44.9,
          unit: "%",
          name: "相对湿度",
          val: ["", ""],
          pic: require("@/static/image/new6.png"),
        },
        {
          num: "西北风",
          unit: "PPM",
          name: "二氧化碳",
          val: ["", ""],
          pic: require("@/static/image/f8.png"),
        },
        {
          num: 3,
          unit: "Lux",
          name: "光照",
          val: ["", ""],
          pic: require("@/static/image/f6.png"),
        },
        {
          num: 23,
          unit: "℃",
          name: "土壤温度",
          val: ["", ""],
          pic: require("@/static/image/s5.png"),
        },
        {
          num: 23,
          unit: "%",
          name: "土壤湿度",
          val: ["", ""],
          pic: require("@/static/image/k4.png"),
        },
        {
          num: 0.35,
          unit: "us/cm",
          name: "土壤EC值",
          val: ["", ""],
          pic: require("@/static/image/k5.png"),
        },
        {
          num: 6.5,
          unit: "",
          name: "土壤PH值",
          val: ["", ""],
          pic: require("@/static/image/s8.png"),
        },
      ],
      list2: [],
      activeone: 4,
      active: false,
      showType: false,
      showType2: false,
      pageName: "茶园详情",
      numValue: "",
      nameValue: "",
      typeValue: "",
      teaId: null,
      notSetFlag: false,
      getDeviceList: null,
      chartDatagg:{
        categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        series: [
          {
            name: "今年",
            data: [],
            type: "line",
            addPoint: true,
            color: "#29CC96",
            textColor: "#17E6A1",
            textSize: 8,
          },
          {
            name: "去年",
            data: [],
            type: "line",
            addPoint: true,
            color: "#3199F5",
            textColor: "#3199F5",
            textSize: 8,
          },
        ],
        yAxis: [
          {
            // "max": 60,
            // "min": 0
          },
        ],
      },
      chartDataRainFlag: false,
      farmList: [],
      current: 1,
      getEnInfo: null,
      humanResourcesFlag: false,
      userInfo: null,
      ggFlag: false,
      //去年的施药
      agoSyArr: [],
      //今年的施药
      nowSyArr: [],
      humanResources: {
        categories: [],
        series: [
          {
            name: "去年",
            data: [],
            type: "column",
            color: "#17E5A1",
            unit: "",
          },
          {
            name: "今年",
            data: [],
            type: "column",
            color: "#3199F5",
            unit: "",
          },
        ],
      },
    };
  },
  onReachBottom() {
    console.log("触底了");
    if (this.activeTab == 2) {
      this.current++;
      this.farmrecords();
    }
  },
  onLoad(option) {
    this.teaId = option.id;
    this.userInfo = uni.getStorageSync("userInfo");
    let getDeviceList = uni.getStorageSync("deviceList");
    if (getDeviceList) {
      this.getDeviceList = JSON.parse(getDeviceList);
    }
    this.askWeather();
    this.askWeatherStation();
    this.askInfo();
    this.gardenthresholdday();
    let now = moment().format("YYYY");
    let ago = moment().add(-1, "y").format("YYYY");
    this.getSumRainInYear(now, 1);
    this.getSumRainInYear(ago, 0);
    this.getSumTemInYear(now, 1);
    this.getSumTemInYear(ago, 0);
    this.fluoritescreenshot();
    this.farmrecords();
    this.getTotalAllThisAndLastYear();
    this.getEnvironment();
    this.getCurrentMoisture();
    this.getAllHumanUseEachMonthByYear(ago, 0);
    //查询施肥
    this.getAllPutInEachMonthByYear(ago, 0, "施肥");
    this.getAllPutInEachMonthByYear(ago, 0, "灌溉");
    //除草和病虫防治的施药
    this.getAllPutInEachMonthByYear(ago, 0, "除草");
    //鲜叶
    this.getAllPutInEachMonthByYear(ago, 0, "采摘");
  },
  methods: {
    typeSelect() {},
    handleMessage() {},
    getAllHumanUseEachMonthByYear(year, type) {
      request({
        url: "/data/farmrecords/getAllHumanUseEachMonthByYear",
        method: "get",
        isAuth: false,
        data: {
          userId: this.userInfo.userId,
          year: year,
          gardenId: this.teaId,
        },
      }).then((res) => {
        if (type == 0) {
          let now = moment().format("YYYY");
          this.getAllHumanUseEachMonthByYear(now, 1);
          let dateSet = [];
          let agoSet = [];
          res.data.forEach((item) => {
            dateSet.push(item.month);
            agoSet.push({
              value: item.humanUse ? item.humanUse : 0,
              color: "#17E5A1",
            });
          });
          this.humanResources.categories = dateSet;
          this.humanResources["series"][0]["data"] = agoSet;
        } else {
          let dateSet = [];
          let agoSet = [];
          res.data.forEach((item) => {
            dateSet.push(item.month);
            agoSet.push({
              value: item.humanUse ? item.humanUse : 0,
              color: "#3199F5",
            });
          });
          this.humanResources["series"][1]["data"] = agoSet;
          this.humanResourcesFlag = true;
        }
      });
    },
    getAllPutInEachMonthByYear(year, type, val) {
      request({
        url: "/data/farmrecords/getAllPutInEachMonthByYear",
        method: "get",
        isAuth: false,
        data: {
          content: val,
          userId: this.userInfo.userId,
          year: year,
          gardenId: this.teaId,
        },
      }).then((res) => {
        //获取所有的项目
        let all = [];
        let now = moment().format("YYYY");
        res.data.forEach((item, index) => {
          item.list.forEach((item2, index2) => {
            let flag = all.find((item3) => {
              return item3.name == item2.name;
            });
            if (!flag) {
              all.push({
                name: item2.name,
                val: item2.value,
                data: [],
              });
            } else {
              // console.log('xxx',item2.value)
              flag.val += item2.value;
            }
          });
        });

        all.forEach((item, index) => {
          res.data.forEach((item2, index2) => {
            let flag = item2.list.find((item3) => {
              return item3.name == item.name;
            });
            let addValue = flag ? flag.value : 0;
            item.data.push(addValue);
          });
        });
        console.log(val, all);
        if (type == 0) {
          this.getAllPutInEachMonthByYear(now, 1, val);
        }
        if (val == "灌溉" && type == 0) {
          let water = all.find((item) => {
            return item.name == "水";
          });
          if (water) { 
            this.chartDatagg.series[1]["data"] = water.data;
          }
        }
        if (val == "灌溉" && type == 1) {
          let water = all.find((item) => {
            return item.name == "水";
          });
          if (water) {
            this.chartDatagg.series[0]["data"] = water.data;
          }
          this.ggFlag = true;
        }
        if (val == "除草" && type == 0) {
          this.agoSyArr = this.agoSyArr.concat(all);
        }
        if (val == "病虫防治" && type == 0) {
          this.agoSyArr = this.agoSyArr.concat(all);
        }
        if (val == "除草" && type == 1) {
          this.nowSyArr = this.nowSyArr.concat(all);
          let ago = moment().add(-1, "y").format("YYYY");
          this.getAllPutInEachMonthByYear(ago, 0, "病虫防治");
        }
        if (val == "采摘" && type == 0) {
          all.forEach((item) => {
            if (item.name == "鲜叶") {
              this.chartDataXy["series"][0]["data"] = item.data;
              console.log("鲜叶", item.data);
            }
          });
        }
        if (val == "采摘" && type == 1) {
          all.forEach((item) => {
            if (item.name == "鲜叶") {
              this.chartDataXy["series"][1]["data"] = item.data;
              console.log("鲜叶now", item.data);
            }
          });
          this.xyFlag = true;
        }
        if (val == "施肥" && type == 0) {
          all.forEach((item) => {
            this.fertilizer.series.push({
              name: "去年" + item.name,
              data: item.data,
              type: "line",
              addPoint: true,
              color: `#${Math.floor(Math.random() * 0xffffff)
                .toString(16)
                .padEnd(6, "0")}`,
              index: 1,
            });
          });
        }
        if (val == "施肥" && type == 1) {
          all.forEach((item) => {
            this.fertilizer.series.push({
              name: item.name,
              data: item.data,
              type: "line",
              addPoint: true,
              color: `#${Math.floor(Math.random() * 0xffffff)
                .toString(16)
                .padEnd(6, "0")}`,
              index: 1,
            });
          });

          this.sfFlag = true;
        }
        if (val == "病虫防治" && type == 1) {
          this.nowSyArr = this.nowSyArr.concat(all);

          //合并同类项目
          let getOnlyAgo = this.combin(this.agoSyArr);
          let getOnlyNow = this.combin(this.nowSyArr);

          getOnlyAgo.forEach((item) => {
            this.fertilizerSy.series.push({
              name: "去年" + item.name,
              data: item.data,
              type: "line",
              addPoint: true,
              color: `#${Math.floor(Math.random() * 0xffffff)
                .toString(16)
                .padEnd(6, "0")}`,
              index: 1,
            });
          });
          getOnlyNow.forEach((item) => {
            this.fertilizerSy.series.push({
              name: item.name,
              data: item.data,
              type: "line",
              addPoint: true,
              color: `#${Math.floor(Math.random() * 0xffffff)
                .toString(16)
                .padEnd(6, "0")}`,
              index: 1,
            });
          });
          this.syFlag = true;
        }
      });
    },
    //合并施药
    combin(arr) {
      let only = [];
      arr.forEach((item) => {
        let flag = only.find((item2) => {
          return item2.name == item.name;
        });
        if (!flag) {
          only.push(item);
        } else {
          flag.data = this.sumItem(flag.data, item.data);
        }
      });
      return only;
    },
    sumItem(arr1, arr2) {
      if (arr2.length == 0) {
        return arr1;
      } else {
        arr1.map(function (value, index) {
          arr2[index] += value;
        });
      }
      return arr2;
    },

    getCurrentMoisture() {
      let userInfo = uni.getStorageSync("userInfo");
      request({
        url:
          "/data/moisturerecords/getCurrentMoisture?userId=" + userInfo.userId,
        method: "get",
        isAuth: false,
        data: {},
      }).then((res) => {
        this.soilInfo = res.data[0];
      });
    },
    farmrecords() {
      request({
        url: "/data/farmrecords/page?gardenId=" + this.teaId,
        method: "get",
        isAuth: false,
        data: {
          current: this.current,
          descs: "time",
        },
      }).then((res) => {
        this.farmList = this.farmList.concat(res.data.records);
        this.farmList.forEach((item) => {
          if (item.fertilizerDose) {
            let get = item.fertilizerDose.split(",");
            this.$set(item, "contentSplit", get);
          } else {
            this.$set(item, "contentSplit", []);
          }
          if (item.imageUrls) {
            let get2 = item.imageUrls.split(",");
            this.$set(item, "imgArr", get2);
          } else {
            this.$set(item, "imgArr", []);
          }
        });
      });
    },

    getTotalAllThisAndLastYear() {
      let find = this.getDeviceList.find((item) => {
        return item.type == 1;
      });
      request({
        url:
          "/data/meteorologicalrecords/getTotalAllThisAndLastYear?deviceId=" +
          find.id,
        method: "get",
        isAuth: false,
        data: {},
      }).then((res) => {
        this.allOther = res.data;
        console.log("ressdsdadada===", res);
      });
    },
    fluoritescreenshot() {
      let find = this.getDeviceList.find((item) => {
        return item.type == 2;
      });
      request({
        url: "/data-thirdpart/fluoritescreenshot/page?deviceSerial=" + find.id,
        method: "get",
        isAuth: false,
        data: {},
      }).then((res) => {
        console.log("aaaa", res);
        this.fluoritescreenshotData =
          res.data.records[res.data.records.length - 1];
      });
    },
    askInfo() {
      request({
        url: "/data/teagarden/" + this.teaId,
        method: "get",
        isAuth: false,
        data: {},
      })
        .then((res) => {
          this.infoGet = res.data;
          this.askVideo();
        })
        .catch((err) => {});
    },
    goDetail(item) {
      if (item.url) {
        uni.navigateTo({
          url:
            "/pages/four2/camera/index?videourl=" +
            item.url +
            "&name=" +
            item.deviceName +
            "&token=" +
            item.accessToken,
        });
      } else {
        uni.showToast({
          title: "当前设备离线",
          icon: "none",
          duration: 1200,
        });
      }
    },
    goDetailGrowth() {
      let find = this.getDeviceList.find((item) => {
        return item.type == 2;
      });
      uni.navigateTo({
        url: "/pages/four2/site/index?id=" + find.id,
      });
    },
    askVideo() {
      let find = this.getDeviceList.find((item) => {
        return item.type == 2;
      });
      if (find) {
        request({
          url: "/data-thirdpart/fluorite/getVideoDevice/" + find.id,
          method: "get",
          isAuth: false,
          data: {},
        })
          .then((res) => {
            this.videoListShow = res.data.data;
          })
          .catch((err) => {
            console.log("err", err);
          });
      }
    },
    askWeather() {
      if (uni.getStorageSync("MJweather")) {
        this.weatherData = uni.getStorageSync("MJweather");
        this.$nextTick(() => {
          this.$refs.weather.init();
        });
      }
    },
    //获取积雨
    getSumRainInYear(year, type) {
      let find = this.getDeviceList.find((item) => {
        return item.type == 1;
      });
      request({
        url: "/data/meteorologicalrecords/getSumRainInYear",
        method: "get",
        isAuth: false,
        data: {
          deviceId: find.id,
          year: year,
        },
      }).then((res) => {
        if (type == 1) {
          let dataGet = [];
          let year = [];
          for (let p in res.data) {
            let pushVal =
              res.data[p]["value"] == null ? 0 : res.data[p]["value"];
            dataGet.push(pushVal);
            year.push(res.data[p]["name"].split("月")[0]);
          }
          console.log(year);
          this.chartDataRain.categories = year;
          this.chartDataRain.series[0]["data"] = dataGet;
        } else {
          let dataGet = [];
          for (let p in res.data) {
            let pushVal =
              res.data[p]["value"] == null ? 0 : res.data[p]["value"];
            dataGet.push(pushVal);
          }
          this.chartDataRain.series[1]["data"] = dataGet;
          setTimeout(() => {
            this.chartDataRainFlag = true;
          }, 500);
        }
      });
    },
    //获取积温
    getSumTemInYear(year, type) {
      let find = this.getDeviceList.find((item) => {
        return item.type == 1;
      });
      request({
        url: "/data/meteorologicalrecords/getSumTemInYear",
        method: "get",
        isAuth: false,
        data: {
          deviceId: find.id,
          year: year,
        },
      }).then((res) => {
        if (type == 1) {
          let dataGet = [];
          let year = [];
          for (let p in res.data) {
            let pushVal =
              res.data[p]["value"] == null ? 0 : res.data[p]["value"];
            dataGet.push(pushVal);
            year.push(res.data[p]["name"].split("月")[0]);
          }
          this.chartDataTemperature.categories = year;
          this.chartDataTemperature.series[0]["data"] = dataGet;
        } else {
          let dataGet = [];
          for (let p in res.data) {
            let pushVal =
              res.data[p]["value"] == null ? 0 : res.data[p]["value"];
            dataGet.push(pushVal);
          }
          this.chartDataTemperature.series[1]["data"] = dataGet;
          setTimeout(() => {
            this.chartDataTemperatureFlag = true;
          }, 500);
        }
      });
    },
    //获取参数设置
    gardenthresholdday() {
      console.log(848456456546456);
      request({
        url: "/data/gardenthresholdday/" + this.teaId,
        method: "get",
        isAuth: false,
        data: {},
      }).then((res) => {
        console.log("resxxx", res);
        if (!res.data) {
          this.notSetFlag = true;
          uni.setStorageSync("setParams", null);
          return;
        }
        let get = res.data;
        this.list[0]["val"] = [get.airTemMin, get.airTemMax];
        this.list[1]["val"] = [get.airHumMin, get.airHumMax];
        this.list[2]["val"] = [get.ppmMin, get.ppmMax];
        this.list[3]["val"] = [get.luxMin, get.luxMax];
        this.list[4]["val"] = [get.soilTemMin, get.soilTemMax];
        this.list[5]["val"] = [get.soilHumMin, get.soilHumMax];
        this.list[6]["val"] = [get.soilEcMin, get.soilEcMax];
        this.list[7]["val"] = [get.soilPhMin, get.soilPhMax];
        uni.setStorageSync("setParams", JSON.stringify(get));
      });
    },
    goDetail2(type, item) {
      uni.navigateTo({
        url: "/pages/four2/detail/index?type=" + type + "&id=" + item.name,
      });
    },
    getEnvironment() {
      let userInfo = uni.getStorageSync("userInfo");
      request({
        url: "/data/meteorologicalrecords/getCurrentWeather",
        method: "get",
        isAuth: false,
        data: {
          userId: userInfo.userId,
        },
      }).then((res) => {
        //getEnInfo
        console.log("???", res.data);
        this.getEnInfo = res.data[0];
        let item2 = res.data[0];
        let add = [];
        add[0] = {
          num: item2.wind_grade != null ? item2.wind_grade : "-",
          unit: "级",
          name: "风力",
          pic: require("@/static/image/new1.png"),
        };
        add[1] = {
          num: item2.wind_speed != null ? item2.wind_speed : "-",
          unit: "m/s",
          name: "风速",
          pic: require("@/static/image/new2.png"),
        };
        add[2] = {
          num: item2.wind_direct != null ? item2.wind_direct : "-",
          unit: "",
          name: "风向",
          pic: require("@/static/image/new3.png"),
        };
        add[3] = {
          num: item2.air_tem != null ? item2.air_tem : "-",
          unit: "℃",
          name: "空气温度",
          pic: require("@/static/image/new4.png"),
        };
        add[4] = {
          num: item2.air_hum != null ? item2.air_hum : "-",
          unit: "%RH",
          name: "空气湿度",
          pic: require("@/static/image/new5.png"),
        };
        add[5] = {
          num: item2.pm2point5 != null ? item2.pm2point5 : "-",
          unit: "ug/m3",
          name: "Pm2",
          pic: require("@/static/image/new6.png"),
        };
        add[6] = {
          num: item2.kpa != null ? item2.kpa : "-",
          unit: "kpa",
          name: "大气压",
          pic: require("@/static/image/new7.png"),
        };
        add[7] = {
          num: item2.lux != null ? item2.lux : "-",
          unit: "lux",
          name: "光照",
          pic: require("@/static/image/new8.png"),
        };
        this.$set(this.getEnInfo, "arr", add);

        console.log("xxxscadas", this.weatherList);
      });
    },
    askWeatherStation() {
      let find = this.getDeviceList.find((item) => {
        return item.type == 1;
      });
      if (find) {
        request({
          url: "/data/meteorologicalrecords/getCurrentWeather/" + find.id,
          method: "get",
          isAuth: false,
          data: {},
        })
          .then((res) => {
            console.log("xxx", res);
            let dataGet = res.data[0]["data"];
            console.log("xxxsss", dataGet);
            this.list2[0] = {
              num: dataGet[0]["alarmMsg"],
              unit: "级",
              name: "风力",
              pic: require("@/static/image/new1.png"),
            };
            this.list2[1] = {
              num: dataGet[1]["alarmMsg"],
              unit: "m/s",
              name: "风速",
              pic: require("@/static/image/new2.png"),
            };
            this.list2[2] = {
              num: dataGet[2]["alarmMsg"],
              unit: "",
              name: "风向",
              pic: require("@/static/image/new3.png"),
            };
            this.list2[3] = {
              num: dataGet[7]["alarmMsg"],
              unit: "℃",
              name: "空气温度",
              pic: require("@/static/image/new4.png"),
            };
            this.list2[4] = {
              num: dataGet[8]["alarmMsg"],
              unit: "%RH",
              name: "空气湿度",
              pic: require("@/static/image/new5.png"),
            };
            this.list2[5] = {
              num: dataGet[9]["alarmMsg"],
              unit: "ug/m3",
              name: "Pm10",
              pic: require("@/static/image/new6.png"),
            };
            // this.list2[6]={
            //   num: dataGet[5][1]['alarmMsg'],
            //   unit: "ug/m3",
            //   name: "Pm2.5",
            //   pic: require("@/static/image/new.png"),
            // }

            this.list2[6] = {
              num: dataGet[11]["alarmMsg"],
              unit: "kpa",
              name: "大气压",
              pic: require("@/static/image/new7.png"),
            };
            this.list2[7] = {
              num: dataGet[12]["alarmMsg"],
              unit: "lux",
              name: "光照",
              pic: require("@/static/image/new8.png"),
            };
            this.weatherCreateTime = res.data[0]["datetime"];
            this.$forceUpdate();
          })
          .catch((err) => {});
      }
    },

    goSet() {
      uni.navigateTo({
        url:
          "/pages/wisdom/param/index?id=" +
          this.teaId +
          "&name=" +
          this.infoGet.name,
      });
    },
    goMap() {
      let that = this;
      let set = {
        center: [that.infoGet.longitude, that.infoGet.latitude],
        pointArr: [
          {
            lat: that.infoGet.latitude,
            lng: that.infoGet.longitude,
            icon: "icon",
          },
        ],
      };
      uni.setStorageSync("mapParams", JSON.stringify(set));
      uni.navigateTo({
        url: "/pages/map/index",
      });
    },
    changeTabHandle(index) {
      this.activeTab = index;
      if (index == 0) {
        this.$nextTick(() => {
          this.$refs.weather.init();
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.index1add {
  margin-top: 20rpx;
}
.nocompare {
  width: 120rpx;
  display: flex;
  justify-content: center;
}
.nodata {
  font-size: 20rpx;
  color: #939599;
  padding: 10rpx;
}
.textflex {
  display: flex;
  justify-content: space-between;
}
.info4 {
  span {
    margin-right: 10rpx;
  }
}
.header3Top {
  margin-top: 22rpx;
}
.mapicon {
  width: 96rpx;
}
.weatherdiv {
  overflow-x: scroll;
  .mckou-weather-content {
    width: 100% !important;
  }
  .body-item {
    width: 54px !important;
  }
}
.map {
  height: 360rpx;
  position: relative;
  top: -32rpx;
  width: 100vw;
}
.flextextadd {
  display: flex;
  justify-content: space-between;
}
.nsdiv {
  font-size: 28rpx;
  color: #313233;
  .nsdivspan {
    color: #626466;
    margin-right: 20rpx;
  }
  .ns2 {
    display: flex;
    font-weight: bold;
  }
  .ns1 {
    margin-top: 14rpx;
  }
  .zzpic {
    width: 186rpx;
    height: 104rpx !important;
  }
  .ns1flex {
    display: flex;
    margin-top: 25rpx;
    margin-bottom: 30rpx;
    .zzpic {
      margin-right: 20rpx;
    }
  }
  .ns3 {
    display: flex;
    margin-top: 20rpx;
  }
  .ns2 {
    display: flex;
    flex-wrap: wrap;
  }
  .ns4 {
    margin-right: 20rpx;
  }
}
.index1clearbottom {
  margin-bottom: 0 !important;
}
.jdt {
  margin-bottom: 40rpx;
  .jdtchild {
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    font-size: 28rpx;
    margin-bottom: 20rpx;
    .jdttext {
      color: #3199f5;
    }
  }
}
.basic {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 110rpx;
  padding: 20rpx;
  background: #fafafa;
  border-radius: 32rpx;
  margin-top: 20rpx;
}
.bc4 {
  margin-right: 15rpx;
  align-items: flex-end !important;
}
.bc2img {
  width: 40rpx !important ;
}
.red {
  font-size: 40rpx;
  color: #f56262;
  font-weight: bold;
}
.redspan {
  font-size: 24rpx;
  color: rgba(245, 98, 98, 0.6);
}
.green {
  font-size: 40rpx;
  color: rgba(48, 191, 143, 1);
  font-weight: bold;
}
.greenspan {
  font-size: 24rpx;
  color: rgba(48, 191, 143, 0.6);
}
.basictext {
  margin-top: 20rpx;
  .bold {
    font-size: 40rpx;
    color: #313233;
    font-weight: bold;
    margin-right: 5rpx;
  }
}
.bc2 {
  margin-top: 20rpx;
}
.bc3 {
  margin-left: 20rpx;
}
.bc1 {
  height: 110rpx;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  font-size: 24rpx;
  color: #939599;
  .fullw {
    width: 80rpx !important;
  }
}
.test3 {
  position: relative;
  margin-top: 20rpx;
  background: #fff;
  border-radius: 200rpx;
  overflow: hidden;
  .u-border {
    border: none !important;
  }
  .search {
    position: absolute;
    right: 20rpx;
    top: 10rpx;
  }
}
.test1 {
  color: #626466;
  font-size: 28rpx;
  margin-top: 30rpx;
}
.test6 {
  // border-radius: 32rpx;
  overflow: hidden;
  margin: 30rpx 0;
  background: #fff;
  .videopic {
    width: 100%;
  }
  .text {
    padding: 15rpx;
    font-size: 28rpx;
    color: #626466;
  }
}
.text {
  background: rgba(49, 50, 51, 0.3);
  border-radius: 0px 0px 8px 8px;
  position: absolute;
  bottom: 8rpx;
  width: 100%;
  color: #fff !important;
  border-bottom-right-radius: 32rpx;
  border-bottom-left-radius: 32rpx;
  box-sizing: border-box;
}
.test6 {
  border-radius: 16rpx;
  overflow: hidden;
  margin: 30rpx 0;
  overflow: hidden;
  background: #fff;
  position: relative;

  .imgwraps {
    position: relative;
    height: 356rpx;
    overflow: hidden;
    .videopic {
      border-radius: 32rpx;
      overflow: hidden;
    }
    .play {
      position: absolute;
      transform: translate(-50%, -50%);
      top: 50%;
      left: 50%;
      width: 64rpx;
    }
  }
  .videopic {
    width: 100%;
  }
  .text {
    padding: 15rpx;
    font-size: 28rpx;
    color: #626466;
  }
}
.detailwrap {
  font-size: 24rpx;
  color: #626466;
  margin-top: 20rpx;
  .set {
    width: 32rpx;
    margin-right: 8rpx;
  }
  .d1 {
    font-weight: bold;
    font-size: 32rpx;
    color: #000;
  }
  .d4 {
    display: flex;
    align-items: center;
  }
  .d2 {
    background: #ddf7ee;
    color: #29cc96;
    width: 64rpx;
    padding: 5rpx;
    font-weight: normal !important;
    font-size: 24rpx;
  }
  .d3 {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .btnd {
    font-size: 28rpx;
    border-radius: 12rpx;
    color: #fff;
    background: #29cc96;
    width: 145rpx;
    height: 48rpx;
    padding: 5rpx;
  }
  .d1wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10rpx;
  }
  .detailc1 {
    display: flex;
    justify-content: space-between;
  }
}
.fullw {
  width: 100%;
}
.zs1 {
  margin-top: 20rpx;
}
.zs {
  position: relative;
  border-radius: 32rpx;
  overflow: hidden;
  .ab {
    position: absolute;
    bottom: 0;
    color: #fff;
    font-size: 24rpx;
    background: rgba(0, 0, 0, 0.3);

    left: 0;
    padding: 10rpx;
    width: 100%;
  }
  .set {
    width: 100%;
  }
}
.false {
  width: 100%;
  margin-top: 10rpx;
}
.header7 {
  margin-top: 30rpx;
  display: flex;
  justify-content: space-between;
  span {
    color: #939599;
    margin-left: 10rpx;
  }
}
.tabchange {
  display: flex;
  font-size: 28rpx;
  color: #939599;
  border-bottom: 2px solid #fff;
  justify-content: space-between;
  flex-wrap: nowrap;
  overflow: scroll;
  align-items: center;
  .c1 {
    padding-bottom: 15rpx;
    width: 23%;
    flex-shrink: 0;
    box-sizing: border-box;
    text-align: center;
  }
  .activec {
    font-size: 32rpx !important;
    color: #000 !important;
    border-bottom: 2px solid #12a669 !important;
  }
}
.index90 {
  display: flex;
  flex-wrap: wrap;
  .index91 {
    width: 50%;
    display: flex;
    margin-bottom: 20rpx;
    .index92 {
      display: flex;
      flex-direction: column;
      font-size: 24rpx;
      margin-left: 20rpx;
      color: #939599;
      span {
        font-weight: bold;
        color: #000;
        font-size: 32rpx !important;
        margin-right: 4rpx;
      }
    }
  }
}
.header3 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .set {
    width: 48rpx;
  }
}
.pic {
  width: 100%;
}
.picdiv {
  position: relative;
  width: 100%;
  height: 280rpx;
  margin-top: 72rpx;
  .picab {
    position: absolute;
  }
}
.play {
  position: absolute;
}
.info2 {
  font-size: 28rpx;
  margin-top: 20rpx;
  .info3 {
    margin-bottom: 10rpx;
    color: #939599;
  }
  .info7 {
    display: flex;
    justify-content: space-between;
  }
  span {
    font-weight: bold;
    color: #626466;
    margin-left: 5rpx;
  }
}
.index1 {
  .header2 {
    border-left: 2px solid #29cc96;
    padding-left: 15rpx;
    font-size: 28rpx;
  }
  background: #ffffff;
  padding: 20rpx 32rpx;
  margin-bottom: 30rpx;
  border-radius: 32rpx;
  .con {
    flex-wrap: wrap;
    font-size: 28rpx;
    color: #626466;
    span {
      font-weight: bold;
      color: #000;
      font-size: 28rpx;
    }
    .clearb {
      margin-bottom: 0 !important;
    }
    display: flex;
    .c1 {
      width: 50%;
      margin-bottom: 20rpx;
    }
  }
  .header {
    font-size: 24rpx;
    padding-bottom: 20rpx;
    padding-top: 20rpx;
    border-bottom: 1px solid #f5f5f5;
  }
  .header2 {
    flex: 1;
    justify-content: left !important;
  }
  .h1 {
    background: #29cc96;
    color: #fff;
    border-radius: 10rpx;
    padding: 5rpx 10rpx;
    margin-right: 10rpx;
  }
}
.newscontent {
  .type4 {
    .title {
      border-left: 2px solid #f56262 !important;
    }
    span {
      color: #f56262 !important;
    }
  }
  .type3 {
    .title {
      border-left: 2px solid #3199f5 !important;
    }
    span {
      color: #3199f5 !important;
    }
  }
  .type2 {
    .title {
      border-left: 2px solid #626466 !important;
    }
    span {
      color: #626466 !important;
    }
  }
  .type1 {
    .title {
      border-left: 2px solid #939599 !important;
    }
    span {
      color: #939599 !important;
    }
  }
}
.panel {
  background: #fff;
  padding: 40rpx;
  margin: 25rpx;
  border-radius: 16rpx;
  .text {
    color: #626466;
  }
  .p1:nth-child(1) {
    color: #f56262;
  }
  .p1:nth-child(2) {
    color: #626466;
  }
  .p1:nth-child(3) {
    color: #3199f5;
  }
  .p1 {
    display: flex;
    flex: 1;
    flex-direction: column;
    font-size: 28rpx;
    align-items: center;
    justify-content: center;
    span {
      margin-bottom: 12rpx;
      font-size: 64rpx;
      font-weight: bold;
    }
  }
}
.contentclear3 {
  margin: 0 !important;
}
.w1active {
  .slide {
    background: #29cc96 !important;
  }
  .w3 {
    color: #fff !important;
    background: #29cc96 !important;
  }
}
.datewrap {
  background: #fff;
  border-top: 1px solid #f1f1f1;
  padding: 20rpx 0;
  .w1 {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .w3 {
    margin: 10rpx 0;
    background: #f5f5f5;
    color: #939599;
    width: 48rpx;
    height: 48rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: 50rpx;
  }
  .slide {
    width: 8rpx;
    height: 8rpx;
    background: #c4c7cc;
    border-radius: 100rpx;
  }
}
.wrapcommonfarm {
  margin: 45rpx 0;
}
.farmtab {
  background: #fff;
  display: flex;
  .c1 {
    color: #939599;
    font-size: 32rpx;
    border-bottom: 2px solid #fff;
    width: 50%;
    display: flex;
    justify-content: center;
    padding: 20rpx 0;
    margin: 0 30rpx;
  }
  .c1active {
    font-size: 36rpx !important;
    color: #313233 !important;
    border-bottom: 2px solid #12a669 !important;
  }
}
.content {
  margin: 32rpx;
  margin-bottom: 0 !important;
  .farmtitle {
    font-weight: bold;
    margin-bottom: 10rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .btnpic {
      width: 32rpx;
      margin-right: 16rpx;
      position: relative;
      top: 5rpx;
    }
  }
  .farmcontent {
    font-size: 24rpx;
    font-weight: bold;
  }
  .tip {
    font-size: 28rpx;
    color: #939599;
  }
  .content3 {
    margin: 40rpx 0 30rpx 0;
  }
  .input2 {
    display: flex;
  }
  .disablewrap {
    display: flex;
    padding: 12rpx 18rpx;
    justify-content: space-between;
    width: 100%;
  }
  .title {
    padding-left: 20rpx;
    border-left: 4rpx solid #29cc96;
    font-weight: bold;
    font-size: 32rpx;

    margin-bottom: 16rpx;
  }
  .form {
    color: #626466;
    font-size: 28rpx;
    .name {
      margin: 25rpx 0;
    }
    .input {
      background: #fafafa !important;
      border: none;
      border-radius: 16rpx;
    }
    .u-border {
      border: none;
    }
    .uni-input-input {
      color: #c4c7cc;
      font-weight: bold;
      border: none;
    }
  }
  .titlewrap {
    border-bottom: 1px solid #f5f5f5;
    margin-bottom: 20rpx;
    display: flex;
    justify-content: space-between;
    .date {
      color: #626466;
      font-size: 24rpx;
    }
    span {
      color: #626466;
    }
  }
}
</style>