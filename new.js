history.pushState(null, null, location.href);
    window.onpopstate = function () {
        history.go(1);
    };



	function randombg(){
	  var random= Math.floor(Math.random() *4) + 0;
	   var bigSize = [	"url('img/a1.jpg')"
					];
	  document.getElementById("random").style.backgroundImage=bigSize[random];
	  //alert(bigSize[random]);		

   }
	
	function closeMenu() {
		//alert("Test");
	    document.getElementById("sidebarMenu").style.transform = "translateX(-250)";
		document.getElementById("openSidebarMenu").checked = false;
		
	}

	
   
   	function getQueryVariable(variable)
			{
			   var query = window.location.search.substring(1);
			   var vars = query.split("&");
			   for (var i=0;i<vars.length;i++) {
					   var pair = vars[i].split("=");
					   if(pair[0] == variable){return pair[1];}
			  }
			   return(false);
		}
			

	var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
    
	
function pick() {
	var user2 = 'android';
	var password2 = 'android';
	var concat2 = Base64.encode(user2 + ":" + password2);
	
		document.getElementById("pickbutton").style.visibility = "hidden";
	
		var action = "http://112.206.234.26/SwissKnife_dev_stage/SMSregistration.cgi";
		var loginuser = document.getElementById('pickwinner').value;
		var loginpass = document.getElementById('pickprize').value;
		var phptable = document.getElementById("phptable").value;
		var prof = document.getElementById("phpprof").value;
		var tableparser = phptable.split("-");
		var field1 = tableparser[0];
		var field2 = tableparser[1];
		var title2 = unescape(document.getElementById("phptitle").value);
                    title2 =  title2.replace(/\+/g, " ");

		var fieldreportsbody2 = unescape(document.getElementById("phpreportsbody").value);

		var post_data = '{ "method" : "smsrafflebasic" , "data" : { "DID" : "' + field1 +'" , "servicename" : "' + field2 + '", "limit" : "' + loginuser + '" , "field" : "' + prof + '",  "remarks" : "'+ loginpass +'" ,  "orderby" : "'+ "listfew" +'" }}';
		
		
		
			if (loginuser == '') {
			    alert('Pick Count can not be left blank');
			
			} else if (loginpass == '') {
			    alert('Pick Prize can not be left blank');
			
			} else {	
			    document.getElementById('loading').style.display = "block";
				$.ajax({
				url: 'http://112.206.234.26/SwissKnife_dev_stage/index.cgi',
				type: "POST",
				//dataType: "application/json; charset=utf-8",
				dataType: "json",
				crossDomain: true,
				headers: { 'Basic': concat2, 'Action': action },
				data:  post_data,
				contentType: 'application/json; charset=utf-8',
				success: function (data) {
							var obj = data.Response;
							var remarks = obj.Remarks;
							//alert("XX"  + obj.ResponseCode + "|" + obj.Remarks);
								
								if (obj.ResponseCode != '1000') {
									alert(obj.Remarks);
 	   							}
								else if (obj.Remarks == '1036') {
									alert(obj.Remarks);					
	   						    
								}  else if (obj.ResponseCode == '1000') {
									    
										if (loginuser <= 1) {
										   var winnertag  = "<h3>Winner of " + loginpass + "</h3>";
										} else {
										   var winnertag  = "<h1>Winners of " + loginpass + "</h1>";
										}   
									   
									  document.getElementById("winnersectiontitle").innerHTML = winnertag;				

									  var titlesplit = title2.split("|"); 	
									  var fieldsplit = fieldreportsbody2.split("|"); 	
									  
									  var winnersplit = obj.Remarks.split("***"); 	
									  
									  var table = $('#myTable');
									  var row, cell, cell2, winnerout; 
									  
									  $('#myTable tbody').html('');
									  
									  /*  LOOP to WINNERS */
									  for(var y=0; y < winnersplit.length; y++){
										
										winnerout = winnersplit[y].split("|");
										var total = y + 1;
	
									  							
																	
									  /*  LOOP to TITLE */
									  for(var i=0; i < titlesplit.length; i++){
									  row = $( '<tr />' );
										  table.append( row );
		
	
										/*  LOOP to VIEWABLE FIELDS */
										
												
										for(var j=0; j< fieldsplit[j].length; j++){

										
										  for(var z=0; z < winnerout[j].length; z++){
										
													if (titlesplit[i] == 'Prize' ) {
													 cell2 =  loginpass  + '</td>';
													} 
													  else if (winnerout[i] == '') {
													 cell2 = "NA" +  '</td>';
													 }	else { 
													 cell2 =  winnerout[i] + '</td>';
													}													
													
												
									        
									       }
								
								  
								     }			
										
										
										  if (i == 0) {
										   cell = '<td bgcolor=#D4AC0D style=font-weight:bold;line-height:20px;text-align:middle>'  + titlesplit[i] + '</td><td bgcolor=#D4AC0D style=font-weight:bold;z-index:2><div id=container><div id=floater>#'+ total +'</div></div>'  + cell2 + '</tr>';
										  } else {
											  cell = '<td>'  + titlesplit[i] + '</td><td>' + cell2 + '</tr>';
										  }
										  row.append(cell);
										
									   
									   }
									 
									}
							        document.getElementById("pickbutton").style.visibility = "visible";

									
								} else {
								    alert("Please check your internet connection! " );
    	   						  
								}
								document.getElementById('loading').style.display = "none";
								
 
				 },
				 error: function (xhr, ajaxOptions, thrownError) { //Add these parameters to display the required response
				  //alert(thrownError);
				    document.getElementById('loading').style.display = "none";
					alert("Oops! Something went wrong1.");
					
							var obj = $.parseJSON(xhr.responseText);
							var getobj = obj.Response;
								//alert(getobj.ResponseCode);
								alert("Oops! Something went wrong2.");
						

					 },
			  });
		  }
	 
     }

	 
