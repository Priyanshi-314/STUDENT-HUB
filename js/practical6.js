/* =========================================
   STUDENTHUB - PRACTICAL 6
   FETCH API + JSON + SEARCH + FILTER
   SORT + PAGINATION
========================================= */


/* ================= DATA ================= */

let eventsData = [];

let studentsData = [];

let faqsData = [];


/* ================= CURRENT DATA ================= */

let currentData = [];

let currentType = "events";

let filteredData = [];

let currentPage = 1;

let recordsPerPage = 6;


/* ================= HTML ELEMENTS ================= */

let dataContainer =
    document.getElementById("dataContainer");

let searchInput =
    document.getElementById("searchInput");

let filterSelect =
    document.getElementById("filterSelect");

let sortSelect =
    document.getElementById("sortSelect");

let previousBtn =
    document.getElementById("previousBtn");

let nextBtn =
    document.getElementById("nextBtn");

let pageInfo =
    document.getElementById("pageInfo");

let statusMessage =
    document.getElementById("statusMessage");

let tabButtons =
    document.querySelectorAll(".tabButton");


/* ================= FETCH ALL JSON ================= */

async function loadAllData() {

    try {

        statusMessage.textContent =
            "Loading JSON data...";


        let eventsResponse =
            await fetch("../data/events.json");


        let studentsResponse =
            await fetch("../data/students.json");


        let faqsResponse =
            await fetch("../data/faqs.json");


        if (
            !eventsResponse.ok ||
            !studentsResponse.ok ||
            !faqsResponse.ok
        ) {

            throw new Error(
                "Unable to load JSON files."
            );

        }


        eventsData =
            await eventsResponse.json();


        studentsData =
            await studentsResponse.json();


        faqsData =
            await faqsResponse.json();


        currentData =
            [...eventsData];


        filteredData =
            [...currentData];


        setupControls();


        displayData();


        statusMessage.textContent =
            "JSON data loaded successfully.";


    } catch (error) {

        console.error(error);


        statusMessage.textContent =
            "Error loading JSON data.";


        dataContainer.innerHTML = `
            <div class="noResults">

                <h3>
                    ⚠️ Data Loading Error
                </h3>

                <p>
                    Please check the JSON files
                    and run the project using
                    a local server.
                </p>

            </div>
        `;

    }

}


/* ================= CHANGE DATA TYPE ================= */

function changeDataType(type) {

    currentType = type;

    currentPage = 1;


    if (type === "events") {

        currentData =
            [...eventsData];

    }


    else if (type === "students") {

        currentData =
            [...studentsData];

    }


    else if (type === "faqs") {

        currentData =
            [...faqsData];

    }


    filteredData =
        [...currentData];


    searchInput.value = "";

    setupControls();

    displayData();

}


/* ================= SETUP CONTROLS ================= */

function setupControls() {

    filterSelect.innerHTML =
        '<option value="all">All</option>';


    sortSelect.innerHTML =
        '<option value="default">Default</option>';


    /* ===== EVENTS ===== */

    if (currentType === "events") {

        let categories =
            [...new Set(
                currentData.map(
                    event => event.category
                )
            )];


        categories.sort();


        categories.forEach(function(category) {

            let option =
                document.createElement("option");

            option.value = category;

            option.textContent = category;

            filterSelect.appendChild(option);

        });


        addSortOption(
            "nameAsc",
            "Name A-Z"
        );

        addSortOption(
            "nameDesc",
            "Name Z-A"
        );

        addSortOption(
            "dateAsc",
            "Date: Earliest First"
        );

        addSortOption(
            "dateDesc",
            "Date: Latest First"
        );

    }


    /* ===== STUDENTS ===== */

    else if (currentType === "students") {

        let departments =
            [...new Set(
                currentData.map(
                    student => student.department
                )
            )];


        departments.sort();


        departments.forEach(function(department) {

            let option =
                document.createElement("option");

            option.value = department;

            option.textContent = department;

            filterSelect.appendChild(option);

        });


        addSortOption(
            "nameAsc",
            "Name A-Z"
        );

        addSortOption(
            "nameDesc",
            "Name Z-A"
        );

        addSortOption(
            "semesterAsc",
            "Semester Low-High"
        );

        addSortOption(
            "semesterDesc",
            "Semester High-Low"
        );

    }


    /* ===== FAQS ===== */

    else if (currentType === "faqs") {

        addSortOption(
            "questionAsc",
            "Question A-Z"
        );

        addSortOption(
            "questionDesc",
            "Question Z-A"
        );

    }

}


