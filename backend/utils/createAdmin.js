const bcrypt = require("bcryptjs");
const { getDB } = require("../config/database");

const createAdmin = async () => {
  const db = getDB();

  const user = await db.get(
    "SELECT * FROM users WHERE email=?",
    "admin@gmail.com"
  );

  if (!user) {
    const hashedPassword = await bcrypt.hash("admin123", 10);
    await db.run(
      `INSERT INTO users(name,email,password,role) VALUES(?,?,?,?)`,
      ["Admin", "admin@gmail.com", hashedPassword, "admin"]
    );
    console.log("Default Admin Created (admin@gmail.com / admin123)");
  } else {
    console.log("Admin already exists");
  }

  // Seed sample rich content if table is empty
  const existingContent = await db.get("SELECT COUNT(*) as count FROM content");
  if (existingContent && existingContent.count === 0) {
    console.log("Seeding sample rich content...");

    const seedItems = [
      {
        page: "Home",
        section: "Welcome to RenewCred CMS",
        content: `
          <h1>Next-Generation CMS Architecture</h1>
          <p>Welcome to <strong>RenewCred Content Management System</strong>, designed for speed, flexibility, and dynamic content management across modern web applications.</p>
          <p>This CMS empowers administrators to deliver <em>rich, dynamic content</em> seamlessly without rebuilding or redeploying client-side applications.</p>
          <blockquote>"Empowering digital transformations through scalable, headless content architectures."</blockquote>
        `,
        status: "Published"
      },
      {
        page: "Home",
        section: "Platform Specifications & Metrics",
        content: `
          <h2>Technical Feature Matrix</h2>
          <p>Below is a structured overview of the system capability matrix:</p>
          <table>
            <thead>
              <tr>
                <th>Feature Module</th>
                <th>Technology Stack</th>
                <th>Status</th>
                <th>Response Time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Frontend SPA</td>
                <td>Next.js 16 (App Router) + Redux Toolkit</td>
                <td>Active</td>
                <td>&lt; 50ms</td>
              </tr>
              <tr>
                <td>Backend API</td>
                <td>Express.js + SQLite Database</td>
                <td>Active</td>
                <td>&lt; 20ms</td>
              </tr>
              <tr>
                <td>Rich Content Engine</td>
                <td>Tiptap + KaTeX Rendering</td>
                <td>Active</td>
                <td>Realtime</td>
              </tr>
            </tbody>
          </table>
          
          <h3>Supported Content Capabilities:</h3>
          <ul>
            <li>Nested lists and hierarchical documentation structures:
              <ul>
                <li>Level 1: Core Architectural Specs</li>
                <li>Level 2: Data Models & Schema Design
                  <ul>
                    <li>Level 3: SQLite relational constraints</li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>Mathematical equations and LaTeX rendering</li>
            <li>Media uploads & asset library</li>
          </ul>
        `,
        status: "Published"
      },
      {
        page: "Home",
        section: "Scientific & Mathematical Models",
        content: `
          <h2>Mathematical & Formula Expressions</h2>
          <p>The platform supports rendering complex mathematical expressions using KaTeX integration:</p>
          <p>Einstein's Mass-Energy Equivalence relation: $E = mc^2$</p>
          <p>Quadratic formula solution equation: $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$</p>
          <p>Normal Gaussian Distribution Probability Density Function:</p>
          <p>$$f(x) = \\frac{1}{\\sigma \\sqrt{2\\pi}} e^{-\\frac{1}{2}\\left(\\frac{x-\\mu}{\\sigma}\\right)^2}$$</p>
        `,
        status: "Published"
      },
      {
        page: "About",
        section: "About RenewCred CMS",
        content: `
          <h1>About Our CMS Platform</h1>
          <p>RenewCred CMS provides an enterprise-ready administrative suite for managing website copy, documentation, media assets, and structural layouts.</p>
          <h2>Core Principles</h2>
          <ol>
            <li><strong>Decoupled Architecture:</strong> Strict separation of concerns between API service and presentation layer.</li>
            <li><strong>Rich Content Expressiveness:</strong> Full support for mixed content types, tabular data, and mathematical formulas.</li>
            <li><strong>Admin Productivity:</strong> Streamlined user experience with state management via Redux Toolkit.</li>
          </ol>
        `,
        status: "Published"
      }
    ];

    for (const item of seedItems) {
      await db.run(
        "INSERT INTO content(page, section, content, image, status) VALUES(?,?,?,?,?)",
        [item.page, item.section, item.content, null, item.status]
      );
    }
    console.log("Sample rich content seeded successfully.");
  }
};

module.exports = createAdmin;