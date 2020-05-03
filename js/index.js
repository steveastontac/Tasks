//GLOBAL
var db=openDatabase('taskdetail','1.0',"Task DB",4*1024*1024);
var totime=0;
var timo=-1;
var gaptodisp=0;
var totasks=0;
localStorage.setItem("totasks",1);
//TRIGGERS
document.getElementById("b1").addEventListener("click",f1);
window.onload=loadapp();

//FUNCTIONS
function getasknos()
{
    db.transaction(
    function(tx)
        {
            tx.executeSql
            (
            'select * from taskdetails',[],
            function(tx,rs)
            {
               totasks=Number(rs.rows.length)+1;
                localStorage.setItem("totasks",totasks);
            }
            );
        }
        );
}
function f1()
{
   var resp=window.prompt("Enter task");
    len=resp.length;
    if(len != 0)
    {
      var ta1=document.getElementById("t1");
      var r=ta1.insertRow(-1);
		var n=Number(localStorage.getItem("totasks"));
        r.id='rc'+n;
        var c1=r.insertCell(0);
        var c2=r.insertCell(1);
	    var c3=r.insertCell(2);
		var ids="sc"+n;
		var buton=document.createElement("input");
		buton.type="button";
		buton.setAttribute("id",ids);
		var startnow="startnow('"+ids+"')";
		buton.setAttribute("onclick",startnow);
		buton.setAttribute("value","start");
		c3.appendChild(buton);
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
        var d = new Date();
		//starttime is the number of minutes elapsed since the start of this month 
		//tasks musnt cross months for now 
		var starttime =d.getTime(); 
//			(Number(d.getDate())*24*60)+(Number(d.getHours())*60)+Number(d.getMinutes());
//		
		db.transaction
        (
            function(tx)
            {
                tx.executeSql('create table if not exists taskdetails ( task , ch , tym , comp )');
                tx.executeSql('insert into taskdetails ( task , ch , tym ) values (?,?,?)',[a,b,starttime]);
            }
        );
    }
    
    localStorage.setItem("totasks",n+1);
        
}

//function notetime(id)
//{
//	setInterval(1000);
//	
//	if($(id).is(':checked')=="false");
//	var rodi=id[2];
//	db.transaction
//	(
//		function(tx)
//		{
//			tx.executeSql("update taskdetails set tym=tym+1 where rowid=? ",[rodi]);
//		}
//	);
//}

//function showtimer()
//{
//	
//}

function f2(id)
{

    var idn=id.length;
	var sqrid=id.slice(1,idn);
    var cbid="#"+id;
    var c1id="c"+id;
    var d = new Date();
	
	var stts=$(cbid).is(':checked');
    db.transaction
    (
        function(tx)
        {
            tx.executeSql('update taskdetails set ch=? where rowid=?',[stts,sqrid]);
			tx.executeSql('update taskdetails set tym=?-tym , comp=? where rowid=?',[d.getTime(),d.getTime(),sqrid]);
        }
    );
	var btn = document.getElementById(id);
	if( stts == "true" )
		btn.setAttribute('checked',stts);
	else
		btn.setAttribute('unchecked',stts);
}


