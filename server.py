from flask import Flask, render_template, request, url_for, session, redirect, flash
from flask_mysqldb import MySQL
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

mysql = MySQL(app)

@app.route('/herramientas')
def herramientas():

    consulta = mysql.connection.cursor()  
    consulta.execute("select  nombre, imagen, precio, categoria from productos where categoria = 'herramientas' order by nombre")
    productos = consulta.fetchall()
    consulta.close()

    pos =[]

    for campo in productos:
        pos.append({
            "nombre":campo[0],
            "imagen":campo[1],
            "precio":campo[2],
        })

    usuario = session.get("usuario")  
    return render_template("catalogoinicio.html", usuario=usuario, campos = pos)

@app.route('/tlapaleria')   
def tlapaleria():
    consulta = mysql.connection.cursor()  
    consulta.execute("select  nombre, imagen, precio, categoria from productos where categoria = 'tlapaleria' order by nombre")
    productos = consulta.fetchall()
    consulta.close()

    pos =[]

    for campo in productos:
        pos.append({
            "nombre":campo[0],
            "imagen":campo[1],
            "precio":campo[2],
        })

    usuario = session.get("usuario")  
    return render_template("catalogoinicio.html", usuario=usuario, campos = pos)

@app.route('/iluminacion')
def iluminacion():
    consulta = mysql.connection.cursor()  
    consulta.execute("select  nombre, imagen, precio, categoria from productos where categoria = 'iluminacion' order by nombre")
    productos = consulta.fetchall()
    consulta.close()

    pos =[]

    for campo in productos:
        pos.append({
            "nombre":campo[0],
            "imagen":campo[1],
            "precio":campo[2],
        })

    usuario = session.get("usuario")  
    return render_template("catalogoinicio.html", usuario=usuario, campos = pos)

@app.route('/pinturas')
def pinturas():
    consulta = mysql.connection.cursor()  
    consulta.execute("select  nombre, imagen, precio, categoria from productos where categoria = 'pinturas' order by nombre")
    productos = consulta.fetchall()
    consulta.close()

    pos =[]

    for campo in productos:
        pos.append({
            "nombre":campo[0],
            "imagen":campo[1],
            "precio":campo[2],
        })

    usuario = session.get("usuario")  
    return render_template("catalogoinicio.html", usuario=usuario, campos = pos)

@app.route("/catalogo")
def catalogo():
    

    consulta = mysql.connection.cursor() 
    consulta.execute("SELECT nombre, imagen, precio FROM productos order by nombre")
    productos = consulta.fetchall()
    consulta.close()

    pos =[]

    for campo in productos:
        pos.append({
            "nombre":campo[0],
            "imagen":campo[1],
            "precio":campo[2],
        })

    usuario = session.get("usuario")  
    return render_template("catalogoinicio.html", usuario=usuario, campos = pos)

@app.route("/")
def index():
        return render_template("prueba.html")

@app.route("/registro")
def registro():
        return render_template("registro.html")

@app.route("/buscar", methods=['POST'])
def busqueda():

    buscar = request.form['busqueda']
    
    consulta = mysql.connection.cursor()  
    consulta.execute("SELECT nombre, imagen, precio FROM productos Where nombre like %s order by nombre", ('%' + buscar + '%',))
    productos = consulta.fetchall()
    consulta.close()
    pos =[]

    for campo in productos:
        pos.append({
            "nombre":campo[0],
            "imagen":campo[1],
            "precio":campo[2],
        })

    usuario = session.get("usuario")  
    return render_template("buscar.html", usuario=usuario, campos = pos)

if __name__=='__main__':
    app.run(debug=True, port=80, host='0.0.0.0')
