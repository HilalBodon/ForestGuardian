<img src="./readme/title1.svg"/>

<br><br>

<img src="./readme/title7.svg"/>

<ul dir="auto">
  <li><a href="#project-philosophy">Project Philosophy</a>
    <ul dir="auto">
      <li><a href="#user-stories">User Stories</a></li>
    </ul>
  </li>
  <li><a href="#prototyping">Prototyping</a>
    <ul dir="auto">
      <li><a href="#wireframes">Wireframes</a></li>
      <li><a href="#mockups">Mockups</a></li>
    </ul>
  </li>
  <li><a href="#Demo">Demo</a></li>
    <ul dir="auto">
      <li><a href="#user-screens">User Screens</a></li>
    </ul>
  <li><a href="#tech-stack">Tech Stack</a></li>
  <li><a href="#how-to-run">How to Run</a>
    <ul dir="auto">
      <li><a href="#prerequisites">Prerequisites</a></li>
      <li><a href="#installation">Installation</a></li>
    </ul>
  </li>
</ul>

<br><br>


<!-- project philosophy -->
<img src="./readme/title2.svg"/>
<a id="project-philosophy"></a>
> A web app designed to be used on the mobile,the purpose of that app is to decrease the illegal logging to the forest using sound detection.
>
> The app notify the user by email about the type of the needed sound if its a chainsaw, a shotgun or axe stumping sound.

### User Stories
<a id="#user-stories">
  
- As a user, I want to receive email notifications so I can stay informed about incidents of illegal logging and identify their types.
- As a user, I want the flexibility to add as many devices as needed to protect a larger area of trees effectively.
- As a user, I want a centralized location within the app to view and manage all my notifications, preventing them from getting lost in my email inbox.
- As a user,  I want to easily locate my devices on a map, ensuring they are not lost within the forest.

<br><br>

<!-- Prototyping -->
<img src="./readme/title3.svg"/>
<a id="prototyping"></a>
<br/>
> We designed Forest Guardian using wireframes and mockups, iterating on the design until we reached the ideal layout for easy navigation and a seamless user experience.

### Wireframes
| Devices Menu screen | Account Settings screen | SideMenu screen |
| ---| ---| ---|
| <img src="./readme/pictures/wfDevicesMenu.png" width="200"/> | <img src="./readme/pictures/wfAccountSettings.png" width="200"/> | <img src="./readme/pictures/wfSideMenu.png" width="200"/> | 

| Device Detail | All screens GIF |
| --- | --- |
| <img src="./readme/pictures/wfDevices.png" width="200"/> | <img src="./readme/pictures/smallwireframes.gif" width="200"/> |

<br/>

### Mockups
| Add device screen | History screen | Main screen |
| --- | --- | --- | 
| <img src="./readme/pictures/bAddNewDevice.png" width="200"/> | <img src="./readme/pictures/bAlldevicesHistory.png" width="200"/> | <img src="./readme/pictures/bmain.png" width="200"/> |

 | Side Menu  | Map Screen | All screens GIF |
| ---| ---| --- |
| <img src="./readme/pictures/bsidemenu.png" width="200"/> | <img src="./readme/pictures/bmap.png" width="200"/> | <img src="./readme/pictures/mockupsmall.gif" width="200"/> |

<br><br>

<!-- Tech stack -->
<img src="./readme/title5.svg"/>
<a id="tech-stack"></a>
>  Forest Guardian is built using the following technologies:

-This project leverages the MERN (MongoDB, Express.js, React, Node.js) stack for web development. Additionally, it incorporates TensorFlow.js for machine learning capabilities.


<br><br>
<br><br>

<!-- Demo -->
<img src="./readme/title4.svg"/>
<a id="Demo"></a>
<br><br>

> Using the wireframes and mockups as a guide, we implemented the Forest Guardian app with the following features:
<br><br>
<a id="user-screens"></a>


| Add device screen | History screen | Main screen |
| --- | --- | --- |
| <img src="./readme/pictures/login.png" width="200"/> | <img src="./readme/pictures/mainLight.png" width="200"/> | <img src="./readme/pictures/mainDark.png" width="200"/>|

| Device screen | Map screen | All screens |
| --- | --- | --- |
|<img src="./readme/pictures/deviceDetails.png" width="200"/> | <img src="./readme/pictures/map.png" width="200"/> | <img src="./readme/pictures/ForestGuardianFinal.gif" width="200"/> |


<br><br>



<!-- How to run -->
<img src="./readme/title6.svg"/>
<a id="how-to-run"></a>
> To set up Forest Guardian locally, follow these steps:

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation
1. Clone the repo
   ```sh
   git clone https://github.com/HilalBodon/ForestGuardian.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3.Make your .env file and include your Email and password you want to notify from and the mongoDB connection string

Now, you should be able to run Forest Guardian and explore its features.
