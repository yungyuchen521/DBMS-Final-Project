drop table if exists adopt_animal;

create table adopt_animal(
    animal_id int,
    animal_subid varchar(20),
    animal_area_pkid int,
    animal_shelter_pkid int,
    animal_place varchar(30) default null,
    animal_kind varchar(3) default null,
    animal_sex varchar(1) default null,
    animal_bodytype varchar(10) default null,
    animal_colour varchar(8) default null,
    animal_age varchar(10) default null,
    animal_sterilization char(1) default null,
    animal_bacterin char(1) default null,
    animal_foundplace varchar(100) default null,
    animal_title varchar(50) default null,
    animal_status varchar(10) default null,
    animal_remark varchar(300) default null,
    animal_caption varchar(30) default null,
    animal_opendate varchar(14) default null,
    animal_closeddate date default null,
    animal_update varchar(14) default null,
    animal_createtime varchar(14) default null,
    shelter_name varchar(50) default null,
    album_file varchar(100) default null,
    album_update varchar(12) default null,
    cDate varchar(14) default null,
    shelter_address varchar(100) default null,
    shelter_tel varchar(20) default null,
    primary key (animal_id)
);


load data local infile './動物認領養.csv'
into table adopt_animal
fields terminated by ','
lines terminated by '\n'
ignore 1 lines
(@a, @b, @c, @d, @e, @f, @g, @h, @i, @j, @k, @l, @m, @n, @o, @p, @q, @r, @s, @t, @u, @v, @w, @x, @y, @z, @aa)
SET
animal_id = NULLIF(@a,''),
animal_subid = NULLIF(@b,''),
animal_area_pkid = NULLIF(@c,''),
animal_shelter_pkid = NULLIF(@d,''),
animal_place = NULLIF(@e,''),
animal_kind = NULLIF(@f,''),
animal_sex = NULLIF(@g,''),
animal_bodytype = NULLIF(@h,''),
animal_colour = NULLIF(@i,''),
animal_age = NULLIF(@j,''),
animal_sterilization = NULLIF(@k,''),
animal_bacterin = NULLIF(@l,''),
animal_foundplace = NULLIF(@m,''),
animal_title = NULLIF(@n,''),
animal_status = NULLIF(@o,''),
animal_remark = NULLIF(@p,''),
animal_caption = NULLIF(@q,''),
animal_opendate = NULLIF(@r,''),
animal_closeddate = NULLIF(@s,''),
animal_update = NULLIF(@t,''),
animal_createtime = NULLIF(@u,''),
shelter_name = NULLIF(@v,''),
album_file = NULLIF(@w,''),
album_update = NULLIF(@x,''),
cDate = NULLIF(@y,''),
shelter_address = NULLIF(@z,''),
shelter_tel = NULLIF(@aa,'');
