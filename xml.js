// To run the app from command line simply execute the node command example:
// node xml.js
var XMLWriter = require('xml-writer'),
           fs = require('fs');
var h = require('./helper.js');
var filessystem = require('fs');
var path = require('path');
var configPath = path.join(__dirname, '/tmp/');
var dir = __dirname + '/tmp/';
if (!filessystem.existsSync(configPath)){
  filessystem.mkdirSync(configPath);
}

var createXmlFile = function(myXmlFile) {
  h.writeToFile(myXmlFile, function(err, file) {
    var ws = fs.createWriteStream(file);
    ws.on('close', function() {
      console.log(fs.readFileSync(file, 'UTF-8'));
    });
    xw = new XMLWriter(true, function(string, encoding) {
      ws.write(string, encoding);
    });

    xw.startDocument('1.0', 'UTF-8')
    .startElement('root')
    .writeAttribute('userID', '12345')
    .writeElement('firstname', 'john')
    .writeElement('lastname', 'doe')
    .writeElement('age', '30')
      .startElement('address')
      .writeElement('city', 'Cebu')
      .writeElement('country', 'PH')
      .endElement()
    .endElement()
    xw.endDocument();
  });
};

var readXmlFile = function(filePath) {
   var fs = require('fs');
   var xml2js = require('xml2js');
   var json;
   try {
       var fileData = fs.readFileSync(filePath, 'utf-8');
       var parser = new xml2js.Parser();
       parser.parseString(fileData.substring(0, fileData.length), function (err, result) {
         json = JSON.stringify(result);
       });
       console.log("File '" + filePath + "/ was successfully read.\n");
       return json;
   } catch (ex) {
     console.log(ex);
   }
}

// [1] create xml file
var myXmlFile = dir + 'foo.xml';
createXmlFile(myXmlFile); // write the generated xml file

// [2] read xml file
var myXmlFile = __dirname + '/data/foo.xml';
var json = readXmlFile(myXmlFile);
json = JSON.parse(json);
var data = json.root;
var fullname = data.firstname[0] + " " + data.lastname[0];
var address = data.address[0].city[0] + " " + data.address[0].country[0];
console.log(fullname);
console.log(address);
