<?php

if ($_SERVER["REQUEST_METHOD"] == "POST")
{
    // include http_response_code() function if it doesn't exist
    if (!function_exists('http_response_code'))
    {
        include_once('../include/http_response_code.php');
    }

    if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL))
    {
        http_response_code(500);
        echo 'Invalid email address.';
        exit;
    }
    $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);

    $link = mysql_connect("localhost", "feeshaeg_wmaster", "ZCub{bF#prKTd2e");
        mysql_select_db("feeshaeg_feesha");
        $query = 'INSERT INTO `subscribe-emails`(`E-mail`) VALUES ("' . mysql_real_escape_string($email) . '")';
        mysql_query($query);
        mysql_close($link);

    http_response_code(200);
    echo 'Thanks for your subscription!';
}