import { Status } from "./status.enum";

export class Room {
    constructor(
        public id: number = -1,
        public name: string = "",
        public status: number = 0,
        public chores: [] = [],
        public orderPriority: number = 0,
        public color: string = "#22a980",
    ) {}
}