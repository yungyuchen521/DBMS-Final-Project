# search for lost pet which matches the given traits

SET @given_type := "狗";
SET @given_sex := "母";
SET @given_color := "黑";

SELECT *
FROM lost_pet
WHERE 
    type = @given_type AND 
    sex = @given_sex AND 
    color LIKE CONCAT("%", @given_color, "%")