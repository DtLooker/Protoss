// pages/product/product.js
import { Product } from 'product-model.js';

var product = new Product();

Page({

    /**
     * 页面的初始数据
     */
    //data下面数据都将自动绑定，不需要setData
    data: {
        id: null,
        countsArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        productCount: 1,
        productsDetail:['商品详情', '产品参数', '售后保障'],
        currentTabsIndex: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var id = options.id;
        this.data.id = id;
        this._loadData();
    },

    _loadData: function () {
        product.getDetailInfo(this.data.id, this.callbackProduct);
    },

    callbackProduct: function (res) {
        this.setData({
            product: res
        });
    },
    
    bindPickerChange:function(event){
        var index = event.detail.value;
        var selectedCount = this.data.countsArray[index];
        this.setData({
            productCount : selectedCount
        });
    },

    onTabsItemTap:function(event){
        var index = product.getDataSet(event, 'index');
        this.setData({
            currentTabsIndex : index
        });
    }
})
