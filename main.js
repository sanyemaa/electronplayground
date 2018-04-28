const electron = require('electron')

//module that controls app life
const app = electron.app

//module to create native browser window
const BrowserWindow = electron.BrowserWindow

// Global reference of window object kept so window not closed when
// JavaScript object is garbage collected.

let mainWindow

function createWindow(){
    //creation
    mainWindow = new BrowserWindow({width: 1080, height: 800})

    //load index.html
    mainWindow.loadURL(`file://${__dirname}/index.html`)

    //open devtools automatically
    mainWindow.webContents.openDevTools()

    //"Emitted" when window closed

    mainWindow.on('closed', function(){
        //dereference window object; if app supports multiple windows
        //usually they are stored in an array; this is when you'd 
        //delete corresponding element
        mainWindow = null
    })
}

//when electron finishes init, create window method is called
// engvall: Some APIs can only be used after this event occurs.

app.on('ready', createWindow)

//making sure program quits when all windows closed
app.on('window-all-closed', function(){
    //exception for OS X for explicit quit from user
    if(process.platform !== 'darwin'){
        app.quit()
    }
})

app.on('activate', function(){
    //OS X creates new window when dock icon clicked, no other windows open
    if(mainWindow === null){
        createWindow()
    }
})


//engvall:
// // In this file you can include the rest of your app's specific main process
// // code. You can also put them in separate files and require them here.