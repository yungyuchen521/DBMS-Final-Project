drop table if exists lost_pet;

create table lost_pet(
    chip_id varchar(25),
    name varchar(20) DEFAULT NULL,
    type varchar(1) DEFAULT NULL,
    sex varchar(1) DEFAULT NULL,
    breed varchar(20) DEFAULT NULL,
    color varchar(30) DEFAULT NULL,
    appearance varchar(20) DEFAULT NULL,
    feature varchar(200) DEFAULT NULL,
    lost_time date,
    lost_place varchar(50) DEFAULT NULL,
    owner_name varchar(10) DEFAULT NULL,
    phone varchar(40) DEFAULT NULL,
    email varchar(50) DEFAULT NULL,
    picture varchar(100),
    primary key (chip_id)
);

load data local infile './寵物遺失啟事.csv'
ignore into table lost_pet
fields terminated by ','
enclosed by '"'
lines terminated by '\n'
ignore 1 lines
(@a, @b, @c, @d, @e, @f, @g, @h, @i, @j, @k, @l, @m, @n)
SET
chip_id = NULLIF(@a,''),
name = NULLIF(@b,''),
type = NULLIF(@c,''),
sex = NULLIF(@d,''),
breed = NULLIF(@e,''),
color = NULLIF(@f,''),
appearance = NULLIF(@g,''),
feature = NULLIF(@h,''),
lost_time = NULLIF(@i,''),
lost_place = NULLIF(@j,''),
owner_name = NULLIF(@k,''),
phone = NULLIF(@l,''),
email = NULLIF(@m,''),
picture = NULLIF(@n,'');

delete from lost_pet
where phone is null and email is null;
