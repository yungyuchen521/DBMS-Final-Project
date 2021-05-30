create table animal_place(
    subid varchar(20),
    area_pkid int default null,
    shelter_pkid int default null,
    primary key (subid)
);

insert ignore into animal_place
select animal_subid, animal_area_pkid, animal_shelter_pkid
from adopt_animal;