// =====================================================
// SCHOLARBRIDGE - DIGITAL SCHOLARSHIP MANAGEMENT SYSTEM
// =====================================================


// =====================================================
// DATA
// =====================================================

const scholarships = [
    {
        id: "SCH001",
        name: "Merit Excellence Scholarship",
        provider: "National Education Foundation",
        amount: 50000,
        category: "merit",
        minCgpa: 8.0,
        maxIncome: 1000000,
        field: "all",
        deadline: "30 October 2026",
        description: "For academically strong undergraduate students."
    },

    {
        id: "SCH002",
        name: "Digital Education Scholarship",
        provider: "EduTech Foundation",
        amount: 30000,
        category: "technology",
        minCgpa: 7.0,
        maxIncome: 800000,
        field: "technology",
        deadline: "15 November 2026",
        description: "Supports students pursuing technology-related education."
    },

    {
        id: "SCH003",
        name: "Women in Technology Scholarship",
        provider: "Future Tech Foundation",
        amount: 40000,
        category: "technology",
        minCgpa: 7.5,
        maxIncome: 900000,
        field: "technology",
        deadline: "20 November 2026",
        description: "Encourages women pursuing technology and engineering."
    },

    {
        id: "SCH004",
        name: "Need-Based Education Grant",
        provider: "Education Support Trust",
        amount: 25000,
        category: "income",
        minCgpa: 6.0,
        maxIncome: 300000,
        field: "all",
        deadline: "10 December 2026",
        description: "Financial support for students from low-income families."
    },

    {
        id: "SCH005",
        name: "Future Engineers Scholarship",
        provider: "Innovation Foundation",
        amount: 60000,
        category: "merit",
        minCgpa: 8.5,
        maxIncome: 1200000,
        field: "engineering",
        deadline: "25 December 2026",
        description: "For high-performing engineering students."
    },

    {
        id: "SCH006",
        name: "Cyber Security Scholars Grant",
        provider: "CyberSafe Foundation",
        amount: 45000,
        category: "technology",
        minCgpa: 7.5,
        maxIncome: 700000,
        field: "cyber",
        deadline: "31 December 2026",
        description: "For students pursuing Cyber Security and related fields."
    }
];


// =====================================================
// INITIALIZATION
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    initializeStorage();

    displayScholarships();

    displayRecommendedScholarships();

    displayAdminScholarships();

});


// =====================================================
// LOCAL STORAGE
// =====================================================

function initializeStorage() {

    if (!localStorage.getItem("scholarbridge_users")) {

        localStorage.setItem(
            "scholarbridge_users",
            JSON.stringify([])
        );
    }


    if (!localStorage.getItem("scholarbridge_applications")) {

        localStorage.setItem(
            "scholarbridge_applications",
            JSON.stringify([])
        );
    }


    if (!localStorage.getItem("scholarbridge_scholarships")) {

        localStorage.setItem(
            "scholarbridge_scholarships",
            JSON.stringify(scholarships)
        );
    }
}


// =====================================================
// GET DATA
// =====================================================

function getUsers() {

    return JSON.parse(
        localStorage.getItem("scholarbridge_users")
    ) || [];
}


function getApplications() {

    return JSON.parse(
        localStorage.getItem("scholarbridge_applications")
    ) || [];
}


function saveUsers(users) {

    localStorage.setItem(
        "scholarbridge_users",
        JSON.stringify(users)
    );
}


function saveApplications(applications) {

    localStorage.setItem(
        "scholarbridge_applications",
        JSON.stringify(applications)
    );
}


function getScholarships() {

    return JSON.parse(
        localStorage.getItem("scholarbridge_scholarships")
    ) || scholarships;
}


// =====================================================
// AUTH TABS
// =====================================================

function showLogin() {

    document.getElementById("loginForm")
        .classList.remove("hidden");

    document.getElementById("registerForm")
        .classList.add("hidden");

    document.getElementById("loginTab")
        .classList.add("active");

    document.getElementById("registerTab")
        .classList.remove("active");
}


