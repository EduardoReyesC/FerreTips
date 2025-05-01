from flask import Flask, render_template, request, url_for, session

app = Flask(__name__)


@app.route('/herramientas')
def herramientas():
    return render_template('herramientas.html')

@app.route("/catalogo")
def catalogo():
    usuario = session.get("usuario")  # Por ejemplo
    return render_template("catalogo.html", usuario=usuario)


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