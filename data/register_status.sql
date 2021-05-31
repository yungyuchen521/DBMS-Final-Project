drop table if exists register_status;

create table register_status(
    id int,
    county varchar(4),
    township varchar(4),
    num_register_unit int,
    num_register int,
    num_remove int,
    num_transfer int,
    num_modify int,
    num_sterilization int,
    num_sterilization_remove int,
    num_free_from_sterilization int,
    sterilization_rate float,
    reproduction_manage_rate float,
    primary key (id)
);

load data local infile '登記狀況.csv'
into table register_status
fields terminated by ','
lines terminated by '\n'
ignore 1 lines
(@a, @b, @c, @d, @e, @f, @g, @h, @i, @j, @k, @l, @m)
SET
id = NULLIF(@a,''),
county = NULLIF(@b,''),
township = NULLIF(@c,''),
num_register_unit = NULLIF(@d,''),
num_register = NULLIF(@e,''),
num_remove = NULLIF(@f,''),
num_transfer = NULLIF(@g,''),
num_modify = NULLIF(@h,''),
num_sterilization = NULLIF(@i,''),
num_sterilization_remove = NULLIF(@j,''),
num_free_from_sterilization = NULLIF(@k,''),
sterilization_rate = NULLIF(@l,''),
reproduction_manage_rate = NULLIF(@m,'');