function showRegister() {

    document.getElementById("loginForm")
        .classList.add("hidden");

    document.getElementById("registerForm")
        .classList.remove("hidden");

    document.getElementById("loginTab")
        .classList.remove("active");

    document.getElementById("registerTab")
        .classList.add("active");
}


// =====================================================
// REGISTER
// =====================================================

function register() {

    const name =
        document.getElementById("registerName").value.trim();

    const email =
        document.getElementById("registerEmail").value.trim()
            .toLowerCase();

    const password =
        document.getElementById("registerPassword").value;

    const course =
        document.getElementById("registerCourse").value.trim();


    if (!name || !email || !password || !course) {

        alert("Please fill all fields.");

        return;
    }


    if (password.length < 6) {

        alert("Password must contain at least 6 characters.");

        return;
    }


    const users = getUsers();


    const existingUser =
        users.find(user => user.email === email);


    if (existingUser) {

        alert("An account with this email already exists.");

        return;
    }


    const studentId =
        "STU" +
        Date.now().toString().slice(-6);


    const newUser = {

        id: studentId,

        name: name,

        email: email,

        password: password,

        course: course

    };


    users.push(newUser);

    saveUsers(users);


    alert(
        "Registration successful! 🎉\n\n" +
        "Your Student ID is: " +
        studentId
    );


    document.getElementById("registerName").value = "";
    document.getElementById("registerEmail").value = "";
    document.getElementById("registerPassword").value = "";
    document.getElementById("registerCourse").value = "";


    showLogin();


    document.getElementById("loginEmail").value = email;
}


// =====================================================
// LOGIN
// =====================================================

function login() {

    const role =
        document.getElementById("loginRole").value;

    const email =
        document.getElementById("loginEmail").value.trim()
            .toLowerCase();

    const password =
        document.getElementById("loginPassword").value;


    if (!email || !password) {

        alert("Please enter email and password.");

        return;
    }


    // ADMIN LOGIN

    if (role === "admin") {

        if (
            email === "admin@scholarbridge.com" &&
            password === "admin123"
        ) {

            document.getElementById("authPage")
                .classList.add("hidden");

            document.getElementById("adminPortal")
                .classList.remove("hidden");

            updateAdminDashboard();

            return;

        } else {

            alert(
                "Invalid administrator credentials.\n\n" +
                "Demo:\n" +
                "admin@scholarbridge.com\n" +
                "admin123"
            );

            return;
        }
    }


    // STUDENT LOGIN

    const users = getUsers();


    const user =
        users.find(
            u =>
                u.email === email &&
                u.password === password
        );


    if (!user) {

        alert(
            "Invalid login details.\n\n" +
            "Please register first or check your credentials."
        );

        return;
    }


    localStorage.setItem(
        "scholarbridge_currentUser",
        user.id
    );


    document.getElementById("authPage")
        .classList.add("hidden");

    document.getElementById("studentPortal")
        .classList.remove("hidden");


    loadStudentData();

    showStudentPage(
        "studentDashboard",
        document.querySelector(".side-btn")
    );
}


// =====================================================
// LOGOUT
// =====================================================

function logout() {

    localStorage.removeItem(
        "scholarbridge_currentUser"
    );


    document.getElementById("studentPortal")
        .classList.add("hidden");

    document.getElementById("adminPortal")
        .classList.add("hidden");

    document.getElementById("authPage")
        .classList.remove("hidden");


    document.getElementById("loginEmail").value = "";

    document.getElementById("loginPassword").value = "";

    showLogin();
}


// =====================================================
// CURRENT USER
// =====================================================

function getCurrentUser() {

    const userId =
        localStorage.getItem(
            "scholarbridge_currentUser"
        );


    if (!userId) return null;


    const users = getUsers();


    return users.find(
        user => user.id === userId
    );
}


// =====================================================
// LOAD STUDENT DATA
// =====================================================

