from flask import Blueprint, render_template,redirect
from flask import session,escape

render_page = Blueprint("render_page", __name__)


@render_page.route("/")
def render_home():
    return render_template("index.html")



@render_page.route("/main")
def render_main():

    # if "user" in session:
    #     return render_template("main.html")
    # else:
    #     return redirect('/')
    return render_template("main.html")
    

@render_page.route("/about")
def render_about():
    if "user" in session:
        return render_template("about.html")
    else:
        return redirect('/')

@render_page.route("/star")
def render_star():
    if "user" in session:
        return render_template("star.html")
    else:
        return redirect('/')

@render_page.route("/create")
def render_create():
    
    return render_template("create.html")