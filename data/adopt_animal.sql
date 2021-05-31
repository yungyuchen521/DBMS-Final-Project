drop table if exists adopt_animal;

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