function loadStudentData() {

    const user = getCurrentUser();


    if (!user) return;


    document.getElementById("navStudentName")
        .innerText = user.name;


    document.getElementById("welcomeName")
        .innerText = user.name;


    document.getElementById("profileName")
        .innerText = user.name;


    document.getElementById("profileEmail")
        .innerText = user.email;


    document.getElementById("profileCourse")
        .innerText = user.course;


    document.getElementById("profileId")
        .innerText = user.id;


    updateStudentStats();

    displayRecommendedScholarships();

    displayMyApplications();
}


// =====================================================
// STUDENT NAVIGATION
// =====================================================

function showStudentPage(pageId, button) {

    const sections =
        document.querySelectorAll(".student-section");


    sections.forEach(section => {

        section.classList.add("hidden");

    });


    const selected =
        document.getElementById(pageId);


    if (selected) {

        selected.classList.remove("hidden");

    }


    const buttons =
        document.querySelectorAll(".side-btn");


    buttons.forEach(btn => {

        btn.classList.remove("active");

    });


    if (button) {

        button.classList.add("active");

    }


    if (pageId === "scholarshipPage") {

        displayScholarships();

    }


    if (pageId === "applicationPage") {

        displayMyApplications();

    }
}


// =====================================================
// SCHOLARSHIP DISPLAY
// =====================================================

function displayScholarships() {

    const container =
        document.getElementById("allScholarships");


    if (!container) return;


    const searchInput =
        document.getElementById("scholarshipSearch");


    const filterInput =
        document.getElementById("scholarshipFilter");


    const search =
        searchInput ?
        searchInput.value.toLowerCase() :
        "";


    const filter =
        filterInput ?
        filterInput.value :
        "all";


    let data = getScholarships();


    data = data.filter(scholarship => {

        const matchesSearch =
            scholarship.name
                .toLowerCase()
                .includes(search) ||
            scholarship.provider
                .toLowerCase()
                .includes(search);


        const matchesFilter =
            filter === "all" ||
            scholarship.category === filter;


        return matchesSearch && matchesFilter;

    });


    container.innerHTML = "";


    if (data.length === 0) {

        container.innerHTML =
            `<p>No scholarships found.</p>`;

        return;
    }


    data.forEach(scholarship => {

        container.innerHTML +=
            createScholarshipCard(scholarship);

    });
}


// =====================================================
// RECOMMENDED SCHOLARSHIPS
// =====================================================

function displayRecommendedScholarships() {

    const container =
        document.getElementById(
            "recommendedScholarships"
        );


    if (!container) return;


    const data =
        getScholarships().slice(0, 3);


    container.innerHTML = "";


    data.forEach(scholarship => {

        container.innerHTML +=
            createScholarshipCard(scholarship);

    });


    const count =
        document.getElementById("availableCount");


    if (count) {

        count.innerText =
            getScholarships().length;

    }
}


// =====================================================
// SCHOLARSHIP CARD
// =====================================================

function createScholarshipCard(scholarship) {

    return `

        <div class="scholarship-card">

            <span class="scholarship-badge">
                ${scholarship.category.toUpperCase()}
            </span>

            <h3>
                ${scholarship.name}
            </h3>

            <p>
                <strong>Provider:</strong>
                ${scholarship.provider}
            </p>

            <div class="scholarship-amount">
                ₹${scholarship.amount.toLocaleString()}
            </div>

            <p>
                <strong>Minimum CGPA:</strong>
                ${scholarship.minCgpa}
            </p>

            <p>
                <strong>Deadline:</strong>
                ${scholarship.deadline}
            </p>

            <p>
                ${scholarship.description}
            </p>

            <button
                class="apply-btn"
                onclick="openApplicationModal('${scholarship.id}')">
                Check Eligibility & Apply
            </button>

        </div>

    `;
}


// =====================================================
// APPLICATION MODAL
// =====================================================

let selectedScholarshipId = null;


