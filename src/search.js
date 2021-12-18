export class Search {

    setPageCount(pageNumber) {
        this.pageCounter = pageNumber;
    }

    setProjectsCount(count) {
        this.projectsCount = count;
    }

    constructor(view) {
        this.view = view;
        this.view.searchField.addEventListener('keyup', this.debounce(this.loadProjects.bind(this), 500));
        this.view.loadBtn.addEventListener('click', this.loadProjects.bind(this));
        this.pageCounter = 1;
        this.projectsCount = 0;
    }

    async loadProjects() {
        let allProjects;
        if (!this.view.searchField.value) {
            this.clearProjects();
        }
        else {
            return await fetch(`https://api.github.com/search/repositories?q=${this.view.searchField.value}&per_page=20&page=${this.pageCounter}`).then((response) => {
                if (response.ok) {
                    this.setPageCount(this.pageCounter + 1);
                    response.json().then(response => {
                        allProjects = response.total_count;
                        this.setProjectsCount(this.projectsCount + response.items.length);
                        this.view.showLoadBtn(allProjects > 20 && this.projectsCount !== allProjects)
                        response.items.forEach(project => {
                            this.view.createProject(project);
                        });
                    })
                } else {
                    new Error('There are no projects');
                }
            })
        }
    }

    clearProjects() {
        this.view.projectsList.innerHTML = '';
    }

    debounce(func, wait, immediate) {
        let timeout;
        return function () {
            const context = this, args = arguments;
            const later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };
}