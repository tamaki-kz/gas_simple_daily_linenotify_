function check(){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName('data');
  var day = '日月火水木金土'[new Date().getDay()];
  var ar = sh.getRange(2, 1, sh.getLastRow()-1, 3).getValues();
  for( i=0; i<ar.length; i++ ){
    if( ar[i][1] == day ){ // 曜日が一致
      if ( ar[i][0]=='ALL' | ar[i][0]==Math.floor((new Date().getDate() + 6 ) / 7) ){ //週も一致
        //該当メッセージを送信
        sendHttpPost(ar[i][2]);
      }
    }
  }
}

function sendHttpPost(message){
  var token = UserProperties.getProperty('LINENOTIFY_FAMILY');
  var options =
   {
     "method"  : "post",
     "payload" : "message=" + message,
     "headers" : {"Authorization" : "Bearer "+ token}
   };
   UrlFetchApp.fetch("https://notify-api.line.me/api/notify",options);
}
