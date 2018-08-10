# KrossyKey the open source, cross platform keychain manager (Alpha Release)

This project is an offline password manager that can store passwords, secure notes, and two factor codes.
It can be built for mobile devices (Android, IOS, Windows) and desktop computers (Mac, Windows, Linux).


## Overview

The purpose of this keychain is to create a fully functional yet simple to use keychain manager that operate independently of any corporation or legal entity. The main objective is to have portable account credentials in a form of a file (*.kk extension) without need of any central servers that can be hacked and thus exposing account credentials. The file is fully encrypted however should be exported with care in an encrypted volume.




| Desktop | Mobile  | Misc  |
|:-------------:|:-------:|:-------:|
|![Accounts](https://github.com/KrossyKey/krossykey/blob/master/images/desktopPasswords.png)|![Accounts](https://github.com/KrossyKey/krossykey/blob/master/images/iosPasswords.png)|![Accounts](https://github.com/KrossyKey/krossykey/blob/master/images/accountCard.png)|
|![Secure Notes](https://github.com/KrossyKey/krossykey/blob/master/images/desktopNotes.png)|![Secure Notes](https://github.com/KrossyKey/krossykey/blob/master/images/iosNotes.png)|![Password Gen](https://github.com/KrossyKey/krossykey/blob/master/images/passwordGen.png)|





## Getting Started

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



## Features

- Password Viewer
- Password Quick Copy
- Password Generator
- Two Factor Viewer
- Two Factor Quick Copy
- Secure Notes Viewer
- Secure Notes Quick Copy
- Organized Account View
- Cross Platform on pretty much any device
- Zero First Party Anylatics and Tracking
- No Account Needed
- Completely Offline
- Encrypted with SHA256 AES-GCM Encryption



## Future Endeavors

I hope to implement the KrossyKey file in a FUSE filesystem that way third party applications cannot access the file and brute force it.



## Disclaimer

All actions with this software are strictly your responsibility. This project is not held accountable for any loss of data or damage to the user whatsoever.

