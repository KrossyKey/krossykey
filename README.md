# KrossyKey the open source, cross platform keychain manager (Alpha Release)

This project is an offline password manager that can store passwords, secure notes, and two factor codes. It can be built for mobile devices (Android, IOS, Windows) and desktop computers (Mac, Windows, Linux).

# Overview
The purpose of this keychain is to create a fully functional yet simple to use keychain manager that operate independently of any corporation or legal entity. The main objective is to have portable account credentials in a form of a file (*.kk extension) without need of any central servers that can be hacked and thus exposing account credentials. The file is fully encrypted however should be exported with care in an encrypted volume.

# Live Demo
[https://krossykey.com/demo/](https://krossykey.com/demo/)
Note this demo is not recommended to use as the keychain primary client. It is strictly for viewing purposes only.

#Getting Started
Simply clone the project and run:
```
//Make sure you are in root directory for all

npm install

//Build for desktop
make buildDesktop
cd krossykey-electron
npm install
npm start

//Build for mobile
make buildMobile platform={{ios, android, etc.}}
//Afterwards mobile build will be in the platforms directory
//You can then run that within Xcode, Android Studio, etc.
```


# Running Releases

## Linux
```
//On Debian/Ubuntu Linux you need
sudo apt install gnome-keyring
Documentation
Official documentation is at [https://krossykey.com/documentation](https://krossykey.com/documentation)
```

# Developement
If you want to access any electron packages you will need to install it seperately in the krossykey-electron directory.

When refering to electron code use the token

//--[electron_build]
* Features
* Password Viewer
* Password Quick Copy
* Password Generator
* Two Factor Viewer
* Two Factor Quick Copy
* Secure Notes Viewer
* Secure Notes Quick Copy
* Organized Account View
* Cross Platform on pretty much any device
* Zero First Party Anylatics and Tracking
* No Account Needed
* Completely Offline
*  Encrypted with SHA512 AES-GCM Encryption

# Future Endeavors
I hope to implement the KrossyKey file in a FUSE filesystem that way third party applications cannot access the file and brute force it.

# License
Everything in this repository is licensed under the MIT License unless otherwise specified.

# Disclaimer
All actions with this software are strictly your responsibility. This project is not held accountable for any loss of data or damage to the user whatsoever.