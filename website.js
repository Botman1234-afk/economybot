const http = require('http');
const mysql = require('mysql');
const fs = require('fs')
const pool = mysql.createPool({
  host: '127.0.0.1',
	user: 'root',
	password: 'latehome4',
	database: 'discord',
	charset: 'utf8mb4',
});

//html string that will be send to browser
var reo ='<html><head><title>Softwaresat Bot Database Search</title> <link rel="icon" href="softwaresatbotlogo.jpg" type="image/icon type"></head><body><h1 style="text-align:center;">Softwaresat Bot Database Search</h1><a style = "text-align:center;"href="http://softwaresat.onthewifi.com/players">Search User Profile</a>{${table}}</body></html>';

//sets and returns html table with results from sql select
//Receives sql query and callback function to return the table
let sql ="SELECT DISTINCT * from profiles where name != 'bank' order by coins DESC;";

function setResHtml(sql, cb){
  
  pool.getConnection((err, con)=>{
    if(err) throw err;

    con.query(sql, (err, res, cols)=>{
      if(err) throw err;

      var table =''; //to store html table

      //create html table with data from res.
      for(var i=0; i<res.length; i++){
        table +='<tr><td>'+ (i+1) +'</td><td>'+ res[i].name +'</td><td>'+ res[i].coins +'</td><td>'+ res[i].deposit +'</td></tr>';
      }
      table ='<table border="1" style="margin-left:auto;margin-right:auto;"><tr><th>Rank</th><th>Name</th><th>Coins</th><th>Deposit</th></tr>'+ table +'</table>';

      con.release(); //Done with mysql connection

      return cb(table);
    });
  });
}

function setUserHtml(sql, cb){

  pool.getConnection((err, con)=>{
    if(err) throw err;

    con.query(sql, (err, res, cols)=>{
      if(err) throw err;

      var table =''; //to store html table

      //create html table with data from res.
        table +='<tr><td>'+ res[0].userid +'</td><td>'+ res[0].name +'</td><td>'+ res[0].coins +'</td><td>'+ res[0].deposit +'</td><td>'+ res[0].loan +'</td><td>'+ res[0].paidback +'</td><td>'+ res[0].job +'</td><td>'+ res[0].lastworkeddate +'</td><td>'+ res[0].lastdaily +'</td><td>'+ res[0].computer +'</td><td>'+ res[0].bonds +'</td><td>'+ res[0].smallhouse +'</td><td>'+ res[0].mediumhouse +'</td><td>'+ res[0].largehouse +'</td><td>'+ res[0].smallmansion +'</td></tr>';
      
      table ='<table border="1" style="margin-left:auto;margin-right:auto;"><tr><th>Userid</th><th>Name</th><th>Coins</th><th>Deposit</th><th>Loan</th><th>Paid Back</th><th>Job</th><th>Last Worked Date</th><th>Last Daily Date</th><th>Computers</th><th>Bonds</th><th>Small House</th><th>Medium House</th><th>Large House</th><th>Small Mansion</th></tr>'+ table +'</table>';

      con.release(); //Done with mysql connection

      return cb(table);
    });
  });
}
function setServerHtml(sql, cb){

  pool.getConnection((err, con)=>{
    if(err) throw err;

    con.query(sql, (err, res, cols)=>{
      if(err) throw err;

      var table =''; //to store html table

      //create html table with data from res.
        table +='<tr><td>'+ res[0].id +'</td><td>'+ res[0].servername +'</td><td>'+ res[0].warn +'</td><td>'+ res[0].dm +'</td><td>'+ res[0].invitationback +'</td><td>'+ res[0].kickthreshold +'</td><td>'+ res[0].autokick +'</td><td>'+ res[0].autodelete +'</td><td>'+ res[0].autorole +'</td><td>'+ res[0].welcomechannel +'</td><td>'+ res[0].logchannel +'</td><td>'+ res[0].prefix +'</td><td>'+ res[0].counter +'</td><td>'+ res[0].autorespond +'</td></tr>';
      
      table ='<table border="1" style="margin-left:auto;margin-right:auto;"><tr><th>Id</th><th>Name</th><th>Warn</th><th>Dm</th><th>Invitation Back</th><th>Kick Threshold</th><th>Auto Kick</th><th>Auto Delete</th><th>Auto Role</th><th>Welcome Channel</th><th>Log Channel</th><th>Prefix</th><th>Counter</th><th>Autorespond</th></tr>'+ table +'</table>';

      con.release(); //Done with mysql connection

      return cb(table);
    });
  });
}
sql ="SELECT DISTINCT * from profiles where name != 'bank' order by coins DESC;";


//create the server for browser access
const server = http.createServer(async (req, res)=>{
  switch (req.url) {
    case "/":
      fs.readFile(__dirname + "/index.html", function (err,data){ 
        if (err) {  
          res.writeHead(404);  
          res.write(error);  
          res.end();  
      } else {  
          res.writeHead(200, {  
              'Content-Type': 'text/html'  
          });  
          res.write(data);  
          res.end();  
      }  
      })
    break
    case "/glb":
      sql ="SELECT DISTINCT * from profiles where name != 'bank' order by coins DESC;";

      setResHtml(sql, resql=>{
        reo = reo.replace('{${table}}', resql);
        res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
        res.write(reo, 'utf-8');
        res.end();
        
      });
      break
    case "/players":
       fs.readFile(__dirname + "/website.html", function (err,data){ 
        if (err) {  
          res.writeHead(404);  
          res.write(error);  
          res.end();  
      } else {  
          res.writeHead(200, {  
              'Content-Type': 'text/html'  
          });  
          res.write(data);  
          res.end();  
      }  
      })
    break
    case "/servers":
       fs.readFile(__dirname + "/server.html", function (err,data){ 
        if (err) {  
          res.writeHead(404);  
          res.write(error);  
          res.end();  
      } else {  
          res.writeHead(200, {  
              'Content-Type': 'text/html'  
          });  
          res.write(data);  
          res.end();  
      }  
      })
      console.log(req.url)

    break
}
 if(req.method === 'POST' && req.url == '/details'){
   console.log(req.url)
  let body = '';

	req.on('data', (data) => {

		body += data;

	});


	req.on('end', () => {
     sql ="SELECT DISTINCT * from profiles where name = ?;";
     sql = sql.replace('+', ' ');

    sql = sql.replace('?', "'"+body.substr(9,)+"'");

    setUserHtml(sql, resql=>{
      reo ='<html><head><title>Userinfo</title></head><body><h1 style="text-align:center;">Userinfo</h1>{${table}}</body></html>';
      reo = reo.replace('{${table}}', resql);
      res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
      res.write(reo, 'utf-8');
      res.end();
      res.write(reo, 'utf-8');

    });
    
	});
}
if(req.method === 'POST' && req.url == '/serverinfo'){
  console.log(req.url)
 let body = '';

 req.on('data', (data) => {

   body += data;

 });


 req.on('end', () => {
    sql ="SELECT DISTINCT * from settings where servername = ?;";

   sql = sql.replace('?', "'"+body.substr(9,)+"'");
   sql = sql.replace('+', ' ');

   setServerHtml(sql, resql=>{
     reo ='<html><head><title>Serverinfo</title></head><body><h1 style="text-align:center;">Serverinfo</h1>{${table}}</body></html>';
     reo = reo.replace('{${table}}', resql);
     res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
     res.write(reo, 'utf-8');
     res.end();
     res.write(reo, 'utf-8');

   });
  
 });
}
});

server.listen(80, ()=>{
  console.log('Server running at //localhost:80/');
});