//import { DSLR } from './constants.js'

function addClipsToProject(filePath) {
    var videoFile = new File([ filePath ])
    var fileArr = [videoFile.fsName]
    var testBin = app.project.rootItem

    app.project.importFiles(fileArr, true, testBin, false)

    //app.project.importFiles(fileArr, true, app.project.getInsertionBin(), false)
    //app.project.rootItem.createBin(binName)
}

function createSeqFromClips(sequenceName, sequenceId) {
    var newSequence = app.project.createNewSequence(sequenceName, sequenceId)
    var selectedSequence = app.project.activeSequence

    if(selectedSequence) {
        var clipFolder = app.project.rootItem.children[0].children

        for(var i = 0; i < clipFolder.length; i++) {
            var numVTracks = newSequence.videoTracks.numTracks;
 		    var targetVTrack = newSequence.videoTracks[(numVTracks - 1)];
            var clipToInsert = clipFolder[i]

            if (targetVTrack.clips.numItems > 0) {
                var lastClip = targetVTrack.clips[(targetVTrack.clips.numItems - 1)];
                targetVTrack.insertClip(clipToInsert, lastClip.end.seconds);  
            } else {
                var timeAtZero = new Time();
                targetVTrack.insertClip(clipToInsert, timeAtZero.seconds);
            }
        }
    } else {
        $.writeln("Unable to create sequence")
    }

}

function changeSequenceSettings(editMode, frmWidth, frmHeight, prevFrmWidth, prevFrmHeight, pixelAspRatio) {
    var selectedSequence = app.project.activeSequence
    var seqSettings = selectedSequence.getSettings()

    seqSettings.editingMode = editMode
    seqSettings.videoFrameHeight = frmWidth
    seqSettings.videoFrameWidth = frmHeight
    seqSettings.previewFrameHeight = prevFrmWidth
    seqSettings.previewFrameWidth = prevFrmHeight
    seqSettings.videoPixelAspectRatio = pixelAspRatio

    selectedSequence.setSettings(seqSettings)

} //break this up into multiple smaller functions?


function displayTrackClips() {
    var firstAudioTrack = app.project.sequences[0].audioTracks[2]
    var firstVidTrack = app.project.sequences[0].videoTracks[2]
    var firstAudioTrackName = app.project.sequences[0].audioTracks[0].name
    var firstVidTrackName = app.project.sequences[0].videoTracks[0].name

    $.writeln("first audio and video track names: " + firstAudioTrackName + " " + firstVidTrackName)
    $.writeln("first audio/video track :" + firstAudioTrack + " " + firstVidTrack)

    $.writeln("Video track clips info: ")
    $.writeln(" ")
    for(var i = 0; i < firstVidTrack.clips.numItems; i++) {
        $.writeln("clip " + (i + 1))
        $.writeln("name: " + firstVidTrack.clips[i].name)
        $.writeln("obj: " + firstVidTrack.clips[i])
        $.writeln("type of obj: " + typeof(firstVidTrack.clips[i]))
        $.writeln(" ")
    }

    $.writeln("Audio track clips info: ")
    $.writeln(" ")
    for(var i = 0; i < firstAudioTrack.clips.numItems; i++) {
        $.writeln("clip " + (i + 1))
        $.writeln("name: " + firstVidTrack.clips[i].name)
        $.writeln("obj: " + firstVidTrack.clips[i])
        $.writeln("type of obj: " + typeof(firstVidTrack.clips[i]))
        $.writeln(" ")
    }
}

function removeAllEmptyTracks() {
    app.enableQE()

    var seq = qe.project.getActiveSequence()
    seq.removeEmptyAudioTracks()
    seq.removeEmptyVideoTracks()
}

function addNewClipsToTrack(folderName, trackIndex) {
    var childArr = app.project.rootItem.children
    var selectedSequence = app.project.sequences[0]
    var numVideoTracks = 0
    var selectedFolder = null

    for(var i = 0; i < childArr.numItems; i++) {

        if(childArr[i].name !== folderName) {
            i++
        } else {
            numVideoTracks = selectedSequence.videoTracks.numTracks
            $.writeln(numVideoTracks)
            selectedFolder = childArr[i]
            if(trackIndex > numVideoTracks - 1) {
                createTracks(trackIndex)
            }
        }
    }
    if(selectedFolder !== null) {
        for(var j = 0; j < selectedFolder.children.length; j++) {
            
            var targetVTrack = selectedSequence.videoTracks[trackIndex]
            var clipToInsert = selectedFolder.children[j]  

            if (targetVTrack.clips.numItems > 0) {
                var lastClip = targetVTrack.clips[(targetVTrack.clips.numItems - 1)];
                targetVTrack.insertClip(clipToInsert, lastClip.end.seconds);  
            } else {
                var timeAtZero = new Time();
                targetVTrack.insertClip(clipToInsert, timeAtZero.seconds);
            }
        }
    } else {
        $.writeln("Could not find folder name") 
    }
}

