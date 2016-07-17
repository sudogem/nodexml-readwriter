var fs = require('fs');
//checks if the file exists.
//If it does, it just calls back.
//If it doesn't, then the file is created.
var checkForFile = function(fileName, callback)
{
  fs.exists(fileName, function (exists) {
    if(exists)
    {
      callback();
    }else
    {
      fs.writeFile(fileName, {flag: 'wx'}, function (err, data)
      {
        callback();
      })
    }
  });
}

var writeToFile = function(XMLfile, callback)
{
  checkForFile(XMLfile,function()
  {
     //It is now safe to write/read to file
     fs.readFile(XMLfile, function (err,data)
     {
        if(!err)
          callback(null, XMLfile);
        else
          callback(err);
     });
  });
}

exports.writeToFile = writeToFile;
exports.checkForFile = checkForFile;
