var fs = require('fs');
var googleAuth = require('google-auth-library');
var google = require('googleapis')
var sendSampleMail = function(auth, email_lines , cb) {
    var gmailClass = google.gmail('v1');

   

    var email = email_lines.join('\r\n').trim();

    var base64EncodedEmail = new Buffer(email).toString('base64');
    base64EncodedEmail = base64EncodedEmail.replace(/\+/g, '-').replace(/\//g, '_');

    gmailClass.users.messages.send({
      auth: auth,
      userId: 'me',
      resource: {
        raw: base64EncodedEmail
      }
    }, cb);
  }
 var getOAuth2Client=function (cb) {
    // Load client secrets
    fs.readFile('client_secret.json', function(err, data) {
      if (err) {
        return cb(err);
      }
      var credentials = JSON.parse(data);
      var clientSecret = credentials.installed.client_secret;
      var clientId = credentials.installed.client_id;
      var redirectUrl = credentials.installed.redirect_uris[0];
      var auth = new googleAuth();
      var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

      // Load credentials
      fs.readFile('gmail-credentials.json', function(err, token) {
        if (err) {
          return cb(err);
        } else {
          oauth2Client.credentials = JSON.parse(token);
          return cb(null, oauth2Client);
        }
      });
    });
  }
var SendGmail = function(subject,to , msg){
  getOAuth2Client(function(err, oauth2Client) {
    if(err){
      console.log('err:', err);
    }else{
      var email_lines = [];
      email_lines.push('From: "test" <sweettemptations18@gmail.com>');
      email_lines.push('To: ' + to);
      email_lines.push('Content-type: text/html;charset=iso-8859-1');
      email_lines.push('MIME-Version: 1.0');
      email_lines.push('Subject:' + subject);
      var string = `<!DOCTYPE html>
                  <html>
                  <head>
                    <title>sweets temptations merida</title>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.0/css/materialize.min.css">
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Berkshire+Swash">
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Amatic+SC">
                  </head>
                  <body>
                    <style>
                      body{background-color: #eee;}
                      h1{font-family: 'Berkshire Swash', cursive; color: #351327;}
                      p{font-family: 'Amatic SC', cursive; color:  #3f2803;}
                      h4{color:#3f2803; }
                      a{color:#351327; }
                    </style>
                    <div class="container center">
                      <div class="card">
                        <div class="row center">
                          <div class="col s8 center offset-s2 " >
                            <img src="https://sweetstemptations-meridavzla.rhcloud.com/stactic/pictures/Logo.png" style="width: 200px; height: 150px;">
                          </div>
                        </div>
                        
                        <div class="row">
                          <div class="col s12 center">
                            <h1>` + subject + `</h1>
                         </div>
                        </div>
                        <div class="row">
                          <div class="content">
                            <p>
                              
                              ` + msg + `
                            </p>
                            <h4>Ingrensa a nuestro sitio web para completar el proceso</h4>
                            <a href="https://sweetstemptations-meridavzla.rhcloud.com/">Sweets temptations merida</a>

                          </div>
                          
                        </div>

                      </div>
                      
                      </div>
                    </div>

                    </div>
                  </body>
                  </html>
                            `
     
      email_lines.push('');
      if(subject != "Contact")       
        email_lines.push(string);
      else{
        email_lines.push("nombre" +pedido.name);
        email_lines.push("numero" +pedido.number);
        email_lines.push("email" +pedido.email);
        email_lines.push("Contenido" +pedido.content);
      }
      sendSampleMail(oauth2Client, email_lines, function(err, results) {
      if(err){
        console.log('err:', err);
      }else{
        console.log(results);
      }
      });
    }
  });
  

}

  module.exports = SendGmail;

    