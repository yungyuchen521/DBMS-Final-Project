create table registration_agency(
    id int,
    agency_id int,
    agency_name varchar(50) collate utf8_unicode_ci,
    agency_address varchar(100) collate utf8_unicode_ci,
    contact_person varchar(8) collate utf8_unicode_ci,
    phone_number varchar(30),
    email varchar(100),
    distance varchar(10),
    primary key (agency_id)
);

load data local infile '登記機構.csv'
into table registration_agency
fields terminated by ','
enclosed by '"'
lines terminated by '\n'
ignore 1 lines;