function openApplicationModal(scholarshipId) {

    const user = getCurrentUser();


    if (!user) {

        alert("Please login first.");

        return;
    }


    const scholarship =
        getScholarships().find(
            s => s.id === scholarshipId
        );


    if (!scholarship) return;


    selectedScholarshipId =
        scholarshipId;


    document.getElementById(
        "modalScholarshipName"
    ).innerText =
        scholarship.name;


    document.getElementById(
        "appName"
    ).value =
        user.name;


    document.getElementById(
        "appEmail"
    ).value =
        user.email;


    document.getElementById(
        "applicationModal"
    ).classList.remove("hidden");
}


function closeModal() {

    document.getElementById(
        "applicationModal"
    ).classList.add("hidden");

    selectedScholarshipId = null;
}


// =====================================================
// SUBMIT APPLICATION
// =====================================================

function submitApplication() {

    const user = getCurrentUser();


    if (!user) {

        alert("Please login first.");

        return;
    }


    const cgpa =
        parseFloat(
            document.getElementById("appCgpa").value
        );


    const income =
        parseFloat(
            document.getElementById("appIncome").value
        );


    if (
        isNaN(cgpa) ||
        isNaN(income)
    ) {

        alert(
            "Please enter CGPA and annual family income."
        );

        return;
    }


    if (cgpa < 0 || cgpa > 10) {

        alert(
            "CGPA must be between 0 and 10."
        );

        return;
    }


    const scholarship =
        getScholarships().find(
            s => s.id === selectedScholarshipId
        );


    if (!scholarship) return;


    const applications =
        getApplications();


    const alreadyApplied =
        applications.some(
            app =>
                app.studentId === user.id &&
                app.scholarshipId === scholarship.id
        );


    if (alreadyApplied) {

        alert(
            "You have already applied for this scholarship."
        );

        return;
    }


    const applicationId =
        "APP-" +
        new Date().getFullYear() +
        "-" +
        Math.floor(
            1000 + Math.random() * 9000
        );


    const application = {

        id: applicationId,

        studentId: user.id,

        studentName: user.name,

        email: user.email,

        scholarshipId: scholarship.id,

        scholarshipName: scholarship.name,

        cgpa: cgpa,

        income: income,

        status: "Under Review",

        submittedDate:
            new Date().toLocaleDateString()

    };


    applications.push(application);

    saveApplications(applications);


    closeModal();


    document.getElementById("appCgpa").value = "";

    document.getElementById("appIncome").value = "";


    alert(
        "Application submitted successfully! 🎉\n\n" +
        "Application ID: " +
        applicationId +
        "\n\nStatus: Under Review"
    );


    updateStudentStats();

    displayMyApplications();
}


// =====================================================
// MY APPLICATIONS
// =====================================================

function displayMyApplications() {

    const container =
        document.getElementById("myApplications");


    if (!container) return;


    const user = getCurrentUser();


    if (!user) return;


    const applications =
        getApplications().filter(
            app => app.studentId === user.id
        );


    container.innerHTML = "";


    if (applications.length === 0) {

        container.innerHTML = `
            <div class="eligibility-result">
                <h3>No applications yet.</h3>
                <p>
                    Explore scholarships and submit your first application.
                </p>
            </div>
        `;

        return;
    }


    applications.forEach(app => {

        let statusClass =
            "status-pending";


        if (app.status === "Approved") {

            statusClass =
                "status-approved";

        }


        if (app.status === "Rejected") {

            statusClass =
                "status-rejected";

        }


        container.innerHTML += `

            <div class="application-item">

                <div>

                    <h3>
                        ${app.scholarshipName}
                    </h3>

                    <p>
                        Application ID:
                        <strong>${app.id}</strong>
                    </p>

                    <p>
                        Submitted:
                        ${app.submittedDate}
                    </p>

                    <p>
                        CGPA:
                        ${app.cgpa}
                    </p>

                </div>


                <div>

                    <span class="status ${statusClass}">
                        ${app.status}
                    </span>

                </div>

            </div>

        `;

    });
}


// =====================================================
// STUDENT STATS
// =====================================================

