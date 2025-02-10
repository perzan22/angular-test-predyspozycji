import { Component, OnInit } from '@angular/core';
import { Candidate } from '../../../candidates/candidate.model';
import { CandidatesService } from '../../../candidates/candidates.service';
import { Subscription } from 'rxjs';

import * as xlsx from 'xlsx';
import { saveAs } from 'file-saver'

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

  exportDataToExcel() {
    const worksheet: xlsx.WorkSheet = xlsx.utils.json_to_sheet(this.candidates);

    const workbook: xlsx.WorkBook = {
      Sheets: { 'Dane kandydatów': worksheet },
      SheetNames: ['Dane kandydatów']
    };

    const excelBuffer: any = xlsx.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    })

    const fileName = 'kandydaci-na-studia.xlsx';
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, fileName);
  }

}
