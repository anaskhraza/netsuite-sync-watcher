// This provides a primitive encrypt/decrypt for config files.
// The assumption is a config file is small so can be held easily in memory (i.e. not using streams)
var CryptoJS = require('crypto-js');
var fs = require('fs');
var chokidar = require('chokidar');
var fileCabinet = require("../lib/FileCabinet");
var chalk = require('chalk');

/**
 * Decrypts the given file using the provided passphrase else the value of the NSPW environment variable
 * @param {string} file
 * @param {string=} passphrase
 * @returns {string} decrypted contents of the file
 */
module.exports.decryptFile = function (file, passphrase) {

    var pass = passphrase || process.env.NSPW;
    if (!pass) throw new Error("passphrase must be specified or set as NSPW environment variable.");
    var encrypted = fs.readFileSync(file, { encoding: 'utf-8' });
    return CryptoJS.AES.decrypt(encrypted, pass).toString(CryptoJS.enc.Utf8);
};


module.exports.readFile = function (file) {
    var fileContent = fs.readFileSync(file, { encoding: 'utf-8' });
    console.log(fileContent);
    return fileContent;
}

/**
 * Encrypts the given file (replacing it on disk) using the provided passphrase
 * else the value of the NSPW environment variable
 * @param {string} file
 * @param {string=} passphrase
 * @returns {string} encrypted file name
 */
module.exports.encryptFile = function (file, passphrase) {
    var pass = passphrase || process.env.NSPW;
    //swwssssssss
    if (!pass) throw new Error("passphrase must be specified or set as NSPW environment variable.");
    var plaintext = fs.readFileSync(file, { encoding: 'utf-8' });
    var encrypted = CryptoJS.AES.encrypt(plaintext, pass);
    var outFilename = file + ".enc";
    fs.writeFileSync(outFilename, encrypted);
    return outFilename;
};


module.exports.executeWatcher = function () {

    var nsConf = eval(this.readFile("NetSuiteConfig.js"));
    var log = console.log.bind(console);
    var watcherDir = '.';
    if (nsConf.enableWatcher) {
        if (nsConf.watchPath) {
            if (nsConf.watchPath == "'.'") {
                nsConf.watchPath = nsConf.watchPath.replace(/\'/g, '')
            }
            watcherDir = nsConf.watchPath;
        }
        if (nsConf.watchFiles) {
            var watchFiles = nsConf.watchFiles;

            watchFiles = watchFiles ? watchFiles.split(",") : [];
            watcherDir = watchFiles.length > 0 ? this.getFilesArray(watcherDir, watchFiles) : watcherDir;
        }

        watcher = chokidar.watch(watcherDir, {
            ignored: /node_modules|\.git/,
            persistent: true,
            ignoreInitial: true,
            alwaysState: true
        }).on('all', function (event, path) {
            fileCabinet.postFile(path, null, null, function (err, resp) {

                if (err) throw err;

                console.log(JSON.stringify(resp.Envelope.Body));
                var wr = resp.Envelope.Body.addResponse.writeResponse;
                if (wr.status.isSuccess == "true") {
                    var successMsg = "File uploaded successfully as internalid " + wr.baseRef.internalId;
                    console.log(chalk.green(successMsg));
                }
                else {
                    var failMsg = "Problem uploading file" + JSON.stringify(wr);
                    console.error(chalk.red(failMsg));
                }
            });
            console.log(event, path);
        }).on('ready', function () {
            console.log('Ready');
        }).on('add', function (event, path) {
            console.log(event, path);
        })
            .on('change', function (event, path) {
                console.log(event, path);
            })
            .on('unlink', function (event, path) {
                console.log(event, path);
            });
    }
}

module.exports.getFilesArray = function (dir, filesArray) {
    var watchFiles = [];
    for (var i = 0; i < filesArray.length; i++) {
        watchFiles.push(dir + "/" + filesArray[i].trim());
    }
    console.log(JSON.stringify(watchFiles));
    return watchFiles;
}


module.exports.unwatchedChokidar = function () {
    var nsConf = eval(this.readFile("NetSuiteConfig.js"));
    var watcherDir = '.';
    if (nsConf.watchPath) {
        if (nsConf.watchPath == "'.'") {
            nsConf.watchPath = nsConf.watchPath.replace(/\'/g, '')
        }
        watcherDir = nsConf.watchPath;
    }

    if (nsConf.enableWatcher) {
        var unWatchedFiles = nsConf.unWatchedFiles;
        unWatchedFiles =  unWatchedFiles.split(",");
        unWatchedFiles = unWatchedFiles ? this.getFilesArray(watcherDir, unWatchedFiles) : [];
        if (unWatchedFiles.length > 0) {
            watcher.unwatch(unWatchedFiles);
        }
    }
}

module.exports.postFile = function (file, desc, folder) {

}