function pullwinners() {
	var user2 = 'android';
	var password2 = 'android';
	var concat2 = Base64.encode(user2 + ":" + password2);
	
		
		var action	= "http://112.206.234.26/SwissKnife_dev_stage/SMSregistration.cgi";
		var loginuser = document.getElementById("username").value;
		//var loginpass = passwd;
                var phptable = document.getElementById("phptable").value;
             	var prof = document.getElementById("phpprof").value;
                var tableparser = phptable.split("-");
                var field1 = tableparser[0];
                var field2 = tableparser[1];
				var title2 = unescape(document.getElementById("phptitle").value);
					title2 =  title2.replace(/\+/g, " ");
                var fieldreportsbody2 = unescape(document.getElementById("phpreportsbody").value);
				var orderfield = document.getElementById("orderbyarrange").value;
				var order = document.getElementById("orderbyfield").value;
		
		
	    var post_data = '{ "method" : "listwinnersimple" , "data" : { "DID" : "' + field1 +'" , "servicename" : "' + field2 + '" , "remarks" :  "basic" , "orderby" : "' + orderfield + '" , "orderbyfield" : "' + order + '" }}';	
		
		
			if (loginuser == '') {
			    alert('It seems that you are not logged in.');
			
						
			} else {	
			    document.getElementById('loading').style.display = "block";
				$.ajax({
				url: 'http://112.206.234.26/SwissKnife_dev_stage/index.cgi',
				type: "POST",
				//dataType: "application/json; charset=utf-8",
				dataType: "json",
				crossDomain: true,
				headers: { 'Basic': concat2, 'Action': action },
				data:  post_data,
				contentType: 'application/json; charset=utf-8',
				success: function (data) {
							var obj = data.Response;
							var remarks = obj.Remarks;
							//alert("XX"  + obj.ResponseCode + "|" + obj.Remarks);
								
								if (obj.ResponseCode != '1000') {
									alert(obj.Remarks);
 	   							}
								else if (obj.Remarks == '1036') {
									alert(obj.Remarks);					
	   						    
								}  else if (obj.ResponseCode == '1000') {
									    
 									  document.getElementById("downloadfile").style.visibility = "visible";
									  document.getElementById("winnersectiontitle").innerHTML = "<h1>List of <label id=counter>..</label></h1>";
				

									  var titlesplit = title2.split("|"); 	
									  var fieldsplit = fieldreportsbody2.split("|"); 	
									  
									  var winnersplit = obj.Remarks.split("***"); 	
									  
									  var table = $('#myTable');
									  var row, cell, cell2, winnerout; 
									  
									  $('#myTable tbody').html('');
									  
									  /*  LOOP to WINNERS */
									  for(var y=0; y < winnersplit.length; y++){
										
										winnerout = winnersplit[y].split("|");
										var total = y + 1;	
										
										if (total <= 1) {
										document.getElementById("counter").innerHTML =  total + "  winner";
									  	} else {
										document.getElementById("counter").innerHTML =  total + "  winners";
										}		
																	

									  /*  LOOP to TITLE */
									  
									  for(var i=0; i < titlesplit.length; i++){
									  row = $( '<tr />' );
										  table.append( row );
		
	
										/*  LOOP to VIEWABLE FIELDS */
										
												
										for(var j=0; j< fieldsplit[j].length; j++){

										
										  for(var z=0; z < winnerout[j].length; z++){
										
													
													if (winnerout[i] == '') {
													 cell2 =  "NA"  + '</td>';
													 }	else { 
													 cell2 =  winnerout[i] + '</td>';
													}													
													
												
									        
									       }
										  
								     }			
										
										
										  if (i == 0) {
										   cell = '<td bgcolor=#D4AC0D style=font-weight:bold;line-height:20px;text-align:middle>'  + titlesplit[i] + '</td><td bgcolor=#D4AC0D style=font-weight:bold;><div id=container><div id=floater>#'+ total +'</div></div>' + cell2 + '</tr>';
										  } else {
											  cell =  '<td>'  + titlesplit[i] + '</td><td>' + cell2 + '</tr>';
										  }
										  row.append(cell);
										
									   
									   }
									 
									}
											
								} else {
								    alert("Please check your internet connection! " );
    	   						  
								}
								document.getElementById('loading').style.display = "none";
								
 
				 },
				 error: function (xhr, ajaxOptions, thrownError) { //Add these parameters to display the required response
				  //alert(thrownError);
				    document.getElementById('loading').style.display = "none";
					alert("Oops! Something went wrong1.");
					
							var obj = $.parseJSON(xhr.responseText);
							var getobj = obj.Response;
								//alert(getobj.ResponseCode);
								alert("Oops! Something went wrong2.");
						

					 },
			  });
		  }
	 
     }

     function OpenModal() {
		 document.getElementById('popup1').style.display= "block";
		 
	 }
	function OpenModal2() {
                 document.getElementById('popup2').style.display= "block";

         }

	 function CloseModal() {
		 document.getElementById('popup1').style.display= "none";
		 
	 }
 	function CloseModal2() {
                 document.getElementById('popup2').style.display= "none";
		 document.getElementById('content').innerHTML ="";

         }

	 function ClearAll() {
	    var pickprize = document.getElementById("pickprize");
		var pickwinner = document.getElementById("pickwinner");
		var pickcriteria = document.getElementById("pickcriteria"); 
		var pickcriteria2 = document.getElementById("pickcriteria2");
		
		var response = document.getElementById("response");
		
			pickprize.value = "";
			pickwinner.value = "1";
			pickcriteria.value = "";
			pickcriteria2.innerHTML = "<option value=0 selected=true disabled=disabled>Choose a criteria first</option>";
			response.innerHTML = "";
			document.getElementById('popup1').style.display="none";
     }		

	 function DrawNow(x) {
	    var pickprize = document.getElementById("pickprize");
		var pickwinner = document.getElementById("pickwinner");
		var pickcriteria = document.getElementById("pickcriteria");
		var pickcriteria2 = document.getElementById("pickcriteria2");
	    
		if ((pickprize.value == "") || (pickwinner.value == "")|| (pickcriteria.value == "")|| (pickcriteria2.value == "")) {
			alert("Please make sure all fields are filled up!");
		} else {
			
			if (confirm("Are you sure you to create this Raffle draw?")) {
		
				if (x == 1){
					DrawNowIns(x);
					
				} else {
					//alert("You press draw now!");
					DrawAsap(x);
				} 	
				
			} else {}
			
			
		}
	
	 
	 }	 
	 
		

