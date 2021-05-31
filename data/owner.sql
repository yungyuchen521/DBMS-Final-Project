drop table if exists owner;

create table owner_temp(
	name varchar(10) DEFAULT NULL,
	phone varchar(40) DEFAULT NULL,
    email varchar(50) DEFAULT NULL
);

insert ignore into owner_temp
select owner_name, phone, email
from lost_pet;

create table owner(
	id int,
	name varchar(10) DEFAULT NULL,
	phone varchar(40) DEFAULT NULL,
    email varchar(50) DEFAULT NULL,
    primary key(id)
);

set @r:=0;
insert into owner
select @r:=@r+1, name, phone, email
from owner_temp;

delete from owner
where phone is null and email is null;

drop table owner_temp;
