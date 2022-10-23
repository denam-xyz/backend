/* 2022-09-27 */
CREATE SCHEMA denam DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;

CREATE USER 'root' @'localhost' IDENTIFIED BY '1q2w3e';

GRANT ALL PRIVILEGES ON denam.* TO 'denam_user' @'localhost';

FLUSH PRIVILEGES;

USE denam;

CREATE TABLE `unstoppable_domain` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`description` VARCHAR(300),
	`name` VARCHAR(300),
	`url` VARCHAR(300),
	PRIMARY KEY(`id`)
);

/*TEST VALUES FOR testing purposes*/
INSERT INTO `unstoppable_domain` (`description`, `name`, `url`)
VALUE ('Some descrip','descrip.crypto','descrip test url');

/**/