-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema games
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `games` ;

-- -----------------------------------------------------
-- Schema games
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `games` DEFAULT CHARACTER SET utf8 ;
USE `games` ;

-- -----------------------------------------------------
-- Table `games`.`product`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `games`.`product` ;

CREATE TABLE IF NOT EXISTS `games`.`product` (
  `idproduct` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(40) NOT NULL,
  `price` FLOAT NOT NULL,
  `stock` INT(11) NOT NULL,
  `imgpath` VARCHAR(500) NOT NULL,
  `platform` INT(11) NOT NULL,
  `descripton` TEXT NOT NULL,
  `sales` INT(11) NULL DEFAULT '0',
  `sale` FLOAT NULL DEFAULT '0',
  PRIMARY KEY (`idproduct`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `games`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `games`.`user` ;

CREATE TABLE IF NOT EXISTS `games`.`user` (
  `username` VARCHAR(20) NOT NULL,
  `password` BINARY(60) NOT NULL,
  `email` VARCHAR(50) NOT NULL,
  `address` VARCHAR(100) NOT NULL,
  `banned` INT(11) NOT NULL DEFAULT '0',
  `datecreated` DATE NOT NULL,
  PRIMARY KEY (`username`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE UNIQUE INDEX `email_UNIQUE` ON `games`.`user` (`email` ASC);


-- -----------------------------------------------------
-- Table `games`.`cart`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `games`.`cart` ;

CREATE TABLE IF NOT EXISTS `games`.`cart` (
  `username` VARCHAR(50) NOT NULL,
  `idproduct` INT(11) NOT NULL,
  `quantity` INT(11) NOT NULL,
  PRIMARY KEY (`username`, `idproduct`),
  CONSTRAINT `product`
    FOREIGN KEY (`idproduct`)
    REFERENCES `games`.`product` (`idproduct`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `user`
    FOREIGN KEY (`username`)
    REFERENCES `games`.`user` (`username`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE INDEX `product_idx` ON `games`.`cart` (`idproduct` ASC);


-- -----------------------------------------------------
-- Table `games`.`coupon`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `games`.`coupon` ;

CREATE TABLE IF NOT EXISTS `games`.`coupon` (
  `idcoupon` VARCHAR(20) NOT NULL,
  `discount` FLOAT NOT NULL,
  `amount` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`idcoupon`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `games`.`order`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `games`.`order` ;

CREATE TABLE IF NOT EXISTS `games`.`order` (
  `idorder` INT(11) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(50) NOT NULL,
  `idproduct` INT(11) NOT NULL,
  `quantity` INT(11) NOT NULL,
  `status` INT(11) NOT NULL,
  `datecreated` DATE NOT NULL,
  `total` FLOAT NULL DEFAULT NULL,
  PRIMARY KEY (`idorder`, `username`, `idproduct`),
  CONSTRAINT `orderproduct`
    FOREIGN KEY (`idproduct`)
    REFERENCES `games`.`product` (`idproduct`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `orderuser`
    FOREIGN KEY (`username`)
    REFERENCES `games`.`user` (`username`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 8
DEFAULT CHARACTER SET = utf8;

CREATE INDEX `user_idx` ON `games`.`order` (`username` ASC);

CREATE INDEX `product_idx` ON `games`.`order` (`idproduct` ASC);


-- -----------------------------------------------------
-- Table `games`.`review`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `games`.`review` ;

CREATE TABLE IF NOT EXISTS `games`.`review` (
  `username` VARCHAR(20) NOT NULL,
  `idproduct` INT(11) NOT NULL,
  `score` INT(11) NOT NULL,
  `comment` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`username`, `idproduct`),
  CONSTRAINT `product_review`
    FOREIGN KEY (`idproduct`)
    REFERENCES `games`.`product` (`idproduct`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `user_review`
    FOREIGN KEY (`username`)
    REFERENCES `games`.`user` (`username`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE INDEX `product_review_idx` ON `games`.`review` (`idproduct` ASC);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
