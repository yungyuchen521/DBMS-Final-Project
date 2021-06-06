drop table if exists registration_agency;

create table registration_agency(
    id int,
    agency_id int,
    agency_name varchar(50) default null,
    agency_address varchar(100) default null,
    contact_person varchar(8) default null,
    phone_number varchar(30) default null,
    email varchar(100) default null,
    distance varchar(10) default null,
    lat decimal(8,5) default null,
    lng decimal(8,5) default null,
    primary key (agency_id)
);

load data local infile '登記機構.csv'
into table registration_agency
fields terminated by ','
enclosed by '"'
lines terminated by '\n'
ignore 1 lines
(@a, @b, @c, @d, @e, @f, @g, @h, @i, @j)
SET
id = NULLIF(@a,''),
agency_id = NULLIF(@b,''),
agency_name = NULLIF(@c,''),
agency_address = NULLIF(@d,''),
contact_person = NULLIF(@e,''),
phone_number = NULLIF(@f,''),
email = NULLIF(@g,''),
distance = NULLIF(@h,''),
lat = NULLIF(@i,''),
lng = NULLIF(@j,'')
;
