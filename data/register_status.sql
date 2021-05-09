create table register_status(
    id int,
    county nvarchar(4),
    township nvarchar(4),
    num_register_unit int,
    num_register int,
    num_remove int,
    num_transfer int,
    num_modify int,
    num_sterilization int,
    num_sterilization_remove int,
    num_free_from_sterilization int,
    sterilization_rate float,
    reproduction_manage_rate float,
    primary key (id)
);

load data local infile '登記狀況.csv'
into table register_status
fields terminated by ','
lines terminated by '\n'
ignore 1 lines;
