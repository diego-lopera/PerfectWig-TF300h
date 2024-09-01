import { userModel } from "../models/users.model.js";

export const getUsers = async (req, res) => {
    try {
        const users =  await userModel.find();
        if (users.length === 0) {
            return res.status(200).json({
                estado: '200',
                mensaje: 'No se encontraron usuarios en la base de datos',
                datos: null
            })
        }
        return res.status(200).json({
            estado: '200',
            mensaje: 'Estos son todos los usuarios encontrados',
            cantidadUsuarios: users.length,
            usuarios: users
        })
    } catch (error) {
        return res.status(400).json({
            estado: '400',
            mensaje: 'Ocurrió un problema al buscar los usuarios',
            datos: error
        })
    }
};

// export const postUser = async (req, res) => {
//     try {
//         const {correo, nombre, documentoIdentidad, contrasenia} = req.body;
//         const encriptContrasenia = await bcrypt.hash(contrasenia, 10);
//         const newUser = await userModel.create({
//             correo,
//             nombre,
//             documentoIdentidad,
//             contrasenia: encriptContrasenia

//         });
//         return res.status(201).json({
//             estado: '201',
//             mensaje: 'Usuario creado correctamente',
//             datos: newUser
//         })
//     } catch (error) {
//         return res.status(400).json({
//             estado: '400',
//             mensaje: 'Ocurrió un problema al crear un usuario',
//             datos: error
//         })
//     }
// };

export const getUserByEmail =  async (req, res) => {
    try {
        let emailUser = req.params.email;
        console.log(emailUser)
        const userByEmail = await userModel.findOne({correo: emailUser});
        if (!userByEmail) {
            return res.status(200).json({
                estado: '200',
                mensaje: "No se encontró el usuario " + userByEmail,
                dato: userByEmail
            });
        }
        return res.status(200).json({
            estado: '200',
            mensaje: 'Se encontró el usuario buscado',
            usuario: userByEmail
        });
    } catch (error) {
        return res.status(400).json({
            estado: '400',
            mensaje: 'Ocurrió un problema al buscar un solo usuario',
            datos: error,
        });
    }
};

export const putUserById = async (req, res) => {
    try {
        let userId = req.params.id
        const userData = req.body
        const userUpdated = await userModel.findByIdAndUpdate(userId, userData);
        if (!userId || userId === ':_id') {
            return res.json({
                mensaje: 'Debe ingresar un id de usuario válido',
                email: emailForGet
            });
        }
        return res.status(200).json({
            estado: '200',
            mensaje:'Se actualizó correctamente el usuario',
            datos: userUpdated
        })
        
    } catch (error) {
        return res.status(400).json({
            estado: '400',
            mensaje: 'Ocurrió un problema al actualizar usuario',
            datos: error,
        })
    }
}

export const deleteUserById = async (req, res) => {
    try {
     let userId = req.params.id
     const userDeleted = await userModel.findByIdAndDelete(userId);
     if (!userId || userId === ':_id') {
        return res.json({
            mensaje: 'Debe ingresar un id de usuario válido',
            email: userId
        });
     }
     return res.status(200).json({
         estado:'200',
         mensaje: 'Usuario eliminado Correctamente',
         datos: null
     })
    } catch (error) {
     return res.status(400).json({
         estado: '400',
         mensaje: 'Ocurrió un problema al eliminar usuario',
         datos: error,
     })
    }
 }