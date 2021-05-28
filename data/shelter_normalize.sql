create table shelter(
	id int,
	shelter_name varchar(50) collate utf8_general_ci,
	area_id int,
	max_shelter int,
	num_shelter int,
	light varchar(15),
	address nvarchar(100),
	tel varchar(20),
	primary key (id)
);

insert ignore into shelter
select distinct A.animal_shelter_pkid, S.shelter_name, A.animal_area_pkid, S.max_shelter, S.num_shelter, S.light, 
				A.shelter_address, A.shelter_tel
from adopt_animal A, shelter_information S
where A.shelter_name like S.shelter_name and A.shelter_name not in 
	(select distinct shelter_name from shelter);