function createTracks(numberOfTracks) {
    app.enableQE()
    var seq = qe.project.getActiveSequence()
    var currentNumVideoTracks = app.project.sequences[0].videoTracks.numTracks
    while(numberOfTracks > currentNumVideoTracks - 1) {
        seq.addTracks()
        currentNumVideoTracks = app.project.sequences[0].videoTracks.numTracks
    }
}

function addMogrtToTimelineFromFile(filePath) {
    var timeAtZero = new Time()
    var seq = app.project.activeSequence;
        if (seq) { 
            //filename, time, tracknumber, audiotrack
            seq.importMGT(File((filePath)).fsName, timeAtZero, 2, 0);
            
            //sequence.importMGTFromLibrary("Library Name", "MoGRT Name", targetTime.ticks, vidTrackOffset, audTrackOffset);
        } else {
            $.writeln("No active sequence found")
        }
}

function addMogrtToTimelineFromLibrary(libraryName, mgtName) {
    var timeAtZero = new Time()
    var seq = app.project.activeSequence;
    if (seq) {
        seq.importMGTFromLibrary(libraryName, mgtName, timeAtZero, 2, 2) //hardcoded for now but will add argument parameters
    } else {
        $.writeln("No active sequence found")
    } 
}


//hook, problem, agitate, product-info, features/USP, product demo, features again?, product result, summary solution

function selectClips(clipFolderName, clipNumber) {
    
    var items = app.project.rootItem.children //all project items, hopefully just folders
    var selectedFolder
    //find folder that matches the folder name
    for(var i = 0; i < items.numItems; i++) {
        if(items[i].name === clipFolderName) {
            selectedFolder = items[i]
        }
    }
    //get the specific clip you want, add it to the array
    var allClips = selectedFolder.children 
    var selectedClip = allClips[clipNumber]


    return selectedClip
}


function insertClips(clipArr, trackIndex) { 
    var selectedSequence = app.project.activeSequence
    var targetVTrack = selectedSequence.videoTracks[trackIndex]
    for(var i = 0; i < clipArr.length; i++) {   
        var clipToInsert = clipArr[i]  

        if (targetVTrack.clips.numItems > 0) {
            var lastClip = targetVTrack.clips[(targetVTrack.clips.numItems - 1)]
            targetVTrack.insertClip(clipToInsert, lastClip.end.seconds)
        } else {
            var timeAtZero = new Time()
            targetVTrack.insertClip(clipToInsert, timeAtZero.seconds)
        }
    }
} 

function createStoryBoard(trackIndex) {
    var fileNames = ['Hooks', 'Problems', 'Agitates', 'Product-info', 'Features', 'Demos', 'Features', 'Results', 'Summary']
    var clipNumbers = [2, 0, 0, 0, 0, 0, 1, 0, 0]
    var clipArray = []

    for(var i = 0; i < fileNames.length; i++) {
        var clip = selectClips(fileNames[i], clipNumbers[i])
        if(clip) {
            clipArray.push(clip) 
        } else {
            $.writeln("Could not find selected clip at index " + i + " folder: " + fileNames[i])
        }
    }

    if(clipArray.length > 0) {
        insertClips(clipArray, trackIndex)
        clipArray = []
    } else {
        $.writeln("There was a problem adding clips to the array")
    }
}

function editMogrtTopText(trackIndex, clipIndex, newText) {
    var seq = app.project.activeSequence
    var mogrtClip = seq.videoTracks[trackIndex].clips[clipIndex]
    $.writeln(mogrtClip.name)
    mogrtClip.setSelected(true, true)

    if(mogrtClip) {
        var components = mogrtClip.getMGTComponent()
        for(var i = 0; i < components.properties.numItems; i++) {
            $.writeln(components.properties[i].displayName)
            if(components.properties[i].displayName === 'Top Text') {
                components.properties.getParamForDisplayName(components.properties[i].displayName).setValue(newText)
            }
        }
    } else {
        $.writeln("Error. Mogrt not found.")
    }
}

function editMogrtBottomText(trackIndex, clipIndex, newText) {
    var seq = app.project.activeSequence
    var mogrtClip = seq.videoTracks[trackIndex].clips[clipIndex]
    mogrtClip.setSelected(true, true)

    if(mogrtClip) {
        var components = mogrtClip.getMGTComponent()
        for(var i = 0; i < components.properties.numItems; i++) {
            $.writeln(components.properties[i].displayName)
            if(components.properties[i].displayName === 'Bottom Text') {
                components.properties.getParamForDisplayName(components.properties[i].displayName).setValue(newText)
            }
        }
    } else {
        $.writeln("Error. Mogrt not found.")
    }
}

function editMogrtTextColor(trackIndex, clipIndex, alpha, red, green, blue) {
    var seq = app.project.activeSequence
    var mogrtClip = seq.videoTracks[trackIndex].clips[clipIndex]
    mogrtClip.setSelected(true, true)

    if(mogrtClip) {
        var components = mogrtClip.getMGTComponent()
        for(var i = 0; i < components.properties.numItems; i++) {
            if(components.properties[i].displayName === 'Text Color') {
                components.properties[i].setColorValue(alpha, red, green, blue, true)
                //$.writeln(components.properties[i].getColorValue())
            }
        }
    } else {
        $.writeln("Error. Mogrt not found.")
    }
}

