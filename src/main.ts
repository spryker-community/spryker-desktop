import { app, BrowserWindow, Tray } from "electron";
import * as path from "path";

const assetsDirectory = path.join(__dirname, '../assets');

function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        },
        width: 800,
        icon: path.join(assetsDirectory, 'icon.png')
    });

    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, "../index.html"));

    // Open the DevTools.
    mainWindow.webContents.openDevTools();
}

function getWindowPosition(window: BrowserWindow, tray: Tray) {
    const windowBounds = window.getBounds()
    const trayBounds = tray.getBounds()

    // Center window horizontally below the tray icon
    const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2))

    // Position window 4 pixels vertically below the tray icon
    const y = Math.round(trayBounds.y + trayBounds.height + 4)

    return {x: x, y: y}
}

function createTrayWindow(tray: Tray) {
    // Create the browser window.
    const trayWindow = new BrowserWindow({
        width: 300,
        height: 450,
        show: false,
        frame: false,
        fullscreenable: false,
        resizable: false,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        }
    });

    // and load the index.html of the app.
    trayWindow.loadFile(path.join(__dirname, "../index.html"));

    const position = getWindowPosition(trayWindow, tray);

    trayWindow.setPosition(position.x, position.y, false);
    trayWindow.show();
    trayWindow.focus();

    // Open the DevTools.
    //trayWindow.webContents.openDevTools();
}

function createTray() {
    const tray = new Tray(path.join(assetsDirectory, 'icon_16x16@2x.png'))

    tray.on('click', function (event) {
        createTrayWindow(tray);
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow();
    createTray();

    app.on("activate", function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.