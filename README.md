# mass_variation

# custom functions
Add clips to project:

Arguments: path to file of videos you want to import (string)

Result: Pulls folder/video into Premiere pro. This was the first custom function, so it needs some refining, and maybe the ability to customize which bin the videos will go into


Create sequence from clips:

Arguments: Name of the new sequence (string), and the sequence ID (string)

Result: Calls app.project.createNewSequence, selects it, and then adds clips from a folder into the sequence. Currently the clips folder is hard coded in, so this might be reworked to add in one of the newer add clips functions I've written


Change sequence settings:

Arguments: editing mode (string, GUID), frame width (num), frame height (num), preview frame width (num), preview frame height (num), pixel aspect ratio (string)

Result: Changes the sequence settings from user input


Display track clips:

Arguments: none

Result: Mainly used for debugging, currently values are hard coded in. May add index arguments to make it more reusable if need be. Outputs information about video clips currently on a sequence track to help us understand more about project items and how to manipulate/change them.


Remove all empty tracks:

Arguments: none

Result: removes all of the empty audio and video tracks from the active sequence. Could add index argument (if there are multiple sequences in a project and you want to select a specific one), but there may be issues with QE and selected a specific sequence from a project.


Create tracks:

Arguments: number of tracks desired (number)

Result: Calls QE function addTrack() in a while loop until enough tracks have been added to the project. Used mainly for the next function


Add new clips to track:

Arguments: bin name (string), desired track index (number - zero based index)

Result: Loops through project items to find the folder that matches the name inputted, then checks if the clips can be added onto the desired track. If there are not enough tracks, it calls createTracks(). Then it loops through all of the clips inside the bin and inserts them onto the desired track. 


Create tracks:

Arguments: total number of video tracks you want the sequence to have (number)

Result: Creates video tracks up to the number you entered. Will need to add a similar function for audio tracks


Add Mogrt to timeline from file:

Arguments:

Result:


Add Mogrt to timeline from library:

Arguments:

Result:


Select clips:

Arguments:

Result:


insertClips:

Arguments:

Result:


Create story board:

Arguments: track index (number)

Result:


Edit Mogrt top text:


Edit Mogrt bottom text:


Edit Mogrt text color:


Edit Mogrt box color:


Edit Mogrt scale: (in progress)