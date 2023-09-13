import { app, BrowserWindow, Tray, Notification } from 'electron'
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

const initOrderNotifications = () => {
  return new Promise((resolve, reject) => {
    //navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}

const getOrders = ()  => {

  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJmcm9udGVuZCIsImp0aSI6ImU5ZmVhYTZmYjc3ZWY5YThmYmQyMTFkMmM0NjlkMzJkZGNlZGYwMDRiYzA1Y2Y4OGM3NzU3Njg3MmE3ZmUxODhlNWQ1MDNhMmRlMjMwNjBhIiwiaWF0IjoxNjk0NjIwNzExLjU3ODAzNTEsIm5iZiI6MTY5NDYyMDcxMS41NzgwMzcsImV4cCI6MTY5NDY0OTMzOSwic3ViIjoie1wiaWRfY29tcGFueV91c2VyXCI6XCJlYmY0YjU1YS1jYWIwLTVlZDAtOGZiNy01MjVhM2VlZWRlYWNcIixcImlkX2FnZW50XCI6bnVsbCxcImN1c3RvbWVyX3JlZmVyZW5jZVwiOlwiREUtLTIxXCIsXCJpZF9jdXN0b21lclwiOjIxLFwicGVybWlzc2lvbnNcIjp7XCJwZXJtaXNzaW9uc1wiOlt7XCJpZF9wZXJtaXNzaW9uXCI6MSxcImNvbmZpZ3VyYXRpb25fc2lnbmF0dXJlXCI6XCJbXVwiLFwiaWRfY29tcGFueV9yb2xlXCI6bnVsbCxcImNvbmZpZ3VyYXRpb25cIjp7XCJpZF9xdW90ZV9jb2xsZWN0aW9uXCI6WzQ5LDUwLDUxLDUyLDUzLDE0MDIwMywxNDAyMDQsMTQwMzg5LDE0MDM5MCwxNDAzOTIsMTQwMzkzLDE0MDM5NSwxNDAzOTYsMTQwMzk3LDE0MDM5OCwxNDA0MDAsMTQwNDAxLDE0MDQwMiwxNDA0MDcsMTQwNDA4LDE0MDQwOSwxNDA0MjYsMTQwNDI3LDE0MDQyOCwxNDA0MjksMTQwNDMwLDE0MDQzMSwxNDA0MzQsMTQwNDM3LDE0MDQzOCwxNDA0MzksMTQwNDQ0LDE0MDQ0NSwxNDA1NDEsMTQwNTQ2LDE0MDU0NywxNDA1NzksMTQwNTgwLDE0MDU4MSwxNDA1ODIsMTQwNTg0LDE0MDU4NiwxNDA1ODcsMTQwNTg5LDE0MDU5MCwxNDA1OTIsMTQwNTkzLDE0MDU5NCwxNDA1OTUsMTQwNTk2LDE0MDU5NywxNDA1OTgsMTQwNTk5LDE0MDYwMCwxNDA2MDEsMTQwNjE2LDE0MDYxOCwxNDA3MzYsMTQwNzM4LDE0MDczOSwxNDA3NDAsMTQwNzQxLDE0MDc0MiwxNDA3NDMsMTQwNzQ0LDE0MDc0NSwxNDA3NDYsMTQwNzQ3LDE0MDc0OCwxNDA3NDksMTQwNzUwLDE0MDc1MSwxNDA3NTIsMTQwNzU0LDE0MDc1NSwxNDA3NTYsMTQwNzU3LDE0MDc1OCwxNDA3NTksMTQwNzYwLDE0MDc2MSwxNDA3NjIsMTQwNzYzLDE0MDc2NCwxNDA3ODksMTQwNzkxLDE0MDc5MiwxNDA3OTMsMTQwNzk0LDE0MDc5NSwxNDA3OTYsMTQwNzk3LDE0MDc5OCwxNDA3OTksMTQwODAwLDE0MDgwMSwxNDA4MDIsMTQwODAzLDE0MDgwNCwxNDA4MDUsMTQwODA2LDE0MDgwNywxNDA4MDksMTQwODEyLDE0MDgxMywxNDA4MTQsMTQwODE1LDE0MDgxNiwxNDA4MTcsMTQwODE5LDE0MDgyMCwxNDA4MjEsMTQwODIyLDE0MDgyMywxNDA4MjUsMTQwODI2LDE0MDgyNywxNDA4MjgsMTQwODI5LDE0MDgzMCwxNDA4MzEsMTQwODMyLDE0MDgzMywxNDA4MzQsMTQwODM2LDE0MDgzNywxNDA4MzgsMTQwODM5LDE0MDg0MCwxNDA4NDEsMTQwODQyLDE0MDg0MywxNDA4NDQsMTQwODQ1LDE0MDg0NiwxNDA4NDcsMTQwODQ4LDE0MDg0OSwxNDA4NTAsMTQwODUxLDE0MDg1MiwxNDA4NTMsMTQwODU0LDE0MDg1NSwxNDA4NjcsMTQwODY5LDE0MDg3MCwxNDA4NzEsMTQwODcyLDE0MDg3MywxNDA4NzQsMTQwODc1LDE0MDg3NiwxNDA4NzcsMTQwODc4LDE0MDkwMiwxNDA5MDMsMTQwOTA0LDE0MDkwNSwxNDA5MDYsMTQwOTA3LDE0MDkxMCwxNDA5MTEsMTQwOTEyLDE0MDkxMywxNDA5MTRdfSxcImtleVwiOlwiUmVhZFNoYXJlZENhcnRQZXJtaXNzaW9uUGx1Z2luXCIsXCJpc19pbmZyYXN0cnVjdHVyYWxcIjpudWxsfSx7XCJpZF9wZXJtaXNzaW9uXCI6MixcImNvbmZpZ3VyYXRpb25fc2lnbmF0dXJlXCI6XCJbXVwiLFwiaWRfY29tcGFueV9yb2xlXCI6bnVsbCxcImNvbmZpZ3VyYXRpb25cIjp7XCJpZF9xdW90ZV9jb2xsZWN0aW9uXCI6WzQ5LDUwLDUxLDUyLDUzLDE0MDIwMywxNDAyMDQsMTQwMzg5LDE0MDM5MCwxNDAzOTIsMTQwMzkzLDE0MDM5NSwxNDAzOTYsMTQwMzk3LDE0MDM5OCwxNDA0MDAsMTQwNDAxLDE0MDQwMiwxNDA0MDcsMTQwNDA4LDE0MDQwOSwxNDA0MjYsMTQwNDI3LDE0MDQyOCwxNDA0MjksMTQwNDMwLDE0MDQzMSwxNDA0MzQsMTQwNDM3LDE0MDQzOCwxNDA0MzksMTQwNDQ0LDE0MDQ0NSwxNDA1NDEsMTQwNTQ2LDE0MDU0NywxNDA1NzksMTQwNTgwLDE0MDU4MSwxNDA1ODIsMTQwNTg0LDE0MDU4NiwxNDA1ODcsMTQwNTg5LDE0MDU5MCwxNDA1OTIsMTQwNTkzLDE0MDU5NCwxNDA1OTUsMTQwNTk2LDE0MDU5NywxNDA1OTgsMTQwNTk5LDE0MDYwMCwxNDA2MDEsMTQwNjE2LDE0MDYxOCwxNDA3MzYsMTQwNzM4LDE0MDczOSwxNDA3NDAsMTQwNzQxLDE0MDc0MiwxNDA3NDMsMTQwNzQ0LDE0MDc0NSwxNDA3NDYsMTQwNzQ3LDE0MDc0OCwxNDA3NDksMTQwNzUwLDE0MDc1MSwxNDA3NTIsMTQwNzU0LDE0MDc1NSwxNDA3NTYsMTQwNzU3LDE0MDc1OCwxNDA3NTksMTQwNzYwLDE0MDc2MSwxNDA3NjIsMTQwNzYzLDE0MDc2NCwxNDA3ODksMTQwNzkxLDE0MDc5MiwxNDA3OTMsMTQwNzk0LDE0MDc5NSwxNDA3OTYsMTQwNzk3LDE0MDc5OCwxNDA3OTksMTQwODAwLDE0MDgwMSwxNDA4MDIsMTQwODAzLDE0MDgwNCwxNDA4MDUsMTQwODA2LDE0MDgwNywxNDA4MDksMTQwODEyLDE0MDgxMywxNDA4MTQsMTQwODE1LDE0MDgxNiwxNDA4MTcsMTQwODE5LDE0MDgyMCwxNDA4MjEsMTQwODIyLDE0MDgyMywxNDA4MjUsMTQwODI2LDE0MDgyNywxNDA4MjgsMTQwODI5LDE0MDgzMCwxNDA4MzEsMTQwODMyLDE0MDgzMywxNDA4MzQsMTQwODM2LDE0MDgzNywxNDA4MzgsMTQwODM5LDE0MDg0MCwxNDA4NDEsMTQwODQyLDE0MDg0MywxNDA4NDQsMTQwODQ1LDE0MDg0NiwxNDA4NDcsMTQwODQ4LDE0MDg0OSwxNDA4NTAsMTQwODUxLDE0MDg1MiwxNDA4NTMsMTQwODU0LDE0MDg1NSwxNDA4NjcsMTQwODY5LDE0MDg3MCwxNDA4NzEsMTQwODcyLDE0MDg3MywxNDA4NzQsMTQwODc1LDE0MDg3NiwxNDA4NzcsMTQwODc4LDE0MDkwMiwxNDA5MDMsMTQwOTA0LDE0MDkwNSwxNDA5MDYsMTQwOTA3LDE0MDkxMCwxNDA5MTEsMTQwOTEyLDE0MDkxMywxNDA5MTRdfSxcImtleVwiOlwiV3JpdGVTaGFyZWRDYXJ0UGVybWlzc2lvblBsdWdpblwiLFwiaXNfaW5mcmFzdHJ1Y3R1cmFsXCI6bnVsbH0se1wiaWRfcGVybWlzc2lvblwiOm51bGwsXCJjb25maWd1cmF0aW9uX3NpZ25hdHVyZVwiOltdLFwiaWRfY29tcGFueV9yb2xlXCI6bnVsbCxcImNvbmZpZ3VyYXRpb25cIjp7XCJpZF9zaG9wcGluZ19saXN0X2NvbGxlY3Rpb25cIjpbMiwzLDE5XX0sXCJrZXlcIjpcIlJlYWRTaG9wcGluZ0xpc3RQZXJtaXNzaW9uUGx1Z2luXCIsXCJpc19pbmZyYXN0cnVjdHVyYWxcIjpudWxsfSx7XCJpZF9wZXJtaXNzaW9uXCI6bnVsbCxcImNvbmZpZ3VyYXRpb25fc2lnbmF0dXJlXCI6W10sXCJpZF9jb21wYW55X3JvbGVcIjpudWxsLFwiY29uZmlndXJhdGlvblwiOntcImlkX3Nob3BwaW5nX2xpc3RfY29sbGVjdGlvblwiOlsyLDMsMTldfSxcImtleVwiOlwiV3JpdGVTaG9wcGluZ0xpc3RQZXJtaXNzaW9uUGx1Z2luXCIsXCJpc19pbmZyYXN0cnVjdHVyYWxcIjpudWxsfV19fSIsInNjb3BlcyI6WyJjdXN0b21lciJdfQ.nnqtWniNSTEOtoQrjMQwFRs76uDTOr89NzfVp0AEsa1XnVIpjRe5su6VsecaHBEetuD2v5_OvfJIHvhJ9jBAlz1ilHSSTrwuXqS4QCnZ_yBZp2vGh0lFJ2PxBweQa1KM3_G8Q6Of1fXVCfDDllxJFsHu5OWncA_Zns8exCuze8dq8jGadiHarfK3GNXy2vDW70O7iuJInUTRMxWlEUHEwZ_zg-1ASbsHtLfFMG9dZRlrnSIREhBafMxGvSGSuCszEfbvIdCDe_NZa5b1DUUAlZ0jXXQ-b5i7WU_8wW8H2XeJFTbd0Os-7O4a3TThGZFdN2Hwmu6E_m0r_vFvetlGzA';
  const url = `https://glue.de.faas-suite-prod.cloud.spryker.toys/orders`
  const headers = { 'Authorization': 'Bearer ' + token };

  return fetch(url, {
    headers: headers
  }).then((response) => {
    return response.json()
  }).catch((error) => {
    console.log(error)
  })
}

const showNotificationInterval = async () => {
  const orders = await getOrders();

  /*orders['data'].forEach((order) => {
    const yesterday = new Date(Date.now() - 86400000);
    if(order["attributes"]['createdAt'] > yesterday.toISOString()){
      new Notification({ title: 'NEW ORDER', body: order["id"] }).show()
    }
  });*/
  //new Notification({ title: 'TITLE', body: 'BODY' }).show()

  const order = orders['data'].pop();
  new Notification({ title: 'NEW ORDER', body: order["id"] }).show()

}

// Refresh weather every 10 minutes
const oneMinute = 60 * 1000
setInterval(showNotificationInterval, oneMinute)

app.whenReady().then(() => {
  createWindow();
  createTray();
  showNotificationInterval();
})
