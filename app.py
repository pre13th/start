from flask import Flask
app = Flask(__name__, template_folder="templates")

from routes import *

# page
app.register_blueprint(render_page)

# 상품 가져오기 api
app.register_blueprint(product_get)

# 상품 좋아요 api
app.register_blueprint(product_like)

# 삭제 api
app.register_blueprint(product_delete)

# banner 가져오기 
app.register_blueprint(banner_get)


@app.errorhandler(404)
def page_not_found(error):
    app.logger.error(error)
    return render_template("404notfound.html"), 404


if __name__ == "__main__":
    app.run("0.0.0.0", port=5000, debug=True)
