//import { DSLR } from './constants.js'

function addClipsToProject(filePath) {
    var videoFile = new File([ filePath ])
    var fileArr = [videoFile.fsName]
    var testBin = app.project.rootItem

    app.project.importFiles(fileArr, true, testBin, false)

    //app.project.importFiles(fileArr, true, app.project.getInsertionBin(), false)
    //var createTestBin = app.project.rootItem.createBin('Test Bin')
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

//function addMogrtToTimeline() {
//    var timeAtZero = new Time();
//    var seq = app.project.activeSequence; 
//        if (seq){seq.importMGT(File(('~/Desktop/tt.mogrt')).fsName, timeAtZero, 5, 0); }
//}

//function resizeMogrtToClipSize() {
//    //Sets the mogrt size to a clip size
//}

//function updateMogrtCaption('Text to caption') {
//    //update the mogrt text fields
//}

//function updateMogrtFromSRT('srt time code break'){
//    //addMogrtToTimeline(time code), updateMogrtCaption(text from srt)
//}

addClipsToProject('~/Desktop/Raw Footage/')
createSeqFromClips('Huge Sequence', 'coolid123')
changeSequenceSettings('35d109db-457b-43c1-9452-9cb7be9f121c', 1080, 1080, 1080, 1080, '1:1')
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

*/
