const Store = require("./store");

/**
 * ユーザーテーブルのCRUD
 */
class UserStore extends Store {
    constructor() {
        super();
        this.userTable = this.firestore.collection("users");
    }

    /**
     * ユーザー登録
     * @param {{userName: string, displayName: string}} param ユーザー情報
     * @returns {Promise<"booking" | "success" | "error">} 登録の成否
     */
    async create(param) {
        const userRef = await this.userTable.doc(param.userName);

        if((await userRef.get()).exists) {
            console.info(`${param.userName}のユーザーはすでに存在しているよ`);
            return "booking";
        }

        return userRef.set({
            userName: param.userName,
            displayName: param.displayName
        })
        .then(res => {
            console.info("-----------------------");
            console.info(`${param.userName}のユーザー登録できた！`);
            console.info(res);
            console.info("-----------------------");
            return "success";
        })
        .catch(err => {
            console.error("---------------------------");
            console.error("ユーザー登録でエラったっぽい。エラーの内容はこちら：")
            console.error(err);
            console.error("---------------------------");
            return "error";
        });
    }

    /**
     * ユーザーIDの一括取得
     * @returns {Promise<string[]>} すべてのユーザーID
     */
    async readAll() {
        return (await this.userTable.get()).docs.map(e => e.id);
    }

    /**
     * ユーザーの詳細取得
     * @param {string} userName ユーザーID
     */
    async read(userName) {
        const doc = await this.userTable.doc(userName).get();
        if (doc.exists) {
            return doc.data();
        } else {
            return "not exist";
        }
    }
}

module.exports = UserStore;