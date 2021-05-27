select *
from shelter s, adopt_animal_normalize a
where a.animal_kind = @given_animal_kind and a.animal_sex = @given_animal_sex and a.animal_bodytype = @given_animal_bodytype
        and a.animal_staaus = "OPEN" and (a.animal_place like @given_city) and a.animal_shelter_pkid = s.id;


-- user 可以利用input 輸入 動物類別，動物性別，動物體型，和動物所在收容所城市 來取得符合所選要求的data
