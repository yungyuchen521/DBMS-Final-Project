create table lost_pet(
    chip_id varchar(15),
    name varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
    type varchar(1) COLLATE utf8_unicode_ci DEFAULT NULL,
    sex varchar(1) COLLATE utf8_unicode_ci DEFAULT NULL,
    breed varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
    color varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
    appearance varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
    feature varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
    lost_time date,
    lost_place varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
    owner_name varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
    phone varchar(13),
    email varchar(40),
    picture varchar(100),
    primary key (chip_id)
);

load data local infile './寵物遺失啟事.csv'
into table lost_pet
fields terminated by ','
enclosed by '"'
lines terminated by '\n'
ignore 1 lines;