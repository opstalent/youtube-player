# Youtube-player

Youtube-player is Angular 1.5 component which allows creating custom players on page based on youtube videos.

  - Custom controls and theme
  - Customizable Youtube options
  - Lightweight ( <7kB )
  - MIT License
  - Well tested
  - Magic

### Version
0.2.0

### Installation

You need npm installed globally:

```sh
$ npm install youtube-player --save
```

Add youtube-player component to your application 
```javascript
(function () {
    'use strict';
    angular
        .module('App', ['youtube-player'])
        .run();
}());
```

### Use
Put 
```javascript
<youtube-player width="{{vm.video.width}}" height="{{vm.video.height}}" videoid="{{vm.video.videoid}}" options="{controls:1}"></youtube-player>
```
anyware you want create player. All attributes could be either values or variable from controller (in second option you benefit in two way data binding)

#### Attributes:
| Attr          | Required      | Values     |
| ------------- |:-------------:| ----------:|
| width         | Yes           | [ px, % ]  |
| height         | Yes           | [ px, % ]  |
| videoid         | Yes           | [ string ]  |
| options         | No           | [ object ]  |

#### Options:
| Option        | Type           | Default  |
| ------------- |:-------------:| -----:|
| autoplay      | bool | 0 |
| html5      | bool      |   1 |
| theme | string      |    "light"\|"dark" |
| modesbranding      | bool      |   0 |
| color      | string      |   "white" |
| showinfo      | bool      |   0 |
| controls      | bool      |   0 |

### Demo
Demo is in demo dir in module. Just run index.html

### Tests
To run test you need first install all dev dependencies

```sh
$ cd node_modules/youtube-player
$ npm install
$ npm test
```
Codecoverage should be avalible in node_modules/youtube-player/reports


License
----

MIT
