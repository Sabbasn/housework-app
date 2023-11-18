export class Chore {
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public status: number,
        public experienceReward: number,
        public repeatWeekdays: string[],
        public orderPriority: number = 0,
        public timeCreatedDate: string,
        public lastCompletionDate: string,
    ) {}
}