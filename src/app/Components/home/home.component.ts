
import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/Models/Person';
import { PersonService } from 'src/app/Services/PersonService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  persons: Person[] = [];
  showForm = false;
  isEdit = false;
  currentPerson: Person = { id: 0, name: '', email: '', age: 0, address: '' };

  constructor(private personService: PersonService) {}

  ngOnInit(): void {
    this.loadPersons();
  }

  loadPersons(): void {
    this.personService.getPersons().subscribe((data) => this.persons = data);
  }

  openAdd(): void {
    this.currentPerson = { id: 0, name: '', email: '', age: 0, address: '' };
    this.isEdit = false;
    this.showForm = true;
  }

  openEdit(person: Person): void {
    this.currentPerson = { ...person };
    this.isEdit = true;
    this.showForm = true;
  }

  handleSubmit(person: Person): void {
    if (this.isEdit) {
      this.updatePerson(person);
    } else {
      this.createPerson(person);
    }
  }
  
  private updatePerson(person: Person): void {
    this.personService.updatePerson(person).subscribe(() => {
      this.updateLocalPersonList(person);
      this.closeForm();
    });
  }
  
  private createPerson(person: Person): void {
    this.personService.createPerson(person).subscribe((newPerson) => {
      this.persons.push(newPerson);
      this.closeForm();
    });
  }
  
  private updateLocalPersonList(updatedPerson: Person): void {
    const index = this.persons.findIndex(p => p.id === updatedPerson.id);
    if (index !== -1) {
      this.persons[index] = { ...updatedPerson };
    }
  }
  

  deletePerson(id: number): void {
    this.personService.deletePerson(id).subscribe(() => {
      this.persons = this.persons.filter(p => p.id !== id);
    });
  }

  closeForm(): void {
    this.showForm = false;
  }
}
