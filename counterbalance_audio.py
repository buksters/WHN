#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Apr 22 11:00:57 2022

@author: ibuki
"""
import pydub
import os
from pydub import AudioSegment
from pydub.playback import play

specific = ['tablet', 'outside', 'jacket', 'tub']
broad = ['computer', 'room', 'jump', 'm&ms']
scalar = ['writing', 'popcorn', 'peas', 'laundry']
stories = specific + broad + scalar

sound_dir = '/Users/ibuki/Documents/GitHub/WHN/mp3' 
os.chdir(sound_dir)

def create_perms(stories):
    for story in stories:
        intro = AudioSegment.from_file("{story}/options_intro.mp3", format="mp3")
        compliance = AudioSegment.from_file("{story}/compliance.mp3", format="mp4")
        loophole = AudioSegment.from_file("{story}/loophole.mp3", format="mp4")
        noncompliance = AudioSegment.from_file("{story}/noncompliance.mp3", format="mp4")
        or_audio = AudioSegment.from_file("or.mp3", format="mp4")
        combined = intro + compliance + loophole + or_audio[700:-500] + noncompliance
        
        # play(combined)
        
        file_handle = combined.export("{story}/options_combined.mp3", format="mp3")
        
        start_first = round(intro.duration_seconds, 2)
        start_second = round(intro.duration_seconds + compliance.duration_seconds, 2)
        end_second = round(intro.duration_seconds + compliance.duration_seconds + loophole.duration_seconds, 2)
        start_third = round(intro.duration_seconds + compliance.duration_seconds + loophole.duration_seconds + or_audio[700:-500].duration_seconds, 2)

        print(f'''highlights for {story} should be at: 
              first: {start_first} to {start_second}
              second: {start_second} to {end_second}
              third: {start_third} to {round(combined.duration_seconds, 2)}''')



      