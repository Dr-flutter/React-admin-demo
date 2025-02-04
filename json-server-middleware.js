import fs from "fs";
import path from "path";

// Main middleware to handle API requests
const middleware = (req, res, next) => {
  // CORS headers configuration to allow cross-origin access
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Origin", "*");

  // Handle OPTIONS preflight requests
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
    return;
  }

  // Normalize path and extract resources
  const pathSegments = req.path.split("/").filter(Boolean);
  const resources = pathSegments[0];
  const id = pathSegments[1];

  // Check if database file exists
  const dbPath = path.resolve("./db.json");
  if (!fs.existsSync(dbPath)) {
    return res.status(500).json({ error: "Database file not found" });
  }

  let dbData;
  try {
    dbData = JSON.parse(fs.readFileSync(dbPath));
  } catch (error) {
    return res.status(500).json({ error: "Error parsing database" });
  }

  // Check if resource exists in database
  if (!dbData[resources]) {
    return res.status(404).json({ error: `Resource '${resources}' does not exist` });
  }

  if (req.method === "GET") {
    console.log({ Query: req.query });

    let data = dbData[resources];

    // Search/Filter logic remains the same as previous version
    let searchTerm = null;
    if (req.query.filter) {
      try {
        const filter = JSON.parse(req.query.filter);
        if (filter.status) {
          data = data.filter(item => item.status === filter.status);
        }
        if (filter.q) {
          searchTerm = filter.q.toLowerCase();
        }
      } catch (error) {
        console.error("Filter parsing error:", error);
      }
    } else if (req.query.q) {
      searchTerm = req.query.q.toLowerCase();
    }

    if (searchTerm) {
      if (resources === 'posts') {
        data = data.filter(post => {
          const author = dbData.users.find(user => String(user.id) === String(post.authorId));
          return author && author.name.toLowerCase().includes(searchTerm);
        });
      } else {
        data = data.filter((item) =>
          Object.values(item).some((val) =>
            String(val).toLowerCase().includes(searchTerm)
          )
        );
      }
    }

    // If specific ID requested
    if (id) {
      const item = data.find((item) => String(item.id) === id);
      return item 
        ? res.json(item) 
        : res.status(404).json({ error: `Item with id ${id} not found` });
    }

    let start = 0, end = data.length;

    if (req.query.range) {
      try {
        const range = JSON.parse(req.query.range);
        start = parseInt(range[0], 10);
        end = parseInt(range[1], 10) + 1;
      } catch (error) {
        console.error("Range parsing error:", error);
      }
    } else if (req.query.page && req.query.perPage) {
      const perPage = parseInt(req.query.perPage, 10) || 10;
      const page = parseInt(req.query.page, 10) || 1;
      start = (page - 1) * perPage;
      end = start + perPage;
    } else {
      start = parseInt(req.query._start, 10) || 0;
      end = parseInt(req.query._end, 10) || data.length;
    }

    const paginatedData = data.slice(start, end);

    // Pagination headers
    res.setHeader("Content-Range", `${resources} ${start}-${end - 1}/${data.length}`);
    res.setHeader("X-Total-Count", data.length);
    res.header("Access-Control-Expose-Headers", "Content-Range, X-Total-Count");

    return res.json(paginatedData);
  }

  // PUT and DELETE methods remain similar to previous version
  if (req.method === "PUT" && id) {
    const index = dbData[resources].findIndex((item) => String(item.id) === id);
    
    if (index !== -1) {
      dbData[resources][index] = { ...dbData[resources][index], ...req.body };
      fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));
      return res.json(dbData[resources][index]);
    }
    
    return res.status(404).json({ error: "Resource not found" });
  }

  if (req.method === "DELETE" && id) {
    const initialLength = dbData[resources].length;
    dbData[resources] = dbData[resources].filter((item) => String(item.id) !== id);
    
    if (dbData[resources].length < initialLength) {
      fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));
      return res.status(200).json({ message: "Resource deleted" });
    }
    
    return res.status(404).json({ error: "Resource not found" });
  }

  next();
};

export default middleware;