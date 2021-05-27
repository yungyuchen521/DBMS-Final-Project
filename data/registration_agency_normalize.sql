create table registration_agency_normalize(
    agency_id int,
    agency_name varchar(50) collate utf8_general_ci,
    agency_address varchar(100) collate utf8_general_ci,
    contact_person varchar(8) collate utf8_general_ci,
    phone_number varchar(30),
    email varchar(100),
    primary key (agency_id)
);

insert into registration_agency_normalize
select agency_id, agency_name, agency_address, contact_person, phone_number, email
from registration_agency;