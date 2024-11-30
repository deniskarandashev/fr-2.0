import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-audio-recorder',
  imports: [CommonModule, MatIcon, MatButtonModule],
  templateUrl: './audio-recorder.component.html',
  styleUrl: './audio-recorder.component.scss'
})
export class AudioRecorderComponent implements OnInit {
  private mediaRecorder!: MediaRecorder;
  private audioChunks: Blob[] = [];
  audioUrl: string | null = null;
  isRecording = false;
  recognition: any;
  resultText: string = '';

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.initializeRecorder();
    this.textRecognition();
  }

  textRecognition(): void {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      this.recognition = new ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition)();
    } else {
      console.error('SpeechRecognition not supported in this browser.');
    }
    // this.recognition = new (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition();
    this.recognition.lang = 'fr-FR';
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.maxAlternatives = 1;

    this.recognition.onresult = (event: any) => {
      this.resultText = event.results[0][0].transcript;
      this.cdr.detectChanges();
    };

    this.recognition.onend = () => {
      console.log('Speech recognition ended');
      this.recognition.start();  // Перезапуск распознавания
    };

    this.recognition.onerror = (event: any) => {
      console.error('Error occurred in speech recognition:', event.error);
    };
  }

  async initializeRecorder() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);

      this.mediaRecorder.ondataavailable = (event) => {
        this.audioChunks.push(event.data);
        this.cdr.detectChanges();
      };

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
        this.audioUrl = URL.createObjectURL(audioBlob);
        this.audioChunks = [];
        this.cdr.detectChanges();
      };
    } catch (error) {
      console.error('Ошибка доступа к микрофону', error);
    }
  }

  onRecordingClick(isRecording: boolean): void {
    if (isRecording) {
      this.startRecording();
    } else {
      this.stopRecording();
    }
  }

  startRecording() {
    if (!this.isRecording) {
      this.mediaRecorder.start();
      this.isRecording = true;
      this.cdr.detectChanges();
      this.recognition.start();
    }
  }

  stopRecording() {
    if (this.isRecording) {
      this.mediaRecorder.stop();
      this.isRecording = false;
      this.recognition.stop();
      this.cdr.detectChanges();
    }
  }

  saveAudio() {
    if (this.audioUrl) {
      const link = document.createElement('a');
      link.href = this.audioUrl;
      link.download = 'audio_recording.wav';
      link.click();
    }
  }
  
  deleteAudio(): void {
    if (this.audioUrl) {
      this.audioUrl = null;
      this.audioChunks = [];
      this.cdr.detectChanges();
    }
  }
}