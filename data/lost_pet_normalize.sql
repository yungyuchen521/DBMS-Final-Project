drop table if exists lost_pet_normalize;

create table lost_pet_normalize(
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
    owner_id int,
    picture varchar(100),
    primary key (chip_id)
);

insert ignore into lost_pet_normalize
select *
from 	(select L.chip_id, L.name, L.type, L.sex, L.breed, L.color, L.appearance, L.feature, 	L.lost_time, L.lost_place, O.id as owner_id, L.picture
	from lost_pet L, owner O
	where O.phone = L.phone and O.email = L.email and O.name = L.owner_name
	union
	select L.chip_id, L.name, L.type, L.sex, L.breed, L.color, L.appearance, L.feature, 	L.lost_time, L.lost_place, O.id as owner_id, L.picture
	from lost_pet L, owner O
	where L.phone is null and O. phone is null and O.email = L.email and O.name = L.owner_name
	union
	select L.chip_id, L.name, L.type, L.sex, L.breed, L.color, L.appearance, L.feature, 	L.lost_time, L.lost_place, O.id as owner_id, L.picture
	from lost_pet L, owner O
	where O.phone = L.phone and O.email is null and L.email is null and O.name = L.owner_name)
	as temp;


