import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../Models/Person';

@Injectable({ providedIn: 'root' })
export class PersonService {
    private baseUrl = 'https://localhost:44302/Person/';

    constructor(private http: HttpClient) { }

    getPersons(): Observable<Person[]> {
        return this.http.get<Person[]>(`${this.baseUrl}GetAll`);
    }

    getPerson(id: number): Observable<Person> {
        return this.http.get<Person>(`${this.baseUrl}GetById?id=${id}`);
      }
      
    createPerson(Person: Person): Observable<Person> {
        return this.http.post<Person>(`${this.baseUrl}Add`, Person);
    }

    updatePerson(Person: Person): Observable<Person> {
        return this.http.put<Person>(`${this.baseUrl}Update`, Person);
    }

    deletePerson(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}Delete?id=${id}`);
    }
}