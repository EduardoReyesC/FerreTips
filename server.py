from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/catalogo')
def catalogo():
    return render_template('catalogo.html')

@app.route("/")
def index():
        return render_template("prueba.html")

@app.route("/prueba")
def prueba():
        return render_template("prueba.html")

@app.route("/nosotros")
def nosotros():
        return render_template("nosotros.html")

if __name__=='__main__':
    app.run()