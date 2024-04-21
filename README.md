# Noom

Zoom Cling using NodeJS, WebRTC and Websockets

## General Information
- Period : 2024-04-17 ~ 
- Member : Jaeseong Park

## Skills
<img src="https://img.shields.io/badge/Visual Studio Code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white">
<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
<img src="https://img.shields.io/badge/Javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white">
<img src="https://img.shields.io/badge/pug-A86454?style=for-the-badge&logo=pug&logoColor=white">
<img src="https://img.shields.io/badge/nodejs-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
<img src="https://img.shields.io/badge/websocket-010101?style=for-the-badge&logo=socketdotio&logoColor=white">

## Learning content by date

### [2024-04-17]
- Created folder and setup

    ```npm init -y```
- Erase "script" and "main" in the package.json file.
- Change License to "MIT"
- Added README.md
- Install utilities

    ```npm i nodemon -D```
    ```npm i @babel/core @babel/cli @babel/node -D```
    ```npm i @babel/preset-env -D```
    ```npm i express```
    ```npm i pug```
- Created files "babel.config.json", "nodemon.json", "gitignore.io" and do setting.
- Installed ws library. ("https://www.npmjs.com/package/ws")
  
  ```npm i ws```
- Implemented basic functions for messaging.
- Checked some possible improvements.
- ```npm run dev```

### [2024-04-18]
- Start from SocketIO (https://socket.io/)

  ```npm i socket.io```
- Installed SocketIO in the browser using an url (http://localhost:3000/socket.io/socket.io.js)
- Learned about Room

### [2024-04-19]
- Room Notification

### [2024-04-20]
- Admin Panel (https://socket.io/docs/v4/admin-ui/)

    ```npm i @socket.io/admin-ui```
- WebRTC (Web Real Time Communication) (https://webrtc.org/)
- Installed Local Tunnel
    
    ```npm i -g localtunnel```
    ```lt --port 3000``` -> create url
- STUN
  
  If my phone and PC are not in the same Wifi, there would be and error. To resolve this error, STUN Server is needed.

- Data Channel