function loadapp()
{   
	gaptodisp=Number(localStorage.getItem("gapt"));
   getasknos(); document.getElementById("comptasks").style.display='none';
	document.getElementById("disptimer").style.display='none';
	document.getElementById("menui").style.display='none';
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
                    var d=new Date();
                    var rd=i+1;
                    var cur_row=rs.rows.item(i);
                    var task=cur_row['task'];
                    var ch=cur_row['ch'];
                    var at=new Date(cur_row['comp']);
                    if(!(at.getTime()==0))
                    {
                    var tym= - at.getTime() + d.getTime();
                    var gap = Math.floor(tym/(1000*60*60*24));
                    }
                    else 
                    {
                        gap = -1;
                    }
//                    alert(gap);
                 if((gap>gaptodisp)&&(ch=="true"))
                     {continue;}
    var ta1=document.getElementById("t1");
      var r=ta1.insertRow(-1);

        r.id='rc'+rd;
      var c1=r.insertCell(0);
      var c2=r.insertCell(1);
	  var c3=r.insertCell(2);
	var ids="sc"+rd;
		var buton=document.createElement("input");
		buton.type="button";
		buton.setAttribute("id",ids);
		var startnow="startnow('"+ids+"')";
		buton.setAttribute("onclick",startnow);
		buton.setAttribute("value","start");
		c3.appendChild(buton);
      c1.innerHTML=task;
    var col1id='cc'+rd;
	c1.id=col1id;
      var btn = document.createElement('input');
      btn.type="checkbox";
      btn.setAttribute("name","checkbox");
      var cbxid='c'+rd;
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

function startnow(id)
{
    var idn=id.length;
	var sqrid=id.slice(2,idn);
	var d=new Date();
	db.transaction
	(
		function(tx)
		{
			tx.executeSql("select task,ch,tym from taskdetails",[],function(tx,rs)
						 {
				var row1=rs.rows.item(sqrid-1);
			 
			if(row1['ch']=="false")
		{
			tx.executeSql("update taskdetails set tym=? where rowid=?",[d.getTime(),id[2]]);
		}
		});
		});
}

function showmenu()
{
	$("#t2 tr").remove(); 
		$("#t3 tr").remove(); 
//	document.getElementById("comptasks").style.display='none';
//	document.getElementById("d1").style.display='block';
	closecomp();
	closeincomp();

	if(!$("#menui").is(":visible"))
{		document.getElementById("menui").style.display='block';
}
	else
{		document.getElementById("menui").style.display='none';
}
}

function showcomp()
{
document.getElementById("d1").style.display='none';	
document.getElementById("menui").style.display='none';
document.getElementById("comptasks").style.display='block';
	db.transaction(
		
	function(tx)
	{
	 tx.executeSql
            (
            'select task,tym,ch from taskdetails',[],
            function(tx,rs)
            {
                for(var i=0;i<rs.rows.length;i++)
                {
                    var cur_row=rs.rows.item(i);
                    
                    var task=cur_row['task'];
                    var ch=cur_row['ch'];
					var tym=cur_row['tym'];
    				var ta2=document.getElementById("t2");
//					alert(ch);
					if(ch=="true")
					{
						 var rowo=ta2.insertRow(-1);
		var nl = $('#t2 tr').length;
//						alert(nl);
        rowo.id='r2cc';
      var cb=rowo.insertCell(0);
	  var ff=rowo.insertCell(1);
//      var ca=rowo.insertCell(2);
      cb.innerHTML=task;
//	alert(c21.innerHTML);
    var col1id='c2cc';
	cb.id=col1id;
//      var btnt = document.createElement('input');
//      btnt.type="checkbox";
//      btnt.setAttribute("name","checkboxc");
      var cbxidt='c2bc';
//      btnt.setAttribute("id",cbxidt);
//	btnt.setAttribute('checked',ch);
//	ca.appendChild(btnt);
ff.id=cbxidt;
var d = Math.floor(tym/(1000*60*60*24));
tym = tym - (d*(1000*60*60*24));
var h = Math.floor(tym/(1000*60*60));
tym = tym - (h*(1000*60*60));
var m = Math.floor(tym/(1000*60));
tym = tym - (m*(1000*60));
var s = Math.floor(tym/(1000));
ff.innerHTML=pad2(d)+":"+pad2(h)+":"+pad2(m)+":"+pad2(s);
					}
				}
			}
		 );				
});
}

function closecomp()
{
	$("#t2 tr").remove(); document.getElementById("comptasks").style.display='none';
	document.getElementById("d1").style.display='block';

}

function showincomp()
{
document.getElementById("d1").style.display='none';		document.getElementById("menui").style.display='none';document.getElementById("comptasks").style.display='none';
document.getElementById("incomptasks").style.display='block';
	db.transaction(
		
	function(tx)
	{
	 tx.executeSql
            (
            'select task,tym,ch from taskdetails',[],
            function(tx,rs)
            {
                for(var i=0;i<rs.rows.length;i++)
                {
                    var cur_row=rs.rows.item(i);
                    
                    var task=cur_row['task'];
                    var ch=cur_row['ch'];
    				var ta3=document.getElementById("t3");
//					alert(ch);
					if(ch=="false")
					{
						 var rowt=ta3.insertRow(-1);
		var nt = $('#t3 tr').length;
//						alert(nl);
        rowt.id='r3c'+nt;
      var cd=rowt.insertCell(0);
      var ce=rowt.insertCell(1);
      cd.innerHTML=task;
//	alert(c21.innerHTML);
    var col1id='c3c'+nt;
	cd.id=col1id;
      var btns = document.createElement('input');
      btns.type="checkbox";
      btns.setAttribute("name","checkboxc");
      var cbxidt='c3b'+nt;
      btns.setAttribute("id",cbxidt);
	btns.setAttribute('unchecked',ch);
	ce.appendChild(btns);
					}
				}
			}
		 );				
});
}

function closeincomp()
{
	$("#t3 tr").remove(); document.getElementById("incomptasks").style.display='none';
	document.getElementById("d1").style.display='block';

}


function showtimer()
{
    document.getElementById("menui").style.display='none';
	
    if(timo==-1)
        {
	timo=Number(window.prompt("Enter Time(0 for unlimited) "))*1000*60;
	document.getElementById("d1").style.display='block';
	document.getElementById("comptasks").style.display='none';
	document.getElementById("incomptasks").style.display='none';
	document.getElementById("disptimer").style.display='block';
    //stop goin to home page when menu is clicked ?
	var tym=0;
	totime=0;
	var ss=setInterval
	(
	function dispt()
	{

		tym=totime+1000;
		
		var d = Math.floor(tym/(1000*60*60*24));
		tym = tym - (d*(1000*60*60*24));
		var h = Math.floor(tym/(1000*60*60));	
		tym = tym - (h*(1000*60*60));
		var m = Math.floor(tym/(1000*60));
		tym =tym- (m*(1000*60));
		var s = Math.floor(tym/(1000));

		totime=totime+1000;
		document.getElementById("disptimer").innerHTML=pad2(d)+":"+pad2(h)+":"+pad2(m)+":"+pad2(s);
        // try using pad2 in showcomp()
		
		if(totime==timo||timo==-1)
            {
			clearInterval(ss);
            timo=-1;
            }
    }
	,
	1000
	);
//	timo=0;
}
  
}
function pad2(number) {
   
     return (number < 10 ? '0' : '') + number
   
}

function resetimer()
{
	timo=-1;
}

function changegap()
{
    gaptodisp=Number(window.prompt(" Enter the number of days upto which you want the tasks to display"))-1;
//    alert(gaptodisp);
    document.getElementById("menui").style.display='none';
    $("#t1 tr").remove();
    localStorage
    .setItem("gapt",gaptodisp);
    loadapp();
}