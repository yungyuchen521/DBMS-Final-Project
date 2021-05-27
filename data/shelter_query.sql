# search for nearby shelters
# need to add 2 more columns: "need help", "can help"
# need to convert address into longitute & latitute beforehand!!

SET @given_long := "121";
SET @given_lat  := "24";

SELECT name, address, phone, 
		SQRT( 
			POWER((given_long - long), 2) + POWER((given_lat - lat), 2)) 
		) AS distance
FROM Shelters
ORDER BY distance
LIMIT 10



/*
DROP FUNCTION IF EXISTS PLUS1;

CREATE FUNCTION PLUS1(ID INT) RETURNS CHAR(10)
BEGIN
	#DECLARE s INT DEFAULT 0;
	#SELECT num_shelter INTO s FROM shelter_information WHERE id = ID;
	RETURN "WTF";
END
*/