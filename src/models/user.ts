import { Model, DataTypes } from "sequelize";
import bcryptjs from "bcryptjs";
import dbConnection from "../database/config";



class User extends Model {
    public id!: number;
    public username!: string;
    public email!: string;
    public password!: string;

    public async comparePassword(password: string): Promise<boolean> {
        return await bcryptjs.compare(password, this.password);
    }
}

User.init(
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: dbConnection,
        modelName: "User",
    }
);

