const {app, BrowserWindow, ipcMain, session} = require("electron");
const path = require("path");
const serve = require('electron-serve')


const appServe = app.isPackaged ? serve({
    directory: path.join(__dirname, "../out")
}) : null;

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1000,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    });

    if (app.isPackaged) {
        appServe(win).then(() => {
            win.loadURL("app://-");
        });
    } else {
        win.loadURL('http://localhost:3000');
        win.webContents.openDevTools();
        win.webContents.on("did-fail-load", (e, code, desc) => {
            win.webContents.reloadIgnoringCache();
        });
    }
    win.webContents
        .executeJavaScript('localStorage.setItem("token", "token");', true)
        .then((result) => {
            console.log(result);
        });
}

app.on("ready", () => {
    createWindow();
    // session.defaultSession.cookies.set({
    //     url: app.isPackaged ? 'app://-' : 'http://localhost:3000',
    //     name: 'token',
    //     value: 'token',
    // }, (e) => {
    //     console.log(e)
    // })
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

ipcMain.on('message', async (event, arg) => {
    event.reply('message', `${arg} World!`)
})