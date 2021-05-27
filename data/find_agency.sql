select *
from registration_agency_normalize r
where r.agency_name like @input_city_block;

-- user input 為 xx 市 xx 區