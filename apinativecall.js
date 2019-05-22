var apiUrl = "https://cors-destroyer.herokuapp.com/http://112.206.234.26/SwissKnife_dev_stage/index.cgi";
var username = "retcon";
var password = "R3tC0N";
var actionPoint = "http://127.0.0.1/SwissKnife_dev_stage/databank.cgi";
var dataToPass ={
    "method":"searchTwoField",
    "data":{
        "table":"SMART-natcon",
        "field1":"field1",
        "value1":"FTEL0006",
        "operator":"AND",
        "field2":"field1",
        "value2":"FTEL0006"
    }
}


function pullData(){
    var pull = document.querySelector('#test');
    pull.click();
    var x = new XMLHttpRequest();
    x.open("POST",  apiUrl, true);
    x.setRequestHeader("Basic", btoa(username +":"+ password));
    x.setRequestHeader("Action", actionPoint);
    x.onreadystatechange = function(){
        if (x.readyState != 4 || x.status != 200){
            xmldata = x.responseText;
            xmldata.replace(/\\n/g, "\\n")  
                            .replace(/\\'/g, "\\'")
                            .replace(/\\"/g, '\\"')
                            .replace(/\\&/g, "\\&")
                            .replace(/\\r/g, "\\r")
                            .replace(/\\t/g, "\\t")
                            .replace(/\\b/g, "\\b")
                            .replace(/\\f/g, "\\f");
            xmldata = xmldata.replace(/[\u0000-\u0019]+/g,"");
            test = JSON.parse(xmldata);
            console.log(test);
        }
    };
    
    x.send(JSON.stringify(dataToPass));
    
}



