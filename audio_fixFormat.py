#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Mon May  2 13:25:44 2022

@author: ibuki
"""

import pydub
import os
from pydub import AudioSegment
from pydub.playback import play
import glob

specific = ['tablet', 'outside', 'jacket', 'tub']
broad = ['computer', 'room', 'jumping', 'm&ms']
scalar = ['writing', 'popcorn', 'peas', 'laundry']


all_stories = specific + broad + scalar

half_recorded = ['tablet', 'computer', 'room', 'writing', 'jumping', 'outside']

sound_dir = '/Users/ibuki/Documents/GitHub/WHN/mp3' 
os.chdir(sound_dir)

for story in half_recorded:
    prev_files = glob.glob(f'{story}/*')
    for f in prev_files:
        if f[-3:]=='m4a':
            bad_format = AudioSegment.from_file(f, format="mp4")
            good_format = bad_format.export(f"{f[:-3]}mp3", format="mp3")
            os.remove(f)
        