from config import Config
import psycopg2
import psycopg2.extras


def open_database():
    connection_string = Config.DB_CONNECTION_STR
    connection = psycopg2.connect(connection_string)
    connection.autocommit = True
    return connection


def connection_handler(function):
    def wrapper(*args, **kwargs):
        connection = open_database()
        dict_cur = connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        ret_value = function(dict_cur, *args, **kwargs)
        dict_cur.close()
        connection.close()
        return ret_value
    return wrapper