import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class Service {
    constructor(private http: HttpClient){ 

    }
    
    getStates() {
        return this.sendRequest(environment.baseurl + environment.getStatesUrl, "GET", {})
    }

    //service method for get candidates
    getCandidatesData(searchtext: string = null) {

        let httpParams = searchtext != null ? 
            new HttpParams({
                fromObject: {
                    searchByText: searchtext,
                }
            }): new HttpParams();
        
        return this.sendRequest(environment.baseurl + environment.getUrl, 'GET', httpParams);
    }

    //service method for add candidates
    addCandidate(data: any) {
        return this.sendRequest(environment.baseurl + environment.postUrl, "POST", data)
    }

    //service method for edit candidates
    editCandidate(data: any) {
        return this.sendRequest(environment.baseurl + environment.putUrl, "PUT", data)
    }

    //service method for delete candidates
    deleteCandidate(data: any) {

        let httpParams = new HttpParams({
            fromObject: {
                id: data,
            }
        });

        return this.sendRequest(environment.baseurl + environment.deleteUrl, "DELETE", httpParams)
    }

    //method for send request to controller
    sendRequest(url: string, method: string = "GET", httpParams: any): any {
        let httpOptions;
        let result;
        
        switch(method.toUpperCase()) {
            case "GET":
                httpOptions = { params: httpParams };
                result = this.http.get(url, httpOptions);
                break;
            case "PUT":
                httpOptions = {};
                result = this.http.put(url, httpParams, httpOptions);
                break;
            case "POST":
                httpOptions = {};
                result = this.http.post(url, httpParams, httpOptions);
                break;
            case "DELETE":
                httpOptions = { params: httpParams };
                result = this.http.delete(url, httpOptions);
                break;
            default:
                httpOptions = { params: httpParams };
                result = this.http.get(url, httpOptions);
                break;
        }
      
        return result
            .toPromise()
            .then((data: any) => {
                return method === "GET" ? data.data : data;
            })
            .catch(e => {
                throw e && e.error && e.error.Message;
            });
      }
    }