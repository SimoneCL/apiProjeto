-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema dbapieventos
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema dbapieventos
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `dbapieventos` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `dbapieventos` ;

-- -----------------------------------------------------
-- Table `dbapieventos`.`equipes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dbapieventos`.`equipes` (
  `codEquipe` INT NOT NULL,
  `descEquipe` VARCHAR(60) NULL DEFAULT NULL,
  UNIQUE INDEX `idx_equipe` (`codEquipe` ASC) VISIBLE,
  PRIMARY KEY (`codEquipe`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `dbapieventos`.`tipoeventos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dbapieventos`.`tipoeventos` (
  `codTipo` INT NOT NULL,
  `descTipoEvento` VARCHAR(30) NULL DEFAULT NULL,
  PRIMARY KEY (`codTipo`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `dbapieventos`.`perfilUsuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dbapieventos`.`perfilUsuario` (
  `idTipoPerfil` INT NOT NULL,
  `descricaoPerfil` VARCHAR(60) NULL,
  PRIMARY KEY (`idTipoPerfil`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dbapieventos`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dbapieventos`.`usuario` (
  `idUsuario` INT NOT NULL AUTO_INCREMENT,
  `nomeUsuario` VARCHAR(60) NULL DEFAULT NULL,
  `email` VARCHAR(60) NULL DEFAULT NULL,
  `tipoPerfil` INT NULL DEFAULT NULL,
  `senha` VARCHAR(15) NULL DEFAULT NULL,
  `evento_idEvento` INT NOT NULL,
  PRIMARY KEY (`idUsuario`),
  INDEX `fk_usuario_perfilusuario1_idx` (`tipoPerfil` ASC) INVISIBLE,
  INDEX `fk_usuario_usuario1_idx` (`idUsuario` ASC) VISIBLE,
  CONSTRAINT `fk_usuario_perfilusuario1`
    FOREIGN KEY (`tipoPerfil`)
    REFERENCES `dbapieventos`.`perfilUsuario` (`idTipoPerfil`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `dbapieventos`.`evento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dbapieventos`.`evento` (
  `idEvento` INT NOT NULL AUTO_INCREMENT,
  `dataEventoIni` DATE NOT NULL,
  `dataEventoFim` DATE NOT NULL,
  `idUsuario` INT NOT NULL,
  `codTipo` INT NOT NULL,
  PRIMARY KEY (`idEvento`),
  INDEX `idx_eventoUser` (`idEvento` ASC, `idUsuario` ASC) INVISIBLE,
  INDEX `fk_tipoEvento` (`codTipo` ASC) INVISIBLE,
  INDEX `id_faixaData` (`dataEventoIni` ASC, `dataEventoFim` ASC) INVISIBLE,
  INDEX `dataIni` (`dataEventoIni` ASC) INVISIBLE,
  INDEX `dataFim` (`dataEventoFim` ASC) INVISIBLE,
  UNIQUE INDEX `idEvento_UNIQUE` (`idEvento` ASC) VISIBLE,
  INDEX `fk_idUsuario_idx` (`idUsuario` ASC) VISIBLE,
  CONSTRAINT `fk_tipoEvento`
    FOREIGN KEY (`codTipo`)
    REFERENCES `dbapieventos`.`tipoeventos` (`codTipo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_idUsuario`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `dbapieventos`.`usuario` (`idUsuario`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 13
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `dbapieventos`.`feriados`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dbapieventos`.`feriados` (
  `data` DATE NOT NULL,
  `descricao` VARCHAR(60) NULL DEFAULT NULL,
  `tipoFeriado` VARCHAR(60) NULL DEFAULT NULL,
  `pontoFacultativo` TINYINT NULL DEFAULT 0,
  `idFeriado` INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`idFeriado`),
  INDEX `idx_data` (`data` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `dbapieventos`.`eventoFeriados`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dbapieventos`.`eventoFeriados` (
  `idEvento` INT NOT NULL,
  `idFeriado` INT NOT NULL,
  PRIMARY KEY (`idEvento`, `idFeriado`),
  INDEX `fk_evento_has_feriados_feriados1_idx` (`idFeriado` ASC) VISIBLE,
  INDEX `fk_evento_has_feriados_evento1_idx` (`idEvento` ASC) VISIBLE,
  CONSTRAINT `fk_evento_has_feriados_evento1`
    FOREIGN KEY (`idEvento`)
    REFERENCES `dbapieventos`.`evento` (`idEvento`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_evento_has_feriados_feriados1`
    FOREIGN KEY (`idFeriado`)
    REFERENCES `dbapieventos`.`feriados` (`idFeriado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `dbapieventos`.`equipeUsuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dbapieventos`.`equipeUsuario` (
  `idUsuario` INT NOT NULL,
  `codEquipe` INT NOT NULL,
  PRIMARY KEY (`idUsuario`, `codEquipe`),
  INDEX `fk_usuario_has_equipes_equipes1_idx` (`codEquipe` ASC) VISIBLE,
  INDEX `fk_usuario_has_equipes_usuario1_idx` (`idUsuario` ASC) VISIBLE,
  CONSTRAINT `fk_usuario_has_equipes_usuario1`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `dbapieventos`.`usuario` (`idUsuario`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuario_has_equipes_equipes1`
    FOREIGN KEY (`codEquipe`)
    REFERENCES `dbapieventos`.`equipes` (`codEquipe`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
