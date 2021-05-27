create table register_status_normalize(
    id int,
    county nvarchar(4),
    num_register_unit int,
    num_register int,
    num_remove int,
    num_transfer int,
    num_modify int,
    num_sterilization int,
    num_sterilization_remove int,
    num_free_from_sterilization int,
    primary key (id)
);

insert into register_status_normalize
select aa.id, aa.county, num_register_unit, num_register, num_remove, num_transfer,
       num_modify, num_sterilization, num_sterilization_remove,num_free_from_sterilization
from register_status rs,
     (select distinct substring(shelter_name,1,3) county, animal_area_pkid id from adopt_animal) aa
where rs.county = aa.county;