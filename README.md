# 📚 BookVerse

**BookVerse** is a full‑stack MERN (MongoDB • Express • React • Node.js) social‑reading platform that lets book lovers track their reading journey, organise books into custom shelves, write reviews, and connect with fellow readers. It combines a personal reading journal, rich social features, and a clean analytics dashboard in one responsive web app. 

---

## ✨ Key Features
| Area | Highlights |
|------|------------|
| **Book Management** | Google Books search, one‑click add, “Want to Read / Currently Reading / Read” shelves, star‑rating & reviews. |
| **Social Hub** | Follow / unfollow users, view public shelves & an activity feed of friends’ latest reads. |
| **Reading Journal** | Private rich‑text notes per book to capture thoughts while reading. :contentReference |
| **Analytics** | Simple dashboards (books read, genre pie‑chart, yearly goal progress) built with Chart.js.  |
| **Secure Auth** | JWT‑based login / register, hashed passwords with bcrypt.  |

---

## 🛠 Tech Stack
- **Frontend:** React + TypeScript, Tailwind CSS, React Router
- **Backend:** Node.js, Express, JWT, bcrypt
- **Database:** MongoDB Atlas + Mongoose
- **External API:** Google Books
- **Charts:** Chart.js

---

## 🚀 Quick Start

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
