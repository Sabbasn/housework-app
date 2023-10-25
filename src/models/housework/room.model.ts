import { Status } from "./status.enum";

export class Room {
    constructor(
        public name: "" = "",
        public status: number = 0,
        public chores: [] = [],
    ) {}
}