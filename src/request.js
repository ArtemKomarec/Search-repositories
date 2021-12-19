export class Request {
    constructor() {

    }
    async loadProjects(searchField, pageCounter) {
        return await fetch(`https://api.github.com/search/repositories?q=${searchField}&per_page=21&page=${pageCounter}`);
    }
}