var mysqldump = require('mysqldump');

exports.dailyBackupConfig = async function () {
    setInterval(() => {
        let date = ' ' + new Date(Date.now()).toString().slice(4, 15);
        let dir = './backup/dump' + date + '.sql';

        // @ts-ignore
        mysqldump({
            connection: {
                host: process.env.DB_HOST,
                // @ts-ignore
                user: process.env.DB_USERNAME,
                // @ts-ignore
                password: process.env.DB_PASSWORD,
                // @ts-ignore
                database: process.env.DB_NAME,
            },
            dumpToFile: dir,
        });
    }, 1000 * 60 * 60 * 24);
};


exports.onTimeBackupConfig = async function (dir) {

    let date = ' ' + new Date(Date.now()).toString().slice(4, 15);

    const length = dir.length;
    let actualDir = dir.slice(0, length - 4) + date + dir.slice(length - 4, length);

    // @ts-ignore
    mysqldump({
        connection: {
            host: process.env.DB_HOST,
            // @ts-ignore
            user: process.env.DB_USERNAME,
            // @ts-ignore
            password: process.env.DB_PASSWORD,
            // @ts-ignore
            database: process.env.DB_NAME,
        },
        dumpToFile: actualDir,
    });
};
