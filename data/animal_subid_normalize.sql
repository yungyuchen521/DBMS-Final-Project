create table animal_subid(
    subid varchar(20),
    area_pkid int,
    shelter_pkid int,
    primary key (subid)
);

insert ignore into animal_subid
select animal_subid, animal_area_pkid, animal_shelter_pkid
from adopt_animal;