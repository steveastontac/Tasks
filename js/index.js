//GLOBAL
var db=openDatabase('taskdetails','1.0',"Task DB",2*1024*1024);

//TRIGGERS
document.getElementById("b1").addEventListener("click",f1);
window.onload=loadapp();

//FUNCTIONS
function f1()
{
   var resp=window.prompt("Enter task");
 
    len=resp.length;
    if(len != 0)
    {
      var ta1=document.getElementById("t1");
      var r=ta1.insertRow(-1);
		var n=$('#t1 tr').length;
        r.id='rc'+n;
      var c1=r.insertCell(0);
      var c2=r.insertCell(1);
      c1.innerHTML=resp;
    var col1id='cc'+n;
	c1.id=col1id;
      var btn = document.createElement('input');
      btn.type="checkbox";
      btn.setAttribute("name","checkbox");
      var cbxid='c'+n;
      btn.setAttribute("id",cbxid);
        onclickval='f2("'+cbxid+'")';
      btn.setAttribute("onclick",onclickval);
        c2.appendChild(btn);
       jqcbxid="#"+cbxid;
        var a=document.getElementById(col1id).innerHTML;
        var b=$(jqcbxid).is(':checked');
        db.transaction
        (
            function(tx)
            {
                tx.executeSql('create table if not exists taskdetails( task , ch )');
                tx.executeSql('insert into taskdetails values (?,?)',[a,b]);
            }
        );
    }
        
}


function f2(id)
{
    cbid="#"+id;
    c1id="c"+id;
    tsk=document.getElementById(c1id).innerHTML;
    stts=$(cbid).is(':checked');
    db.transaction
    (
        function(tx)
        {
            tx.executeSql('update taskdetails set ch=? where task=?',[stts,tsk]);
        }
    );
}


function loadapp()
{   
    db.transaction
    (

        function(tx)
        {
            tx.executeSql
            (
            'select * from taskdetails',[],
            function(tx,rs)
            {
                for(var i=0;i<rs.rows.length;i++)
                {
                    var cur_row=rs.rows.item(i);
                    
                    var task=cur_row['task'];
                    var ch=cur_row['ch'];
    var ta1=document.getElementById("t1");
      var r=ta1.insertRow(-1);
		var n = $('#t1 tr').length;
        r.id='rc'+n;
      var c1=r.insertCell(0);
      var c2=r.insertCell(1);
      c1.innerHTML=task;
    var col1id='cc'+n;
	c1.id=col1id;
      var btn = document.createElement('input');
      btn.type="checkbox";
      btn.setAttribute("name","checkbox");
      var cbxid='c'+n;
      btn.setAttribute("id",cbxid);
        onclickval='f2("'+cbxid+'")';
      btn.setAttribute("onclick",onclickval);
    if(ch=="true")
     btn.setAttribute('checked',ch);
    else
     btn.setAttribute('unchecked',ch);
                    
    c2.appendChild(btn);
                    
                }
            }
            );
        }
    );
}