/* ================= ADD SORT OPTION ================= */

function addSortOption(value, text) {

    let option =
        document.createElement("option");

    option.value = value;

    option.textContent = text;

    sortSelect.appendChild(option);

}


/* ================= DISPLAY DATA ================= */

function displayData() {

    dataContainer.innerHTML = "";


    if (filteredData.length === 0) {

        dataContainer.innerHTML = `
            <div class="noResults">

                <h3>
                    🔍 No Results Found
                </h3>

                <p>
                    Try changing your search
                    or filter.
                </p>

            </div>
        `;

        updatePagination();

        return;

    }


    let start =
        (currentPage - 1)
        * recordsPerPage;


    let end =
        start + recordsPerPage;


    let pageData =
        filteredData.slice(start, end);


    pageData.forEach(function(item) {

        let card =
            document.createElement("div");


        card.className = "dataCard";


        /* ===== EVENT CARD ===== */

        if (currentType === "events") {

            card.innerHTML = `

                <span class="badge">
                    ${item.category}
                </span>

                <h3>
                    ${item.name}
                </h3>

                <p>
                    📅 <strong>Date:</strong>
                    ${item.date}
                </p>

                <p>
                    📍 <strong>Location:</strong>
                    ${item.location}
                </p>

                <p>
                    ${item.description}
                </p>

            `;

        }


        /* ===== STUDENT CARD ===== */

        else if (currentType === "students") {

            card.innerHTML = `

                <span class="badge">
                    ${item.course}
                </span>

                <h3>
                    ${item.name}
                </h3>

                <p>
                    💻 <strong>Department:</strong>
                    ${item.department}
                </p>

                <p>
                    📚 <strong>Semester:</strong>
                    ${item.semester}
                </p>

                <p>
                    📧 <strong>Email:</strong>
                    ${item.email}
                </p>

            `;

        }


        /* ===== FAQ CARD ===== */

        else if (currentType === "faqs") {

            card.classList.add("faqCard");


            card.innerHTML = `

                <h3 class="faqQuestion">
                    ${item.question}
                </h3>

                <p class="faqAnswer">
                    ${item.answer}
                </p>

            `;

        }


        dataContainer.appendChild(card);

    });


    updatePagination();

}


/* ================= SEARCH ================= */

function searchData() {

    let searchText =
        searchInput.value
            .toLowerCase()
            .trim();


    filteredData =
        currentData.filter(function(item) {

            if (currentType === "events") {

                return (
                    item.name
                        .toLowerCase()
                        .includes(searchText)
                    ||
                    item.category
                        .toLowerCase()
                        .includes(searchText)
                );

            }


            if (currentType === "students") {

                return (
                    item.name
                        .toLowerCase()
                        .includes(searchText)
                    ||
                    item.department
                        .toLowerCase()
                        .includes(searchText)
                    ||
                    item.email
                        .toLowerCase()
                        .includes(searchText)
                );

            }


            if (currentType === "faqs") {

                return (
                    item.question
                        .toLowerCase()
                        .includes(searchText)
                    ||
                    item.answer
                        .toLowerCase()
                        .includes(searchText)
                );

            }

        });


    currentPage = 1;

    applyFilter(false);

}


/* ================= FILTER ================= */

