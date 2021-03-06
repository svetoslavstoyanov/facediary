export class Profiles {
    constructor(
        public id: String,
        public name: String,
        public surname: String,
        public profilePhoto: String,
        public coverPhoto: String,
        public emailProfile: String,
        public location: String,
        public birthday: Date,
        public bio: String,
        public posts: Object,
        public isAdmin: String
    ) { }
}
