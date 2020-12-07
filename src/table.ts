import { Sequelize, Model, DataTypes } from "sequelize";

const sequelize = new Sequelize({
    database: "test_database",
    username: "docker",
    password: "docker",
    host: "localhost",
    port: 3306,
    dialect: "mysql",
    dialectOptions: { connectTimeout: 3 * 1000 }
});

class Table extends Model {}

Table.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.CHAR,
        allowNull: false
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "test_table",
    tableName: "test_table",
    createdAt: "created_at",
    updatedAt: "updated_at"
});

(async () => {
    await sequelize.authenticate().then(() => {
        console.log("Connection has been established successfully.");
    }).catch(err => {
        console.error("Unable to connect to the database: ", err);
    });
    await Table.sync();
})();

function close() {
    sequelize.close();
}

// Promise<{
//     id: number,
//     name: string,
//     message: string,
//     created_at: Date,
//     updated_at: Date
// }[]>
async function findAll(): Promise<object[]> {
    const getTableData = await Table.findAll();
    const dataToJson = getTableData.map(e => e.toJSON());
    return  dataToJson;
}

async function append(param: {name: string, message: string}) : Promise<void>{
    await Table.create({
        name: param.name,
        message: param.message
    }).catch(err => console.error("cannot apend data: ", err));
    console.log("append message");
}

async function clear(param: {id: number}): Promise<void> {
    await Table.destroy({
        where: {
            id: param.id
        }
    });
    console.log("delete message");
}

export {
    close,
    findAll,
    append,
    clear,
}