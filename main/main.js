const { app, BrowserWindow, ipcMain} = require("electron");
const serve = require("electron-serve");
const path = require("path");
const Store = require('electron-store');

const appServe = app.isPackaged ? serve({
    directory: path.join(__dirname, "../out")
}) : null;

const schema = {
    token: {
        type: 'string',
        default: 'token'
    }
};

const store = new Store({schema});

console.log(store.get('token'), 98);

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    });

    if (app.isPackaged) {
        appServe(win).then(() => {
            if (store.get('token')) {
                win.loadURL("app://-home");
            } else {
                win.loadURL("app://-");
            }
        });
    } else {
        if (store.get('token')) {
            win.loadURL("http://localhost:3000/home");
        } else {
            win.loadURL("http://localhost:3000/login");
        }
        win.webContents.openDevTools();
        win.webContents.on("did-fail-load", (e, code, desc) => {
            win.webContents.reloadIgnoringCache();
        });
    }
}

app.on("ready", () => {
    createWindow();
});

app.on("window-all-closed", () => {
    if(process.platform !== "darwin"){
        app.quit();
    }
});

ipcMain.on('message', async (event, arg) => {
    event.reply('message', `${arg} World!`)
    console.log('pong');
})