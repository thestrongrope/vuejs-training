<?php

$action = $_GET['action'] ?? null;

//  Query to create table
//  create table tasks(
//      id int primary key auto_increment,
//      task varchar(500),
//      status int default 0
//  );

$db = new PDO('mysql:host=localhost;dbname=demo', 'root', 'Mahdi@786');

header('Content-Type: application/json; charset=utf-8');

if ($action == 'getAll') {
    $stmt = $db->query('select * from tasks');
    $tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($tasks);
}

if ($action == 'add') {
    $json = file_get_contents('php://input');
    $task = json_decode($json);
    $q = $db->prepare('insert into tasks(task) values(:task)');
    $q->execute(
        [
            'task' => $task->task,
        ]
    );
    $q = $db->prepare('select * from tasks order by id desc limit 1');
    $q->execute();
    echo json_encode($q->fetch());
}

if ($action == 'complete') {
    $json = file_get_contents('php://input');
    $task = json_decode($json);
    $stmt = $db->prepare('update tasks set status = 1 where id=:id');
    $stmt->execute(
        [
            'id' => $task->id,
        ]
    );
    echo 1;
}

if ($action == 'delete') {
    $json = file_get_contents('php://input');
    $task = json_decode($json);
    $stmt = $db->prepare('delete from tasks where id=:id');
    $stmt->execute(
        [
            'id' => $task->id,
        ]
    );
    echo 1;
}
