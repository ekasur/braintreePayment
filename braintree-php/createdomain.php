
<?php
require_once 'lib/Braintree.php';
$gateway = new Braintree\Gateway([
    'environment' => 'braintree.Environment.Sandbox',
    'merchantId' => '',
    'publicKey' => '',
    'privateKey' => ''
]);


$response = $gateway->applePay()->registerDomain("demo.devnodejs.com");
print_r($response->applePayOptions->domains);