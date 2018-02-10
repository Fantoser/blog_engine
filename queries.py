import data_manager
import bcrypt


# Functions for registration
def get_hashed_password(plain_text_password):
    hashed_bytes = bcrypt.hashpw(plain_text_password.encode('utf-8'), bcrypt.gensalt())
    return hashed_bytes.decode("utf-8")


@data_manager.connection_handler
def submit_registration(cursor, username, password):
    hashword = get_hashed_password(password)
    cursor.execute("INSERT INTO users (username, password) VALUES (%s, %s);", (username, hashword))


@data_manager.connection_handler
def username_check(cursor, username):
    cursor.execute("SELECT username FROM users WHERE username = (%s);", (username,))
    result = cursor.fetchall()
    if len(result) == 0:
        return True
    else:
        return False


# Functions for login
def check_password(plain_text_password, hashed_text_password):
    hashed_bytes_password = hashed_text_password.encode("utf-8")
    return bcrypt.checkpw(plain_text_password.encode('utf-8'), hashed_bytes_password)


@data_manager.connection_handler
def is_valid_login(cursor, username, password):
    cursor.execute("SELECT password FROM users WHERE username = (%s);", (username,))
    hashword = cursor.fetchall()
    if len(hashword) == 0:
        return False
    else:
        return check_password(password, hashword[0]["password"])


# Functions for grab datas
@data_manager.connection_handler
def get_user(cursor, username):
    cursor.execute("SELECT id, username FROM users WHERE username = (%s);", (username,))
    data = cursor.fetchall()
    return data[0]


@data_manager.connection_handler
def get_users(cursor):
    cursor.execute("SELECT * FROM users")
    data = cursor.fetchall()
    return data


@data_manager.connection_handler
def get_blogs(cursor):
    cursor.execute("SELECT * FROM blogs ORDER BY id")
    data = cursor.fetchall()
    return data


@data_manager.connection_handler
def get_blogposts(cursor, blogID):
    cursor.execute("""SELECT * FROM blogposts
                    WHERE blog_id = %s
                    ORDER BY id;""", (blogID))
    data = cursor.fetchall()
    return data

@data_manager.connection_handler
def get_blogpost(cursor, blogID):
    cursor.execute("""SELECT * FROM blogposts
                    WHERE id = %s;""", (blogID))
    data = cursor.fetchall()
    return data


@data_manager.connection_handler
def get_answers(cursor, blogpostID):
    cursor.execute("""SELECT * FROM answers
                    WHERE blogpost_id = %s;""", (blogpostID))
    data = cursor.fetchall()
    return data


@data_manager.connection_handler
def get_about(cursor, blogID):
    cursor.execute("""SELECT about FROM blogs
                    WHERE blog_id = %s;""", (blogID))
    data = cursor.fetchall()
    return data


@data_manager.connection_handler
def get_contact(cursor, blogID):
    cursor.execute("""SELECT contact FROM blogs
                    WHERE blog_id = %s;""", (blogID))
    data = cursor.fetchall()
    return data


@data_manager.connection_handler
def get_links(cursor, blogID):
    cursor.execute("""SELECT links FROM blogs
                    WHERE blog_id = %s;""", (blogID))
    data = cursor.fetchall()
    return data


# Submit stuff
@data_manager.connection_handler
def submit_blog(cursor, title, userID):
    cursor.execute("""INSERT INTO blogs (name, owner_id)
                    VALUES (%s, %s);""", (title, userID))


@data_manager.connection_handler
def submit_blogpost(cursor, title, message, blogID):
    cursor.execute("""INSERT INTO blogposts (title, message, blog_id)
                    VALUES (%s, %s, %s);""", (title, message, blogID))


@data_manager.connection_handler
def submit_answer(cursor, blogpostid, userid, username, message):
    cursor.execute("""INSERT INTO answers (blogpost_id, owner_id, username, message)
                    VALUES (%s, %s, %s, %s);""", (blogpostid, userid, username, message))


######################

@data_manager.connection_handler
def submit_story(cursor, title, story):
    cursor.execute("""INSERT INTO question (title, message)
    VALUES (%s, %s);""", (title, story))


@data_manager.connection_handler
def edit_answer(cursor, ID, message):
    cursor.execute("""UPDATE answer
    SET message=%s
    WHERE id =%s""", (message, ID))


@data_manager.connection_handler
def edit_story(cursor, ID, title, story):
    cursor.execute("""UPDATE question
    SET title=%s, message=%s
    WHERE id =%s""", (title, story, ID))

@data_manager.connection_handler
def delete_story(cursor, ID):
    cursor.execute("""DELETE FROM question
    WHERE id =%s""", (ID))
