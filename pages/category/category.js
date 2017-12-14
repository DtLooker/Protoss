// pages/category/category.js

import {Category} from 'category-model.js';

var category = new Category();

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
    this._loadData();
  },

  _loadData: function () {
    category.getCategoryType(this.callbackCategory);
  },

  callbackCategory:function(res){
        this.setData({
            categoryTypeArr: res
        });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

})