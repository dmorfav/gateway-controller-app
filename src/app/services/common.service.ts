import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

export const NOTIFICATION_TYPE_INFO = 0
export const NOTIFICATION_TYPE_SUCCESS = 1
export const NOTIFICATION_TYPE_WARNING = 2
export const NOTIFICATION_TYPE_ERROR = 4

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    constructor(private toastr: ToastrService) {
    }

    showNotification(message: string, title: string = '', type: number = NOTIFICATION_TYPE_INFO) {
        switch (type) {
            case NOTIFICATION_TYPE_INFO: {
                this.toastr.info(message, title);
                break;
            }
            case NOTIFICATION_TYPE_SUCCESS: {
                this.toastr.success(message, title);
                break;
            }
            case NOTIFICATION_TYPE_WARNING: {
                this.toastr.warning(message, title);
                break;
            }
            case NOTIFICATION_TYPE_ERROR: {
                this.toastr.error(message, title);
                break;
            }
        }
    }
}
