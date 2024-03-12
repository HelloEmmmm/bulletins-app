const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const path = require('path');
const serve = require('electron-serve');

const isMac = process.platform === 'darwin'

const template = [
	// { role: 'appMenu' }
	...(isMac
		? [{
			label: app.name,
			submenu: [
				{ role: 'about' },
				{ type: 'separator' },
				{ role: 'services' },
				{ type: 'separator' },
				{ role: 'hide' },
				{ role: 'hideOthers' },
				{ role: 'unhide' },
				{ type: 'separator' },
				{ role: 'quit' }
			]
		}]
		: []),
	// { role: 'fileMenu' }
	{
		label: 'File',
		submenu: [
			isMac ? { role: 'close' } : { role: 'quit' }
		]
	},
	// { role: 'editMenu' }
	{
		label: 'Edit',
		submenu: [
			{ role: 'undo' },
			{ role: 'redo' },
			{ type: 'separator' },
			{ role: 'cut' },
			{ role: 'copy' },
			{ role: 'paste' },
			...(isMac
				? [
					{ role: 'pasteAndMatchStyle' },
					{ role: 'delete' },
					{ role: 'selectAll' },
					{ type: 'separator' },
					{
						label: 'Speech',
						submenu: [
							{ role: 'startSpeaking' },
							{ role: 'stopSpeaking' }
						]
					}
				]
				: [
					{ role: 'delete' },
					{ type: 'separator' },
					{ role: 'selectAll' }
				])
		]
	},
	// { role: 'viewMenu' }
	{
		label: 'View',
		submenu: [
			{ role: 'reload' },
			{ role: 'forceReload' },
			{ role: 'toggleDevTools' },
			{ type: 'separator' },
			{ role: 'resetZoom' },
			{ role: 'zoomIn' },
			{ role: 'zoomOut' },
			{ type: 'separator' },
			{ role: 'togglefullscreen' }
		]
	},
	// { role: 'windowMenu' }
	{
		label: 'Window',
		submenu: [
			{ role: 'minimize' },
			{ role: 'zoom' },
			...(isMac
				? [
					{ type: 'separator' },
					{ role: 'front' },
					{ type: 'separator' },
					{ role: 'window' }
				]
				: [
					{ role: 'close' }
				])
		]
	},
	{
		role: 'help',
		submenu: [
			{
				label: 'Learn More',
				click: async () => {
					const { shell } = require('electron')
					await shell.openExternal('https://electronjs.org')
				}
			}
		]
	}
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

const appServe = app.isPackaged
	? serve({
			directory: path.join(__dirname, '../out'),
		})
	: null;

const createWindow = () => {
	const win = new BrowserWindow({
		width: 1000,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
		},
	});

	if (app.isPackaged) {
		appServe(win).then(() => {
			win.loadURL('app://-');
		});
	} else {
		win.loadURL('http://localhost:3000');
		win.webContents.openDevTools();
		win.webContents.on('did-fail-load', (e, code, desc) => {
			win.webContents.reloadIgnoringCache();
		});
	}
	win.webContents
		.executeJavaScript('localStorage.setItem("token", "token");', true)
		.then((result) => {
			console.log(result);
		});
};

app.on('ready', () => {
	createWindow();
	// session.defaultSession.cookies.set({
	//     url: app.isPackaged ? 'app://-' : 'http://localhost:3000',
	//     name: 'token',
	//     value: 'token',
	// }, (e) => {
	//     console.log(e)
	// })
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

ipcMain.on('message', async (event, arg) => {
	event.reply('message', `${arg} World!`);
});
