<?
//     ____           __            ________   
//    / __/_  _______/ /__   ____  / __/ __/   
//   / /_/ / / / ___/ //_/  / __ \/ /_/ /_     
//  / __/ /_/ / /__/ ,<    / /_/ / __/ __/     
// /_/  \__,_/\___/_/|_|   \____/_/ /_/   

function x25_file_ver($fn)
{

	if(!is_file($fn.".ver"))
		file_put_contents($fn.".ver", "1 ".filemtime($fn));
	$c=explode(" ",file_get_contents($fn.".ver"));
	
	$curver=file_get_contents($fn.".ver");
	$curver=explode(" ",$curver);
	$curver=$curver;
	if(filemtime($fn)!=$curver[1])
	{
		file_put_contents($fn.".ver", (++$curver[0])." ".filemtime($fn));
	}
	else 
	{
		return "0.0.".$curver[0];
	}
	return "0.0.".$curver[0]++;
}
function mlog($msg)
{
	global $app;
	
	if(!strstr($msg,"\n"))
		$msg.="\r\n";
	$file="ext.txt";
	$fp=fopen($file, "a+");
	if(!$fp)
	{
		echo("mlog failed $file");
		$fail = true;
	}

	fwrite($fp, date("H:i:s")." ".$msg);
	fclose($fp); 
	return;
}

function x25_base64_decode($input) 
{
	$keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	$chr1 = $chr2 = $chr3 = "";
	$enc1 = $enc2 = $enc3 = $enc4 = "";
	$i = 0;
	$output = "";

	$input = str_replace("М", "M", $input);
	//mlog("\r\n2decode [$input]\r\n");
 	// remove all characters that are not A-Z, a-z, 0-9, +, /, or =
	$input = preg_replace("#[^A-Za-z0-9\+\/\=]*#Usmi", "", $input);

	do 
	{
		$enc1 = strpos($keyStr, substr($input, $i++, 1));
		$enc2 = strpos($keyStr, substr($input, $i++, 1));
		$enc3 = strpos($keyStr, substr($input, $i++, 1));
		$enc4 = strpos($keyStr, substr($input, $i++, 1));

		$chr1 = ($enc1 << 2) | ($enc2 >> 4);
		$chr2 = (($enc2 & 15) << 4) | ($enc3 >> 2);
		$chr3 = (($enc3 & 3) << 6) | $enc4;

		$output = $output . chr((int) $chr1);

		if ($enc3 != 64) {
			$output = $output . chr((int) $chr2);
		}
		if ($enc4 != 64) {
			$output = $output . chr((int) $chr3);
		}

		$chr1 = $chr2 = $chr3 = "";
		$enc1 = $enc2 = $enc3 = $enc4 = "";

	} while ($i < strlen($input));

	return urldecode($output);
}

?>
