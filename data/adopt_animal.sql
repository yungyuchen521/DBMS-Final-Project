create table adopt_animal(
    animal_id int not null,
    animal_subid varchar(20),
    animal_area_pkid int,
    animal_shelter_pkid int,
    animal_place varchar(30),
    animal_kind varchar(3),
    animal_sex char(1),
    animal_bodytype varchar(10),
    animal_colour varchar(8),
    animal_age varchar(10) default null,
    animal_sterilization char(1),
    animal_bacterin char(1), 
    animal_foundplace varchar(100),
    animal_title varchar(50),
    animal_status varchar(10),
    animal_remark varchar(300) default null,
    animal_caption varchar(30) default null,
    animal_opendate varchar(14),
    animal_closeddate date,
    animal_update varchar(14) default null,
    animal_createtime varchar(14), 
    shelter_name varchar(50),
    album_file varchar(100),
    album_update varchar(12),
    cDate varchar(14), 
    shelter_address varchar(100),
    shelter_tel varchar(20),
    primary key (animal_id)
);


load data local infile './動物認領養.csv'
into table adopt_animal
fields terminated by ','
lines terminated by '\n'
ignore 1 lines;