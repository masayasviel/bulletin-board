// import dotenv from "dotenv";
// dotenv.config();

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
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    sequelize,
    modelName: "test_table",
    tableName: "test_table",
    timestamps: false
});

(async () => {
    await sequelize.authenticate().then(() => {
        console.log("Connection has been established successfully.");
    }).catch(err => {
        console.error("Unable to connect to the database: ", err);
    });
    await Table.sync();
})();

/**
 * CRUD全般をやってくれるクラス
 * 最後に**必ず**destructorを呼ぶこと
 */
export default class Orm {
    /**
     * コンストラクタ
     */
    constructor() {
    }
    /**
     * テーブルにあるデータ全てを返す
     * @return tableDataAll
     */
    // public async findAll(): Promise<{
    //     id: number,
    //     name: string,
    //     message: string,
    //     created_at: Date | null,
    //     updated_at: Date | null
    // }> {
    //     const tableDataAll = await Table.findAll();
    //     return tableDataAll;
    // }
    public async append(param: {name: string, message: string}): Promise<number> {
        const now = new Date();
        await Table.create({
            name: param.name,
            message: param.message,
            created_at: now,
            updated_at: now
        }).catch(err => console.error("cannot apend data: ", err));
        console.log("append message");
        return 1;
    }
    public async delete(param: {id: number}): Promise<number> {
        await Table.destroy({
            where: {
                id: param.id
            }
        });
        console.log("delete message");
        return 1;
    }
    /**
     * デストラクタ  
     * 必ず呼べ！
     */
    destructor() {
        sequelize.close();
    }
}