import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class HttpCancelService {

	private pendingHTTPRequests$ = new Subject<void>();

	constructor() { }

	// Cancel Pending HTTP calls
	public cancelPendingRequests() {
		this.pendingHTTPRequests$.next();
	}

	public onCancelPendingRequests() {
		return this.pendingHTTPRequests$.asObservable();
	}
}
