CREATE TYPE dragon_color AS ENUM ('green', 'red', 'black', 'silver', 'gold');


CREATE TABLE dragons.dragons
(
  id SERIAL PRIMARY KEY,
  name VARCHAR UNIQUE NOT NULL,
  color dragon_color NOT NULL
);