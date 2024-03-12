const {app, BrowserWindow, ipcMain, session, ipcRenderer} = require("electron");
const serve = require("electron-serve");
const path = require("path");

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
            win.loadURL("app://-/login.html");
        });
    } else {
        win.loadURL("http://localhost:3000/login");
        // if (store.get('token')) {
        //     win.loadURL("http://localhost:3000/home");
        // } else {
        //     win.loadURL("http://localhost:3000/login");
        // }
        win.webContents.openDevTools();
        win.webContents.on("did-fail-load", (e, code, desc) => {
            win.webContents.reloadIgnoringCache();
        });
    }
}

app.on("ready", () => {
    createWindow();
    session.defaultSession.cookies.set({
        url: 'http://localhost',
        name: 'token',
        value: 'token',
    }, (e) => {
        console.log(e)
    })
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

ipcMain.on('message', async (event, arg) => {
    event.reply('message', `${arg} World!`)
})

// ipcMain.on('getToken', async (event, arg) => {
//     event.reply('message', token)
// })