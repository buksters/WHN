#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Apr 22 11:00:57 2022

@author: ibuki

this script creates all the knitted audios, including for the counterbalances
"""
import pydub
import os
from pydub import AudioSegment
from pydub.playback import play
import itertools


specific = ['outside', 'jacket', 'tub', 'tablet']
broad = ['computer', 'room', 'jumping', 'm&ms']
scalar = ['writing', 'popcorn', 'peas', 'laundry']
options = ['c', 'l', 'nc']
options_permutations = list(itertools.permutations(options))
all_stories = specific + broad + scalar
half_recorded = ['computer', 'room', 'writing', 'jumping', 'outside', 'tablet']
other_half = list(set(all_stories) - set(half_recorded))

sound_dir = '/Users/ibuki/Documents/GitHub/WHN/mp3' 
os.chdir(sound_dir)

def create_audio(stories):
    for story in stories:
        print("story: ", story)
        
        ## second slide
        try:
            command = AudioSegment.from_file(f"commands/{story}.mp3", format="mp3")
        except:
            command = AudioSegment.from_file(f"commands/{story}.mp3", format="mp3")
        parent_says = AudioSegment.from_file(f"{story}/parent_says.mp3", format="mp3")
        
        repeat = AudioSegment.from_file("audio_again.mp3", format="mp4")
        ## for repeating version:
        # parent_combined = parent_says + command + repeat[1000:-500] + command 
        parent_combined = parent_says + command
        
        ## third slide
        parent_wants = AudioSegment.from_file(f"{story}/parent_wants.mp3", format="mp3")
        aligned = AudioSegment.from_file(f"{story}/goals_aligned.mp3", format="mp3")
        misaligned = AudioSegment.from_file(f"{story}/goals_misaligned.mp3", format="mp3")
        aligned_combined = parent_wants + aligned
        misaligned_combined = parent_wants + misaligned
        
        ## fourth slide
        intro = AudioSegment.from_file(f"{story}/options_intro.mp3", format="mp3")
        compliance = AudioSegment.from_file(f"{story}/compliance.mp3", format="mp3")
        loophole = AudioSegment.from_file(f"{story}/loophole.mp3", format="mp3")
        noncompliance = AudioSegment.from_file(f"{story}/noncompliance.mp3", format="mp3")
        or_audio = AudioSegment.from_file("or.mp3", format="mp4")
        or_2 = AudioSegment.from_file("or_2.m4a", format="mp4")
        options_combined = intro + compliance + or_2 + loophole + or_2 + noncompliance
        options_audio = {'c': compliance, 'l': loophole, 'nc': noncompliance}
        
        
        for perm in options_permutations:
            order = "-".join(perm)
            audio = intro + options_audio[perm[0]] + or_2[200:-200] + options_audio[perm[1]] + or_2[200:-200] + options_audio[perm[2]]
            audio.export(f"{story}/{order}.mp3", format="mp3")
            
        
        ## --- play to test before exporting: ---
        # play(parent_combined)
        # play(aligned_combined)
        # play(misaligned_combined)
        # play(options_combined)
        
        ## --- export---
        # first = parent_combined.export(f"{story}/parent_combined.mp3", format="mp3")
        # second_a = aligned_combined.export(f"{story}/aligned_combined.mp3", format="mp3")
        # second_m = misaligned_combined.export(f"{story}/misaligned_combined.mp3", format="mp3")
        ## third = options_combined.export(f"{story}/options_combined.mp3", format="mp3")
        
        ## --- for figuring out highlight duration ---
        # length_intro = round(intro.duration_seconds, 2)
        # length_c = round(compliance.duration_seconds, 2)
        # length_l = round(loophole.duration_seconds, 2)
        # length_nc = round(noncompliance.duration_seconds, 2)

        # start_first = round(intro.duration_seconds, 2)
        # start_second = round(intro.duration_seconds + compliance.duration_seconds, 2)
        # end_second = round(intro.duration_seconds + compliance.duration_seconds + loophole.duration_seconds, 2)
        # start_third = round(intro.duration_seconds + compliance.duration_seconds + loophole.duration_seconds + or_audio[700:-500].duration_seconds, 2)

        # print(f'''highlights for {story} should be at: 
        #       first: {start_first} to {start_second}
        #       second: {start_second} to {end_second}
        #       third: {start_third} to {round(options_combined.duration_seconds, 2)}''')
              
        # print(f'''length of options for {story}: 
        #       intro: {length_intro},
        #       or: {round(or_audio[700:-500].duration_seconds, 2)}
        #       comp: {length_c},
        #       loop: {length_l},
        #       noncomp: {length_nc}''')

create_audio(all_stories)

      