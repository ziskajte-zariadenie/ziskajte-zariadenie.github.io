<?php
$partnerKey = '123456789';

$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE);
$clickID = urldecode($input['click_id']);
$key = $input['key'];

$secret = $key.$partnerKey;
$cipher = "aes-256-cbc";
if ( !empty($key) ) {
    if (in_array($cipher, openssl_get_cipher_methods()))
    {
        $iv = 'abc1231231231231';
        $clickID = openssl_decrypt($clickID, $cipher, $secret, 0, $iv);
    }
}


$partnerID = 2;
$serviceID = 2;
$str = $clickID.$partnerID.$serviceID.$partnerKey;

$newKey =  hash('sha256', $str);
$newKey = strtolower($newKey);
$jsonData = array(
    'click_id' => $clickID,
    'partner_id' => $partnerID,
    'service_id' => $serviceID,
    'key' => $newKey
);
$jsonData = json_encode($jsonData);
$phoneDictionary = array(
    '270004724' => [
        '909950999'
    ],
    '270004720' => [
        '909950111'
    ],'270004721' => [
        '909950950'
    ],
    '270004722' => [
        '909957007'
    ]
);



$ch = curl_init();

curl_setopt($ch, CURLOPT_URL,"http://159.69.208.155/cnd/phone");
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$server_output = curl_exec($ch);

echo replacePhone($server_output, $phoneDictionary);
curl_close ($ch);


function replacePhone($phoneJSON, $phoneArr) {
    $returnPhone = [];
    if ( count($phoneJSON) > 0 ) {
        $json = json_decode($phoneJSON);
        $phone = $json->Phone;
        $returnPhone = json_encode(array('Phone' => $phoneArr[$phone][0]));
    }

    return $returnPhone;
}