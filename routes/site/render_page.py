from flask import Blueprint, render_template


render_page = Blueprint("render_page", __name__)


@render_page.route("/")
def render_home():
    return render_template("index.html")



@render_page.route("/main")
def render_main():
    return render_template("main.html")

@render_page.route("/about")
def render_about():
    return render_template("about.html")

@render_page.route("/star")
def render_star():
    return render_template("star.html")