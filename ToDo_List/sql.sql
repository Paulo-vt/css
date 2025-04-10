
drop database if exists location_25; 
create database location_25; 
use location_25;
 
 
CREATE TABLE Immeuble(
        idimmeuble Int  Auto_increment  NOT NULL ,
        nom        Varchar (50) NOT NULL ,
        adresse    Varchar (50) NOT NULL ,
        cp         Varchar (50) NOT NULL ,
        ville      Varchar (50) NOT NULL ,
        nbapparts  Int NOT NULL
	,CONSTRAINT Immeuble_PK PRIMARY KEY (idimmeuble)
)ENGINE=InnoDB;
 
 
CREATE TABLE Appart(
        idappart    Int  Auto_increment  NOT NULL ,
        numero      Varchar (50) NOT NULL ,
        supperficie Float NOT NULL ,
        typeappart  Varchar (50) NOT NULL ,
        nbpieces    Int NOT NULL ,
        prix        Float NOT NULL ,
        idimmeuble  Int NOT NULL
	,CONSTRAINT Appart_PK PRIMARY KEY (idappart)
 
	,CONSTRAINT Appart_Immeuble_FK FOREIGN KEY (idimmeuble) REFERENCES Immeuble(idimmeuble)
)ENGINE=InnoDB;
 
 
CREATE TABLE piece(
        idpiece     Int  Auto_increment  NOT NULL ,
        designation Varchar (50) NOT NULL ,
        superficie  Float NOT NULL ,
        idappart    Int NOT NULL
	,CONSTRAINT piece_PK PRIMARY KEY (idpiece)
 
	,CONSTRAINT piece_Appart_FK FOREIGN KEY (idappart) REFERENCES Appart(idappart)
)ENGINE=InnoDB;

CREATE TABLE Locataire(
        idlocataire Int  Auto_increment  NOT NULL ,
        nom         Varchar (50) NOT NULL ,
        prenom      Varchar (50) NOT NULL ,
        email       Varchar (50) NOT NULL ,
        tel         Varchar (50) NOT NULL
	,CONSTRAINT Locataire_PK PRIMARY KEY (idlocataire)
)ENGINE=InnoDB;
 
 ------------------------------------------------------------
 
CREATE TABLE Locatation(
        idlocation  Int  Auto_increment  NOT NULL ,
        description Varchar (50) NOT NULL ,
        datedbt     Date NOT NULL ,
        datefin     Date NOT NULL ,
        idappart    Int NOT NULL ,
        idlocataire Int NOT NULL
	,CONSTRAINT Locatation_PK PRIMARY KEY (idlocation)
 
	,CONSTRAINT Locatation_Appart_FK FOREIGN KEY (idappart) REFERENCES Appart(idappart)
	,CONSTRAINT Locatation_Locataire0_FK FOREIGN KEY (idlocataire) REFERENCES Locataire(idlocataire)
)ENGINE=InnoDB;