import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { EmpListadoEmpleados, Employee } from '../Models/emp-listado-empleados';
import { EmpListadoAsistencias } from '../Models/emp-listado-asistencias';
import { EmpPutEmployees } from '../Models/emp-put-employees';
import { environment } from '../../../common/environments/environment';
import { EmpPutEmployeesResponse } from '../Models/EmpPutEmployeesResponse';

@Injectable({
  providedIn: 'root',
})
export class EmpListadoEmpleadosService {
  private readonly EMPLOYEE_BASE_URL = environment.services.employees ; // URL base del servidor
  private readonly CONTACT_BASE_URL = environment.services.contacts ; // URL base del servidor
  private readonly ADDRESS_BASE_URL = environment.services.addresses ; // URL base del servidor
  private _refresh$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  // Getter para acceder al Subject de refresh
  get refresh$(): Observable<void> {
    return this._refresh$;
  }

  getContactById(id: number) :Observable<any> {
    return this.http.get<any>(`${this.CONTACT_BASE_URL}/contact/search?userId=${id}`);
  }
  getContactById2(id: string) :Observable<any> {
    return this.http.get<any>(`${this.CONTACT_BASE_URL}/contact/search?userId=${id}`);
  }

  getAdressById(id: number): Observable<any> {
    return this.http.get<any>(
      `${this.ADDRESS_BASE_URL}/address/${id}`
    );
  }

  // Método para obtener los empleados.
  getEmployees(): Observable<EmpListadoEmpleados[]> {
    return this.http.get<EmpListadoEmpleados[]>(
      `${this.EMPLOYEE_BASE_URL}/employees/allEmployees`
    );
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(
      `${this.EMPLOYEE_BASE_URL}/employees/employeeById?id=${id}`
    );
  }
  getEmployeeById2(id: number): Observable<EmpPutEmployeesResponse> {
    return this.http.get<EmpPutEmployeesResponse>(
      `${this.EMPLOYEE_BASE_URL}/employees/employeeById?id=${id}`
    );
  }

  getAttendances(): Observable<EmpListadoAsistencias[]> {
    return this.http.get<EmpListadoAsistencias[]>(
      `${this.EMPLOYEE_BASE_URL}/attendances/get`
    );
  }

  changeEmployeeStatus(id: number): Observable<void> {
    return this.http.put<void>(
      `${this.EMPLOYEE_BASE_URL}/employees/updateActiveEmployee/${id}`,
      {}
    );
  }

  putAttendances(id: number, state: string, justification: string): Observable<any> {
    // Inicializa nuevos parámetros en cada ejecución
    let params = new HttpParams()
        .set('id', id.toString())
        .set('state', state)
        .set('justification', justification);
    
    return this.http.put(`${this.EMPLOYEE_BASE_URL}/attendances/putState`, null, { params });
  }

}