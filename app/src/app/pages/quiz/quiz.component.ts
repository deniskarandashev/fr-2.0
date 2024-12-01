import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-quiz',
  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule, 
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent implements OnInit {
  question: any;
  feedback: string | null = null;
  selectedAnswer: number | null = null;

  // Глаголы и типичные ошибки
  verbs = [
    {
      verb: 'acquérir',
      correct: 'acquis',
      mistakes: ['acquière', 'acquit', 'acquire']
    },
    {
      verb: 'avoir',
      correct: 'eu',
      mistakes: ['a', 'eus', 'avoir']
    },
    {
      verb: 'battre',
      correct: 'battu',
      mistakes: ['batte', 'battit', 'bat']
    },
    {
      verb: 'boire',
      correct: 'bu',
      mistakes: ['bue', 'boit', 'buire']
    },
    {
      verb: 'connaître',
      correct: 'connu',
      mistakes: ['connue', 'connait', 'connaitre']
    },
    {
      verb: 'courir',
      correct: 'couru',
      mistakes: ['court', 'courue', 'cour']
    },
    {
      verb: 'devoir',
      correct: 'dû',
      mistakes: ['due', 'devu', 'devait']
    },
    {
      verb: 'dire',
      correct: 'dit',
      mistakes: ['dite', 'dis', 'dir']
    },
    {
      verb: 'faire',
      correct: 'fait',
      mistakes: ['faite', 'fais', 'faitt']
    },
    {
      verb: 'lire',
      correct: 'lu',
      mistakes: ['lit', 'lire', 'lues']
    },
    {
      verb: 'mettre',
      correct: 'mis',
      mistakes: ['mit', 'met', 'mett']
    },
    {
      verb: 'mourir',
      correct: 'mort',
      mistakes: ['morts', 'mouru', 'mourit']
    },
    {
      verb: 'naître',
      correct: 'né',
      mistakes: ['née', 'naît', 'naissé']
    },
    {
      verb: 'ouvrir',
      correct: 'ouvert',
      mistakes: ['ouvertes', 'ouvrit', 'ouvre']
    },
    {
      verb: 'prendre',
      correct: 'pris',
      mistakes: ['prend', 'prisse', 'prit']
    },
    {
      verb: 'voir',
      correct: 'vu',
      mistakes: ['voit', 'vue', 'voir']
    },
    {
      verb: 'suivre',
      correct: 'suivi',
      mistakes: ['suive', 'suivie', 'suit']
    },
    {
      verb: 'écrire',
      correct: 'écrit',
      mistakes: ['écrite', 'écris', 'écritte']
    },
    {
      verb: 'recevoir',
      correct: 'reçu',
      mistakes: ['reçut', 'reçoive', 'reçue']
    },
    {
      verb: 'traduire',
      correct: 'traduit',
      mistakes: ['tradui', 'traduis', 'traduisit']
    },
    {
      verb: 'venir',
      correct: 'venu',
      mistakes: ['vient', 'venit', 'venue']
    },
    {
      verb: 'vivre',
      correct: 'vécu',
      mistakes: ['vivez', 'vive', 'viva']
    },
    {
      verb: 'ouvrir',
      correct: 'ouvert',
      mistakes: ['ouvre', 'ouvrit', 'ouvertes']
    },
    {
      verb: 'offrir',
      correct: 'offert',
      mistakes: ['offre', 'offrit', 'offrées']
    },
    {
      verb: 'pleuvoir',
      correct: 'plu',
      mistakes: ['plut', 'pleu', 'pleuve']
    },
    {
      verb: 'descendre',
      correct: 'descendu',
      mistakes: ['descend', 'descenda', 'descendit']
    },
    {
      verb: 'partir',
      correct: 'parti',
      mistakes: ['part', 'partis', 'partit']
    },
    {
      verb: 'rire',
      correct: 'ri',
      mistakes: ['rit', 'ris', 'rie']
    },
    {
      verb: 'joindre',
      correct: 'joint',
      mistakes: ['joignit', 'jointes', 'joigne']
    }
  ];
  

  ngOnInit() {
    this.generateQuestion();
  }

  generateQuestion() {
    const verb = this.verbs[Math.floor(Math.random() * this.verbs.length)];
    const options = [...verb.mistakes, verb.correct].sort(() => Math.random() - 0.5);
    this.question = { ...verb, options };
    this.feedback = null;
    this.selectedAnswer = null;
  }

  checkAnswer(index: number) {
    this.selectedAnswer = index;
    if (this.question.options[index] === this.question.correct) {
      this.feedback = 'Правильно! Молодец!';
    } else {
      this.feedback = `Неправильно. Правильный ответ: ${this.question.correct}`;
    }
  }

  nextQuestion() {
    this.generateQuestion();
  }

  isCorrectAnswer(index: number): boolean {
    return this.question.options[index] === this.question.correct;
  }
}