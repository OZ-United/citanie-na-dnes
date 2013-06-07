<?php
$article = $_POST["article"];

$to1 = "me@example.com";

$subject = 'Chlieb náš každodenný';
$from = "Čítanie na dnes <citanienadnes@example.com>";

$message = '<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0"></head><body>';
$message .= $article;
$message .= '</body></html>';

$headers = "From:" . $from . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";


mail($to1, $subject, $message, $headers);

echo "received";