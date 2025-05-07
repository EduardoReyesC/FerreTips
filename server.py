from flask import Flask, render_template, request, url_for, session

app = Flask(__name__)


@app.route('/herramientas')
def herramientas():
    return render_template('herramientas.html')

@app.route('/tlapaleria')
def tlapaleria():
    return render_template('tlapaleria.html')

@app.route('/iluminacion')
def iluminacion():
    return render_template('iluminacion.html')

@app.route('/pinturas')
def pinturas():
    return render_template('pinturas.html')

@app.route("/catalogo")
def catalogo():
    usuario = session.get("usuario")  
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
    app.run(debug=True, port=8086, host='0.0.0.0')