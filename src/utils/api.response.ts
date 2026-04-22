export class ApiResponse<T> { 
    data?: T;
    message?: string
    statusCode?: number;
    constructor(response?: { data?: T; message?: string; statusCode?: number }) {
        this.data = response?.data;
        this.message = response?.message;
        this.statusCode = response?.statusCode;
    }
}