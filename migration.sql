DROP TABLE IF EXISTS realms;
DROP TABLE IF EXISTS tasks;

CREATE TABLE realms (
    id serial PRIMARY KEY, 
    realm varchar
);

CREATE TABLE tasks (
    id serial PRIMARY KEY, 
    taskname varchar, 
    realm_id integer, 
    CONSTRAINT fk_realm 
        FOREIGN KEY(realm_id) 
            REFERENCES realms(id) ON DELETE CASCADE
);