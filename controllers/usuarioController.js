import { check, validationResult } from 'express-validator'
import Usuario from '../models/Usuario.js'

const formularioLogin = (req, res) => {
    res.render('auth/login', {
        pagina: 'Iniciar Sesión'
    })
}

const formularioRegistro = (req, res) => {
    res.render('auth/registro', {
        pagina: 'Crear Cuenta'
    })
}

const registrar = async (req, res) => {

    console.log(req.body);

    // Validación
    await check('nombre').notEmpty().withMessage('El Nombre No Puede Ir Vacio').run(req)
    await check('email').isEmail().withMessage('Eso No Parece Un Email').run(req)
    await check('password').isLength({ min: 6 }).withMessage('El Password Debe Ser De Al Menos 6 Caracteres').run(req)
    await check('repetir_password').equals('password').withMessage('Los Passwords No Son Iguales').run(req)

    let resultado = validationResult(req)

    // Verificar que el resultado este vacio
    if(!resultado.isEmpty()) {
        // Errores
        return res.render('auth/registro', {
            pagina: 'Crear Cuenta',
            errores: resultado.array(),
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email
            }
        })
    }


    // // Extraer los datos
    // const { nombre, email, password } = req.body

    // // Verificar que el usuario no este duplicado
    // const existeUsuario = await Usuario.findoOne({ where: { email }})
    // if(existeUsuario) {
    //     return res.render('auth/registro', {
    //         pagina: 'Crear Cuenta',
    //         errores: [{msg: 'El Usuario Ya Esta Registrado'}],
    //         usuario: {
    //             nombre: req.body.nombre,
    //             email: req.body.email
    //         }
    //     })
    // }

    // console.log(existeUsuario)

    // return;
}

const formularioOlvidePassword = (req, res) => {
    res.render('auth/olvide-password', {
        pagina: 'Recupera tu acceso a Bienes Raices'
    })
}

export {
    formularioLogin,
    formularioRegistro,
    registrar,
    formularioOlvidePassword
}