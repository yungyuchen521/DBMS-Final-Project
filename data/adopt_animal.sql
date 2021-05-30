create table adopt_animal(
    animal_id int,
    animal_subid varchar(20),
    animal_area_pkid int,
    animal_shelter_pkid int,
    animal_place nvarchar(30) default null,
    animal_kind nvarchar(3) default null,
    animal_sex varchar(1) default null,
    animal_bodytype varchar(10) default null,
    animal_colour nvarchar(8) default null,
    animal_age varchar(10) default null,
    animal_sterilization char(1) default null,
    animal_bacterin char(1) default null,
    animal_foundplace nvarchar(100) default null,
    animal_title varchar(50) default null,
    animal_status varchar(10) default null,
    animal_remark nvarchar(300) default null,
    animal_caption varchar(30) default null,
    animal_opendate varchar(14) default null,
    animal_closeddate date default null,
    animal_update varchar(14) default null,
    animal_createtime varchar(14) default null,
    shelter_name nvarchar(50) default null,
    album_file nvarchar(100) default null,
    album_update varchar(12) default null,
    cDate varchar(14) default null,
    shelter_address nvarchar(100) default null,
    shelter_tel varchar(20) default null,
    primary key (animal_id)
);


load data local infile './動物認領養.csv'
into table adopt_animal
fields terminated by ','
lines terminated by '\n'
ignore 1 lines;