function DrawNowIns(x) {

	    var user = 'retcon';
		var password = 'R3tC0N';
		var concat = Base64.encode(user + ":" + password);

        var table = document.getElementById("table").value + "-raffle";
		var pickprize = document.getElementById("pickprize");
		var pickwinner = document.getElementById("pickwinner");
		var pickcriteria = document.getElementById("pickcriteria");
		var picktext = pickcriteria.options[pickcriteria.selectedIndex];
		var pickcriteria2 = document.getElementById("pickcriteria2");
		var picktext2 = pickcriteria2.options[pickcriteria2.selectedIndex];
		var tableparser = pickcriteria2.value.split("|");
		var field1 = tableparser[0];
		var field2 = tableparser[1];
		var fout = "";

		if (field2 == "ID") {
			fout = picktext2.text;
		} else {
			fout = field2;
		}
		
		var post_data = '{ "method" : "insert" , "data" : { "table" : "'+ table +'", "prize" : "'+ pickprize.value +'", "winners" : "' + pickwinner.value + '", "criteria0" : "' + picktext.text + '", "criteria1" : "' + pickcriteria.value + '" , "criteria2" : "' + field1 + '"   , "criteria3" : "' + fout + '" , "criteria4" : "' + picktext2.text + '" , "status" : "' + x + '" }}';
		
		var action	= "http://112.206.234.26/SwissKnife_dev_stage/databank.cgi";
			
			    //document.getElementById('loading').style.display = "block";
				$.ajax({
				url: 'http://112.206.234.26/SwissKnife_dev_stage/index.cgi',
				type: "POST",
				dataType: "json",
				crossDomain: true,
				headers: { 'Basic': concat, 'Action': action },
				data:  post_data,
				contentType: 'application/json; charset=utf-8',
				success: function (data) {
							var obj = data.Response;
							var remarks = obj.Remarks;
							var objmethod = data.methodResponse;
                             var response = document.getElementById("response");
								if (obj.ResponseCode == 1000) {
									//alert(remarks);
									response = document.getElementById("response");
								    response.innerHTML = "Remarks: "  + remarks;
									getRaffleList();
									    
								} else {
								    response = document.getElementById("response");
								    response.innerHTML = "Remarks: "  + remarks;
    	   						    
 
								}
								setTimeout(ClearAll(), 3000);
 
				 },
				 error: function (xhr, ajaxOptions, thrownError) { //Add these parameters to display the required response
				  //alert(thrownError);
				    document.getElementById('loading').style.display = "none";
					alert("Oops! Something went wrong.");
					
							var obj = $.parseJSON(xhr.responseText);
							var getobj = obj.Response;
								//alert(getobj.ResponseCode);
								alert("Oops! Something went wrong!.");
						

					 },
			  });
		
       }	   
	function getCriteria(el) {
		var user = 'retcon';
		var password = 'R3tC0N';
		var concat = Base64.encode(user + ":" + password);

	   
        var e = document.getElementById(el);
	    //var strSel = "The Value is: " + e.options[e.selectedIndex].value + " and text is: " + e.options[e.selectedIndex].text;
		var table = document.getElementById("pd_tagging");
		var getTag = e.options[e.selectedIndex].value;	
		var pickCriteria = document.getElementById("pickcriteria2");
		
		var action	= "http://112.206.234.26/SwissKnife_dev_stage/databank.cgi";
	    var post_data = '{ "method" : "getlist" , "data" : { "table" : "'+ table.value +'", "fieldName" : "tag", "lookup" : "'+ getTag +'" , "operator" : "="  }}';
			
			    //document.getElementById('loading').style.display = "block";
				$.ajax({
				url: 'http://112.206.234.26/SwissKnife_dev_stage/index.cgi',
				type: "POST",
				dataType: "json",
				crossDomain: true,
				headers: { 'Basic': concat, 'Action': action },
				data:  post_data,
				contentType: 'application/json; charset=utf-8',
				success: function (data) {
							var obj = data.Response;
							var remarks = obj.Remarks;
							var objmethod = data.methodResponse;
							var queryList = objmethod.queryList;
							var returnID = queryList[0].pid;
								
								if (obj.ResponseCode != '1000') {
								
									alert(obj.Remarks);
 	   						    
								}
								else if (queryList[0].error) {
									alert("Login failed. Please check username & password! " );
	   						    
								}  else if (obj.ResponseCode == '1000') {
									  //window.location="default.html?username=" + loginuser +  "&returnID=" + returnID;
									  //alert("good!");
									var d = "<option value='' selected=true disabled=disabled>--Pick One--</option>";  
									     
									 	for (i = 0; i < queryList.length; i++) {
									     d +="<option value=" + queryList[i].fieldlookup + "|" + queryList[i].searchfield + ">" + queryList[i].id +"</option>"
									}
										
										pickCriteria.innerHTML =  d;
										pickCriteria.style.disabled = false;
									    
								} else {
								    alert("Login failed. Please check username & password! " );
    	   						  
								}
								//document.getElementById('loading').style.display = "none";
								
 
				 },
				 error: function (xhr, ajaxOptions, thrownError) { //Add these parameters to display the required response
				  //alert(thrownError);
				    document.getElementById('loading').style.display = "none";
					alert("Oops! Something went wrong.");
					
							var obj = $.parseJSON(xhr.responseText);
							var getobj = obj.Response;
								//alert(getobj.ResponseCode);
								alert("Oops! Something went wrong!.");
						

					 },
			  });
		
	
       }
	   



	 
	 function getRaffleList() {
	    //alert("Triggered!");
		var user = 'retcon';
		var password = 'R3tC0N';
		var concat = Base64.encode(user + ":" + password);
        var list  = document.getElementById("ListHere");
		var table = document.getElementById("table").value + "-raffle";
		
		var action	= "http://112.206.234.26/SwissKnife_dev_stage/databank.cgi";
	    var post_data = '{ "method" : "getlist" , "data" : { "table" : "'+ table +'", "fieldName" : "prize", "lookup" : "" , "operator" : "!=" , "orderby" : "timestamp" , "orderbyarrange" : "DESC"  }}';
		
			    //document.getElementById('loading').style.display = "block";
				$.ajax({
				url: 'http://112.206.234.26/SwissKnife_dev_stage/index.cgi',
				type: "POST",
				dataType: "json",
				crossDomain: true,
				headers: { 'Basic': concat, 'Action': action },
				data:  post_data,
				contentType: 'application/json; charset=utf-8',
				success: function (data) {
							var obj = data.Response;
							var remarks = obj.Remarks;
							var objmethod = data.methodResponse;
							var queryList = objmethod.queryList;
							
							if (obj.ResponseCode != '1000') {
								
									alert(obj.Remarks);
 	   						    
								}
								else if (queryList[0].error) {
									alert("Login failed. Please check username & password! " );
	   						    
								}  else if (obj.ResponseCode == '1000') {
									  
									var d = "";  
									var butx = "";
									
									for (i = 0; i < queryList.length; i++) {
										
										if (queryList[i].status == 2) {
											butx = "<div style=width:45%;float:right;><input type=button id=butnF class=butnF value=Finished>&nbsp;&nbsp;<a href=#popup2><input style=width:120px;color:#FFF; type=button id=butnD class=butnD value=View onclick=OpenModal2();WinnerListSubmit("+ queryList[i].id + ");></a></div>";
										} else if (queryList[i].status == 3) {
											butx = "<div style=width:45%;float:right;><input type=button id=butnF class=butnF value=Stopped></div>";
										} else {
											butx = "<div style=width:45%;float:right;><input style=width:120px;color:#FFF; type=button id=butnD class=butnD value=Draw&nbsp;Now onclick=DrawNowSubmit("+ queryList[i].id + ");>&nbsp;<input type=button id=butnS class=butnS value=Stop onclick=StopIt("+ queryList[i].id + ") ></div>";
										}
										
									 var countwinners = parseInt(queryList[i].counter);
									 var realwin = 0;
									  if (countwinners >= 1) {
										  realwin = queryList[i].counter;  
									  } else {
										  realwin = "0";
									  }
										
									 d += "<div style=width:100%;background-color:red><div style=width:55%;float:left><b>Raffle Prize: " + queryList[i].prize + "</b><br /><b>No. of Winners:</b> " + queryList[i].winners + "<br /><b>Criteria: </b>" + queryList[i].criteria4 +  "<br /><b>Winners: </b>" + realwin + " of " + queryList[i].winners +  "<br /><input id=a"+ queryList[i].id + " type=text style=display:none value=" + queryList[i].criteria1 + " />" +  "<input id=b"+ queryList[i].id + " type=text style=display:none value=" + queryList[i].criteria2 + " />"+  "<input id=c"+ queryList[i].id + " type=text style=display:none value=" + encodeURI(queryList[i].criteria3) + " />"+  "<input id=d"+ queryList[i].id + " type=text style=display:none value=" + encodeURI(queryList[i].prize) + " />"+  "<input id=e"+ queryList[i].id + " type=text style=display:none value=" + encodeURI(queryList[i].criteria4) + " />"+  "<input type=text id=f" + queryList[i].id + " style=display:none value=" + queryList[i].winners + " />"  + "<input type=text id=g" + queryList[i].id + " style=display:none value=" + realwin + "&nbsp;of&nbsp;" + queryList[i].winners + " /></div>" +  butx  +  "</div><br /><br /><br /><br /><hr>";
								    }
								
										
									list.innerHTML =  d;
										
									    
								} else {
								    alert("Login failed. Please check username & password! " );
    	   						  
								}
								//document.getElementById('loading').style.display = "none";
								
 
				 },
				 error: function (xhr, ajaxOptions, thrownError) { //Add these parameters to display the required response
				  //alert(thrownError);
				    document.getElementById('loading').style.display = "none";
					alert("Oops! Something went wrong.");
					
							var obj = $.parseJSON(xhr.responseText);
							var getobj = obj.Response;
								//alert(getobj.ResponseCode);
								alert("Oops! Something went wrong!.");
						

					 },
			  });
		
		
	}
 
	 	   
	function DrawNowSubmit(x) {

		var phpreportbody = decodeURI(document.getElementById("phpreportsbody").value);
		var reportbody = phpreportbody.replace( /\|/g, ',');
		//alert(reportbody);
		var phptable = document.getElementById("phptable").value;
		var a = document.getElementById("a" + x).value;
		var b = document.getElementById("b" + x).value;
		var c = decodeURI(document.getElementById("c" + x).value);
		var d = decodeURI(document.getElementById("d" + x).value);
		var e = decodeURI(document.getElementById("e" + x).value);
		var f = document.getElementById("f" + x).value;
		
		//alert(b + "|" + c + "|" + d + "|" + e + "|" + f );
		
		var user = 'retcon';
		var password = 'R3tC0N';
		var concat = Base64.encode(user + ":" + password);
        var list  = document.getElementById("ListHere");
		var table = document.getElementById("table").value;
		var operator = "";
	
		
		if ((c == "NE") || (c == "NA")) {
			operator = "!=";		
		} else {
			operator = "=";		
		}
		
		
		var fout = "";
		if (c == "ID") {
			fout = e;
		} else {
			fout = c;
		}
	
		if (confirm("Are you sure you will Draw this entry?")) {
		
	
		var action	= "http://112.206.234.26/SwissKnife_dev_stage/databank.cgi";
	    var post_data = '{ "method" : "randomizer" , "data" : { "table" : "'+ table +'", "field1" : "' 	+ b + '", "value1" : "' + fout + '" , "operator" : "' + operator +'", "limitcnt" : "' + f + '", "prize" : "' + d + '" , "remarks" : "' + e + '" , "tblfields" : "' + reportbody + '", "ID" : "' + x + '" }}';
		
		
			    ///document.getElementById('loading').style.display = "block";
				$.ajax({
				url: 'http://112.206.234.26/SwissKnife_dev_stage/index.cgi',
				type: "POST",
				dataType: "json",
				crossDomain: true,
				headers: { 'Basic': concat, 'Action': action },
				data:  post_data,
				contentType: 'application/json; charset=utf-8',
				success: function (data) {
					
						var obj = data.Response;
						var remarks = obj.Remarks;
						//var objmethod = data.methodResponse;
						//var queryList = objmethod.queryList;
						//alert(obj.SID);
						
							if (obj.ResponseCode != 1000) {
								    
									alert(obj.Remarks);
 	   						    
								}else if (obj.ResponseCode == 1000) {
									    Update(x);
										alert("Raffle status: " + obj.Status);
										getRaffleList();
										setTimeout(ClearAll(), 3000);
									    
								} else {
								    alert("Oops! Something went wrong!" );
    	   						  
								}
								//document.getElementById('loading').style.display = "none";
								
 
				 },
				 error: function (xhr, ajaxOptions, thrownError) { //Add these parameters to display the required response
				  //alert(thrownError);
				    document.getElementById('loading').style.display = "none";
					alert("Oops! Something went wrong.");
					
							var obj = $.parseJSON(xhr.responseText);
							var getobj = obj.Response;
								//alert(getobj.ResponseCode);
								alert("Oops! Something went wrong!.");
						

					 },
			  });

		}
		
	}   

	
		function UpdateStatus(x) {

		var user = 'retcon';
		var password = 'R3tC0N';
		var concat = Base64.encode(user + ":" + password);
        var table = document.getElementById("table").value + "-raffle";
			
		var action	= "http://112.206.234.26/SwissKnife_dev_stage/databank.cgi";
	    var post_data = '{ "method" : "update" , "data" : { "table" : "'+ table +'", "returnID" : "' +  x + '", "fieldName" : "id" , "status" : "' +  1  + '" }}';
		
		
			    ///document.getElementById('loading').style.display = "block";
				$.ajax({
				url: 'http://112.206.234.26/SwissKnife_dev_stage/index.cgi',
				type: "POST",
				dataType: "json",
				crossDomain: true,
				headers: { 'Basic': concat, 'Action': action },
				data:  post_data,
				contentType: 'application/json; charset=utf-8',
				success: function (data) {
					
						var obj = data.Response;
						var remarks = obj.Remarks;
						
								if (obj.ResponseCode != 1000) {
									alert(obj.Remarks);
 	   						    
								} else if (obj.ResponseCode == 1000) {
									  																	
										getRaffleList();
									    
								} else {
								    alert("Oops! Something went wrong!" );
    	   						  
								}
								//document.getElementById('loading').style.display = "none";
								
 
				 },
				 error: function (xhr, ajaxOptions, thrownError) { //Add these parameters to display the required response
				  //alert(thrownError);
				    document.getElementById('loading').style.display = "none";
					alert("Oops! Something went wrong.");
					
							var obj = $.parseJSON(xhr.responseText);
							var getobj = obj.Response;
								//alert(getobj.ResponseCode);
								alert("Oops! Something went wrong!.");
						

					 },
			  });

		
	}   

	 function Update(x) {

		var user = 'retcon';
		var password = 'R3tC0N';
		var concat = Base64.encode(user + ":" + password);
        var table = document.getElementById("table").value + "-raffle";
			
		var action	= "http://112.206.234.26/SwissKnife_dev_stage/databank.cgi";
	    var post_data = '{ "method" : "update" , "data" : { "table" : "'+ table +'", "returnID" : "' +  x + '", "fieldName" : "id" , "status" : "' +  2  + '" }}';
		
		
			    ///document.getElementById('loading').style.display = "block";
				$.ajax({
				url: 'http://112.206.234.26/SwissKnife_dev_stage/index.cgi',
				type: "POST",
				dataType: "json",
				crossDomain: true,
				headers: { 'Basic': concat, 'Action': action },
				data:  post_data,
				contentType: 'application/json; charset=utf-8',
				success: function (data) {
					
						var obj = data.Response;
						var remarks = obj.Remarks;
						
								if (obj.ResponseCode != 1000) {
									alert(obj.Remarks);
 	   						    
								} else if (obj.ResponseCode == 1000) {
									  																	
										getRaffleList();
									    
								} else {
								    alert("Oops! Something went wrong!" );
    	   						  
								}
								//document.getElementById('loading').style.display = "none";
								
 
				 },
				 error: function (xhr, ajaxOptions, thrownError) { //Add these parameters to display the required response
				  //alert(thrownError);
				    document.getElementById('loading').style.display = "none";
					alert("Oops! Something went wrong.");
					
							var obj = $.parseJSON(xhr.responseText);
							var getobj = obj.Response;
								//alert(getobj.ResponseCode);
								alert("Oops! Something went wrong!.");
						

					 },
			  });

		
	}   


	
	function StopIt(x) {

		var user = 'retcon';
		var password = 'R3tC0N';
		var concat = Base64.encode(user + ":" + password);
        var table = document.getElementById("table").value + "-raffle";
				
		if (confirm("Are you sure you will Stop this entry?")) {
			
		var action	= "http://112.206.234.26/SwissKnife_dev_stage/databank.cgi";
	    var post_data = '{ "method" : "update" , "data" : { "table" : "'+ table +'", "returnID" : "' +  x + '", "fieldName" : "id" , "status" : "3" }}';
		
		
			    ///document.getElementById('loading').style.display = "block";
				$.ajax({
				url: 'http://112.206.234.26/SwissKnife_dev_stage/index.cgi',
				type: "POST",
				dataType: "json",
				crossDomain: true,
				headers: { 'Basic': concat, 'Action': action },
				data:  post_data,
				contentType: 'application/json; charset=utf-8',
				success: function (data) {
					
						var obj = data.Response;
						var remarks = obj.Remarks;
						
						if (obj.ResponseCode != 1000) {
									alert(obj.Remarks);
 	   						    
								}else if (obj.ResponseCode == 1000) {
									  																	
										alert("Raffle stopped: " + obj.Status);
										getRaffleList();
									    
								} else {
								    alert("Oops! Something went wrong!" );
    	   						  
								}
								//document.getElementById('loading').style.display = "none";
								
 
				 },
				 error: function (xhr, ajaxOptions, thrownError) { //Add these parameters to display the required response
				  //alert(thrownError);
				    document.getElementById('loading').style.display = "none";
					alert("Oops! Something went wrong.");
					
							var obj = $.parseJSON(xhr.responseText);
							var getobj = obj.Response;
								//alert(getobj.ResponseCode);
								alert("Oops! Something went wrong!.");
						

					 },
			  });

		}
		
	}   


	
	
		

