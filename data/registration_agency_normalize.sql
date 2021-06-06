drop table if exists registration_agency_normalize;

create table registration_agency_normalize(
    agency_id int not null AUTO_INCREMENT,
    agency_name varchar(50) default null,
    agency_address varchar(100) default null,
    contact_person varchar(8) default null,
    phone_number varchar(30) default null,
    email varchar(100) default null,
    lat decimal(8,5) default null,
    lng decimal(8,5) default null,
    primary key (agency_id)
);

insert into registration_agency_normalize
select agency_id, agency_name, agency_address, contact_person, phone_number, email, lat, lng
from registration_agency;
