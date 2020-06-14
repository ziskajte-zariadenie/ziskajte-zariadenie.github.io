<?php

$partnerKey = '3wky5A6MGH';

$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE);
$clickID = urldecode($input['click_id']);
$msisdn = $input['msisdn'];
$key = $input['key'];
$solt = 'qQO4SSDBUBjicwkUfQqQ';

$secret = $key.$partnerKey;
$cipher = "aes-256-cbc";
if ( !empty($key) ) {
    if (in_array($cipher, openssl_get_cipher_methods()))
    {
        $iv = 'abc1231231231231';
        $clickID = openssl_decrypt($clickID, $cipher, $secret, 0, $iv);
    }
}

$str = $msisdn.$clickID.$solt;

$newKey =  hash('sha256', $str);
$newKey = strtolower($newKey);

$jsonData = array(
    'msisdn' => $msisdn,
    'click_id' => $clickID,
    'hash' => $newKey
);

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://mobstra.com/api/c_tel?msisdn=".$msisdn."&click_id=".$clickID."&hash=".$newKey,
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "GET",
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}