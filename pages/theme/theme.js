// pages/theme/theme.js

import { Theme } from 'theme-model.js';
var theme = new Theme();

Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var id = options.id;
        var name = options.name;
        this.data.id = id;
        this.data.name = name;
        this._loadData();
    },

    onReady:function(options){
        wx.setNavigationBarTitle({
            title: this.data.name,
        })
    },

    _loadData: function () {
        theme.getProductsData(this.data.id, this.
        callbackTheme)
    },

    callbackTheme:function(res){
        this.setData({
            themeInfo:res
        });
    }
})