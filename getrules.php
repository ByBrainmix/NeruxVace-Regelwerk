<?php

  if(isset($_GET['page'])) {
    $content = 'some random content';

    $path = './sites/' . $_GET['page'] . '.md';

    if(file_exists($path)) {
      $content = file_get_contents($path);
      echo $content;
    } else {
      $content = file_exists('./sites/error404.md') ? file_get_contents('./sites/error404.md') : '#Error 404';
      $content = str_replace('%site%', $_GET['page'], $content);
      echo $content;
    }

  }

 ?>
