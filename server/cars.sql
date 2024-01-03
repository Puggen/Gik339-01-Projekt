DROP TABLE IF EXISTS cars;
CREATE TABLE IF NOT EXISTS  cars(
 id       INTEGER  NOT NULL PRIMARY KEY AUTOINCREMENT
  ,model    VARCHAR(8) NOT NULL
  ,manufac  VARCHAR(9) NOT NULL
  ,regnr    VARCHAR(16) NOT NULL
  ,fuel    VARCHAR(6) NOT NULL
);
  

INSERT INTO cars(id,model,manufac,regnr,fuel) VALUES (1,'740','Volvo','HGT 435','red');
INSERT INTO cars(id,model,manufac,regnr,fuel) VALUES (2,'R8','Audi','MIT 782','gray');
INSERT INTO cars(id,model,manufac,regnr,fuel) VALUES (3,'520i','BMW','LKI 099','purple');
INSERT INTO cars(id,model,manufac,regnr,fuel) VALUES (4,'9000','SAAB','LKO 081','gray');
INSERT INTO cars(id,model,manufac,regnr,fuel) VALUES (5,'Polo','Volkswagen','JBV 412','gray');
INSERT INTO cars(id,model,manufac,regnr,fuel) VALUES (6,'impreza','Subaru','DTY 621','yellow');
INSERT INTO cars(id,model,manufac,regnr,fuel) VALUES (7,'Uno','Fiat','FPM 611','yellow');
INSERT INTO cars(id,model,manufac,regnr,fuel) VALUES (8,'320i','BMW','MBC 831','green');
INSERT INTO cars(id,model,manufac,regnr,fuel) VALUES (9,'900','SAAB','OPI 977','yellow');
INSERT INTO cars(id,model,manufac,regnr,fuel) VALUES (10,'Golf','Volkswagen','MLB 373','yellow');


select * from cars;