function DrawAsap(x) {

	    var user = 'retcon';
		var password = 'R3tC0N';
		var concat = Base64.encode(user + ":" + password);

        var table = document.getElementById("table").value + "-raffle";
		var pickprize = document.getElementById("pickprize");
		var pickwinner = document.getElementById("pickwinner");
		var pickcriteria = document.getElementById("pickcriteria");
		var picktext = pickcriteria.options[pickcriteria.selectedIndex];
		var pickcriteria2 = document.getElementById("pickcriteria2");
		var picktext2 = pickcriteria2.options[pickcriteria2.selectedIndex];
		var tableparser = pickcriteria2.value.split("|");
		var field1 = tableparser[0];
		var field2 = tableparser[1];
		
		var fout = "";
		
		if (field2 == "ID") {
			fout = picktext2.text;
		} 
		
	    else {
			fout = field2;
		}
	    var post_data = '{ "method" : "insert" , "data" : { "table" : "'+ table +'", "prize" : "'+ pickprize.value +'", "winners" : "' + pickwinner.value + '", "criteria0" : "' + picktext.text + '", "criteria1" : "' + pickcriteria.value + '" , "criteria2" : "' + field1 + '"   , "criteria3" : "' + fout + '" , "criteria4" : "' + picktext2.text + '" , "status" : "' + x + '" }}';
		
		var action	= "http://112.206.234.26/SwissKnife_dev_stage/databank.cgi";
			
			    //document.getElementById('loading').style.display = "block";
				$.ajax({
				url: 'http://112.206.234.26/SwissKnife_dev_stage/index.cgi',
				type: "POST",
				dataType: "json",
				crossDomain: true,
				headers: { 'Basic': concat, 'Action': action },
				data:  post_data,
				contentType: 'application/json; charset=utf-8',
				success: function (data) {
							var obj = data.Response;
							var remarks = obj.Remarks;
							var objmethod = data.methodResponse;
							var returnID = objmethod.returnID;
							
							
                             var response = document.getElementById("response");
								if (obj.ResponseCode == 1000) {
									//alert(remarks);
									response = document.getElementById("response");
								    response.innerHTML = "Remarks: "  + remarks;
									getRaffleList();
									DrawNowAsap(returnID);
									setTimeout(CloseModal(), 3000);
 									
									    
								} else {
								    response = document.getElementById("response");
								    response.innerHTML = "Remarks: "  + remarks;
    	   						    
									
 
								}
														
				 },
				 error: function (xhr, ajaxOptions, thrownError) { //Add these parameters to display the required response
				  //alert(thrownError);
				    document.getElementById('loading').style.display = "none";
					alert("Oops! Something went wrong.");
					
							var obj = $.parseJSON(xhr.responseText);
							var getobj = obj.Response;
								//alert(getobj.ResponseCode);
								alert("Oops! Something went wrong!.");
						

					 },
			  });
		
       }
		
		
	function DrawNowAsap(x) {
		var phpreportbody = decodeURI(document.getElementById("phpreportsbody").value);
		var reportbody = phpreportbody.replace( /\|/g, ',');
		var table = document.getElementById("table").value;
		
		var d = document.getElementById("pickprize");
		var f = document.getElementById("pickwinner");
		var pickcriteria = document.getElementById("pickcriteria");
		var picktext = pickcriteria.options[pickcriteria.selectedIndex];
		var pickcriteria2 = document.getElementById("pickcriteria2");
		var picktext2 = pickcriteria2.options[pickcriteria2.selectedIndex].text;
		var tableparser = pickcriteria2.value.split("|");
		var b = tableparser[0];
		var c = tableparser[1];
		
		var user = 'retcon';
		var password = 'R3tC0N';
		var concat = Base64.encode(user + ":" + password);
        var list  = document.getElementById("ListHere");
		var operator = "";
		var fout = "";
		
		if (c == "ID") {
			fout = picktext2;
		} else {
			fout = c;
		}
				
		if ((c == "NE") || (c == "NA")) {
			operator = "!=";		
		} else {
			operator = "=";		
		}
		
		
		
	
		var action	= "http://112.206.234.26/SwissKnife_dev_stage/databank.cgi";
	    var post_data = '{ "method" : "randomizer" , "data" : { "table" : "'+ table +'", "field1" : "' 	+ b + '", "value1" : "' + fout + '" , "operator" : "' + operator +'", "limitcnt" : "' + f.value + '", "prize" : "' + d.value + '" , "remarks" : "' + picktext2 + '" , "tblfields" : "' + reportbody + '", "ID" : "' + x + '" }}';
		
		
			    ///document.getElementById('loading').style.display = "block";
				$.ajax({
				url: 'http://112.206.234.26/SwissKnife_dev_stage/index.cgi',
				type: "POST",
				dataType: "json",
				crossDomain: true,
				headers: { 'Basic': concat, 'Action': action },
				data:  post_data,
				contentType: 'application/json; charset=utf-8',
				success: function (data) {
					
						var obj = data.Response;
						var remarks = obj.Remarks;
						//var objmethod = data.methodResponse;
						//var queryList = objmethod.queryList;
						//alert(obj.SID);
						
								if (obj.ResponseCode != 1000) {
									UpdateStatus(x);
									alert(obj.Remarks);
									
 	   						    
								}else if (obj.ResponseCode == 1000) {
											
										alert("Raffle status: " + obj.Status);
										getRaffleList();
										setTimeout(ClearAll(), 3000);

									    
								} else {
								    alert("Oops! Something went wrong!" );
    	   						  
								}
								//document.getElementById('loading').style.display = "none";
								
 
				 },
				 error: function (xhr, ajaxOptions, thrownError) { //Add these parameters to display the required response
				  //alert(thrownError);
				    document.getElementById('loading').style.display = "none";
					alert("Oops! Something went wrong.");
					
							var obj = $.parseJSON(xhr.responseText);
							var getobj = obj.Response;
								//alert(getobj.ResponseCode);
								alert("Oops! Something went wrong!.");
						

					 },
			  });

		
		
	}   

	
		 
	 function getWinnerList() {
	    var user = 'retcon';
		var password = 'R3tC0N';
		var concat = Base64.encode(user + ":" + password);
        var list  = document.getElementById("ListHere");
		var table = document.getElementById("phptable").value + "-raffle";
		
		var action	= "http://112.206.234.26/SwissKnife_dev_stage/databank.cgi";
	    var post_data = '{ "method" : "getlist" , "data" : { "table" : "'+ table +'", "fieldName" : "prize", "lookup" : "" , "operator" : "!="  , "orderby" : "timestamp" , "orderbyarrange" : "DESC"  }}';
		
		
			    //document.getElementById('loading').style.display = "block";
				$.ajax({
				url: 'http://112.206.234.26/SwissKnife_dev_stage/index.cgi',
				type: "POST",
				dataType: "json",
				crossDomain: true,
				headers: { 'Basic': concat, 'Action': action },
				data:  post_data,
				contentType: 'application/json; charset=utf-8',
				success: function (data) {
							var obj = data.Response;
							var remarks = obj.Remarks;
							var objmethod = data.methodResponse;
							var queryList = objmethod.queryList;
							
							if (obj.ResponseCode != '1000') {
								
									alert(obj.Remarks);
 	   						    
								}
								else if (queryList[0].error) {
									alert("Login failed. Please check username & password! " );
	   						    
								}  else if (obj.ResponseCode == '1000') {
									  
									var d = "";  
									var butx = "";
									
									for (i = 0; i < queryList.length; i++) {
										
											butx = "<div style=width:45%;float:right;><a href=#popup1><input style=width:120px;color:#FFF; type=button id=butnD class=butnD value=View onclick=WinnerListSubmit("+ queryList[i].id + ");></a></div>";
										
									     
										
									 d += "<div style=width:100%;background-color:red><div style=width:55%;float:left><b>Raffle Prize: " + queryList[i].prize + "</b><br />No. of Winners: " + queryList[i].winners + "<br />Criteria: " + queryList[i].criteria4 +  "<br /><input id=a"+ queryList[i].id + " type=text style=display:none value=" + queryList[i].criteria1 + " />" +  "<input id=b"+ queryList[i].id + " type=text style=display:none value=" + queryList[i].criteria2 + " />"+  "<input id=c"+ queryList[i].id + " type=text style=display:none value=" + queryList[i].criteria3 + " />"+  "<input id=d"+ queryList[i].id + " type=text style=display:none value=" + encodeURI(queryList[i].prize) + " />"+  "<input id=e"+ queryList[i].id + " type=text style=display:none value=" + encodeURI(queryList[i].criteria4) + " />"+  "<input type=text id=f" + queryList[i].id + " style=display:none value=" + queryList[i].winners + " /></div>" +  butx  +  "</div><br /><br /><hr>";
								    }
								
										
									list.innerHTML =  d;
										
									    
								} else {
								    alert("Login failed. Please check username & password! " );
    	   						  
								}
								//document.getElementById('loading').style.display = "none";
								
 
				 },
				 error: function (xhr, ajaxOptions, thrownError) { //Add these parameters to display the required response
				  //alert(thrownError);
				    document.getElementById('loading').style.display = "none";
					alert("Oops! Something went wrong.");
					
							var obj = $.parseJSON(xhr.responseText);
							var getobj = obj.Response;
								//alert(getobj.ResponseCode);
								alert("Oops! Something went wrong!.");
						

					 },
			  });
		
		
	}

	function WinnerListSubmit(x) {
	   //alert(x);
       OpenModal();

	  //var phptable = document.getElementById("phptable").value;
		var a = document.getElementById("a" + x).value;
		var b = document.getElementById("b" + x).value;
		var c = document.getElementById("c" + x).value;
		var pickprize = decodeURI(document.getElementById("d" + x).value);
		var criteria = decodeURI(document.getElementById("e" + x).value);
		var pickwinner = document.getElementById("f" + x).value;
		var winstatus = document.getElementById("g" + x).value;
		var content = document.getElementById("content");
		
		var user = 'retcon';
		var password = 'R3tC0N';
		var concat = Base64.encode(user + ":" + password);
        var list  = document.getElementById("ListHere");
		var table = document.getElementById("phptable").value + "-winners";
		
		
		var title = unescape(document.getElementById("phptitle").value);
			title =  title.replace(/\+/g, " ");
        var fieldreportsbody2 = unescape(document.getElementById("phpreportsbody").value);
				
		var action	= "http://112.206.234.26/SwissKnife_dev_stage/databank.cgi";
	    var post_data = '{ "method" : "getlist" , "data" : { "table" : "'+ table +'", "fieldName" : "tblID", "lookup" : "' + x +'" , "operator" : "="  , "orderby" : "timestamp" , "orderbyarrange" : "DESC"  }}';
		
		
			    //document.getElementById('loading').style.display = "block";
				$.ajax({
				url: 'http://112.206.234.26/SwissKnife_dev_stage/index.cgi',
				type: "POST",
				dataType: "json",
				crossDomain: true,
				headers: { 'Basic': concat, 'Action': action },
				data:  post_data,
				contentType: 'application/json; charset=utf-8',
				success: function (data) {
							var obj = data.Response;
							var remarks = obj.Remarks;
							var objmethod = data.methodResponse;
							var queryList = objmethod.queryList;
							var table = $('#myTable');
						
							if (obj.ResponseCode != '1000') {
								
									alert(obj.Remarks);
 	   						    
								}
								else if (queryList[0].error) {
									alert("Login failed. Please check username & password! " );
	   						    
								}  else if (obj.ResponseCode == '1000') {
									  
									var d = "<table>";  
									var butx = "";
									var titlesplit = title.split("|"); 	
									var go = "";
											
								        
										for (var i=0; i<queryList.length; i++){
										
																					
												    var keysplit = title.split("|");
													var pt = 1;	
											        var h = queryList[i];
												    Object.keys(h).forEach(function(key) {
													  
													  //alert('Key : ' + key + ', Value : ' + h[key]);
												     	    			
																  if ((key == "id")|| (key == "tblid")|| (key == "limitcnt")|| (key == "prize") || (key == "remarks") ) {
																	  
																  } else {
																		   var outt= (pt++-1);	 				      
																		 	d +=  "<td class=rowspan id=rowspan" +  outt +">"  + keysplit[(outt)] + "</td><td class=rowspan id=rowspan" +  outt +">" + h[key] +
																			"</td></tr>";
																			
																  }
																  
												  })
																							  
									    }


									content.innerHTML =   "<b>Raffle Prize: </b>" + pickprize + "<br /><b>No. of Winners: " + pickwinner + "</b><br /><b>Criteria: </b>" + criteria + "<br /><b>Winners: </b>" + winstatus + "<br /><hr>" +  "<input type=button class='btn btn-primary' id=pick style='float:left;width:20%;height:40px;' onclick='exporttocsv(" + x + ");' value='Request Download'><br /><div id='downloadfile' style=display:none><a href=# id=downloadlink><input  type=button value='Get File' class='btn btn-primary'  style='height:40px;width:25%;background-color:#FFFFFF;color:#bd3a26;font-size: 16px;padding: 10px 20px 10px 20px;border:solid #bd3a26 2px;text-decoration: none;'></a></div>"  + "<br /><table>" + d + "</table>"; 

									    
								} else {
								    alert("Login failed. Please check username & password! " );
    	   						  
								}
								//document.getElementById('loading').style.display = "none";
								
 
				 },
				 error: function (xhr, ajaxOptions, thrownError) { //Add these parameters to display the required response
				  //alert(thrownError);
				    document.getElementById('loading').style.display = "none";
					alert("Oops! Something went wrong.");
					
							var obj = $.parseJSON(xhr.responseText);
							var getobj = obj.Response;
								//alert(getobj.ResponseCode);
								alert("Oops! Something went wrong!.");
						

					 },
			  });


		
	}
  

    function exporttocsv(x) {
	
   	    var user = 'retcon';
        var password = 'R3tC0N';
        var concat = Base64.encode(user + ":" + password);
        var action  = "http://112.206.234.26/SwissKnife_dev_stage/databank.cgi";
        var table = document.getElementById("phptable").value + "-winners";
        var orderfield = document.getElementById("orderbyarrange").value;
        var order = document.getElementById("order").value;
		var downloadbody = unescape(document.getElementById("downloadbody").value);
        var downloadtitle = unescape(document.getElementById("downloadtitle").value);
		var format = downloadtitle.replace(/\+/g, " ");
		var loginuser = document.getElementById("username").value;
	
		var post_data = '{ "method" : "downloadfile" , "data" : { "table" : "' + table + '", "fieldName" : "' + loginuser +'" ,"field1" : "'+  order  +'" , "orderby" : "'+  orderfield  +'" ,  "field2" : "tblID" , "tblfields" : "' + downloadbody + '" , "titlefields" : "' + format + '" , "value2" : "' + x +'" ,  "operator" : "="  }}';


		//alert(loginuser);


		var loading = document.getElementById('loading');
				 var hreflink = document.getElementById("downloadlink");

                                loading.style.display = "block";
                                $.ajax({
                                url: 'http://112.206.234.26/SwissKnife_dev_stage/index.cgi',
                                type: "POST",
                                dataType: "json",
                                crossDomain: true,
                                headers: { 'Basic': concat, 'Action': action },
                                                                                          
																						                                  data:  post_data,
                                contentType: 'application/json; charset=utf-8',
                                success: function (data) {
                                                        var obj = data.Response;
                                                        var remarks = obj.Remarks;
                                                        var objmethod = data.methodResponse;
                                                        var totalRegistered = objmethod.totalRegistered;
                                                        var downloadfile = objmethod.filename;
							var getfile = document.getElementById("downloadfile");
							var pick = document.getElementById("pick");
	
                                                                if (obj.ResponseCode != '1000') {
                                                                        loading.style.display = "none";
                                                                        alert(obj.Remarks);

                                                                }
                                                                else if (obj.ResponseCode == '1000') {
                                                                           loading.style.display = "none";
									
                                                                           getfile.style.display = "block";
                                                                           hreflink.href = downloadfile;
									   pick.style.display = "none";
                                                                } else {
                                                                    alert("Login failed. Please check username & password! " );

                                                                }
                                                                document.getElementById('loading').style.display = "none";


                                 },
                                 error: function (xhr, ajaxOptions, thrownError) { //Add these parameters to display the required response
                                  //alert(thrownError);
                                    document.getElementById('loading').style.display = "none";
                                        alert("Oops! Something went wrong.");

                                                        var obj = $.parseJSON(xhr.responseText);
                                                        var getobj = obj.Response;
                                                                //alert(getobj.ResponseCode);
                                                                alert("Oops! Something went wrong!.");


                                         },
                          });
						  
 }
  
	function WinnerListALL() {
       OpenModal2();

		var user = 'retcon';
		var password = 'R3tC0N';
		var concat = Base64.encode(user + ":" + password);
        var list  = document.getElementById("ListHere");
		var table = document.getElementById("phptable").value + "-winners";
		var content = document.getElementById("content");
		
			
		var title = unescape(document.getElementById("phptitle").value);
			title =  "Prize|" + title.replace(/\+/g, " ");
			//alert(title);
        var fieldreportsbody2 = unescape(document.getElementById("phpreportsbody").value);
		
		var action	= "http://112.206.234.26/SwissKnife_dev_stage/databank.cgi";
		var post_data = '{ "method" : "getlist" , "data" : { "table" : "'+ table +'", "fieldName" : "tblID", "lookup" : " " , "operator" : "!="  , "orderby" : "timestamp" , "orderbyarrange" : "DESC"  }}';
		
			$.ajax({
				url: 'http://112.206.234.26/SwissKnife_dev_stage/index.cgi',
				type: "POST",
				dataType: "json",
				crossDomain: true,
				headers: { 'Basic': concat, 'Action': action },
				data:  post_data,
				contentType: 'application/json; charset=utf-8',
				success: function (data) {
							var obj = data.Response;
							var remarks = obj.Remarks;
							var objmethod = data.methodResponse;
							var queryList = objmethod.queryList;
							//var table = $('#myTable');
						
							if (obj.ResponseCode != '1000') {
								
									alert(obj.Remarks);
 	   						    
								}
								else if (queryList[0].error) {
									alert("Login failed. Please check username & password! " );
	   						    
								}  else if (obj.ResponseCode == '1000') {
									  
									var d = "<table>";  
									var titlesplit = title.split("|"); 	
											
										for (var i=0; i<queryList.length; i++){
										
																					
												    var keysplit = title.split("|");
													var pt = 1;	
											        var h = queryList[i];
												    Object.keys(h).forEach(function(key) {
													  
													  			
																if ((key == "id")|| (key == "tblid")|| (key == "limitcnt")|| (key == "remarks")) {
																	  
																  } else {
																		   var outt= (pt++-1);	 				      
																		 	d +=  "<td class=rowspan id=rowspan" +  outt +">"  + keysplit[(outt)] + "</td><td class=rowspan id=rowspan" +  outt +">" + h[key] +
																			"</td></tr>";
																			
																  }
																  
												  })
																							  
									    }

										
									content.innerHTML =   "<input type=button class='btn btn-primary' id=pick style='float:left;width:20%;height:40px;' onclick='exporttocsvALL();' value='Request Download'><br /><div id='downloadfile' style=display:none><a href=# id=downloadlink><input  type=button value='Get File' class='btn btn-primary'  style='height:40px;width:25%;background-color:#FFFFFF;color:#bd3a26;font-size: 16px;padding: 10px 20px 10px 20px;border:solid #bd3a26 2px;text-decoration: none;'></a></div>"  + "<br />" + d + "</table>"; 
									
									    
										
								} else {
								    alert("Login failed. Please check username & password! " );
    	   						  
								}
								//document.getElementById('loading').style.display = "none";
								
 
				 },
				 error: function (xhr, ajaxOptions, thrownError) { //Add these parameters to display the required response
				  //alert(thrownError);
				    document.getElementById('loading').style.display = "none";
					alert("Oops! Something went wrong.");
					
							var obj = $.parseJSON(xhr.responseText);
							var getobj = obj.Response;
								//alert(getobj.ResponseCode);
								alert("Oops! Something went wrong!.");
						

					 },
			  });
			  

	}
	
	    function exporttocsvALL() {
	
   	    var user = 'retcon';
        var password = 'R3tC0N';
        var concat = Base64.encode(user + ":" + password);
        var action  = "http://112.206.234.26/SwissKnife_dev_stage/databank.cgi";
        var table = document.getElementById("phptable").value + "-winners";
        var orderfield = document.getElementById("orderbyarrange").value;
        var order = document.getElementById("order").value;
		var downloadbody = unescape(document.getElementById("downloadbody").value);
        var downloadtitle = unescape(document.getElementById("downloadtitle").value);
		var format = downloadtitle.replace(/\+/g, " ");
		var loginuser = document.getElementById("username").value;
	    var equal = "\' \'";
	
		var post_data = '{ "method" : "downloadfile" , "data" : { "table" : "' + table + '", "fieldName" : "' + loginuser +'" ,"field1" : "'+  order  +'" , "orderby" : "'+  orderfield  +'" ,  "field2" : "tblID" , "tblfields" : "' + downloadbody + '" , "titlefields" : "' + format + '" , "value2" : "' + equal +'" ,  "operator" : "!="  }}';


								var loading = document.getElementById('loading');
								var hreflink = document.getElementById("downloadlink");

                                loading.style.display = "block";
                                $.ajax({
                                url: 'http://112.206.234.26/SwissKnife_dev_stage/index.cgi',
                                type: "POST",
                                dataType: "json",
                                crossDomain: true,
                                headers: { 'Basic': concat, 'Action': action },
                               	data:  post_data,
                                contentType: 'application/json; charset=utf-8',
                                success: function (data) {
                                                        var obj = data.Response;
                                                        var remarks = obj.Remarks;
                                                        var objmethod = data.methodResponse;
                                                        var totalRegistered = objmethod.totalRegistered;
                                                        var downloadfile = objmethod.filename;
														var getfile = document.getElementById("downloadfile");
														var pick = document.getElementById("pick");
	
                                                                if (obj.ResponseCode != '1000') {
                                                                        loading.style.display = "none";
                                                                        alert(obj.Remarks);

                                                                }
                                                                else if (obj.ResponseCode == '1000') {
                                                                           loading.style.display = "none";
									
                                                                           getfile.style.display = "block";
                                                                           hreflink.href = downloadfile;
																			pick.style.display = "none";
                                                                } else {
                                                                    alert("Login failed. Please check username & password! " );

                                                                }
                                                                document.getElementById('loading').style.display = "none";


                                 },
                                 error: function (xhr, ajaxOptions, thrownError) { //Add these parameters to display the required response
                                  //alert(thrownError);
                                    document.getElementById('loading').style.display = "none";
                                        alert("Oops! Something went wrong.");

                                                        var obj = $.parseJSON(xhr.responseText);
                                                        var getobj = obj.Response;
                                                                //alert(getobj.ResponseCode);
                                                                alert("Oops! Something went wrong!.");


                                         },
                          });
						  
 }


	function logout() {
		
	   if (confirm("Are you sure you want to logout?")) {
			txt = "Session Ended!";
			alert(txt);
			window.location="logout.php";
			
		}  else {
			//txt = "You pressed Cancel!";
			alert(txt);
		}			
            	   
	}


