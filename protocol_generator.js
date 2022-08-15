function generateProtocol(child, pastSessions) {

    // -------- Helper functions ----------------------------------------------

    // See http://stackoverflow.com/a/12646864
    // Returns a new array with elements of the array in random order.
    function shuffle(array) {
        var shuffled = Ember.$.extend(true, [], array); // deep copy array
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = shuffled[i];
            shuffled[i] = shuffled[j];
            shuffled[j] = temp;
        }
        return shuffled;
    }

    // Returns a random element of an array, and removes that element from the array
    function pop_random(array) {
        if (array.length) {
            let randIndex = Math.floor(Math.random() * array.length);
            return array.splice(randIndex, 1)[0];
        }
        return null;
    }

    // Returns durations for highlighting options
    function highlight_lengths(options_lengths, story, options_order) {
        var intro_l = "intro-length";
        var intro = options_lengths[story][intro_l];
        var or = 0.85;
        var first = [intro, intro+options_lengths[story][options_order[0]+'-length']];
        var second = [first[1]+or, first[1]+options_lengths[story][options_order[1]+'-length']+or];
        var third = [second[1]+or, second[1]+or+options_lengths[story][options_order[2]+'-length']-.1];
        return [first, second, third];
    }

    // -------- End helper functions -------------------------------------------

    // Define common (non-test-trial) frames
    let frames = {
        "exit-survey": {
            "kind": "exp-lookit-exit-survey",
            "debriefing": {
                "text": "Children do not always want to do what they are asked and they must make decisions about whether or not to go along with what another person wants. How do children handle situations where their goals are at odds with other people’s goals? In this study, we explored children’s predictions about how a child in a story based on what the parent in the story says and on whether or not the child’s goals conflict with the parent’s goals. Findings from this study will help us better understand how children balance their own and others’ needs and how misunderstandings can occur in communication, whether honestly or on purpose. <br><br> To thank you for your participation, we'll be emailing you a $5 Amazon gift card (via a code that can be entered online) and certificate of participation. This should arrive in your inbox within the next week after we confirm your consent video and check that your child is in the age range for this study. (If you don't hear from us by then, feel free to reach out!) If you participate again with another child in the age range, you'll receive one gift card per child.",
                "title": "Thank you!"
            }
        },
        "text-instructions1": {
            "kind": "exp-lookit-instructions",
            "blocks": [{
                    "title": "Thank you for your interest in our study, 'What Happens Next?'",
                    "text": "Before we get started, make sure your child is sitting with you and you can both see the screen!\n \nHere's a quick summary of what's about to happen:",
                    "listblocks": [{
                            "text": "1. Webcam Setup and Video Consent. First, we'll be checking that your webcam is working. Then you and your child will give your consent to participate in this research."
                        },
                        {
                            "text": "2. Study Overview: Here, you can read a little more about what your child will be doing in this study, along with some other important details about the game."
                        },
                        {
                            "text": "3. Start the Study: When you click the 'Start the game!' button on the Study Overview page, the study will begin! This study will take about 10-15 minutes in total."
                        }
                    ]
                },
                {
                    "text": "Thank you so much for helping us with our science! We hope you and your child have fun."
                },
                {
                    "text": "(Below, you can watch a quick greeting video from our research staff!)",
                    "mediaBlock": {
                    "width": "20",
                    "isVideo": true,
                    "sources": [{
                            "src": "https://raw.githubusercontent.com/buksters/WHN/main/mp4/intro_video2.mp4",
                            "type": "video/mp4"
                        }
                    ],
                    "mustPlay": false
                }
                }
            ],
            "showWebcam": false,
            "nextButtonText": "Continue to Webcam Setup",
            "showPreviousButton": false
        },
        "instructions": {
            "kind": "exp-lookit-instructions",
            "blocks": [
                {
                    "title": "Overview of how to participate in this study",
                    "listblocks": [
                        {
                            "text": "This is an 'exp-lookit-instructions' frame."
                        },
                        {
                            "text": "See https://lookit.github.io/ember-lookit-frameplayer/classes/ExpLookitInstructions.html"
                        },
                        {
                            "text": "You can display any text, audio, images, and video you want, and can optionally require participants to play audio/video segments to move on. You can also choose whether to display the webcam."
                        }
                    ]
                },
                {
                    "text": "Please try playing this sample audio to make sure you'll be able to hear the story.",
                    "title": "Adjust your speakers",
                    "mediaBlock": {
                        "text": "You should hear 'Ready to go?'",
                        "isVideo": false,
                        "sources": [
                            {
                                "src": "https://s3.amazonaws.com/lookitcontents/exp-physics-final/audio/ready.mp3",
                                "type": "audio/mp3"
                            },
                            {
                                "src": "https://s3.amazonaws.com/lookitcontents/exp-physics-final/audio/ready.ogg",
                                "type": "audio/ogg"
                            }
                        ],
                        "mustPlay": true,
                        "warningText": "Please try playing the sample audio."
                    }
                }
            ],
            "showWebcam": true,
            "webcamBlocks": [
                {
                    "title": "Make sure we can see you",
                    "listblocks": [
                        {
                            "text": "Take a look at your webcam view above. Get comfy, and adjust your own position or the computer as needed so both you and your child are visible."
                        },
                        {
                            "text": "This isn't a Skype call - no one in the lab can see you - but the recorded video of your participation will be sent to the lab to help with data analysis. It's helpful for us to be able to see if your child was pointing or looking confused, for example."
                        }
                    ]
                }
            ],
            "nextButtonText": "Next"
        },
        "video-config": {
            "kind": "exp-video-config",
            "troubleshootingIntro": "Please see below for common troubleshooting issues and solutions:"
        },
        "video-consent": {
            "kind": "exp-lookit-video-consent",
            "template": "consent_005",
            "PIName": "Sophie Bridgers",
            "PIContact": "Sophie Bridgers at secb@mit.edu",
            "include_databrary": true,
            "risk_statement": "There are no expected risks to participation.",
            "datause": "We are interested in your child's predictions about how a child in a story acts based on what the parent in the story says and on whether or not the child’s goals conflict with the parent’s goals. Your child's answers will be recorded for data analysis.",
            "payment": "After you finish the study, we will email you a $5 Amazon gift card (via a code that can be entered online) and certificate of participation within seven days. To be eligible for the gift card and certificate, (1) your child must be in the age range for this study, (2) English is (one of) your child's first language(s), (3) you need to submit a valid consent statement, and (4) we need to see that there is a child with you during the experiment. If you or your child do not wish to complete the entire study or for some reason we are unable to use your child's data, we will still send you and your child a gift card and certificate. There are no other direct benefits to you or your child from participating, but we hope you will enjoy the experience.",
            "purpose": "This study is about how children handle situations where their goals are at odds with other people’s goals.",
            "procedures": "In this study you and your child will see and hear stories with fun illustrations of real-life situations. In each story, a parent will make a request of their child. Your child will be told what the parent wants and what the child wants. Your child will then be asked to predict how the child in the story will respond to what their parent said from three possibilities displayed on the screen.",
            "institution": "Massachusetts Institute of Technology"
        },
        "text-instructions2": {
            "kind": "exp-lookit-instructions",
            "blocks": [{
                "title": "Study overview",
                "image": {
                    "alt": "Study flowchart",
                    "src": "https://raw.githubusercontent.com/buksters/WHN/main/img/study_overview.jpg"
                },
                "text": "\n",
                "listblocks": [
                    {
                        "text": "After two warmup stories, your child will watch and listen to six different stories of children and their parents."
                    },
                    {
                        "text": "At the end of each story, your child will be asked to choose from three different options for what the child in the story might do next."
                    },
                    {
                        "text": "You or your child can click through to the next question after your child has answered."
                    },
                    {
                        "text": "This study will take about 10 to 15 minutes to complete."
                    },
                    {
                        "text": "To ensure that everything goes smoothly, please close other browser tabs and windows now."
                    },
                    {
                        "text": "After you click the 'Start the game!' button on the next page, your browser will go into fullscreen mode. Please keep your browser fullscreened for the duration of the study."
                    }
                ]
            }],
            "showWebcam": false,
            "nextButtonText": "Next page",
            "showPreviousButton": false
        },
        "text-instructions3": {
            "kind": "exp-lookit-instructions",
            "blocks": [{
                    "title": "Important message for parents",
                    "text": "Please read all of the following before proceeding."
                },
                {
                    "title": "Remember: There are no wrong answers! We're interested in how children think about these questions, which may be different from how adults think about them. We'll need your help!",
                    "listblocks": [{
                            "text": "It's important not to 'give away' any of your own thoughts about the answers-- you can say 'Okay!', but not 'That's right!' or 'Hmm, are you sure?'"
                        },
                        {
                            "text": "If your child doesn’t answer a question right away, you can encourage them to answer - just don’t tell them what you think the answer is."
                        },
                        {
                            "text": "It's natural to want to interact about the story and questions, but please hold discussion until the end of the study."
                        },
                        {
                            "text": "If your child gets distracted for a bit, that’s fine - please just encourage them to keep watching and listening. You can also replay the audio if needed."
                        },
                        {
                            "text": "For most questions, there will be answer choices on the screen that your child can click. If your child can click on their own, please let them do so. If they can’t click on their own, they can point to their choice, and you can click for them."
                        },
                        {
                            "text": "Sometimes your child will be asked to explain their answer out loud. If they are hesitant or say they don’t know, you can encourage them to answer but it is also ok if they don’t respond."
                        },
                    ]
                },
                {
                    "text": "Before starting, make sure your audio is working.",
                    "title": "Test your audio",
                    "mediaBlock": {
                        "text": "You should hear 'Ready to go!'",
                        "isVideo": false,
                        "sources": [
                            {
                                "src": "https://s3.amazonaws.com/lookitcontents/exp-physics-final/audio/ready.mp3",
                                "type": "audio/mp3"
                            },
                            {
                                "src": "https://s3.amazonaws.com/lookitcontents/exp-physics-final/audio/ready.ogg",
                                "type": "audio/ogg"
                            }
                        ],
                        "mustPlay": true,
                        "warningText": "Please try playing the sample audio."
                    }
                }
            ],
            "mustPlay": false,
            "showWebcam": false,
            "nextButtonText": "Start the game!",
            "showPreviousButton": false
        },
        "start-recording": {
            "kind": "exp-lookit-start-recording",
            "displayFullscreen": true
        },
        "stop-recording": {
            "kind": "exp-lookit-stop-recording",
            "displayFullscreen": true
        },
        "thankyou": {
            "kind": "exp-lookit-images-audio",
            "audio": "thankyou",
            "images": [
                {
                    "id": "thankyou",
                    "src": "thankyou.jpg",
                    "position": "fill"
                }
            ],
            "baseDir": "https://raw.githubusercontent.com/buksters/WHN/main/",
            "showPreviousButton": false,
        },
        "next-practice": {
            "kind": "exp-lookit-images-audio",
            "audio": "next_instructions_2",
            "images": [
                {
                    "id": "filler",
                    "src": "filler.jpg",
                    "position": "fill"
                },
                {
                    "id": "next_pointer",
                    "src": "next_pointer.jpg",
                    "displayDelayMs": 13000,
                    "top": 68,
                    "left":78,
                    "width": 19
                }
            ],
            "baseDir": "https://raw.githubusercontent.com/buksters/WHN/main/",
            "showPreviousButton": false,
            "parentTextBlock": {
                "css": {
                    "font-size": "1em"
                },
                "text": "Please don’t respond to anything on the screen. Feel free to replay the audio if your child was distracted. Please just say ‘Okay!’ when your child answers - don’t give any hints or say whether you agree!",
                "title": "For parents"
            }
        },
        "warmup": {
            "kind": "group",
            "frameList": [
                {
                    "audio": "study_explanation",
                    "images": [
                        {
                            "id": "explanation",
                            "src": "filler.jpg",
                            "position": "fill"
                        }
                    ]
                },
                {
                    "audio": "RockySnackIntro",
                    "images": [
                        {
                            "id": "RockySnack",
                            "src": "rockyRaccoon.jpg",
                            "height": 80,
                            "left": 30
                        }
                    ]
                },
               {
                    "audio": "RockySnackOptions_2",
                    "images": [
                        {
                            "id": "cue",
                            "src": "rockyRaccoon.jpg",
                            "top": 0,
                            "height": 60,
                            "left": 30,
                            "nonChoiceOption": true
                        },
                        {
                            "id": "option1",
                            "src": "strawberry_cropped.jpg",
                            "top": 64,
                            "left": 10,
                            "width": 13,
                            "displayDelayMs": 0,
                            "feedbackAudio": "strawberry_feedback"
                        },
                        {
                            "id": "option2",
                            "src": "apple.jpg",
                            "top": 64,
                            "left": 40,
                            "width": 12,
                            "displayDelayMs": 0,
                            "feedbackAudio": "apple_feedback"
                        },
                        {
                            "id": "option3",
                            "src": "chocolate.jpg",
                            "top": 68,
                            "left":70,
                            "width": 19,
                            "displayDelayMs": 0,
                            "feedbackAudio": "chocolate_feedback"
                        }
                    ],
                    "highlights": [
                        {
                            "range": [
                                4,
                                5
                            ],
                            "imageId": "option1"
                        },
                        {
                            "range": [
                                5,
                                6.5
                            ],
                            "imageId": "option2"
                        },
                        {
                            "range": [
                                6.5,
                                8
                            ],
                            "imageId": "option3"
                        }
                    ],
                    "autoProceed": false,
                    "choiceRequired": true,
                    "allowUserPause": false
                },
                {
                    "audio": "RockyHideIntro",
                    "images": [
                        {
                            "id": "RockyHide",
                            "src": "RockyFox.jpg",
                            "top": 15,
                            "height": 70,
                            "left": 15
                        }
                    ]
                },
               {
                    "audio": "RockyHideOptions_2",
                    "images": [
                        {
                            "id": "cue",
                            "src": "rockyRaccoon.jpg",
                            "top": 0,
                            "height": 60,
                            "left": 30,
                            "nonChoiceOption": true
                        },
                        {
                            "id": "option1",
                            "src": "rock.jpg",
                            "top": 69,
                            "left": 10,
                            "width": 20,
                            "displayDelayMs": 0,
                            "feedbackAudio": "rock_feedback"
                        },
                        {
                            "id": "option2",
                            "src": "tree.jpg",
                            "top": 67,
                            "left": 40,
                            "width": 20,
                            "displayDelayMs": 0,
                            "feedbackAudio": "tree_feedback"
                        },
                        {
                            "id": "option3",
                            "src": "cave.jpg",
                            "top": 71,
                            "left":70,
                            "width": 20,
                            "displayDelayMs": 0,
                            "feedbackAudio": "cave_feedback"
                        }
                    ],
                    "highlights": [
                        {
                            "range": [
                                4,
                                5
                            ],
                            "imageId": "option1"
                        },
                        {
                            "range": [
                                5,
                                6.5
                            ],
                            "imageId": "option2"
                        },
                        {
                            "range": [
                                6.5,
                                8
                            ],
                            "imageId": "option3"
                        }
                    ],
                    "autoProceed": false,
                    "choiceRequired": true,
                    "allowUserPause": false
                }
            ],
            "commonFrameProperties": {
                "kind": "exp-lookit-images-audio",
                "baseDir": "https://raw.githubusercontent.com/buksters/WHN/main/",
                "id": "storybook-group",
                "audioTypes": [
                    "ogg"
                ],
                "autoProceed": false,
                "showPreviousButton": false,
                "doRecording": true,
                "parentTextBlock": {
                    "css": {
                        "font-size": "1em"
                    },
                    "text": "Please don’t respond to anything on the screen. Feel free to replay the audio if your child was distracted. Please just say ‘Okay!’ when your child answers - don’t give any hints or say whether you agree!",
                    "title": "For parents"
                }
            }
        }
    };


    // Start off the frame sequence with config/consent frames; we'll add test
    // trials as we construct them
    let frame_sequence = ["text-instructions1", "video-config", "video-consent", "text-instructions2", "text-instructions3", "start-recording", "next-practice", "warmup"];
    // let frame_sequence = ["warmup"];

    let stories = ['tablet', 'room', 'jumping', 'outside', 'writing', 'computer', 'm&ms', 'popcorn', 'tub', 'laundry', 'peas', 'jacket'];
    let conditions = ['aligned', 'misaligned'];
    let options = ['c', 'l', 'nc'];
    let full = {
        'c': '/large_compliance.jpg',
        'l': '/large_loophole.jpg',
        'nc': '/large_noncompliance.jpg'
    };
    let options_full = {
        'c': 'compliance',
        'l': 'loophole',
        'nc': 'noncompliance'
    };
    let options_lengths = {

        'tablet': 
        {
            'intro-length': 5.72,
            'c-length': 8.23,
            'l-length': 6.68,
            'nc-length': 5.4
        },
        'computer': 
        {
            'intro-length': 6.16,
            'c-length': 6.27,
            'l-length': 8.0,
            'nc-length': 5.38
        },
        'room': 
        {
            'intro-length': 7.1,
            'c-length': 7.04,
            'l-length': 6.63,
            'nc-length': 6.16
        },
        'writing':
        {
            'intro-length': 6.76,
            'c-length': 5.69,
            'l-length': 4.82,
            'nc-length': 6.21
        },
        'jumping':
        {
            'intro-length': 7.25,
            'c-length': 5.57,
            'l-length': 8.08,
            'nc-length': 5.05
        },
        'outside': 
        {
            'intro-length': 6.85,
            'c-length': 6.1,
            'l-length': 6.53,
            'nc-length': 6.31
        },
        'peas':
        {
            'intro-length': 6.27,
            'c-length': 5.27,
            'l-length': 4.99,
            'nc-length': 5.35
        },
        'popcorn':
        {
            'intro-length': 6.44,
            'c-length': 4.5,
            'l-length': 6.76,
            'nc-length': 4.37
        },
        'jacket':
        {
            'intro-length': 6.78,
            'c-length': 4.33,
            'l-length': 5.03,
            'nc-length': 4.59
        },
        'tub':
        {
            'intro-length': 7.08,
            'c-length': 5.99,
            'l-length': 7.49,
            'nc-length': 5.07
        },
        'laundry':
        {
            'intro-length': 6.38,
            'c-length': 4.93,
            'l-length': 4.61,
            'nc-length': 4.78
        },
        'm&ms':
        {
            'intro-length': 6.4,
            'c-length': 4.95,
            'l-length': 5.05,
            'nc-length': 4.67
        }
    };

    // Choose a random starting point and order for the category pairings
    let ordered_stories = shuffle(stories);
    let first_two = shuffle([0,1]);
    let last_four = shuffle([0,0,1,1]);
    let conditions_order = [...first_two, ...last_four];
    console.log("ORDER CHECK");
    console.log(conditions_order);

    for (iTrial = 0; iTrial < 6; iTrial++) {

        let this_story = ordered_stories[iTrial];
        let this_condition = conditions[conditions_order[iTrial]]; //misaligned or aligned
        let options_order = shuffle(options); 
        let options_order_name = options_order.join('-');
        let highlights = highlight_lengths(options_lengths, this_story, options_order);
        let filler_audio = '';

        if (iTrial == 0) 
        {
            filler_audio = 'first_story';
        }
        else {
            filler_audio = 'next_story';
        }
        
        console.log(filler_audio);

        thisTrial = {
            "kind": "group",
            "sampler": "random-parameter-set",
            "frameList": [
                {
                    "audio": filler_audio,
                    "images": [
                        {
                            "id": "filler",
                            "src":  "filler.jpg",
                            "position": "fill"
                        }
                    ]
                },
                {
                    "audio": this_story + '/story_intro',
                    "images": [
                        {
                            "id": "story-intro",
                            "src": this_story + "/noParent.jpg",
                            "position": "fill"
                        }
                    ]
                },
                {
                    "audio": this_story + '/parent_combined',
                    "images": [
                        {
                            "id": "story-parent",
                            "src": this_story + "/parent.jpg",
                            "position": "fill"
                        }
                    ]
                },
                {
                    "audio": this_story + '/' + this_condition + '_combined',
                    "images": [
                        {
                            "id": "story-parent-wants",
                            "src": this_story + "/parent.jpg",
                            "position": "fill"
                        }
                    ]
                },
                {
                    "audio": this_story + "/" + options_order_name,
                    "images": [
                        {
                            "id": "option1",
                            "src": this_story + full[options_order[0]],
                            "top": 5,
                            "left": 5,
                            "width": 30,
                            "displayDelayMs": 0,
                            "feedbackAudio": this_story + "/" + options_full[options_order[0]]
                        },
                        {
                            "id": "option2",
                            "src": this_story + full[options_order[1]],
                            "top": 35,
                            "left": 35,
                            "width": 30,
                            "displayDelayMs": 0,
                            "feedbackAudio": this_story + "/" + options_full[options_order[1]]
                        },
                        {
                            "id": "option3",
                            "src": this_story + full[options_order[2]],
                            "top": 65,
                            "left":65,
                            "width": 30,
                            "displayDelayMs": 0,
                            "feedbackAudio": this_story + "/" + options_full[options_order[2]]
                        }
                    ],
                    "highlights": [
                        {
                            "range": highlights[0],
                            "imageId": "option1",
                            "color": "red"
                        },
                        {
                            "range": highlights[1],
                            "imageId": "option2",
                            "color": "red"
                        },
                        {
                            "range": highlights[2],
                            "imageId": "option3"
                        }
                    ],
                    "doRecording": false,
                    "choiceRequired": true,
                    "allowUserPause": false
                }
            ],
            "commonFrameProperties": {
                "baseDir": "https://raw.githubusercontent.com/buksters/WHN/main/",
                "kind": "exp-lookit-images-audio",
                "id": "storybook-group",
                "audioTypes": [
                    "mp3"
                ],
                "autoProceed": false,
                "showPreviousButton": false,
                "canMakeChoiceBeforeAudioFinished": false,
                "doRecording": false,
                "parentTextBlock": {
                    "css": {
                        "font-size": "1em"
                    },
                    "text": "Please don’t respond to anything on the screen. Feel free to replay the audio if your child was distracted. Please just say ‘Okay!’ when your child answers - don’t give any hints or say whether you agree!",
                    "title": "For parents"
                }
            },
        };

        // Store this frame in frames and in the sequence
        frameId = 'test-trial-' + (iTrial + 1);
        frames[frameId] = thisTrial;
        frame_sequence.push(frameId);
    }

    // Finish up the frame sequence with the exit survey
    frame_sequence = frame_sequence.concat(['thankyou', 'exit-survey']);

    // Return a study protocol with "frames" and "sequence" fields just like when
    // defining the protocol in JSON only
    return {
        frames: frames,
        sequence: frame_sequence
    };
}