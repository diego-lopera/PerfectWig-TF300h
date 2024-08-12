import { userModel } from "../models/users.model.js";
import bcrypt from "bcryptjs";

export const getUsers = async (req, res) => {

    try {
        const users = await userModel.find();
        if (users.length === 0) {
            return res.status(200).json({
                estado: '200',
                mensaje: 'No se encontraron usuarios en la base de datos',
                datos: null
            });
        }
        return res.status(200).json({
            estado: '200',
            mensaje: 'Usuarios encontrados: ',
            cantidadUsuarios: users.length,
            usuarios: users
        });
    } catch (error) {
        return res.status(400).json({
            estado: '400',
            mensaje: 'Ocurrió un problema al encontrar usuarios',
            datos: error
        })
    }
};

export const postUsers = async (req, response) => {
  try {
    const { correo, nombre, tipoUsuario, documentoIdentidad, contrasenia, fotoPerfil } = req.body;
    const password = await bcrypt.hash(contrasenia, 10);
    const newUser = await userModel.create({
        nombre,
        correo,
        tipoUsuario,
        documentoIdentidad,
        fotoPerfil,
        contrasenia: password,
    });

    return response.status(201).json({
        estado: "201",
        mensaje: "Usuario creado correctamente",
        datos: newUser,
    });
  } catch (error) {
    return response.status(400).json({
        estado: "400",
        mensaje: "Ocurrió un error al crear usuario",
        datos: error,
    });
  }
};

export const getUserById = async (req, res) => {
    try {
        let idUser = req.params._id
        if(idUser === ':id' ){
            return res.json({
                mensaje: 'Debe ingresar un id válido',
                id: idUser
            })
        }

        const userById = await userModel.findById(idUser);

        if(!userById){
            return res.status(200).json({
                estado: '200',
                mensaje: "No se encontró el usuario",
                dato: userById
            })
        }


        return res.status(200).json({
            estado: '200',
            mensaje: 'Se encontró el usuario buscado',
            usuario: userById
        })

    } catch (error) {
        return res.status(400).json({
            estado: '400',
            mensaje: 'Ocurrió un problema al buscar el usuario',
            datos: error,
        })
    }
};


export const deleteUserById = async (req, res) => {
  try {
    let idUser = req.params._id;
    let userDeleted = await userModel.findByIdAndDelete(idUser);
    if (!userDeleted) {
      return res
        .status(404)
        .json({ 
            estado:'404',
            mensaje: 'No se encontró el usuario',
            datos: userDeleted
         });
    }
    return res.status(200).json({ 
        estado:'200',
        mensaje: 'Usuario eliminado Correctamente',
        datos: userDeleted
     });
  } catch (error) {
    return res.status(400).json({ 
        estado: '400',
        mensaje: 'Ocurrió un problema al eliminar usuario',
        datos: error,
     });
  }
};

export const putUserById = async (req, res) => {
  try {
    let userUpdated = await userModel.findByIdAndUpdate(req.params._id, req.body, {new: true});
    if (!userUpdated) {
      return res
        .status(404)
        .json({ 
            estado:'404',
            mensaje: 'No se encontró el usuario',
            datos: userUpdated
         });
    }
    return res
      .status(200)
      .json({ 
        estado:'200',
        mensaje: 'Usuario actualizado Correctamente',
        datos: userUpdated
       });
  } catch (error) {
    return res.status(500).json({ 
        estado: '400',
        mensaje: 'Ocurrió un problema al actualizar usuario',
        datos: error,
     });
  }
};
