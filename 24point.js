var EisFill=new Array(0,0,0,0,0,0);
var OisFill=new Array(0,0,0);
function checksSol(a,n){
    if(n==1){
        if(a[0]==24){
            return 1;
        }
        return 0;
    }
    var i,j,k;
    for(i=0;i<n;i++){
        for(j=i+1;j<n;j++){
            var t1=a[i],t2=a[j],r=0;
            var b=new Array(4);
            for(k=0;k<n;k++){
                if((k != i) && (k != j)) b[r++] = a[k];
            }
            b[n-2] = t1+t2;
            if(checksSol(b,n-1)) return 1;
            b[n-2] = t1*t2;
            if(checksSol(b,n-1)) return 1;
            b[n-2] = t1-t2;
            if(checksSol(b,n-1)) return 1;
            b[n-2] = t2-t1;
            if(checksSol(b,n-1)) return 1;
            b[n-2] = t1/t2;
            if(checksSol(b,n-1)) return 1;
            b[n-2] = t2/t1;
            if(checksSol(b,n-1)) return 1;
        }
    }
    return 0;
}//判断24点是否有解
function iniclick(i) {
    var si=String(i);
    var btn=document.getElementById("ini"+si);
    btn.disabled=true;//每个数字仅可使用一次
    var count=1;
    while(EisFill[count-1]){count++;}//寻找最靠前的空位
    EisFill[count-1]=i;//存储这个位置的数字来自哪里
    var elebtn=document.getElementById("E"+String(count));
    elebtn.innerText=btn.innerText;
    elebtn.disabled=false;
}
function opclick(i){
    var btn=document.getElementById("op"+String(i));
    var count=1;
    while(OisFill[count-1]){count++;}
    OisFill[count-1]=i;
    var Obtn=document.getElementById("O"+String(count));
    Obtn.innerText=btn.innerText;
    Obtn.disabled=false;
}
function eleclick(i) {
    var si=String(i);
    var elebtn=document.getElementById("E"+si);
    elebtn.disabled=true;
    elebtn.innerText=null;
    if(EisFill[i-1]<10){
        var btn=document.getElementById("ini"+String(EisFill[i-1]));
    }
    else{
        var btn=document.getElementById("R"+String(EisFill[i-1]-10));
    }
    btn.disabled=false;
    EisFill[i-1]=0;
}
function Oclick(i){
    //todo
    var Obtn=document.getElementById("O"+String(i));
    Obtn.disabled=true;
    Obtn.innerText=null;
    OisFill[i-1]=0;
}
function eqclick(i){
    var res;
    btn_eq=document.getElementById("eq"+String(i));
    btn_e1=document.getElementById("E"+String(2*i-1));
    btn_e2=document.getElementById("E"+String(2*i));
    btn_o1=document.getElementById("O"+String(i));
    btn_r1=document.getElementById("R"+String(i));
    switch(btn_o1.innerText) {
        case "+":
        res=parseFloat(btn_e1.innerText)+parseFloat(btn_e2.innerText);
        break;
        case "-":
        res=parseFloat(btn_e1.innerText)-parseFloat(btn_e2.innerText);
        break;
        case "×":
        res=parseFloat(btn_e1.innerText)*parseFloat(btn_e2.innerText);
        break;
        case "÷":
        res=parseFloat(btn_e1.innerText)/parseFloat(btn_e2.innerText);
        break;
    }
    btn_r1.innerText=res;
    btn_r1.disabled=false;
    btn_e1.disabled=true;
    btn_e2.disabled=true;
    btn_o1.disabled=true;
    btn_eq.disabled=true;
    if(i==3){
        if(res==24){
            alert("Nice!Let's solve next problem.");
            location.reload();
        }
        else{
            alert("Sorry,answer is wrong!");
            reset();
        }
    }
}
function Rclick(i) {
    var btn=document.getElementById("R"+String(i));
    btn.disabled=true;//每个结果数字仅可使用一次
    var count=1;
    while(EisFill[count-1]){count++;}//寻找最靠前的空位
    EisFill[count-1]=10+i;//与初始数字区分
    var elebtn=document.getElementById("E"+String(count));
    elebtn.innerText=btn.innerText;
    elebtn.disabled=false;
}
var a = new Array(1,1,1,1);
while(!checksSol(a,4)){
    for (i=0;i<4;i++){
    a[i]=Math.floor(Math.random()*13+1);
    }
}//确保有解
function reset() {
    for(let i=1;i<=6;i++){
        var tmp=document.getElementById("E"+String(i));
        tmp.disabled=true;
        tmp.innerText=null;
        EisFill[i-1]=0;
    }
    for(let i=1;i<=3;i++){
        var tmp1=document.getElementById("O"+String(i)),
            tmp2=document.getElementById("R"+String(i)),
            tmp3=document.getElementById("eq"+String(i));
        tmp1.disabled=true;
        tmp1.innerText=null;
        tmp2.disabled=true;
        tmp2.innerText=null;
        tmp3.disabled=false;
        OisFill[i-1]=0;
    }
    for(let i=1;i<=4;i++){
        var tmp=document.getElementById("ini"+String(i));
        tmp.disabled=false;
    }

}
var ini1=document.getElementById("ini1");
ini1.innerText=a[0];
var ini2=document.getElementById("ini2");
ini2.innerText=a[1];
var ini3=document.getElementById("ini3");
ini3.innerText=a[2];
var ini4=document.getElementById("ini4");
ini4.innerText=a[3];
