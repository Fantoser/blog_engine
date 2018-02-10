
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS blogs;
DROP TABLE IF EXISTS blogposts;
DROP TABLE IF EXISTS answers;
DROP SEQUENCE IF EXISTS users_id_seq;
DROP SEQUENCE IF EXISTS blogs_id_seq;
DROP SEQUENCE IF EXISTS blogposts_id_seq;
DROP SEQUENCE IF EXISTS answers_id_seq;


CREATE TABLE users (
    id integer NOT NULL,
    username text,
    password text
);

CREATE TABLE blogs (
    id integer NOT NULL,
    name text,
    owner_id integer,
    about text,
    contact text,
    links text
);

CREATE TABLE blogposts (
    id integer NOT NULL,
    blog_id integer,
    title text,
    message text,
    img text
);

CREATE TABLE answers (
    id integer NOT NULL,
    blogpost_id integer,
    owner_id integer,
    username text,
    message text
);


CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

    
CREATE SEQUENCE blogs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


CREATE SEQUENCE blogposts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE SEQUENCE answers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);
ALTER TABLE ONLY blogs ALTER COLUMN id SET DEFAULT nextval('blogs_id_seq'::regclass);
ALTER TABLE ONLY blogposts ALTER COLUMN id SET DEFAULT nextval('blogposts_id_seq'::regclass);
ALTER TABLE ONLY answers ALTER COLUMN id SET DEFAULT nextval('answer_id_seq'::regclass);



INSERT INTO users VALUES (1, 'Mr.Meeseeks', '$2b$12$RL40kkbIGwa2DI2TG/w3yev4gdlhWjJ1jqwcmM7sYLKdSw9n9cH9e');

SELECT pg_catalog.setval('users_id_seq', 1, true);

INSERT INTO blogs VALUES (1, 'Random Pictures', 1, 'My name is Jeff!', NULL, NULL);
INSERT INTO blogs VALUES (2, 'Cats!', 2, 'I love cats!', NULL, NULL);

SELECT pg_catalog.setval('blogs_id_seq', 2, true);

INSERT INTO blogposts VALUES (1, 1, 'Post1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque egestas ligula sapien, eu varius lacus cursus vel. Cras eget ex nisi. Phasellus commodo nisl eget risus cursus lacinia. Pellentesque luctus massa sit amet metus malesuada lacinia. Nullam in sapien quis neque venenatis fermentum facilisis tempus metus. Sed accumsan pharetra justo ut congue. Phasellus iaculis posuere diam et porta.', 'boi.jpg');
INSERT INTO blogposts VALUES (2, 1, 'Post2', 'Etiam eleifend consectetur orci, quis facilisis nibh semper vel. Integer scelerisque nisl eget lacus dapibus, sit amet blandit elit posuere. Maecenas mauris tellus, tristique eget commodo nec, auctor egestas nunc. Sed ipsum mi, convallis vel urna aliquet, auctor tincidunt magna. In quis fringilla ipsum, nec euismod magna. Sed sed elit tellus. Cras eu vestibulum erat. Cras convallis ac lectus eget lobortis. Sed turpis arcu, posuere ac ante at, lacinia ultrices odio. Praesent at elit quam.', 'Selection_005.png');
INSERT INTO blogposts VALUES (3, 1, 'Post3', 'Sed ornare risus justo, id convallis ante viverra non. Quisque bibendum tincidunt mi. Donec pellentesque suscipit urna, et vehicula felis rutrum vel. Maecenas enim libero, efficitur eu posuere suscipit, porttitor sed eros. Nunc vitae porta ligula. Pellentesque sapien metus, placerat in sagittis ac, sollicitudin in augue. Fusce eu ornare enim. Maecenas dictum semper augue imperdiet feugiat. Ut porttitor nisi tortor, vitae elementum diam sodales et. Duis sed tincidunt eros. Aliquam eu porttitor lorem. Aenean congue mauris vulputate diam imperdiet posuere.', 'Selection_004.png');
INSERT INTO blogposts VALUES (4, 1, 'Post4', 'Cras vel risus a lacus euismod mattis vitae a diam. Etiam condimentum rhoncus nulla, malesuada ultrices elit posuere vitae. Quisque aliquam risus eu rhoncus vulputate. Duis sit amet egestas arcu. Sed ornare dignissim dui, nec fermentum lorem sodales non. Nulla volutpat fringilla ligula. Cras non nulla finibus, dignissim orci ac, semper lectus. Aenean quis risus commodo, dictum ex fermentum, scelerisque nibh.', 'harry.jpg');
INSERT INTO blogposts VALUES (5, 2, 'A cat', 'A fluffy cat looking funny surprised or concerned', 'A-fluffy-cat-looking-funny-surprised-or-concerned.jpg');
INSERT INTO blogposts VALUES (6, 2, 'Another cat!', 'Cat targeting', 'funny-cat-videos-wide.jpg');
INSERT INTO blogposts VALUES (7, 2, 'Surprise! A cat!', 'This one is cute', '1510172827500.jpg');
INSERT INTO blogposts VALUES (8, 2, 'Well, this one is an armadillo', 'Meh, close enough', 'mammal_nine-banded-armadillo.jpg');


SELECT pg_catalog.setval('blogposts_id_seq', 8, true);

ALTER TABLE ONLY users
    ADD CONSTRAINT user_pk PRIMARY KEY (id);

ALTER TABLE ONLY blogs
    ADD CONSTRAINT blog_pk PRIMARY KEY (id);

ALTER TABLE ONLY blogposts
    ADD CONSTRAINT blogpost_pk PRIMARY KEY (id);

ALTER TABLE ONLY answers
    ADD CONSTRAINT answer_pk PRIMARY KEY (id);