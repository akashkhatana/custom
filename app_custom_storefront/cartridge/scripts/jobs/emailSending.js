importPackage( dw.net );
importPackage( dw.system );
var CustomObjectMgr = require('dw/object/CustomObjectMgr');


module.exports={ sendMail: function sendMail() {
     
     var mail: Mail = new dw.net.Mail();
     mail.addTo("bhushan.sachdev@publicissapient.com,bhushanchauhan477@gmail.com");
     mail.setFrom("from@example.org");
     mail.setSubject("Example Email");
     // sets the content of the mail as plain string
     
     var CustomObject = CustomObjectMgr.getCustomObject('CustomerQueries','email');           
     var message =  CustomObject.message 
     mail.setContent(message);
          
     mail.send();
}
}