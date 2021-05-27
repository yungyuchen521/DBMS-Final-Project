# match animals in lost_pet & adopt_animal
# then select those who meets the given traits

SET @given_type := "狗";
SET @given_sex := "母";
SET @given_color := "黑";

SELECT *
FROM lost_pet LP, adopt_animal AP
WHERE 
    LP.type = @given_type AND 
    LP.sex = @given_sex AND 
    LP.type = AP.animal_kind AND
    LP.sex = AP.animal_sex AND
    (LP.color IS NULL 
        OR
    LP.color LIKE CONCAT("%", @given_color, "%") ) AND
    ((LP.color IS NULL OR AP.animal_colour IS NULL) 
        OR 
    LP.color = AP.animal_colour)
