var vm2=new Vue({
    el:".container",
    data:{
        addressList:[],
        moreNum:3,
        currentIndex:0,

    },
    filters:{

    },
    computed:{
        filterAddressList:function(){
            return this.addressList.slice(0,this.moreNum);//区分slice和splice，前者不修改原生数组，后者直接修改原生数组
        }
    },
    mounted:function(){//函数
        this.$nextTick(function(){
            vm2.addressView();
        })   
    },
    methods:{
        addressView:function(){
            var _this = this;
			this.$http.get('data/address.json',{'id':123}).then(function(res){
				_this.addressList = res.data.result;
			});
        },
        showmore:function(){
            this.moreNum=this.addressList.length;
        },
        setDefault:function(addressId){
            this.addressList.forEach(function(address,index) {
                if(address.addressId==address){
                    address.isDefault=true;
                }else{
                    address.isDefault=false;
                }
            });
        }
    }
});