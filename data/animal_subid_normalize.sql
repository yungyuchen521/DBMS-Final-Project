drop table if exists animal_subid_normalize;
drop table if exists animal_place;

create table animal_subid_normalize(
    subid varchar(20),
    area_pkid int default null,
    shelter_pkid int default null,
    primary key (subid)
);

insert ignore into animal_subid_normalize
select animal_subid, animal_area_pkid, animal_shelter_pkid
from adopt_animal;
