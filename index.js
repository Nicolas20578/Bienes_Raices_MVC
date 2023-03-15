import express from 'express'
import csrf from 'csurf'
import cookieParser from 'cookie-parser'
import usuarioRoutes from './routes/usuarioRoutes.js'
import db from './config/db.js'

// Crear la app
const app = express()

// Habilitar lectura de datos de formularios
app.use( express.urlencoded({extended: true}) )

// Habilitar Cookie Parser
app.use( cookieParser() )

// Habilitar CSRF
app.use( csrf({cookie: true}) )

// Conexion a la base de datos
try {
    await db.authenticate();
    db.sync()
    console.log('Conexión Correcta a la Base de Datos')
} catch (error) {
    console.log(error)
}

// Habilitar Pug
app.set('view engine', 'pug')
app.set('views', './views')

// Carpeta Pública
app.use( express.static('public') )

// Routing
app.use('/auth', usuarioRoutes)



// Definir in puerto y arrancar el proyecto
const port = process.env.PORT || 7000;
app.listen(port, () => {
    console.log(`El Servidor esta funcionando en el puerto ${port}`)
});