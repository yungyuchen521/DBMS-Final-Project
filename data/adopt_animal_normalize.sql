create table adopt_animal_normalize(
    animal_id int,
    animal_subid varchar(20),
    animal_kind nvarchar(3),
    animal_sex char(1),
    animal_bodytype varchar(10),
    animal_colour nvarchar(8),
    animal_age varchar(10),
    animal_sterilization char(1),
    animal_bacterin char(1),
    animal_foundplace nvarchar(100),
    animal_status varchar(10),
    animal_remark nvarchar(300),
    animal_opendate varchar(14),
    animal_closeddate date,
    animal_createtime varchar(14),
    album_file nvarchar(100),
    primary key (animal_id)
);

insert into adopt_animal_normalize
select animal_id, animal_subid, animal_kind, animal_sex, animal_bodytype, animal_colour,
       animal_age, animal_sterilization, animal_bacterin, animal_foundplace, animal_status,
       animal_remark, animal_opendate, animal_closeddate, animal_createtime,album_file
from adopt_animal;