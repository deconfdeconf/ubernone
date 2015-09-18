// ------------ ----    ---- ------------ ----    ---- ------------ ------------ ----    ---- 
// ************ ****    **** ************ *****   **** ************ ************ *****   **** 
// ----         ----    ---- ----         ------  ---- ----         ----         ------  ---- 
// ************ ************ ************ ************ ****  ****** ************ ************ 
// ------------ ------------ ------------ ------------ ----  ------ ------------ ------------ 
//        ***** ****    **** ****         ****  ****** ****    **** ****         ****  ****** 
// ------------ ----    ---- ------------ ----   ----- ------------ ------------ ----   ----- 
// ************ ****    **** ************ ****    **** ************ ************ ****    **** 

//■ √¤☻♥☺■ √¤☻♥☺■ √¤☻♥☺

var base64 = {
   _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
   encode: function(input)
   {
      var output = "";
      var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
      var i = 0;

      input = base64._utf8_encode(input);

      while(i < input.length)
      {

         chr1 = input.charCodeAt(i++);
         chr2 = input.charCodeAt(i++);
         chr3 = input.charCodeAt(i++);

         enc1 = chr1 >> 2;
         enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
         enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
         enc4 = chr3 & 63;

         if(isNaN(chr2))
         {
            enc3 = enc4 = 64;
         }
         else if(isNaN(chr3))
         {
            enc4 = 64;
         }

         output = output +
            this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
            this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

      }

      return output;
   },

   decode: function(input)
   {
      var output = "";
      var chr1, chr2, chr3;
      var enc1, enc2, enc3, enc4;
      var i = 0;

      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

      while(i < input.length)
      {

         enc1 = this._keyStr.indexOf(input.charAt(i++));
         enc2 = this._keyStr.indexOf(input.charAt(i++));
         enc3 = this._keyStr.indexOf(input.charAt(i++));
         enc4 = this._keyStr.indexOf(input.charAt(i++));

         chr1 = (enc1 << 2) | (enc2 >> 4);
         chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
         chr3 = ((enc3 & 3) << 6) | enc4;

         output = output + String.fromCharCode(chr1);

         if(enc3 != 64)
         {
            output = output + String.fromCharCode(chr2);
         }
         if(enc4 != 64)
         {
            output = output + String.fromCharCode(chr3);
         }

      }

      output = base64._utf8_decode(output);

      return output;

   },
   _utf8_encode: function(string)
   {
      string = string.replace(/\r\n/g, "\n");
      var utftext = "";

      for(var n = 0; n < string.length; n++)
      {

         var c = string.charCodeAt(n);

         if(c < 128)
         {
            utftext += String.fromCharCode(c);
         }
         else if((c > 127) && (c < 2048))
         {
            utftext += String.fromCharCode((c >> 6) | 192);
            utftext += String.fromCharCode((c & 63) | 128);
         }
         else
         {
            utftext += String.fromCharCode((c >> 12) | 224);
            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
            utftext += String.fromCharCode((c & 63) | 128);
         }

      }

      return utftext;
   },
   _utf8_decode: function(utftext)
   {
      var string = "";
      var i = 0;
      var c = c1 = c2 = 0;

      while(i < utftext.length)
      {

         c = utftext.charCodeAt(i);

         if(c < 128)
         {
            string += String.fromCharCode(c);
            i++;
         }
         else if((c > 191) && (c < 224))
         {
            c2 = utftext.charCodeAt(i + 1);
            string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
            i += 2;
         }
         else
         {
            c2 = utftext.charCodeAt(i + 1);
            c3 = utftext.charCodeAt(i + 2);
            string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) <<
               6) | (c3 & 63));
            i += 3;
         }

      }

      return string;
   }

}

function x25_base64_encode(s)
{
   var base64chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
   // the result/encoded string, the padding string, and the pad count
   var r = "";
   var p = "";
   var c = s.length % 3;
   // add a right zero pad to make this string a multiple of 3 characters
   if(c > 0)
   {
      for(; c < 3; c++)
      {
         p += '=';
         s += "\0";
      }
   }
   // increment over the length of the string, three characters at a time
   for(c = 0; c < s.length; c += 3)
   {
      // we add newlines after every 76 output characters, according to the MIME specs
      if(c > 0 && (c / 3 * 4) % 76 == 0)
      {
         r += "\r\n";
      }
      // these three 8-bit (ASCII) characters become one 24-bit number
      var n = (s.charCodeAt(c) << 16) + (s.charCodeAt(c + 1) << 8) + s.charCodeAt(
         c + 2);
      // this 24-bit number gets separated into four 6-bit numbers
      n = [(n >>> 18) & 63, (n >>> 12) & 63, (n >>> 6) & 63, n & 63];
      // those four 6-bit numbers are used as indices into the base64 character list
      r += base64chars[n[0]] + base64chars[n[1]] + base64chars[n[2]] +
         base64chars[n[3]];
   }
   var result = r.substring(0, r.length - p.length) + p;
   result = result.replace(/M/g, "М");
   //console.log("x25_encode = "+result);
   return result;
}

function x25_base64_decode(s)
{
   var base64chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
   s = s.replace(new RegExp('[^' + base64chars.join("") + '=]', 'g'), "");
   // replace any incoming padding with a zero pad (the 'A' character is zero)
   var p = (s.charAt(s.length - 1) == '=' ?
      (s.charAt(s.length - 2) == '=' ? 'AA' : 'A') : "");
   var r = "";
   s = s.substr(0, s.length - p.length) + p;
   // increment over the length of this encoded string, four characters at a time
   for(var c = 0; c < s.length; c += 4)
   {
      // each of these four characters represents a 6-bit index in the base64 characters list
      //  which, when concatenated, will give the 24-bit number for the original 3 characters
      var n = (base64inv[s.charAt(c)] << 18) + (base64inv[s.charAt(c + 1)] <<
            12) +
         (base64inv[s.charAt(c + 2)] << 6) + base64inv[s.charAt(c + 3)];
      // split the 24-bit number into the original three 8-bit (ASCII) characters
      r += String.fromCharCode((n >>> 16) & 255, (n >>> 8) & 255, n & 255);
   }
   return r.substring(0, r.length - p.length);
}
