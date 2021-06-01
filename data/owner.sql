drop table if exists owner;
drop table if exists owner_temp;

create table owner_temp(
	name varchar(10),
	phone varchar(40),
    email varchar(50),
    unique key(name,phone,email)
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

delete from owner
where id in 
(select id
from 	(select distinct o1.id, o1.name, o1.phone, o1.email 
	from owner o1,owner o2 
	where o1.email = o2.email and o1.phone=o2.phone and o1.name=o2.name and o1.id!=o2.id
	union
	select distinct o1.id, o1.name, o1.phone, o1.email  
	from owner o1,owner o2 
	where o1.email is null and o2.email is null and o1.phone=o2.phone and o1.name=o2.name and 		o1.id!=o2.id
	union
	select distinct o1.id, o1.name, o1.phone, o1.email  
	from owner o1,owner o2 
	where o1.email = o2.email and o1.phone is null and o2.phone is null and o1.name=o2.name 		and o1.id!=o2.id) as temp
where id not in 
(select min(id) as id 
from (select distinct o1.id, o1.name, o1.phone, o1.email 
	from owner o1,owner o2 
	where o1.email = o2.email and o1.phone=o2.phone and o1.name=o2.name and o1.id!=o2.id
	union
	select distinct o1.id, o1.name, o1.phone, o1.email  
	from owner o1,owner o2 
	where o1.email is null and o2.email is null and o1.phone=o2.phone and o1.name=o2.name and 		o1.id!=o2.id
	union
	select distinct o1.id, o1.name, o1.phone, o1.email  
	from owner o1,owner o2 
	where o1.email = o2.email and o1.phone is null and o2.phone is null and o1.name=o2.name 		and o1.id!=o2.id) as temp
group by name,phone,email));

drop table owner_temp;
