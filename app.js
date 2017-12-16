
import {Token} from 'utils/token.js';

App({

    //小程序初始化的时候调用此方法
    onLaunch:function(){
        var token = new Token();
        token.verify();
    }
    
});