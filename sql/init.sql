-- 创建数据库
CREATE DATABASE IF NOT EXISTS my_dd_01  DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_croatian_ci;

-- 使用其数据库
use my_dd_01;

--
-- 表的结构 `user`
--

CREATE TABLE IF NOT EXISTS `ev_users` (
                            `id` int NOT NULL AUTO_INCREMENT,
                            `username` varchar(255) NOT NULL,
                            `password` varchar(255) NOT NULL,
                            `nickname` varchar(255) DEFAULT NULL,
                            `email` varchar(255) DEFAULT NULL,
                            `user_pic` text,
                            PRIMARY KEY (`id`),
                            UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `ev_article_cate` (
                                   `id` int NOT NULL AUTO_INCREMENT,
                                   `name` varchar(255) NOT NULL,
                                   `alias` varchar(255) NOT NULL,
                                   `is_deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0: data is not been deleted\\\\n1: data is been deleted',
                                   PRIMARY KEY (`id`),
                                   UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `ev_articles` (
                               `id` int NOT NULL AUTO_INCREMENT,
                               `title` varchar(255) NOT NULL,
                               `content` text NOT NULL,
                               `cover_img` varchar(255) NOT NULL,
                               `pub_date` varchar(255) NOT NULL,
                               `state` varchar(255) NOT NULL,
                               `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
                               `cate_id` int NOT NULL,
                               `author_id` int NOT NULL,
                               PRIMARY KEY (`id`),
                               UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4;
