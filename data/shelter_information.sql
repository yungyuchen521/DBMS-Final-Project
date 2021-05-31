drop table if exists shelter_information;

create table shelter_information(
    id int,
    shelter_name varchar(50),
    max_shelter int,
    num_shelter int,
    light varchar(15),
    primary key (id)
);

load data local infile './收容所資訊.csv'
into table shelter_information
fields terminated by ','
/* enclosed by '"' */
lines terminated by '\n'
ignore 1 lines
(@a, @b, @c, @d, @e)
SET
id = NULLIF(@a,''),
shelter_name = NULLIF(@b,''),
max_shelter = NULLIF(@c,''),
num_shelter = NULLIF(@d,''),
light = NULLIF(@e,'');
