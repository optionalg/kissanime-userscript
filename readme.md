##KissAnime Next Video Autoplayer
User Script for Kissanime and packaged browser extensions.
Plays the next video in the list automatically when the previous video is finished.

Add to a userscript extension such as GreaseMonkey or search in webstore.

This script is free to use and insert in your own projects, including modification using the GNU License 2.
The homepage for this extension is matthewmarillac.com/api/anime.php which includes the download links and a support forum.

If you use this script in your own project, please link to the above page or mention the author.

I develop this for fun, and when i first started there wasn't anything around like it.
Thanks to the kissanime community and their invlolvment with this extension.

If you are interested in suggesting new features, feedback or anything else visit the forums on the extensions home page and open a topic.
If you are would like to work on this project, be sure to open a pull request, i will never reject one. If there are any bugs i will fix them myself. Look foward to see what people come up with :) 

This script is developed for userscript users first - then ported to the extensions and their api's.
To build extensions, install node and npm, and run npm install.
Then run grunt. This is not required. However, jshint can be a much more thorough then debuging through a browser.
Grunt will build dependancies for a release such as jQuery for the extensions and sass for the styling if the interface - using materialize.

One thing worth considering is isolation levels- userscripts can access javascript on the pages they have access to. However, extensions can only modify scripts such as videojs by injecting code into the pages.

This repository branch(main) is used to host live userscripts. Therefore when creating a pull request, please use the dev branch.

The firefox extension is currently in beta as it uses a vastly different set of api's to standard webkit browsers.

by Matt de Marillac
