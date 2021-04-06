let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function showTime(){
    const date = new Date();
    return date.getHours()+"Hrs:"+date.getMinutes()+"Mins:"+date.getSeconds()+"Secs";
}

function makeAjaxCall(methodType, url, callBack, async=true, data=null){
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        // console.log(methodType+ " State Changed Called, Ready State: "+xhr.readyState+"  Status: "+ xhr.status);
        if(xhr.readyState === 4){
            if(xhr.status == 200 || xhr.status === 201){
                callBack(xhr.responseText);
            }else if (xhr.status >= 400 ){
                console.log("Handle 400 clint Error or 500 Server Error at: "+showTime());
            }
        }
    }
    xhr.open(methodType,url,async);
    if(data){
        console.log(JSON.stringify(data));
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
    }else xhr.send();
    console.log( methodType+" request sent to the server at: " +showTime());
}

const getUrl = "http://127.0.0.1:3000/employee";
function getUserDetails(data){
    console.log("Get User Data at: "+showTime()+" data: "+data);
}

makeAjaxCall("GET", getUrl, getUserDetails, true);
console.log("Made GET AJAX call to server at: "+showTime());

const deleteUrl = "http://127.0.0.1:3000/employee/1";
function deleteUserDetails(data){
    console.log("Delete User Data: " + data);
}

makeAjaxCall("DELETE", deleteUrl, deleteUserDetails, false);

const postUrl = "http://127.0.0.1:3000/employee";
const emplData = {"name": "Harry", "Salary": "49999"};
function postUserDetails(data){
    console.log("Add User Data: " + data);
}

makeAjaxCall("POST", postUrl, postUserDetails, true, emplData);

