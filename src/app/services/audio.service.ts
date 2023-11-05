import { Injectable } from '@angular/core';
import { AudioCue } from 'src/models/housework/audioCue';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  constructor() { }

  audio = new Audio()

  AUDIO_ASSET_DIR = "../assets/sounds"

  playAudio(audioCue: AudioCue) {
    this.audio.src = `${this.AUDIO_ASSET_DIR}/${audioCue}`
    this.audio.load()
    this.audio.play()
  }
}
