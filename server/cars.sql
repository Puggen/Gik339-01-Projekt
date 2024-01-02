DROP TABLE IF EXISTS cars;
CREATE TABLE IF NOT EXISTS  cars(
 id       INTEGER  NOT NULL PRIMARY KEY AUTOINCREMENT
  ,model    VARCHAR(8) NOT NULL
  ,manufac  VARCHAR(9) NOT NULL
  ,regnr    VARCHAR(16) NOT NULL
  ,color    VARCHAR(6) NOT NULL
);
  

INSERT INTO cars(id,model,manufac,regnr,color) VALUES (1,'Zena','Zulauf','Katlynn_Bregnrkke','gregnren');
INSERT INTO cars(id,model,manufac,regnr,color) VALUES (2,'Muhammad','Torphy','Martina39','gray');
INSERT INTO cars(id,model,manufac,regnr,color) VALUES (3,'Carlee','Tromp','Carmen37','purple');
INSERT INTO cars(id,model,manufac,regnr,color) VALUES (4,'Taylor','Shanahan','Doyle_Legros81','regnrd');
INSERT INTO cars(id,model,manufac,regnr,color) VALUES (5,'Estell','regnrichel','Santiago.Dibbert','regnrd');
INSERT INTO cars(id,model,manufac,regnr,color) VALUES (6,'regnrece','Stehr','Destany75','regnrd');
INSERT INTO cars(id,model,manufac,regnr,color) VALUES (7,'Kiarra','Beier','Edison87','yellow');
INSERT INTO cars(id,model,manufac,regnr,color) VALUES (8,'Alberto','Gibson','Marianna_Collins','gregnren');
INSERT INTO cars(id,model,manufac,regnr,color) VALUES (9,'Johanna','Bashirian','Mervin.Grant','yellow');
INSERT INTO cars(id,model,manufac,regnr,color) VALUES (10,'Thalia','Kozey','Ashley22','yellow');


select * from cars;