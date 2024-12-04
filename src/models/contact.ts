import { Model, DataTypes } from "sequelize";
import dbConnection from "../database/config";
import User from "./user";

class Contact extends Model {
    public id!: number;
    public userId!: number;
    public name!: string;
    public email!: string;
    public phone!: string;
}

Contact.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: dbConnection,
        modelName: "Contact",
    }
)

Contact.belongsTo(User, { foreignKey: "userId" }); 
User.hasMany(Contact, { foreignKey: "userId" });

export default Contact;
