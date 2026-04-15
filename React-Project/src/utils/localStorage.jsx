const employees = [
  {
    id: 1,
    email: "employee1@example.com",
    password: "123",
    tasks: [
      {
        title: "Fix login bug",
        description: "Resolve login API error",
        date: "2026-04-10",
        category: "Development",
        active: true,
        newTask: true,
        completed: false,
        failed: false
      },
      {
        title: "Update UI",
        description: "Improve dashboard design",
        date: "2026-04-11",
        category: "Frontend",
        active: false,
        newTask: false,
        completed: true,
        failed: false
      },
      {
        title: "Write tests",
        description: "Add unit tests for auth",
        date: "2026-04-12",
        category: "Testing",
        active: false,
        newTask: false,
        completed: false,
        failed: true
      }
    ]
  },
  {
    id: 2,
    email: "employee2@example.com",
    password: "123",
    tasks: [
      {
        title: "Create API",
        description: "Build user API",
        date: "2026-04-09",
        category: "Backend",
        active: true,
        newTask: true,
        completed: false,
        failed: false
      },
      {
        title: "Fix CSS",
        description: "Resolve responsive issues",
        date: "2026-04-10",
        category: "Frontend",
        active: false,
        newTask: false,
        completed: true,
        failed: false
      },
      {
        title: "Debug error",
        description: "Fix server crash",
        date: "2026-04-11",
        category: "Backend",
        active: false,
        newTask: false,
        completed: false,
        failed: true
      }
    ]
  },
  {
    id: 3,
    email: "employee3@example.com",
    password: "123",
    tasks: [
      {
        title: "Design homepage",
        description: "Create landing page UI",
        date: "2026-04-08",
        category: "Design",
        active: true,
        newTask: true,
        completed: false,
        failed: false
      },
      {
        title: "Optimize images",
        description: "Reduce image size",
        date: "2026-04-09",
        category: "Performance",
        active: false,
        newTask: false,
        completed: true,
        failed: false
      },
      {
        title: "Fix animation",
        description: "Correct animation lag",
        date: "2026-04-10",
        category: "Frontend",
        active: false,
        newTask: false,
        completed: false,
        failed: true
      }
    ]
  },
  {
    id: 4,
    email: "employee4@example.com",
    password: "123",
    tasks: [
      {
        title: "Database setup",
        description: "Configure MongoDB",
        date: "2026-04-07",
        category: "Database",
        active: true,
        newTask: true,
        completed: false,
        failed: false
      },
      {
        title: "API integration",
        description: "Connect frontend to backend",
        date: "2026-04-08",
        category: "Integration",
        active: false,
        newTask: false,
        completed: true,
        failed: false
      },
      {
        title: "Fix query bug",
        description: "Resolve slow query",
        date: "2026-04-09",
        category: "Database",
        active: false,
        newTask: false,
        completed: false,
        failed: true
      }
    ]
  },
  {
    id: 5,
    email: "employee5@example.com",
    password: "123",
    tasks: [
      {
        title: "Deploy app",
        description: "Deploy to production",
        date: "2026-04-06",
        category: "DevOps",
        active: true,
        newTask: true,
        completed: false,
        failed: false
      },
      {
        title: "Monitor logs",
        description: "Check server logs",
        date: "2026-04-07",
        category: "DevOps",
        active: false,
        newTask: false,
        completed: true,
        failed: false
      },
      {
        title: "Fix downtime",
        description: "Resolve server downtime",
        date: "2026-04-08",
        category: "Maintenance",
        active: false,
        newTask: false,
        completed: false,
        failed: true
      }
    ]
  }
];

const admin = [
  {
    id: 1,
    email: "admin@example.com",
    password: "123"
  }
];


export const setLocalStorage = () => {
    localStorage.setItem("employees", JSON.stringify(employees));
    localStorage.setItem("admin", JSON.stringify(admin));
}

export const getLocalStorage = () => {
    const employees = JSON.parse(localStorage.getItem("employees"));
    const admin = JSON.parse(localStorage.getItem("admin"));

    return(employees,admin);  
}