function editMogrtBoxColor(trackIndex, clipIndex, alpha, red, green, blue) {
    var seq = app.project.activeSequence
    var mogrtClip = seq.videoTracks[trackIndex].clips[clipIndex]
    mogrtClip.setSelected(true, true)

    if(mogrtClip) {
        var components = mogrtClip.getMGTComponent()
        for(var i = 0; i < components.properties.numItems; i++) {
            if(components.properties[i].displayName === 'Box Color') {
                components.properties[i].setColorValue(alpha, red, green, blue, true)
            }
        }
    } else {
        $.writeln("Error. Mogrt not found.")
    }
}

function editMogrtScale(trackIndex, clipIndex, scaleNum) {
    var seq = app.project.activeSequence
    var mogrtClip = seq.videoTracks[trackIndex].clips[clipIndex]
    mogrtClip.setSelected(true, true)

    if(mogrtClip) {
        var components = mogrtClip.components
        // $.writeln(components[0].properties.numItems)
        // $.writeln(components[1].properties.numItems)
        // $.writeln(components[2].properties.numItems)
        // $.writeln(components[1].properties[2].displayName)
   
        for(var i = 0; i < components[1].properties.numItems; i++) {
            $.writeln(components[1].properties[i].displayName)
            $.writeln(components[1].properties[i].getValue())
            $.writeln(typeof(components[1].properties[i].getValue()))
            // if(components[1].properties[i].displayName === 'Scale') {
            //     
            //     components[1].properties[i].setValue(scaleNum)
            //     
            // }
        }
    }
}

// editMogrtTopText(2, 0, "this mogrt")
// editMogrtBottomText(2, 0, "was changed with javascript")
// editMogrtTextColor(2, 0, 255, 17, 50, 17)
// editMogrtBoxColor(2, 0, 255, 150, 90, 100)
editMogrtScale(2, 0, 70)

// addClipsToProject('~/Desktop/VideoFiles/Hooks')
// addClipsToProject('~/Desktop/VideoFiles/Problems')
// addClipsToProject('~/Desktop/VideoFiles/Agitates')
// addClipsToProject('~/Desktop/VideoFiles/Product-info')
// addClipsToProject('~/Desktop/VideoFiles/Features')
// addClipsToProject('~/Desktop/VideoFiles/Demos')
// addClipsToProject('~/Desktop/VideoFiles/Results')
// addClipsToProject('~/Desktop/VideoFiles/Summary') 

//app.project.createNewSequence('Sequence_1', 's1')

//createStoryBoard(0) 
//addMogrtToTimelineFromLibrary('My Library', 'Tik Tok Caption Curvy Colors') //have to copy Mogrt from local temp folder to my library

//addClipsToProject('~/Desktop/Clips/')
//createSeqFromClips('Huge Sequence', 'coolid123')
//changeSequenceSettings('35d109db-457b-43c1-9452-9cb7be9f121c', 1080, 1080, 1080, 1080, '1:1')
//removeAllEmptyTracks()
//addClipsToProject('~/Desktop/Clips')
//addNewClipsToTrack('Clips', 2)
//addNewClipsToTrack('Videos', 2)
//addMogrtToTimeline()


/*

app.enableQE();

var seq = qe.project.getActiveSequence();

Then you will have access to:

addTracks()
removeTracks()
removeVideoTrack()
removeAudioTrack()
removeEmptyVideoTracks()
removeEmptyAudioTracks() 


importMoGRT : function () { ////////////////////////////////////////////
		var activeSeq = app.project.activeSequence;
		if (activeSeq) {
			var filterString = "";
			if (Folder.fs === 'Windows') {
				filterString = "Motion Graphics Templates:*.mogrt";
			}
			var mogrtToImport = File.openDialog("Choose MoGRT",	// title
												filterString,	// filter available files? 
												false);			// allow multiple?
			if (mogrtToImport) {
				var targetTime 		= activeSeq.getPlayerPosition();
				var vidTrackOffset 	= 0;
				var audTrackOffset 	= 0;
				var newTrackItem 	= activeSeq.importMGT(	mogrtToImport.fsName,
															targetTime.ticks,
															vidTrackOffset,
															audTrackOffset);
				if (newTrackItem) {
					var moComp = newTrackItem.getMGTComponent();
					if (moComp) {
						var params = moComp.properties;
						for (var z = 0; z < params.numItems; z++) {
							var thisParam = params[0];
							if (thisParam){
								$._PPP_.updateEventPanel('Parameter ' + (z + 1) + ' name: ' + thisParam.name + '.');
							}
						}
						var srcTextParam = params.getParamForDisplayName("Source Text");
						if (srcTextParam) {
							var val = srcTextParam.getValue();
							srcTextParam.setValue("New value set by PProPanel!");
						}
					}
				}
			} else {
				$._PPP_.updateEventPanel('Unable to import specified .mogrt file.');
			}
		} else {
			$._PPP_.updateEventPanel('No active sequence.');
		}
	},
*/
