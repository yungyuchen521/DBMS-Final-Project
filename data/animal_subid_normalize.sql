drop table if exists animal_subid;

create table animal_subid(
    subid varchar(20) not null,
    area_pkid int default null,
    shelter_pkid int not null,
    primary key (subid)
);

insert ignore into animal_subid
select animal_subid, animal_area_pkid, animal_shelter_pkid
from adopt_animal;
