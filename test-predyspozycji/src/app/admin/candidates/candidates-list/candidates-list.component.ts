import { Component, OnInit } from '@angular/core';
import { Candidate } from '../../../candidates/candidate.model';
import { CandidatesService } from '../../../candidates/candidates.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-candidates-list',
  templateUrl: './candidates-list.component.html',
  styleUrl: './candidates-list.component.sass'
})
export class CandidatesListComponent implements OnInit {

  candidates: Candidate[] = []
  private candidatesSubs!: Subscription
  displayedColumns: string[] = ['imie', 'nazwisko', 'email', 'miasto', 'data', 'nazwa', 'usun']

  constructor(private candidatesService: CandidatesService) {}

  ngOnInit(): void {

    this.candidatesService.getCandidates();
    this.candidatesSubs = this.candidatesService.getCandidatesUpdateListener().subscribe({
      next: candidatesData => {
        this.candidates = candidatesData.candidates
      }
    })
  }

  onDelete(id_kandydata: number) {
    this.candidatesService.deleteCandidate(id_kandydata).subscribe({
      next: () => {
        this.candidates = this.candidates.filter(candidate => candidate.id_kandydata !== id_kandydata);
      }
    })
  }



}
