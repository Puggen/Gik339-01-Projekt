DROP TABLE IF EXISTS cars;
CREATE TABLE IF NOT EXISTS  cars(
 id       INTEGER  NOT NULL PRIMARY KEY AUTOINCREMENT
  ,model    VARCHAR(8) NOT NULL
  ,manufac  VARCHAR(9) NOT NULL
  ,regnr    VARCHAR(16) NOT NULL
  ,color    VARCHAR(6) NOT NULL
  ,fuel     VARCHAR(10) NOT NULL
);
  

INSERT INTO cars(id,model,manufac,regnr,color,fuel) VALUES (1,'740','Volvo','HGT 435','darkred','Bensin');
INSERT INTO cars(id,model,manufac,regnr,color,fuel) VALUES (2,'R8','Audi','MIT 782','gray','Bensin');
INSERT INTO cars(id,model,manufac,regnr,color,fuel) VALUES (3,'520d','BMW','LKI 099','navy','Diesel');
INSERT INTO cars(id,model,manufac,regnr,color,fuel) VALUES (4,'9000','SAAB','LKO 081','green','Bensin');
INSERT INTO cars(id,model,manufac,regnr,color,fuel) VALUES (5,'golf','Volkswagen','JBV 412','gray','Eldriven');
INSERT INTO cars(id,model,manufac,regnr,color,fuel) VALUES (6,'impreza','Subaru','DTY 621','teal','Bensin');
INSERT INTO cars(id,model,manufac,regnr,color,fuel) VALUES (7,'Uno','Fiat','FPM 611','navy','Bensin');
INSERT INTO cars(id,model,manufac,regnr,color,fuel) VALUES (8,'Model X','Tesla','MBC 831','black','Eldriven');
INSERT INTO cars(id,model,manufac,regnr,color,fuel) VALUES (9,'900','SAAB','OPI 977','navy','Bensin');
INSERT INTO cars(id,model,manufac,regnr,color,fuel) VALUES (10,'Golf','Volkswagen','MLB 373','teal','Bensin');


select * from cars;