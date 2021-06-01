drop table if exists animal_subid;

create table animal_subid(
    subid varchar(20) not null,
    area_pkid int default null,
    shelter_pkid int not null,
    primary key (subid)
);

insert ignore into animal_subid
select animal_subid, animal_area_pkid, animal_shelter_pkid
from adopt_animal;

drop trigger if exists generate_subid;

delimiter |
create trigger generate_subid before insert on animal_subid
for each row begin
    select max(subid) into @temp from animal_subid where strcmp(subid,'103030711') = -1;
    if @temp is null then
        set new.subid = '0000000001';
    else
        set new.subid = lpad(convert(@temp,signed)+1,10,'0');
    end if;
end;
|
delimiter ;