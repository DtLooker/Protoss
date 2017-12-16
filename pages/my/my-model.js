
import {Base} from '../../utils/base.js';

class My extends Base{
    constructor(){
        super();
    }

    //得到用户微信信息
    getUserInfo(cb) {

        var that = this;
        wx.login({
            success: function(){

                wx.getUserInfo({
                    //用户同意授权
                    success:function(res){
                        typeof cb == "function" && cb(res.userInfo);
                    },
                    //用户拒绝授权，给默认的头像和nickName
                    fail: function(res){
                        typeof cb == "function" && cb({
                            avatarUrl: '../../imgs/icon/user@default.png',
                            nickName: '零食小贩'
                        });
                    }
                })
            }
        })
    }
}

export {My}