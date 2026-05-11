// Job API Integration
const JOBS_API_URL = 'https://jsearch.p.rapidapi.com/search';
const API_KEY = '0b89d38d2emshfd9e32c93b9cb30p1d8fc9jsn24ac83a382bd';

// Sample job data for demonstration
const sampleJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechCorp",
    location: "Remote",
    type: "Full Time",
    experience: "Mid Level",
    salary: "$70,000 - $90,000",
    description: "Build amazing user interfaces with React and modern web technologies. Join our innovative team and create impactful digital experiences.",
    skills: ["React", "JavaScript", "CSS", "HTML", "TypeScript"],
    postedDate: "2025-01-15",
    isRemote: true
  },
  {
    id: 2,
    title: "Data Science Intern",
    company: "DataCo",
    location: "Chennai",
    type: "Internship",
    experience: "Entry Level",
    salary: "$2,000 - $3,000/month",
    description: "Work with machine learning models and data analysis. Perfect opportunity for students to gain hands-on experience in data science.",
    skills: ["Python", "Machine Learning", "Pandas", "NumPy", "SQL"],
    postedDate: "2025-01-14",
    isRemote: false
  },
  {
    id: 3,
    title: "Full Stack Developer",
    company: "InnovateTech",
    location: "Bangalore",
    type: "Full Time",
    experience: "Mid Level",
    salary: "$80,000 - $110,000",
    description: "Develop end-to-end web applications using modern technologies. Work on exciting projects with cutting-edge tech stack.",
    skills: ["Node.js", "React", "MongoDB", "Express", "AWS"],
    postedDate: "2025-01-13",
    isRemote: false
  },
  {
    id: 4,
    title: "AI/ML Engineer",
    company: "AI Solutions",
    location: "Hyderabad",
    type: "Full Time",
    experience: "Senior Level",
    salary: "$120,000 - $150,000",
    description: "Lead AI/ML projects and develop intelligent systems. Work with state-of-the-art machine learning algorithms.",
    skills: ["Python", "TensorFlow", "PyTorch", "AWS", "Docker"],
    postedDate: "2025-01-12",
    isRemote: true
  },
  {
    id: 5,
    title: "Cybersecurity Analyst",
    company: "SecureCorp",
    location: "Mumbai",
    type: "Full Time",
    experience: "Entry Level",
    salary: "$60,000 - $80,000",
    description: "Protect our systems and data from cyber threats. Learn and grow in the fast-evolving cybersecurity field.",
    skills: ["Network Security", "Ethical Hacking", "SIEM", "Python", "Linux"],
    postedDate: "2025-01-11",
    isRemote: false
  },
  {
    id: 6,
    title: "Blockchain Developer",
    company: "CryptoChain",
    location: "Remote",
    type: "Contract",
    experience: "Mid Level",
    salary: "$90,000 - $120,000",
    description: "Develop decentralized applications and smart contracts. Be part of the blockchain revolution.",
    skills: ["Solidity", "Web3.js", "Ethereum", "React", "Node.js"],
    postedDate: "2025-01-10",
    isRemote: true
  }
];

let savedJobs = JSON.parse(localStorage.getItem('savedJobs')) || [];
let currentFilter = 'all';

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
  displayJobs(sampleJobs);
  updateJobStats(sampleJobs);
  displaySavedJobs();
  
  // Search functionality
  document.getElementById('searchJobs').addEventListener('click', performSearch);
  document.getElementById('jobQuery').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') performSearch();
  });
  
  // Filter functionality
  document.getElementById('locationFilter').addEventListener('change', applyFilters);
  document.getElementById('typeFilter').addEventListener('change', applyFilters);
  document.getElementById('experienceFilter').addEventListener('change', applyFilters);
  
  // Tab functionality
  document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', function() {
      document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      currentFilter = this.dataset.tab;
      applyFilters();
    });
  });
});

async function fetchJobsFromAPI() {
  const query = document.getElementById('jobQuery').value;
  const location = document.getElementById('locationFilter').value;
  const type = document.getElementById('typeFilter').value;
  
  showLoading(true);
  
  try {
    const searchQuery = `${query} ${location} ${type}`.trim();
    const response = await fetch(
      `${JOBS_API_URL}?query=${encodeURIComponent(searchQuery)}&page=1&num_pages=1`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key": API_KEY,
          "x-rapidapi-host": "jsearch.p.rapidapi.com"
        }
      }
    );

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    const apiJobs = data.data ? data.data.slice(0, 10).map(job => ({
      id: Math.random().toString(36).substr(2, 9),
      title: job.job_title || 'Job Title',
      company: job.employer_name || 'Company',
      location: job.job_city || 'Location Not Specified',
      type: job.job_employment_type || 'Full Time',
      experience: 'Not Specified',
      salary: job.job_salary || 'Salary Not Disclosed',
      description: job.job_description || 'Job description not available.',
      skills: job.job_required_skills || ['Skills not specified'],
      postedDate: job.job_posted_at_datetime_utc ? job.job_posted_at_datetime_utc.split('T')[0] : '2025-01-15',
      isRemote: job.job_is_remote || false,
      applyUrl: job.job_apply_link
    })) : [];

    // Combine API jobs with sample jobs
    const allJobs = [...sampleJobs, ...apiJobs];
    displayJobs(allJobs);
    updateJobStats(allJobs);
    
  } catch (error) {
    console.error('Error fetching jobs from API:', error);
    // Fallback to sample data
    displayJobs(sampleJobs);
    updateJobStats(sampleJobs);
  } finally {
    showLoading(false);
  }
}