function applyFilter(resetPage = true) {

    let selectedFilter =
        filterSelect.value;


    let searchText =
        searchInput.value
            .toLowerCase()
            .trim();


    filteredData =
        currentData.filter(function(item) {

            let matchesSearch = true;

            let matchesFilter = true;


            /* Search */

            if (currentType === "events") {

                matchesSearch =
                    item.name
                        .toLowerCase()
                        .includes(searchText)
                    ||
                    item.category
                        .toLowerCase()
                        .includes(searchText);

            }


            else if (currentType === "students") {

                matchesSearch =
                    item.name
                        .toLowerCase()
                        .includes(searchText)
                    ||
                    item.department
                        .toLowerCase()
                        .includes(searchText)
                    ||
                    item.email
                        .toLowerCase()
                        .includes(searchText);

            }


            else if (currentType === "faqs") {

                matchesSearch =
                    item.question
                        .toLowerCase()
                        .includes(searchText)
                    ||
                    item.answer
                        .toLowerCase()
                        .includes(searchText);

            }


            /* Filter */

            if (selectedFilter !== "all") {

                if (currentType === "events") {

                    matchesFilter =
                        item.category ===
                        selectedFilter;

                }


                else if (currentType === "students") {

                    matchesFilter =
                        item.department ===
                        selectedFilter;

                }

            }


            return (
                matchesSearch &&
                matchesFilter
            );

        });


    if (resetPage) {

        currentPage = 1;

    }


    applySorting(false);

}


/* ================= SORT ================= */

function applySorting(resetPage = true) {

    let sortValue =
        sortSelect.value;


    if (sortValue === "nameAsc") {

        filteredData.sort(function(a, b) {

            return a.name.localeCompare(b.name);

        });

    }


    else if (sortValue === "nameDesc") {

        filteredData.sort(function(a, b) {

            return b.name.localeCompare(a.name);

        });

    }


    else if (sortValue === "dateAsc") {

        filteredData.sort(function(a, b) {

            return new Date(a.date)
                - new Date(b.date);

        });

    }


    else if (sortValue === "dateDesc") {

        filteredData.sort(function(a, b) {

            return new Date(b.date)
                - new Date(a.date);

        });

    }


    else if (sortValue === "semesterAsc") {

        filteredData.sort(function(a, b) {

            return a.semester -
                b.semester;

        });

    }


    else if (sortValue === "semesterDesc") {

        filteredData.sort(function(a, b) {

            return b.semester -
                a.semester;

        });

    }


    else if (sortValue === "questionAsc") {

        filteredData.sort(function(a, b) {

            return a.question
                .localeCompare(b.question);

        });

    }


    else if (sortValue === "questionDesc") {

        filteredData.sort(function(a, b) {

            return b.question
                .localeCompare(a.question);

        });

    }


    if (resetPage) {

        currentPage = 1;

    }


    displayData();

}


/* ================= PAGINATION ================= */

function updatePagination() {

    let totalPages =
        Math.ceil(
            filteredData.length /
            recordsPerPage
        );


    if (totalPages === 0) {

        totalPages = 1;

    }


    pageInfo.textContent =
        `Page ${currentPage} of ${totalPages}`;


    previousBtn.disabled =
        currentPage === 1;


    nextBtn.disabled =
        currentPage >= totalPages;

}


/* ================= PREVIOUS ================= */

previousBtn.addEventListener(
    "click",
    function() {

        if (currentPage > 1) {

            currentPage--;

            displayData();

        }

    }
);


/* ================= NEXT ================= */

nextBtn.addEventListener(
    "click",
    function() {

        let totalPages =
            Math.ceil(
                filteredData.length /
                recordsPerPage
            );


        if (currentPage < totalPages) {

            currentPage++;

            displayData();

        }

    }
);


/* ================= SEARCH EVENT ================= */

searchInput.addEventListener(
    "input",
    searchData
);


/* ================= FILTER EVENT ================= */

filterSelect.addEventListener(
    "change",
    function() {

        applyFilter(true);

    }
);


/* ================= SORT EVENT ================= */

sortSelect.addEventListener(
    "change",
    function() {

        applySorting(true);

    }
);


/* ================= TAB BUTTONS ================= */

tabButtons.forEach(function(button) {

    button.addEventListener(
        "click",
        function() {

            tabButtons.forEach(
                function(btn) {

                    btn.classList.remove(
                        "active"
                    );

                }
            );


            button.classList.add(
                "active"
            );


            let type =
                button.dataset.type;


            changeDataType(type);

        }
    );

});


/* ================= START ================= */

loadAllData();