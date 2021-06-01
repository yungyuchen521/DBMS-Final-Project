drop table if exists adopt_animal_normalize;

create table adopt_animal_normalize(
    animal_id int not null AUTO_INCREMENT,
    animal_subid varchar(20),
    animal_kind varchar(3) default null,
    animal_sex varchar(1) default null,
    animal_bodytype varchar(10) default null,
    animal_colour varchar(8) default null,
    animal_age varchar(10) default null,
    animal_sterilization char(1) default null,
    animal_bacterin char(1) default null,
    animal_foundplace varchar(100) default null,
    animal_status varchar(10) default null,
    animal_remark varchar(300) default null,
    animal_opendate varchar(14) default null,
    animal_closeddate date default null,
    animal_createtime varchar(14) default null,
    album_file varchar(100) default null,
    primary key (animal_id)
);

insert into adopt_animal_normalize
select animal_id, animal_subid, animal_kind, animal_sex, animal_bodytype, animal_colour,
       animal_age, animal_sterilization, animal_bacterin, animal_foundplace, animal_status,
       animal_remark, animal_opendate, animal_closeddate, animal_createtime,album_file
from adopt_animal;
