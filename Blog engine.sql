
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
    owner_id integer,
    blogpost_id integer,
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


ALTER TABLE ONLY users
    ADD CONSTRAINT user_pk PRIMARY KEY (id);

ALTER TABLE ONLY blogs
    ADD CONSTRAINT blog_pk PRIMARY KEY (id);

ALTER TABLE ONLY blogposts
    ADD CONSTRAINT blogpost_pk PRIMARY KEY (id);

ALTER TABLE ONLY answers
    ADD CONSTRAINT answer_pk PRIMARY KEY (id);