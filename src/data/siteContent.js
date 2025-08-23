// src/data/siteContent.js
// Edit this file only to update About, Experience, Skills, Projects, Education

export const about = {
  name: 'Prashasti Kapoor',
  avatar: '/pp.jpg', // put image in /public/
  tagline: '“Engineering Excellence Through Testing.”',
  description: 'Quality Assurance Engineer | Cypress | Appium | Selenium | Postman | SDLC',
  links: {
    linkedin: 'https://www.linkedin.com/in/prashasti-kapoor-672713276',
    email: 'prashastikapoor2301@gmail.com',
    github: 'https://github.com/prashasti-kapoor',
    resume: ''
  }
};

export const experience = [
  {
    title: "Associate Quality Assurance Engineer",
    company: "Jio Platform Limited",
    logo: "/jio-logo.jpg",
    duration: "December 2023 – Present",
    location: "Navi Mumbai, India",
    points: [
      "Acted as QA Lead for the Jio Gate Enterprise project, owning test strategy, automation, and performance validation.",
      "Coordinated with cross-functional teams (developers, product managers, stakeholders) to ensure defect-free, on-time releases.",
      "Developed and maintained automation test scripts for Web (Selenium, TestNG, Maven), API (Postman, Karate), and Mobile (Appium).",
      "Conducted performance testing with k6, ensuring system scalability and reliability under load.",
      "Reduced testing cycle time by 60% through effective test case prioritization and automation.",
      "Mentored junior QA team members and improved automation frameworks to enhance testing efficiency.",
      "Achieved 95% test automation coverage across multiple applications.",
    ],
    projects: [
      {
        title: "Jio Gate Enterprise",
        subtitle: "Lead QA Role",
        description: "Led test strategy, automation efforts, and quality delivery for an enterprise access control platform. Developed and maintained automation test scripts for Web (Selenium, TestNG, Maven) and API (Postman, Karate). Conducted performance testing with k6 and delivered multiple high-quality releases with minimal production defects.",
        tags: ["#AutomationTesting", "#PerformanceTesting", "#Agile", "#TestStrategy"],
        color: "text-blue-400",
      },
      {
        title: "Jio Gate",
        subtitle: "Functional, Regression, and Load Testing",
        description: "Conducted functional, regression, and load testing. Designed and implemented robust automation frameworks using Selenium and Appium for web and mobile applications. Automated API testing with Karate and performed performance testing using k6.",
        tags: ["#Selenium", "#Appium", "#Karate", "#k6", "#AgileScrum"],
        color: "text-green-400",
      },
      {
        title: "Jio Studios RMS",
        subtitle: "API and Functional Testing",
        description: "Developed and executed API tests using Karate to validate backend functionality. Designed and executed 500+ manual test cases and maintained automation test scripts using Cypress for web applications. Collaborated with development and product teams to prioritize defects and streamline issue resolution.",
        tags: ["#APITesting", "#Cypress", "#Karate", "#ManualTesting", "#DefectManagement"],
        color: "text-purple-400",
      },
    ],
  },
  {
    title: "Graduate Engineer Trainee (Bond Team)",
    company: "Reliance Jio Infocomm Limited",
    logo: "/jio-logo.jpg",
    duration: "Dec 2022 – Feb 2023",
    location: "Navi Mumbai, India",
    points: [
      "Performed sanity testing across multiple Jio applications including MyJio, Jio.com, Jio Translate, and Jio Finance, ensuring critical functionalities were stable before releases.",
      "Validated builds by executing smoke/sanity test cases, identifying blockers early in the release cycle.",
      "Collaborated with developers and senior QA engineers to log, track, and resolve defects efficiently.",
    ],
    projects: [], // No specific projects listed for this role
  },
];

export const skills = [
  {
    title: "Testing Methodologies",
    items: [
      "Functional Testing",
      "Regression Testing",
      "End-to-End Testing",
      "API Testing",
      "Automation Testing",
      "Performance Testing",
    ],
    icon: "/skills/pro_lang.svg",
  },
  {
    title: "Testing Tools & Frameworks",
    items: ["Selenium", "Appium", "Karate", "Cypress", "Postman", "TestNG", "JUnit"],
    icon: "/skills/pbi.svg",
  },
  {
    title: "Performance/Load Testing",
    items: ["K6"],
    icon: "/skills/cloud.png",
  },
  {
    title: "Test Management",
    items: ["Test Case Design & Execution", "Defect Tracking", "Test Reporting"],
    icon: "/skills/ds.png",
  },
  {
    title: "Test Reporting & Analytics",
    items: ["Report Portal", "Allure Reporting"],
    icon: "/skills/dp.png",
  },
  {
    title: "Defect Tracking & Management",
    items: ["Jira", "Azure DevOps"],
    icon: "/skills/db.png",
  },
  {
    title: "Programming & Scripting",
    items: ["Java", "JavaScript"],
    icon: "/skills/colab.svg",
  },
  {
    title: "CI/CD & Version Control",
    items: ["JIRA", "Azure DevOps", "GitHub"],
    icon: "/skills/ss.png",
  },
  {
    title: "Agile Practices",
    items: [
      "Sprint Planning",
      "Daily Standups",
      "Retrospectives",
      "Cross-functional Collaboration",
      "Backlog Grooming",
    ],
    icon: "/skills/agile.png",
  },
];

export const projects = [
  
  {
    title: "Drakora Couture (Freelance)",
    image: "/dc-logo.jpg",
    subtitle: "QA Manager",
    description: "Developed and executed test plans and test cases for a freelance project. Utilized automation tools like Cypress to enhance test efficiency and coverage. Identified and tracked defects using Jira and Azure DevOps, collaborating closely with development teams for prompt resolution.",
    tags: ["#Freelance", "#Cypress", "#Jira", "#AzureDevOps", "#TestManagement"],
    color: "text-red-500",
  },
];

export const education = [
  {
    degree: "Bachelor of Computer Science and Engineering",
    school: "Gyan Ganga College of Technology",
    year: "July 2019 – May 2023",
    logo: "/ggct.jpeg",
    gpa: "8.3 CGPA",
    photo: "/gp.jpg",
    details: [
      "Graduated with Honors’",
    ],
  },
];