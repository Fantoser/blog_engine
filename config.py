# It is listed in the .gitignore file so it is not version controlled
class Config:
    DB_NAME = "blog_engine"
    DB_USER = "fantos"
    DB_HOST = "localhost"
    DB_PWD = "Katyula"
    DB_CONNECTION_STR = "dbname='" + DB_NAME + "' user='" + DB_USER + "' host='" + DB_HOST + "' password='" + DB_PWD + "'"