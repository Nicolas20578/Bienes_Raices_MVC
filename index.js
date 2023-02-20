import express from 'express'
import usuarioRoutes from './routes/usuarioRoutes.js'

// Crear la app
const app = express()

// Habilitar Pug
app.set('view engine', 'pug')
app.set('views', './views')

// Carpeta Pública
app.use( express.static('public') )

// Routing
app.use('/auth', usuarioRoutes)



// Definir in puerto y arrancar el proyecto
const port = 7000;
app.listen(port, () => {
    console.log(`El Servidor esta funcionando en el puerto ${port}`)
});