from flask import Flask, render_template, redirect, request, session, url_for, send_from_directory, json
from werkzeug.utils import secure_filename
import queries
app = Flask(__name__, static_url_path='/static')


def login_required(func):
    def func_wrapper():
        if "username" not in session:
            return redirect("/")
        return func()
    return func_wrapper


@app.route("/", methods=["GET", "POST"])
def index():
    session.pop("username", None)
    state = "login"
    if request.method == "POST":
        state = "register"
    return render_template('login.html', state=state)


@app.route("/login", methods=["POST"])
def login():
    username = request.form["username"]
    password = request.form["password"]
    if queries.is_valid_login(username, password):
        session["username"] = request.form["username"]
        return redirect("/main")
    else:
        message = "Username/Password is incorrect"
        return render_template("login.html", message=message, state="login")


@app.route("/register", methods=["POST"])
def register():
    username = request.form["username"]
    password = request.form["password"]
    passwordCheck = request.form["passwordcheck"]
    if password == passwordCheck:
        if queries.username_check(username):
            queries.submit_registration(username, password)
            session["username"] = username
            return redirect("/main")
        else:
            message = "Username already taken"
    else:
        message = "Passwords are not matching"
    return render_template("login.html", message=message, state="register")


@app.route("/main")
@login_required
def main():
    username = session["username"]
    return render_template("index.html", username=username)


@app.route("/get-user", methods=["GET"])
def get_userID():
    userID = queries.get_user(session["username"])
    return json.dumps(userID)


@app.route("/get-blogs", methods=["GET"])
def get_blogs():
    data = queries.get_blogs()
    return json.dumps(data)


@app.route("/get-blog/<id>", methods=["GET"])
def get_blog(id):
    data = queries.get_blogposts(id)
    return json.dumps(data)


@app.route("/get-blogpost/<id>", methods=["GET"])
def get_blogpost(id):
    blogpostdata = queries.get_blogpost(id)
    answerdata = queries.get_answers(id)
    blogpostdata.append(answerdata)
    return json.dumps(blogpostdata)


@app.route("/submit-blog/<userid>", methods=["POST"])
def submit_blog(userid):
    title = request.form["title"]
    queries.submit_blog(title, userid)
    return redirect("/main")


@app.route("/submit-blogpost/<blogid>", methods=["POST"])
def submit_blogpost(blogid):
    title = request.form["title"]
    message = request.form["message"]
    queries.submit_blogpost(title, message, blogid)
    url = "/get-blog/" + blogid
    return redirect("/main")


@app.route("/test-form", methods=["POST"])
def test_form():
    jsonData = request.get_data()
    data = eval(jsonData)
    queries.submit_answer(data[0], data[1], data[2], data[3])
    return redirect("/main")


@app.route("/edit-blogpost/<blogid>", methods=["POST"])
def edit_blog(blogid):
    name = request.form["title"]
    queries.edit_blog(name, blogid)
    return redirect("/main")


@app.route("/delete-blog/<blogid>", methods=["POST"])
def delete_blog(blogid):
    queries.delete_blog(blogid)
    return redirect("/main")


def main():
    app.secret_key = "ExistenceIsPain"
    app.run(debug=True)

if __name__ == '__main__':
    main()