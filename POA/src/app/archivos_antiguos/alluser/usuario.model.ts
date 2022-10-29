export namespace UsuarioModels{
    export interface usuario{
        id:             number;
        email:          string;
        username:       string;
        password:       string;
        password2:      string;
        isDelete:       boolean;
        resetToken:     string;
        createdAt:      Date;
        updatedAt:      Date;
        idEmpleado:     number;
        idRol:          number;
        empleado:       empleado;
        role:            role;

    }

    export interface empleado{
        id:                number;
        dni:               string;
        nombre:            string; 
        apellido:          string;
        direccion:         string
        telefono:          string;
        fechaNacimiento:   Date;
        sexo:              string;
        isDelete:          boolean;
        createdAt:         Date;
        updatedAt:         Date;
        idInstitucion:     number
    }

    export interface role{
        id:                number;
        rol:               string;
        descripcion:       string;
        isDelete:          boolean;
        createdAt:         Date;
        updatedAt:         Date;

    }
}