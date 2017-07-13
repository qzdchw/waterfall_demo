window.onload=function () {
	waterfall('main','box');
	var json8={'data':[{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'},{'src':'5.jpg'},{'src':'6.jpg'},
	{'src':'7.jpg'},{'src':'8.jpg'},{'src':'9.jpg'},{'src':'10.jpg'},{'src':'11.jpg'},{'src':'12.jpg'},{'src':'13.jpg'},
	{'src':'14.jpg'},{'src':'15.jpg'},{'src':'16.jpg'},{'src':'17.jpg'},{'src':'18.jpg'}]};
	window.onscroll=function(){
		if(checkscroll()){
            var oParent = document.getElementById('main');// 父级对象
            for(var i=0;i<json8.data.length;i++){
                var oBox=document.createElement('div'); //添加 元素节点
                oBox.className='box';                   //添加 类名 name属性
                oParent.appendChild(oBox);              //添加 子节点
                var opic=document.createElement('div');
                opic.className='pic';
                oBox.appendChild(opic);
                var oImg=document.createElement('img');
                oImg.src='./images/'+json8.data[i].src;
                opic.appendChild(oImg);
            }
            waterfall('main','box');
        };
    }
}
window.onresize=function(){    
    waterfall('main','box');
}
function waterfall(parent,box){
    var oParent=document.getElementById(parent);// 父级对象
    var aboxs=getClassObj(oParent,box);// 获取存储块框box的数组abox
    var oboxw=aboxs[0].offsetWidth;
    var cols=Math.floor(document.documentElement.clientWidth/oboxw);
    oParent.style.cssText='width:'+oboxw*cols+'px;margin:0 auto;';
    console.log(cols);
    var harr=[];
    for (var i=0;i<aboxs.length;i++) {
    	if(i<cols){
    		harr.push(aboxs[i].offsetHeight);
            aboxs[i].style.position='static';
    	}
    	else{
    		var minh=Math.min.apply(null,harr);
    		var index=getminhindex(harr,minh);
    		aboxs[i].style.position='absolute';
    		aboxs[i].style.top=minh+'px';
    		aboxs[i].style.left=oboxw*index+'px';
    		harr[index]+=aboxs[i].offsetHeight;
    	}  
    }

}
function getClassObj(parent,className){
    var obj=parent.getElementsByTagName('*');//获取 父级的所有子集
    var boxS=[];//创建一个数组 用于收集子元素
    for (var i=0;i<obj.length;i++) {//遍历子元素、判断类别、存入数组
        if (obj[i].className==className){
            boxS.push(obj[i]);
        }
    };
    return boxS;
}
function getminhindex(arr,val){
	for(var i in arr){
		if(arr[i]==val){return i;}
	}
}
function checkscroll(){
	var oParent=document.getElementById('main');
	var oboxs=getClassObj(oParent,'box');
	var lastboxh=oboxs[oboxs.length-1].offsetTop+Math.floor(oboxs[oboxs.length-1].offsetHeight/2);
	var scrolltop=document.body.scrollTop||document.documentElement.scrollTop;
    var documentH=document.documentElement.clientHeight;
	return (lastboxh<scrolltop+documentH)?true:false
}