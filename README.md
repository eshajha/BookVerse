# 📚 BookVerse

**BookVerse** is a personal reading management application where users can search books, organize them into shelves like 'Want to Read', 'Currently Reading', and 'Read', and maintain their reading progress in a clean interface.
 

---

##  Screenshots
![Dashboard](./assets/dashboard.png)
![Library](./assets/library.png)

---


##  Key Features
- Search millions of books via Google Books API with instant results and book details
- Organize books into Want to Read, Currently Reading, and Read shelves with one-click management
- Add star ratings (1-5) and write personal reviews to capture your reading thoughts
- Track statistics including total books, books read, and recent activity
- Literary-inspired interface with elegant typography, smooth animations, and responsive layout
- JWT-based authentication with encrypted passwords for private, secure libraries

---

## Tech Stack
- **Frontend:** React + TypeScript, Tailwind CSS, React Router
- **Backend:** Node.js, Express, JWT, bcrypt
- **Database:** MongoDB + Mongoose
- **External API:** Google Books API
- **Charts:** Chart.js

---

##  Quick Start

```bash
# 1 Clone & install
git clone https://github.com/<your‑user>/bookverse.git
cd bookverse
npm install           # backend
cd frontend
npm install           # frontend

# 2 Environment variables
#   create .env in /server
MONGO_URI=your mongo uri
JWT_SECRET=yourSecretKey

# 3 Run dev servers (concurrently)
#   in /server
npm run dev
#   in /frontend
npm start
