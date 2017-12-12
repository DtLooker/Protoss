// pages/home/home.js

import {Home} from 'home-model.js';

var home = new Home();

Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    onLoad:function () {
        this._loadData();
    },

    _loadData:function () {
        var id = 1;
        //加载banner轮播图
        home.getBannerData(id, this.callBackBanner);

        //加载主题专题栏
        home.getThemeData(this.callBackTheme);

        //加载最近新品专题栏
        home.getProductsData(this.callBackProducts)
        
    },

    callBackBanner:function(res){
        //console.log(res);
        this.setData({
            'bannerArr':res
        });
    },


    callBackTheme:function(res){
        //console.log(res);
        this.setData({
            'themeArr':res
        })
    },

    callBackProducts:function(res){
        this.setData({
            'productsArr':res
        });
    },
    

    onProductsItemTap:function(event){      
        var id = home.getDataSet(event, 'id');
        //console.log(id);
        wx.navigateTo({

            url: '../product/product?id=' + id,
        })  
    },

    onThemesItemTap:function(event){
        var id = home.getDataSet(event, 'id');
        var name = home.getDataSet(event, 'name');
        wx.navigateTo({
            url: '../theme/theme?id=' + id + '&name=' +name,
        })
    }


})
