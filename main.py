from flask import Flask, render_template, redirect, request, session, url_for, send_from_directory
import queries
app = Flask(__name__)


def login_required(func):
    def func_wrapper():
        if "username" not in session:
            return redirect("/")
        return func()
    return func_wrapper


@app.route("/", methods=["GET", "POST"])
def boards():
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


def main():
    app.secret_key = "ExistenceIsPain"
    app.run(debug=True)

if __name__ == '__main__':
    main()