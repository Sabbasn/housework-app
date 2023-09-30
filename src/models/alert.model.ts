import { Status } from "./status.enum";

export class Alert {
    constructor(
        public text: string = "",
        public backgroundColor: Status = Status.Locked,
    ) {}
}