function updateStudentStats() {

    const user = getCurrentUser();


    if (!user) return;


    const applications =
        getApplications().filter(
            app => app.studentId === user.id
        );


    document.getElementById(
        "applicationCount"
    ).innerText =
        applications.length;


    document.getElementById(
        "reviewCount"
    ).innerText =
        applications.filter(
            app => app.status === "Under Review"
        ).length;


    document.getElementById(
        "approvedCount"
    ).innerText =
        applications.filter(
            app => app.status === "Approved"
        ).length;


    document.getElementById(
        "availableCount"
    ).innerText =
        getScholarships().length;
}


// =====================================================
// ELIGIBILITY CHECKER
// =====================================================

function checkEligibility() {

    const cgpa =
        parseFloat(
            document.getElementById(
                "eligibilityCgpa"
            ).value
        );


    const income =
        parseFloat(
            document.getElementById(
                "eligibilityIncome"
            ).value
        );


    const field =
        document.getElementById(
            "eligibilityField"
        ).value
        .toLowerCase();


    const result =
        document.getElementById(
            "eligibilityResults"
        );


    if (
        isNaN(cgpa) ||
        isNaN(income) ||
        !field
    ) {

        alert(
            "Please enter all eligibility details."
        );

        return;
    }


    const eligible =
        getScholarships().filter(scholarship => {

            const cgpaEligible =
                cgpa >= scholarship.minCgpa;


            const incomeEligible =
                income <= scholarship.maxIncome;


            let fieldEligible = true;


            if (scholarship.field !== "all") {

                if (
                    scholarship.field === "technology"
                ) {

                    fieldEligible =
                        field.includes("technology") ||
                        field.includes("computer") ||
                        field.includes("cyber") ||
                        field.includes("software") ||
                        field.includes("information");

                }


                if (
                    scholarship.field === "engineering"
                ) {

                    fieldEligible =
                        field.includes("engineering") ||
                        field.includes("b.tech");

                }


                if (
                    scholarship.field === "cyber"
                ) {

                    fieldEligible =
                        field.includes("cyber") ||
                        field.includes("security");

                }

            }


            return (
                cgpaEligible &&
                incomeEligible &&
                fieldEligible
            );

        });


    result.innerHTML = `

        <div class="eligibility-result eligible">

            <h3>
                🎉 ${eligible.length}
                Scholarship(s) Found!
            </h3>

            <p>
                Based on the information provided,
                you may be eligible for:
            </p>

        </div>

    `;


    eligible.forEach(scholarship => {

        result.innerHTML += `

            <div class="eligibility-result">

                <h3>
                    ${scholarship.name}
                </h3>

                <p>
                    Award:
                    <strong>
                        ₹${scholarship.amount.toLocaleString()}
                    </strong>
                </p>

                <p>
                    Deadline:
                    ${scholarship.deadline}
                </p>

                <button
                    class="apply-btn"
                    onclick="openApplicationModal('${scholarship.id}')">
                    Apply Now
                </button>

            </div>

        `;

    });


    if (eligible.length === 0) {

        result.innerHTML = `

            <div class="eligibility-result not-eligible">

                <h3>
                    No Matching Scholarships Found
                </h3>

                <p>
                    Try checking other scholarships
                    or review your eligibility details.
                </p>

            </div>

        `;

    }
}


// =====================================================
// ADMIN DASHBOARD
// =====================================================

function updateAdminDashboard() {

    const applications =
        getApplications();


    const users =
        getUsers();


    document.getElementById(
        "adminScholarshipCount"
    ).innerText =
        getScholarships().length;


    document.getElementById(
        "adminStudentCount"
    ).innerText =
        users.length;


    document.getElementById(
        "adminApplicationCount"
    ).innerText =
        applications.length;


    document.getElementById(
        "adminPendingCount"
    ).innerText =
        applications.filter(
            app => app.status === "Under Review"
        ).length;


    displayAdminApplications();

    displayAdminScholarships();
}


// =====================================================
// ADMIN APPLICATION TABLE
// =====================================================

