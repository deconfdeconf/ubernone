//     ____    √¤☻♥☺          √¤☻♥☺     __            ________   
//    / __/_  _______/ /__   ____  / __/ __/   
//   / /_/ / / / ___/ //_/  / __ \/ /_/ /_     
//  / __/ /_/ / /__/ ,<    / /_/ / __/ __/     
// /_/  \__,_/\___/_/|_|   \____/_/ /_/  
var userID, turn = -4;
var curcheck, addhaha = 'ok click ->PING<- to get ur viral info';
var playscore = [];

function changeFucker()
{
   x25('#banner').css("color", '#' + (999999 * Math.random()) % 0xffffff);
   x25('#banner').css("transform", 'rotate(' + (-5 + (15 * Math.random()) % 5) + "deg)");
   x25('#banner').css("font-size", parseInt((8 + (25 * Math.random()) % 5)) + "px");
   setTimeout(changeFucker, (Math.random() * 100000) % 1500);
}

function x25_initialize()
{
   console.log("x25_initialize()");
   setTimeout(changeFucker, 1256);
   assignUserID();
   x25('#aping').click(function(d)
   {
      pingserver(function(data)
      {
         var d = data.split(":");
         var len = d[0];
         var msg = d[1];

         if(x25('#iwannaplay'))
            curcheck = x25('#iwannaplay').prop('checked');

         x25('#msgdiv').empty().html(
            "ping OK [contaminated data follows] <label for=iwannaplay>(iwannaplay<input title='dont click. ' id=iwannaplay name=iwannaplay type=checkbox >)</label><br/><br/><div id=pingreply style='color:blue'>" +
            msg + "</div>");

         if(++turn >= 11)
         {
            addhaha =
               "<br/><strong>You are real 'The 4th program' looooser first (<span style='color:red'>no matter won u or not in next message</span>).<br/> Vhat next? Disconnect hidden gov service s, and try again.</strong><br/>But first lets look what u represent for code of 'The 4th program': ";
            for(var i in playscore)
            {

               if(playscore[i] == -1)
                  addhaha += " wow! a passive gay! ";
               else if(playscore[i] == 3)
                  addhaha += " really? ";
               else if(playscore[i] == -3)
                  addhaha += " wish #1 ";
               else if(playscore[i] == 1)
                  addhaha += " and active gay! ";
               else if(playscore[i] == 0)
                  addhaha += " try to link then ";
               else if(playscore[i] == -2 || playscore[i] == 2)
                  addhaha += " are u an agent? ";
               else if(playscore[i] == -4 || playscore[i] == 4)
                  addhaha += " m*n3y r1pp3r ";
               else if(playscore[i] == 5)
                  addhaha += " enough ";
               else if(playscore[i] == -6 || playscore[i] == 6)
                  addhaha += " covering prefs of? ";
               else if(playscore[i] == 7)
                  addhaha += " dive & die ";
               else if(playscore[i] == 8)
                  addhaha += " almost dead ";
               else if(playscore[i] == 9)
                  addhaha += " what next? ";
               else
                  addhaha += " dest unknown ";
            }
            if(!playscore.length)
               addhaha +=
            " nothing at all, try to <strong>reset all human connections</strong> first, then try again. ";
            x25('#msgdiv').append(addhaha);
            turn = -4;
            playscore = [];
         }

         x25('#iwannaplay').click(function()
         {
            x25('#msgdiv').append(addhaha);
         });

         x25('#iwannaplay').prop('checked', curcheck);

         if(x25('#iwannaplay').prop('checked') == true)
         {
            var str = data.replace(/\r\n/g, "");
            var result = (parseFloat(str.length) % parseFloat(8.0));
            if(parseFloat(result) == len)
            {
               x25('#msgdiv').append(
                  "<div class=statusgreen>YOU WIN!!! you made this at turn #" +
                  turn +
                  " <br/><span id=micromsg>(sides: " + str.length +
                  " channel_sync: " + result + "%)</span></div>");
               if(turn == -3)
                  x25('#msgdiv').append(
                     "<span id=micromsg>[-ki11]</span>");
               if(turn == -2)
                  x25('#msgdiv').append(
                     "<span id=micromsg>[+re @5. m wishes]</span>"
                  );
               if(turn == -1)
                  x25('#msgdiv').append("<span id=micromsg>[+u passive gay (did u know?)]</span>");
               if(turn == 0)
                  x25('#msgdiv').append(
                     "<span id=micromsg>[+The and d13 ]</span>"
                  );
               if(turn == 1)
                  x25('#msgdiv').append("<span id=micromsg>[+u active gay]</span>");
               if(turn == 2)
                  x25('#msgdiv').append(
                     "<span id=micromsg>[-human]</span>");
               if(turn == 3)
                  x25('#msgdiv').append(
                     "<span id=micromsg>[+self[d3]struct]</span>");
               if(turn == 4)
                  x25('#msgdiv').append("<span id=micromsg>[+hw much?!]</span>");
               if(turn == 5)
                  x25('#msgdiv').append("<span id=micromsg>[+de_dust2k2 3x3]</span>");
               if(turn == 6)
                  x25('#msgdiv').append(
                     "<span id=micromsg>[+26: no entry]</span>");
               if(turn == 7)
                  x25('#msgdiv').append(
                     "<span id=micromsg>[+real chelsea idiot]</span>"
                  );
               if(turn == 8)
                  x25('#msgdiv').append("<span id=micromsg>[-d1e?]</span>");
               if(turn == 9)
                  x25('#msgdiv').append(
                     "<span id=micromsg>[-GROUP BY money]</span>");
               if(turn == 10)
               	x25('#msgdiv').append("<span id=micromsg>[+spO]</span>");
               playscore.push(turn);
               turn--;

            }
            else
            {
               if((Math.random()) > 0.7)
                  addhaha = "again...";
               else if((Math.random()) < 0.3)
                  addhaha = "but maybe not..";
               else
               	addhaha = "...";
               x25('#msgdiv').append("<div class=statusred>turn #" + turn +
                  ": you lose...." + addhaha + " <br/><span id=micromsg>(sides: " +
                  str.length +
                  " | src: " + len + " | channel[-de]sync: " + result + "% & " + len +
                  "%)</span></div>");
            }
         }
         else
         {
            console.log("wannaPL? " + x25('#iwannaplay').prop('checked'));
         }

      });

   });
   x25('#aregme').click(function(d)
   {
      regme(function(d)
      {
         console.log(d);
         x25('#huserid').html("[" + userID + "]");
         x25('#msgdiv').html("new ID generated: <span style='color:blue'>" + d +
            "</span>");
      });
   });
   x25('#aupdate').click(function(d)
   {
      updateCoreEngine(true, function(dataSet, status)
      {
         if(status)
         {
            x25('#msgdiv').html("updated to ver " + (dataSet.coreVER ? dataSet.coreVER :
               "unknown") + ", len " + (dataSet.coreENGINE ? dataSet.coreENGINE.length :
               "<unknown>"));
         }
         else x25('#msgdiv').html("already latest version [" + dataSet.coreVER + "]");
      });
   });
   x25('#aclear').click(function(d)
   {
      clearStorage();
      x25('#msgdiv').html("storage cleared");
      x25('#huserid').html("[none]");
      userID = null;
   });
   x25('#banner').html(x25('#banner').html().replace(/#/, (Math.random() * 999999888999999) %
      9999999999999));
}
var x25 = {};
x25 = jQuery.noConflict(true);
window.addEventListener("load", x25_initialize);
// document.addEventListener("DOMContentLoaded", function()
// {
//    console.log("DOMContentLoaded()");
//    var content;
//    content = x25('#banner')
//       .html();
// });
// chrome.browserAction.onClicked.addListener(function(tab)
// {
//    console.log("ext clicked");
//    chrome.tabs.executeScript(
//    {
//       code: 'document.body.style.backgroundColor="red"'
//    });
// });
