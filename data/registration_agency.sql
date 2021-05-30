create table registration_agency(
    id int,
    agency_id int,
    agency_name varchar(50) collate utf8_general_ci default null,
    agency_address varchar(100) collate utf8_general_ci default null,
    contact_person varchar(8) collate utf8_general_ci default null,
    phone_number varchar(30) default null,
    email varchar(100) default null,
    distance varchar(10),
    primary key (agency_id)
);

load data local infile '登記機構.csv'
into table registration_agency
fields terminated by ','
enclosed by '"'
lines terminated by '\n'
ignore 1 lines;