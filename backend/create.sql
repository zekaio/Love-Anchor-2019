SET time_zone = "+08:00";

CREATE DATABASE IF NOT EXISTS love_anchor2020;

USE love_anchor2020;

CREATE TABLE IF NOT EXISTS anchors (
	`id` int(10) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
	`name`           VARCHAR(20)       NOT NULL DEFAULT '' COMMENT '选手姓名',
    `declaration`    TEXT              NULL COMMENT '选手宣言',
    `imgsrc`         VARCHAR(255)      NOT NULL DEFAULT '' COMMENT '选手照片',
    `audiosrc`       VARCHAR(255)      NOT NULL DEFAULT '' COMMENT '选手声音'
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS votes(
    `id`             INT AUTO_INCREMENT PRIMARY KEY        COMMENT 'ID',
    `user_id`        VARCHAR(255)      NOT NULL DEFAULT '' COMMENT '用户id',
    `anchor_id`      INT               NOT NULL DEFAULT 0  COMMENT '投票选手id',
    `created_at` 	 timestamp 		   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` 	 timestamp         NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS users(
    `id`             INT AUTO_INCREMENT PRIMARY KEY        COMMENT 'ID',
    `openid`         VARCHAR(255)      NOT NULL DEFAULT '' COMMENT '微信id',
    `created_at` 	 timestamp 		   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` 	 timestamp         NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;