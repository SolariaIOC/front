<?php

if($_POST && isset($_FILES['image'])){
    $assetsFolder = 'assets/uploaded/';
    move_uploaded_file($_FILES['image']['tmp_name'], $assetsFolder.$_FILES['image']['name']);
}