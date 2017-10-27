## KissAnime Next Video Autoplayer

[Download](https://greasyfork.org/en/scripts/16504-kissanime-auto-play-next-episode)

**Main script found in /Userscript/Autoplay.user.js**

Extensions use this^ script through grunt build

User Script for Kissanime and packaged browser extensions.
Plays the next video in the list automatically when the previous video is finished.

Add to a userscript extension such as GreaseMonkey or search in webstore.

This script is free to use and to insert in your own projects, including modification, specified under the GNU License 2.
The homepage for this extension is matthewmarillac.com/api/anime.php which includes the download links and a support forum.

If you use this script in your own project, please link to the above page or mention the author.

I develop this for fun, and when i first started there wasn't anything around like it for kissanime.
Thanks to the kissanime community and their invlolvment with this extension.

If you are interested in suggesting new features, feedback or anything else, visit the forums on the extensions home page and open a topic.
If you are would like to work on this project, be sure to open a pull request.
If you have discovered a bug or problem, submit an issue on github or open a thread on the support forum. I will fix it asap.
Look foward to see what people come up with :) 

This script is developed for userscript users first - then ported to the extensions and their api's.

It currently uses jQuery, underscore.js and materialize.css all installed through bower.

One thing worth considering is isolation levels- userscripts can access javascript on the pages they have access to. However, extensions can only modify scripts such as videojs by injecting code into the pages.

The firefox extension is currently in beta as it uses a vastly different set of api's to standard webkit browsers and needs work.

by Matt de Marillac
