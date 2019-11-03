// pages/map/map.js
var markers= []
// 引入SDK核心类
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');

// 实例化API核心类
var qqmapsdk = new QQMapWX({
  key: '2R3BZ-YMUKX-SKG4E-7FOP4-AX242-ALFPG' // 必填
});

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    gridCol: 4,
    skin: false,


    longitude: 113.324520,  //经度
    latitude: 23.099994, //纬度
    windowHeight: 0,  //页面总高度将会放在这里
    mapHeight: 0,  //map的高度
    scrollViewHeight: 0, //scroll-view的高度
    customBar:0,


    addListShow: false,
    chooseCity: false,
    regionShow: {
      province: false,
      city: false,
      district: true
    },
    regionData: {},
    currentRegion: {
      province: '选择城市',
      city: '选择城市',
      district: '选择城市',
    },
    currentProvince: '选择城市',
    currentCity: '选择城市',
    currentDistrict: '选择城市',
    latitude: '',
    longitude: '',
    centerData: {},
    nearList: [],
    suggestion: [],
    selectedId: 0,
    keyword: '',
    item_list:[]


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      // url: 'http://106.54.103.171/test.php',
      url: 'https://hao2hen.com/test.php',
      method: 'GET',
      header: { 'Content-Type': 'application/json' },
      data: {},
      success: function (res) {
        // success
        console.log(res.data);//打印请求返回的结果
        that.setData({ item_list: res.data })
        for(var i = 0; i < res.data.length; i++)
        {
          markers = markers.concat({
            iconPath: "../../images/trash.png",
            id: parseInt(res.data[i].id),
            callout: {
              content: res.data[i].id,
              fontSize: '20',
              padding: true,
              color: '#444',
              display: 'ALWAYS',
              textAlign: 'center',
              borderRadius: 15
            },
            latitude: parseFloat(res.data[i].latitude),
            longitude: parseFloat(res.data[i].longitude),
            width: 30,
            height: 30
          })
        }
        console.log(markers)
        that.setData({
          markers: markers
        })
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })

    //先取出页面高度 windowHeight
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight
        });
      }
    });

    //然后取出map的高度
    //根据文档，先创建一个SelectorQuery对象实例
    let query = wx.createSelectorQuery().in(this);
    //然后逐个取出map和topbar的节点信息
    //选择器的语法与jQuery语法相同
    query.select('#customBar').boundingClientRect();
    query.select('#top').boundingClientRect();
    query.select('#map').boundingClientRect();
    // query.select('#cu-bar').boundingClientRect();

    // 执行上面所指定的请求，结果会按照顺序存放于一个数组中，在callback的第一个参数中返回
    query.exec((res) => {
      // console.log(res)
      // 分别取出map和topbar的高度
      let customBar = res[0].height
      let topHeight = res[1].height;
      let mapHeight = res[2].height;
      // let barHeight = res[3].height;

      // 然后就是做个减法
      let scrollViewHeight = this.data.windowHeight - topHeight - mapHeight - customBar;
      // let scrollViewHeight = this.data.windowHeight - topHeight - mapHeight - barHeight - customBar;

      // 算出来之后存到data对象里面
      this.setData({
        scrollViewHeight: scrollViewHeight,
        customBar: customBar
      });
    });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    let self = this;
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: '2R3BZ-YMUKX-SKG4E-7FOP4-AX242-ALFPG'
    });
    //定位
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        //地址解析
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success: function (res) {
            console.log(res)
            self.setData({
              latitude: res.result.location.lat,
              longitude: res.result.location.lng,
              currentRegion: res.result.address_component
            })
            // 调用接口
            // self.nearby_search();
          },
        });
      }
    })


    var that = this
    wx.request({
      // url: 'http://106.54.103.171/test.php',
      url: 'https://hao2hen.com/test.php',
      method: 'GET',
      header: { 'Content-Type': 'application/json' },
      data: {},
      success: function (res) {
        // success
        that.setData({ item_list: res.data })
        for (var i = 0; i < res.data.length; i++) {
          markers = markers.concat({
            iconPath: "/images/trash.png",
            id: parseInt(res.data[i].id),
            callout: {
              content: res.data[i].id,
              fontSize: '20',
              padding: true,
              color: '#444',
              display: 'ALWAYS',
              textAlign: 'center',
              borderRadius: 15
            },
            latitude: parseFloat(res.data[i].latitude),
            longitude: parseFloat(res.data[i].longitude),
            width: 30,
            height: 30
          })
        }
        // console.log(markers)
        that.setData({
          markers: markers
        })
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  isCard(e) {
    this.setData({
      isCard: e.detail.value
    })
  },
  //数据回填方法
  backfill: function (e) {
    var id = e.currentTarget.id;
    for (var i = 0; i < this.data.suggestion.length; i++) {
      if (i == id) {
        this.setData({
          backfill: this.data.suggestion[i].title
        });
      }
    }
  },

  //触发关键词输入提示事件
  getsuggest: function (e) {
    var _this = this;
    //调用关键词提示接口
    qqmapsdk.getSuggestion({
      //获取输入框值并设置keyword参数
      keyword: e.detail.value, //用户输入的关键词，可设置固定值,如keyword:'KFC'
      //region:'北京', //设置城市名，限制关键词所示的地域范围，非必填参数
      success: function (res) {//搜索成功后的回调
        console.log(res);
        var sug = [];
        for (var i = 0; i < res.data.length; i++) {
          sug.push({ // 获取返回结果，放到sug数组中
            title: res.data[i].title,
            id: res.data[i].id,
            addr: res.data[i].address,
            city: res.data[i].city,
            district: res.data[i].district,
            latitude: res.data[i].location.lat,
            longitude: res.data[i].location.lng
          });
        }
        _this.setData({ //设置suggestion属性，将关键词搜索结果以列表形式展示
          suggestion: sug
        });
      },
      fail: function (error) {
        console.error(error);
      },
      complete: function (res) {
        console.log(res);
      }
    });
  },

  //点击选择搜索结果
  backfill: function (e) {
    var id = e.currentTarget.id;
    let name = e.currentTarget.dataset.name;
    for (var i = 0; i < this.data.suggestion.length; i++) {
      if (i == id) {
        //console.log(this.data.suggestion[i])
        this.setData({
          centerData: this.data.suggestion[i],
          addListShow: false,
          latitude: this.data.suggestion[i].latitude,
          longitude: this.data.suggestion[i].longitude
        });
        this.nearby_search();
        return;
        //console.log(this.data.centerData)
      }
    }
  },
  //显示搜索列表
  showAddList: function () {
    this.setData({
      addListShow: true
    })
  },
  // 根据关键词搜索附近位置
  nearby_search: function () {
    var self = this;
    wx.hideLoading();
    // 调用接口
    qqmapsdk.search({
      keyword: self.data.keyword,  //搜索关键词
      //boundary: 'nearby(' + self.data.latitude + ', ' + self.data.longitude + ', 1000, 16)',
      location: self.data.latitude + ',' + self.data.longitude,
      page_size: 20,
      page_index: 1,
      success: function (res) { //搜索成功后的回调
        //console.log(res.data)
        var sug = [];
        for (var i = 0; i < res.data.length; i++) {
          sug.push({ // 获取返回结果，放到sug数组中
            title: res.data[i].title,
            id: res.data[i].id,
            addr: res.data[i].address,
            province: res.data[i].ad_info.province,
            city: res.data[i].ad_info.city,
            district: res.data[i].ad_info.district,
            latitude: res.data[i].location.lat,
            longitude: res.data[i].location.lng
          });
        }
        self.setData({
          selectedId: 0,
          centerData: sug[0],
          nearList: sug,
          suggestion: sug
        })
        self.addMarker(sug[0]);
      },
      fail: function (res) {
        //console.log(res);
      },
      complete: function (res) {
        //console.log(res);
      }
    });
  },
  //整理目前选择省市区的省市区列表
  getRegionData: function () {
    let self = this;
    //调用获取城市列表接口
    qqmapsdk.getCityList({
      success: function (res) {//成功后的回调
        //console.log(res)
        let provinceArr = res.result[0];
        let cityArr = [];
        let districtArr = [];
        for (var i = 0; i < provinceArr.length; i++) {
          var name = provinceArr[i].fullname;
          if (self.data.currentRegion.province == name) {
            if (name == '北京市' || name == '天津市' || name == '上海市' || name == '重庆市') {
              cityArr.push(provinceArr[i])
            } else {
              qqmapsdk.getDistrictByCityId({
                // 传入对应省份ID获得城市数据，传入城市ID获得区县数据,依次类推
                id: provinceArr[i].id,
                success: function (res) {//成功后的回调
                  //console.log(res);
                  cityArr = res.result[0];
                  self.setData({
                    regionData: {
                      province: provinceArr,
                      city: cityArr,
                      district: districtArr
                    }
                  })
                },
                fail: function (error) {
                  //console.error(error);
                },
                complete: function (res) {
                  //console.log(res);
                }
              });
            }
          }
        }
        for (var i = 0; i < res.result[1].length; i++) {
          var name = res.result[1][i].fullname;
          if (self.data.currentRegion.city == name) {
            qqmapsdk.getDistrictByCityId({
              // 传入对应省份ID获得城市数据，传入城市ID获得区县数据,依次类推
              id: res.result[1][i].id,
              success: function (res) {//成功后的回调
                //console.log(res);
                districtArr = res.result[0];
                self.setData({
                  regionData: {
                    province: provinceArr,
                    city: cityArr,
                    district: districtArr
                  }
                })
              },
              fail: function (error) {
                //console.error(error);
              },
              complete: function (res) {
                //console.log(res);
              }
            });
          }
        }
      },
      fail: function (error) {
        //console.error(error);
      },
      complete: function (res) {
        //console.log(res);
      }
    });
  },
  //打开选择省市区页面
  chooseCity: function () {
    let self = this;
    self.getRegionData();
    self.setData({
      chooseCity: true,
      regionShow: {
        province: false,
        city: false,
        district: true
      },
      currentProvince: self.data.currentRegion.province,
      currentCity: self.data.currentRegion.city,
      currentDistrict: self.data.currentRegion.district,
    })
  },
  //选择省
  showProvince: function () {
    this.setData({
      regionShow: {
        province: true,
        city: false,
        district: false
      }
    })
  },
  //选择城市
  showCity: function () {
    this.setData({
      regionShow: {
        province: false,
        city: true,
        district: false
      }
    })
  },
  //选择地区
  showDistrict: function () {
    this.setData({
      regionShow: {
        province: false,
        city: false,
        district: true
      }
    })
  },
  //选择省之后操作
  selectProvince: function (e) {
    //console.log(e)
    let self = this;
    let id = e.currentTarget.dataset.id;
    let name = e.currentTarget.dataset.name;
    self.setData({
      currentProvince: name,
      currentCity: '请选择城市',
    })
    if (name == '北京市' || name == '天津市' || name == '上海市' || name == '重庆市') {
      var provinceArr = self.data.regionData.province;
      var cityArr = [];
      for (var i = 0; i < provinceArr.length; i++) {
        if (provinceArr[i].fullname == name) {
          cityArr.push(provinceArr[i])
          self.setData({
            regionData: {
              province: self.data.regionData.province,
              city: cityArr,
              district: self.data.regionData.district
            }
          })
          self.showCity();
          return;
        }
      }
    } else {
      let bj = self.data.regionShow;
      self.getById(id, name, bj)
    }
  },
  //选择城市之后操作
  selectCity: function (e) {
    let self = this;
    let id = e.currentTarget.dataset.id;
    let name = e.currentTarget.dataset.name;
    self.setData({
      currentCity: name,
      currentDistrict: '请选择城市',
    })
    let bj = self.data.regionShow;
    self.getById(id, name, bj)
  },
  //选择区县之后操作
  selectDistrict: function (e) {
    let self = this;
    let id = e.currentTarget.dataset.id;
    let name = e.currentTarget.dataset.name;
    let latitude = e.currentTarget.dataset.latitude;
    let longitude = e.currentTarget.dataset.longitude;
    self.setData({
      currentDistrict: name,
      latitude: latitude,
      longitude: longitude,
      currentRegion: {
        province: self.data.currentProvince,
        city: self.data.currentCity,
        district: name
      },
      chooseCity: false,
      keyword: self.data.defaultKeyword
    })
    self.nearby_search();
  },
  //根据选择省市加载市区列表
  getById: function (id, name, bj) {
    let self = this;
    qqmapsdk.getDistrictByCityId({
      // 传入对应省份ID获得城市数据，传入城市ID获得区县数据,依次类推
      id: id, //对应接口getCityList返回数据的Id，如：北京是'110000'
      success: function (res) {//成功后的回调
        //console.log(res);
        if (bj.province) {
          self.setData({
            regionData: {
              province: self.data.regionData.province,
              city: res.result[0],
              district: self.data.regionData.district
            }
          })
          self.showCity();
        } else if (bj.city) {
          self.setData({
            regionData: {
              province: self.data.regionData.province,
              city: self.data.regionData.city,
              district: res.result[0]
            }
          })
          self.showDistrict();
        } else {
          self.setData({
            chooseCity: false,
          })
        }
      },
      fail: function (error) {
        //console.error(error);
      },
      complete: function (res) {
        //console.log(res);
      }
    });
  },
  //返回上一页或关闭搜索页面
  back1: function () {
    if (this.data.addListShow) {
      this.setData({
        addListShow: false
      })
    } else {
      wx.navigateBack({
        delta: 1
      })
    }
  },
  //关闭选择省市区页面
  back2: function () {
    this.setData({
      chooseCity: false
    })
  },
  //确认选择地址
  selectedOk: function () {
    let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
    let prevPage = pages[pages.length - 2];
    //console.log(this.data.centerData)
    prevPage.setData({
      storeAddress: this.data.centerData.title
    })
    wx.navigateBack({
      delta: 1
    })
  }
})