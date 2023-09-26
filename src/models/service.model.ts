export class Service<T> {
    constructor(
        public data : Array<T>,
        public success : boolean,
        public message : string,
    ) {}
}