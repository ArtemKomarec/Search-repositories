export class Search {

    setPageCount(pageNumber) {
        this.pageCounter = pageNumber;
    }

    setProjectsCount(count) {
        this.projectsCount = count;
    }

    constructor(view, request) {
        this.view = view;
        this.request = request;

        this.view.searchField.addEventListener('keyup', this.debounce(this.loadProjects.bind(this), 500));
        this.view.loadBtn.addEventListener('click', this.loadMore.bind(this));
        this.pageCounter = 1;
        this.projectsCount = 0;
    }

    loadProjects() {
        this.setPageCount(1);
        this.view.setCounter('');
        if (!this.view.searchField.value) {
            this.clearProjects();
            this.view.showLoadBtn();
        }
        else {
            this.clearProjects();
            this.projectRequest(this.view.searchField.value);
        }
    }

    loadMore() {
        this.setPageCount(this.pageCounter + 1);
        this.projectRequest(this.view.searchField.value);
    }

    async projectRequest(searchValue) {
        let allProjects;
        try {
            await this.request.loadProjects(searchValue, this.pageCounter).then((response) => {
                if (response.ok) {
                    response.json().then(response => {
                        allProjects = response.total_count;
                        this.setProjectsCount(this.projectsCount + response.items.length);
                        this.view.setCounter(allProjects)
                        this.view.showLoadBtn(allProjects > 21 && this.projectsCount !== allProjects);
                        response.items.forEach(project => {
                            this.view.createProject(project, response);
                        });
                    })
                }
            })
        } catch (e) {
            this.view.showError(e);
        }
    }

    clearProjects() {
        this.view.projectsList.innerHTML = '';
        this.view.searchMessage.innerHTML = '';
        this.view.projectWrapper.innerHTML = '';
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