function performSearch() {
  const query = document.getElementById('jobQuery').value.toLowerCase();
  
  if (query.trim()) {
    fetchJobsFromAPI();
  } else {
    applyFilters();
  }
}

function applyFilters() {
  const location = document.getElementById('locationFilter').value;
  const type = document.getElementById('typeFilter').value;
  const experience = document.getElementById('experienceFilter').value;
  
  let filteredJobs = sampleJobs.filter(job => {
    const locationMatch = !location || job.location === location;
    const typeMatch = !type || job.type === type;
    const experienceMatch = !experience || job.experience === experience;
    
    // Apply tab filter
    let tabMatch = true;
    if (currentFilter === 'internships') tabMatch = job.type === 'Internship';
    else if (currentFilter === 'fulltime') tabMatch = job.type === 'Full Time';
    else if (currentFilter === 'remote') tabMatch = job.isRemote === true;
    
    return locationMatch && typeMatch && experienceMatch && tabMatch;
  });
  
  displayJobs(filteredJobs);
  updateJobStats(filteredJobs);
}

function displayJobs(jobs) {
  const container = document.getElementById('jobsContainer');
  container.innerHTML = '';
  
  if (jobs.length === 0) {
    container.innerHTML = `
      <div class="no-jobs" style="text-align: center; padding: 60px; color: #666;">
        <i class="fas fa-search" style="font-size: 3rem; color: #ddd; margin-bottom: 20px;"></i>
        <h3>No jobs found</h3>
        <p>Try adjusting your search criteria or filters</p>
      </div>
    `;
    return;
  }
  
  jobs.forEach(job => {
    const jobCard = document.createElement('div');
    jobCard.className = 'job-card';
    jobCard.innerHTML = `
      <h3>${job.title}</h3>
      <div class="company">${job.company}</div>
      <div class="location">
        <i class="fas fa-map-marker-alt"></i> ${job.location}
        ${job.isRemote ? '<span class="remote-badge" style="background: #4CAF50; color: white; padding: 2px 8px; border-radius: 10px; font-size: 0.8rem; margin-left: 8px;">Remote</span>' : ''}
      </div>
      <div class="type">${job.type}</div>
      <div class="salary">
        <i class="fas fa-dollar-sign"></i> ${job.salary}
      </div>
      <div class="experience">
        <i class="fas fa-user"></i> ${job.experience}
      </div>
      <div class="description">${job.description}</div>
      <div class="skills">
        ${job.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
      </div>
      <div class="posted-date">
        <i class="fas fa-clock"></i> Posted ${getDaysAgo(job.postedDate)} days ago
      </div>
      <div class="actions">
        <button class="apply-btn" onclick="applyJob(${job.id}, '${job.title}', '${job.company}', '${job.applyUrl || ''}')">
          <i class="fas fa-paper-plane"></i> Apply Now
        </button>
        <button class="save-btn" onclick="saveJob(${job.id})">
          <i class="fas fa-bookmark"></i> Save
        </button>
      </div>
    `;
    container.appendChild(jobCard);
  });
}

function updateJobStats(jobs) {
  const totalJobs = jobs.length;
  const internships = jobs.filter(job => job.type === 'Internship').length;
  const companies = [...new Set(jobs.map(job => job.company))].length;
  const locations = [...new Set(jobs.map(job => job.location))].length;
  
  document.getElementById('totalJobs').textContent = totalJobs;
  document.getElementById('internships').textContent = internships;
  document.getElementById('companies').textContent = companies;
  document.getElementById('locations').textContent = locations;
}

function displaySavedJobs() {
  const container = document.getElementById('savedJobsContainer');
  
  if (savedJobs.length === 0) {
    container.innerHTML = `
      <div class="no-saved-jobs">
        <i class="fas fa-bookmark"></i>
        <h3>No saved jobs yet</h3>
        <p>Start exploring and save jobs that interest you</p>
      </div>
    `;
    return;
  }
  
  const savedJobsData = sampleJobs.filter(job => savedJobs.includes(job.id));
  displayJobs(savedJobsData);
}

function applyJob(jobId, title, company, applyUrl) {
  if (applyUrl) {
    window.open(applyUrl, '_blank');
  } else {
    alert(`🎉 Applying for ${title} at ${company}!\n\nThis would normally redirect to the company's application portal.`);
  }
}

function saveJob(jobId) {
  if (savedJobs.includes(jobId)) {
    savedJobs = savedJobs.filter(id => id !== jobId);
    alert('Job removed from saved list');
  } else {
    savedJobs.push(jobId);
    alert('Job saved successfully!');
  }
  
  localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
  displaySavedJobs();
}

function getDaysAgo(dateString) {
  const date = new Date(dateString);
  const today = new Date();
  const diffTime = Math.abs(today - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

function showLoading(show) {
  const spinner = document.getElementById('loadingSpinner');
  const container = document.getElementById('jobsContainer');
  
  if (show) {
    spinner.style.display = 'block';
    container.style.opacity = '0.5';
  } else {
    spinner.style.display = 'none';
    container.style.opacity = '1';
  }
}
