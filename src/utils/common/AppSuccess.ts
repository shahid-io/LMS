export class AppSuccess {
    statusCode: number;
    status: string;
    data: any;

    constructor(data: any, statusCode: number = 200) {
        this.statusCode = statusCode;
        this.status = 'success';
        this.data = data;
    }
}
