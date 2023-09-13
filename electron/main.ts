import { app, BrowserWindow, Tray } from 'electron'
import path from 'node:path'

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, '../dist')
process.env.VITE_PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public')


let win: BrowserWindow | null
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: false
    },
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, 'index.html'))
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

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
      webSecurity: false
    }
  });

  trayWindow.openDevTools({mode: 'detach'})

  console.log(VITE_DEV_SERVER_URL)

  // and load the index.html of the app.
  if (VITE_DEV_SERVER_URL) {
    trayWindow.loadURL(VITE_DEV_SERVER_URL + 'tray')
  } else {
    // win.loadFile('dist/index.html')
    trayWindow.loadFile(path.join(process.env.DIST, 'index.html'))
  }

  const position = getWindowPosition(trayWindow, tray);

  trayWindow.setPosition(position.x, position.y, false);
  trayWindow.show();
  trayWindow.focus();

  return trayWindow;
  // Open the DevTools.
  //trayWindow.webContents.openDevTools();
}

function createTray() {
  const tray = new Tray(path.join(process.env.VITE_PUBLIC, 'icon_16x16@2x.png'))
  let trayWindow = undefined;

  tray.on('click', () => {
    if (!trayWindow) {
      trayWindow = createTrayWindow(tray);
    } else {
      toggleWindow(trayWindow);
    }
  })
}

function toggleWindow(window: BrowserWindow) {
  if (window.isVisible()) {
    window.hide()
  } else {
    window.show()
  }
}

app.whenReady().then(() => {
  createWindow();
  createTray();
})
