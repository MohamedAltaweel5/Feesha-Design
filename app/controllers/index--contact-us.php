<?php

if ($_SERVER["REQUEST_METHOD"] == "POST")
{
    $name       = str_replace(array('\r', '\n'), array('name', ' '), strip_tags(trim($_POST['name'])));
    $email_from = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
    $message    = trim($_POST['message']);
    
    // include http_response_code() function if it doesn't exist
    if (!function_exists('http_response_code'))
    {
        include_once('../include/http_response_code.php');
    }
    
    if (empty($name) || empty($message) || !filter_var($email_from, FILTER_VALIDATE_EMAIL))
    {
        http_response_code(500);
        echo 'Oops! There was a problem with your submission. Please complete the form and try again.';
        exit;
    }
    
    include_once('../config/contact-info.php');
    $email_to = $feesha_email_info;
    
    $subject = "New contact from: $name";
    
    $email_content  = "Name: $name\n";
    $email_content .= "Email: $email_from\n\n";
    $email_content .= "Message:\n$message\n";
    
    $header = "From: $name <$email_from>";
    
    if (mail($email_to, $subject, $email_content, $header))
    {
        http_response_code(200);
        echo "Thank You! Your message has been sent.";
    }
    else
    {
        http_response_code(500);
        echo "Oops! Something went wrong and we couldn't send your message.";
    }
    
    $link = mysql_connect("localhost", "feeshaeg_wmaster", "ZCub{bF#prKTd2e");
        mysql_select_db("feeshaeg_feesha");
        $query = 'INSERT INTO `contact-us-emails`(`Name`, `E-mail`) VALUES ("' . mysql_real_escape_string($name) . '","' . mysql_real_escape_string($email_from) . '")';
        mysql_query($query);
        mysql_close($link);
}
else
{
    // Not a POST request, set a 403 (forbidden) response code.
    http_response_code(403);
    echo "There was a problem with your submission, please try again.";
}