DROP TABLE IF EXISTS realms;
DROP TABLE IF EXISTS tasks;
CREATE TABLE realms (id serial PRIMARY KEY, realm varchar);
INSERT INTO realms (realm) VALUES ('Home');
INSERT INTO realms (realm) VALUES ('Work');
CREATE TABLE tasks (id serial PRIMARY KEY, taskname varchar, body text, realm_id integer REFERENCES realms(id) ON DELETE CASCADE);