function displayAdminApplications() {

    const table =
        document.getElementById(
            "adminApplicationsTable"
        );


    if (!table) return;


    const searchInput =
        document.getElementById(
            "adminSearch"
        );


    const search =
        searchInput ?
        searchInput.value.toLowerCase() :
        "";


    let applications =
        getApplications();


    applications =
        applications.filter(app =>

            app.id.toLowerCase().includes(search) ||

            app.studentName
                .toLowerCase()
                .includes(search) ||

            app.scholarshipName
                .toLowerCase()
                .includes(search)

        );


    table.innerHTML = "";


    if (applications.length === 0) {

        table.innerHTML = `

            <tr>

                <td colspan="6">
                    No applications found.
                </td>

            </tr>

        `;

        return;
    }


    applications.forEach(app => {

        let statusClass =
            "status-pending";


        if (app.status === "Approved") {

            statusClass =
                "status-approved";

        }


        if (app.status === "Rejected") {

            statusClass =
                "status-rejected";

        }


        let actions = "";


        if (app.status === "Under Review") {

            actions = `

                <button
                    class="action-btn approve-btn"
                    onclick="updateApplicationStatus('${app.id}', 'Approved')">
                    Approve
                </button>

                <button
                    class="action-btn reject-btn"
                    onclick="updateApplicationStatus('${app.id}', 'Rejected')">
                    Reject
                </button>

            `;

        } else {

            actions = `<span>Completed</span>`;

        }


        table.innerHTML += `

            <tr>

                <td>
                    ${app.id}
                </td>

                <td>
                    ${app.studentName}
                </td>

                <td>
                    ${app.scholarshipName}
                </td>

                <td>
                    ${app.cgpa}
                </td>

                <td>

                    <span class="status ${statusClass}">
                        ${app.status}
                    </span>

                </td>

                <td>
                    ${actions}
                </td>

            </tr>

        `;

    });
}


// =====================================================
// ADMIN UPDATE APPLICATION STATUS
// =====================================================

function updateApplicationStatus(
    applicationId,
    newStatus
) {

    const applications =
        getApplications();


    const application =
        applications.find(
            app => app.id === applicationId
        );


    if (!application) return;


    application.status =
        newStatus;


    saveApplications(applications);


    updateAdminDashboard();


    alert(
        "Application " +
        newStatus.toLowerCase() +
        " successfully."
    );
}


// =====================================================
// ADMIN SCHOLARSHIP DISPLAY
// =====================================================

function displayAdminScholarships() {

    const container =
        document.getElementById(
            "adminScholarships"
        );


    if (!container) return;


    container.innerHTML = "";


    getScholarships().forEach(scholarship => {

        container.innerHTML += `

            <div class="admin-scholarship-item">

                <h3>
                    ${scholarship.name}
                </h3>

                <p>
                    Provider:
                    ${scholarship.provider}
                </p>

                <p>
                    Amount:
                    ₹${scholarship.amount.toLocaleString()}
                </p>

                <p>
                    Deadline:
                    ${scholarship.deadline}
                </p>

            </div>

        `;

    });
}


// =====================================================
// ADD SCHOLARSHIP
// =====================================================

function showAddScholarship() {

    const name =
        prompt("Enter scholarship name:");

    if (!name) return;


    const provider =
        prompt("Enter scholarship provider:");

    if (!provider) return;


    const amount =
        parseInt(
            prompt("Enter scholarship amount:")
        );


    if (isNaN(amount)) {

        alert("Invalid amount.");

        return;
    }


    const newScholarship = {

        id:
            "SCH" +
            Date.now()
                .toString()
                .slice(-5),

        name: name,

        provider: provider,

        amount: amount,

        category: "merit",

        minCgpa: 6.0,

        maxIncome: 1000000,

        field: "all",

        deadline: "31 December 2026",

        description:
            "New scholarship opportunity."

    };


    const data =
        getScholarships();


    data.push(newScholarship);


    localStorage.setItem(
        "scholarbridge_scholarships",
        JSON.stringify(data)
    );


    displayAdminScholarships();

    displayScholarships();

    displayRecommendedScholarships();

    updateAdminDashboard();


    alert(
        "Scholarship added successfully."
    );
}