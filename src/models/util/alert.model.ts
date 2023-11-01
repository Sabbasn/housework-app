import { AlertStatus } from "./alertStatus.enum";

export class Alert {
    constructor(
        public text: string = "",
        public backgroundColor: AlertStatus = AlertStatus.Error,
        public opacity: number = 1,
    ) {}
}