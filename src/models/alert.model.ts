export class Alert {
    constructor(
        public text: string = "",
        public backgroundColor: string = "var(--main-color)",
        public classes = []
    ) {}
}