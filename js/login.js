window.onload = function(){
    document.getElementById("form").onsubmit = function(){
        return checkUsername() && checkPassword();
    };
    document.getElementById("username").onblur = checkUsername;
    document.getElementById("password").onblur = checkPassword;
};

function checkUsername(){
    var username = document.getElementById("username").value;
    var reg_username = /^\w{6,12}$/;
    var flag = reg_username.test(username);
    var s_username = document.getElementById("s_username");
    if(flag){
        s_username.innerHTML = "<img width='35' height='25' src='../picture/yes.png'/>";
    }else{
        s_username.innerHTML = "用户名格式有误";
    }
    return flag;
}

function checkPassword(){
    var password = document.getElementById("password").value;
    var reg_password = /^\w{6,12}$/;
    var flag = reg_password.test(password);
    var s_password = document.getElementById("s_password");
    if(flag){
        s_password.innerHTML = "<img width='35' height='25' src='../picture/yes.png'/>";
    }else{
        s_password.innerHTML = "密码格式有误";
    }
    return flag;
}


function gotoregister(){
    document.getElementById("register").style="padding: 7%;display: block;";
    document.getElementById("login").style="padding: 7%;display: none;";
}
function gotologin(){
    document.getElementById("register").style="padding: 7%;display: none;";
    document.getElementById("login").style="padding: 7%;display: block;";
}
function gotoindex(){
    window.location.href='../index.html';
}



function insert(){   
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var email = document.getElementById("email").value;
    var truename = document.getElementById("name").value;
    var telephone = document.getElementById("tel").value;
    var sex=1;  
    if(document.getElementById("male").checked==true){sex=1;}
    else if(document.getElementById("female").checked==true){sex=2;}

    // const newLocal = new ActiveXObject("ADODB.Connection");
    // var conn = newLocal; 
    // var strdsn = "Driver={SQL Server};SERVER=LAPTOP-FFV820DR;UID=fasheng;PWD=123456;DATABASE=发生";
    // try {
    //     conn.Open(strdsn);
    // }
    // catch (e) {
    //     alert(e.message);
    // } 
    // var sql = "insert into user_information values("+username+","+password+","+email+","+truename+","+telephone+","+sex+")"; 
    // try {
    //     conn.execute(sql);
    //     alert("successfully inserted !");
    // }
    // catch (e) {
    //     alert(e.description);
    // }
    // sql.close();
    // conn.close();

    var objdbConn = new ActiveXObject("ADODB.Connection");    
var strdsn = "Driver={SQL Server};SERVER=LAPTOP-FFV820DR;UID=fasheng;PWD=123456;DATABASE=发生";      // 需要修改自己的服务器地址,用户名,密码  
objdbConn.Open(strdsn);       
var objrs = objdbConn.Execute("SELECT * FROM user_information");                  // 输入本地的表  
var fdCount = objrs.Fields.Count - 1;           
if (!objrs.EOF){                                 
  document.write("<table border=1><tr>");     
  for (var i=0; i <= fdCount; i++)                  
      document.write("<td><b>" + objrs.Fields(i).Name + "</b></td>");  
  document.write("</tr>");  
  
  while (!objrs.EOF){                     
    document.write("<tr>");               
    for (i=0; i <= fdCount; i++)  
       document.write("<td valign='top'>" + objrs.Fields(i).Value + "</td>");  
    document.write("</tr>");  
    objrs.moveNext();                   
  }  
  document.write("</table>");   
}  
else   
  document.write("数据库内没有记录!<br>");  
objrs.Close();                           
objdbConn.Close();
}


function res(){ 
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var email = document.getElementById("email").value;
    var truename = document.getElementById("name").value;
    var telephone = document.getElementById("tel").value;
    var sex=1;  
    if(document.getElementById("male").checked==true){sex=1;}
    else if(document.getElementById("female").checked==true){sex=2;} 

    var objdbConn = new ActiveXObject("ADODB.Connection");//DSN字符串

    var strdsn = "Driver={SQL Server};SERVER=127.0.0.1;UID=fasheng;PWD=123456;DATABASE=发生";//打开数据源
    
    objdbConn.Open(strdsn);//执行SQL的数据库查询
    
    var objrs = objdbConn.Execute("SELECT username FROM user_information");//获取字段数目
    
    var fdCount = objrs.Fields.Count - 1;//检查是否有记录
    
    var strCount="start";//将所有读取的结果连接为一个长字符串并以空格分隔
    
    document.write(" ");
    
    document.write("读取的结果如下：");
    
    document.write(" ");
    if (!objrs.EOF){//显示数据库内容
    
    while (!objrs.EOF){//显示每笔记录的字段
    
    for (i=0; i <= fdCount; i++){
        
    var str=objrs.Fields(i).Value;
    
    document.write(str+ " ");
    
    strCount=strCount.concat(" ",str);
    
    }
    
    objrs.moveNext();//移到下一笔记录
    
    }
    
    }
    
    document.getElementById("demo").innerHTML =strCount;
    
    objrs.Close();//关闭记录集合
    
    objdbConn.Close(); //关闭数据库链接
}