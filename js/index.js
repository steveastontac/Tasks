var db=openDatabase('taskdetails','1.0',"Task DB",2*1024*1024);
document.getElementById("b1").addEventListener("click",f1);

function f1()
{
   var resp=window.prompt("Enter task");
 
    len=resp.length;
    if(len != 0)
    {
      var ta1=document.getElementById("t1");
      var r=ta1.insertRow(-1);
		var n=$('#t1 tr').length;
        r.id='r'+n;
      var c1=r.insertCell(0);
      var c2=r.insertCell(1);
      c1.innerHTML=resp;
	c1.id='c1'+n;
      var btn = document.createElement('input');
      btn.type="checkbox";
      btn.setAttribute("name","checkbox");
      c2.id='c2'+n;
      c2.appendChild(btn);
		
		var a=document.getElementById()
    }
        
}




