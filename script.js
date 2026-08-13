const jobs = [

    {
        id:1,
        title:"Java Full Stack Developer",
        company:"Tech Solutions",
        location:"Remote",
        type:"Full Time",
        salary:"₹4 - ₹7 LPA"
    },

    {
        id:2,
        title:"Frontend Developer",
        company:"WebWorks",
        location:"Indore",
        type:"Full Time",
        salary:"₹3 - ₹6 LPA"
    },

    {
        id:3,
        title:"Java Developer Intern",
        company:"CodeTech",
        location:"Bhopal",
        type:"Internship",
        salary:"₹10K - ₹15K / month"
    },

    {
        id:4,
        title:"UI/UX Designer",
        company:"Creative Studio",
        location:"Delhi",
        type:"Full Time",
        salary:"₹4 - ₹8 LPA"
    },

    {
        id:5,
        title:"Web Developer",
        company:"Digital Labs",
        location:"Remote",
        type:"Part Time",
        salary:"₹20K - ₹30K / month"
    },

    {
        id:6,
        title:"JavaScript Developer",
        company:"SoftTech",
        location:"Indore",
        type:"Full Time",
        salary:"₹5 - ₹8 LPA"
    }

];


const jobContainer = document.getElementById("jobContainer");
const jobCount = document.getElementById("jobCount");
const savedJobsContainer = document.getElementById("savedJobs");


let savedJobs =
    JSON.parse(localStorage.getItem("savedJobs")) || [];


// Display Jobs

function displayJobs(jobList){

    jobContainer.innerHTML = "";

    jobCount.textContent =
        `${jobList.length} Jobs Found`;


    if(jobList.length === 0){

        jobContainer.innerHTML =
            "<p>No jobs found 😢</p>";

        return;
    }


    jobList.forEach(job => {

        const isSaved = savedJobs.includes(job.id);

        const card = document.createElement("div");

        card.className = "job-card";

        card.innerHTML = `

            <h3>${job.title}</h3>

            <p class="company">
                ${job.company}
            </p>

            <div class="details">

                <span class="tag">
                    📍 ${job.location}
                </span>

                <span class="tag">
                    💼 ${job.type}
                </span>

                <span class="tag">
                    💰 ${job.salary}
                </span>

            </div>

            <div class="job-buttons">

                <button
                    class="apply-btn"
                    onclick="applyJob('${job.title}')">
                    Apply Now
                </button>

                <button
                    class="save-btn ${isSaved ? "saved" : ""}"
                    onclick="saveJob(${job.id})">

                    ${isSaved ? "★ Saved" : "☆ Save"}

                </button>

            </div>

        `;

        jobContainer.appendChild(card);

    });

}


// Search & Filter

function filterJobs(){

    const search =
        document.getElementById("searchInput")
        .value
        .toLowerCase();

    const location =
        document.getElementById("locationFilter")
        .value;

    const type =
        document.getElementById("typeFilter")
        .value;


    const filteredJobs = jobs.filter(job => {

        const matchesSearch =
            job.title.toLowerCase().includes(search) ||
            job.company.toLowerCase().includes(search);

        const matchesLocation =
            location === "all" ||
            job.location === location;

        const matchesType =
            type === "all" ||
            job.type === type;


        return (
            matchesSearch &&
            matchesLocation &&
            matchesType
        );

    });


    displayJobs(filteredJobs);

}


// Save Job

function saveJob(id){

    if(savedJobs.includes(id)){

        savedJobs =
            savedJobs.filter(jobId => jobId !== id);

    }
    else{

        savedJobs.push(id);

    }


    localStorage.setItem(
        "savedJobs",
        JSON.stringify(savedJobs)
    );


    displayJobs(jobs);

    displaySavedJobs();

}


// Display Saved Jobs

function displaySavedJobs(){

    savedJobsContainer.innerHTML = "";


    if(savedJobs.length === 0){

        savedJobsContainer.innerHTML =
            "<p>No saved jobs yet.</p>";

        return;
    }


    savedJobs.forEach(id => {

        const job =
            jobs.find(job => job.id === id);


        const div =
            document.createElement("div");

        div.className = "saved-job";

        div.innerHTML = `

            <div>
                <strong>${job.title}</strong>
                <p>${job.company} • ${job.location}</p>
            </div>

            <button
                class="remove-btn"
                onclick="saveJob(${job.id})">
                Remove
            </button>

        `;

        savedJobsContainer.appendChild(div);

    });

}


// Apply Button

function applyJob(title){

    alert(
        `Application started for ${title}!`
    );

}


// Initial Display

displayJobs(jobs);

displaySavedJobs();