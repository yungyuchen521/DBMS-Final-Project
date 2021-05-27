create table found_place(
	foundplace nvarchar(100),
	area_pkid int,
	primary key(foundplace)
);

insert ignore into found_place
select distinct animal_foundplace, animal_area_pkid
from adopt_animal;
