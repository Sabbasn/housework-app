export class Chore {
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public status: number,
        public experienceReward: number
    ) {}
}