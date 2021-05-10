create table adopt_animal(
    animal_id int,
    animal_subid varchar(20),
    animal_area_pkid int,
    animal_shelter_pkid int,
    animal_place nvarchar(30),
    animal_kind nvarchar(3),
    animal_sex char(1),
    animal_bodytype varchar(10),
    animal_colour nvarchar(8),
    animal_age varchar(10),
    animal_sterilization char(1),
    animal_bacterin char(1),
    animal_foundplace nvarchar(100),
    animal_title varchar(50),
    animal_status varchar(10),
    animal_remark nvarchar(300),
    animal_caption varchar(30),
    animal_opendate varchar(14),
    animal_closeddate date,
    animal_update varchar(14),
    animal_createtime varchar(14),
    shelter_name nvarchar(50),
    album_file nvarchar(100),
    album_update varchar(12),
    cDate varchar(14),
    shelter_address nvarchar(100),
    shelter_tel varchar(20),
    primary key (animal_id)
);


load data local infile './動物認領養.csv'
into table adopt_animal
fields terminated by ','
lines terminated by '\n'
ignore 1 lines;