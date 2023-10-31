import { Status } from "./status.enum";

export class Room {
    constructor(
        public id: number = -1,
        public name: "" = "",
        public status: number = 0,
        public chores: [] = [],
    ) {}
}