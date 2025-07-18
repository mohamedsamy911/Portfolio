# **Mohamed Samy's Portfolio**  

## **🚀 Overview**  
This is my personal portfolio website built with **React**, **TypeScript**, and **Tailwind CSS**, featuring smooth animations with **Framer Motion** and a 3D interactive experience using **Three.js**. The portfolio showcases my skills, projects, and contact information in a visually appealing and responsive design.  

## **✨ Features**  
✅ **Dark/Light Mode Toggle** – Switch between themes seamlessly  
✅ **3D Animated Background** – Floating particles with smooth transitions  
✅ **Typing Effect** – Dynamic subtitles with auto-typing and deletion  
✅ **Responsive Design** – Works on all screen sizes (mobile, tablet, desktop)  
✅ **Smooth Scrolling** – Navigation between sections with animations  
✅ **Interactive UI** – Hover effects, loading states, and motion transitions  

## **🛠 Tech Stack**  
- **Frontend**: React, TypeScript, Tailwind CSS  
- **Animations**: Framer Motion  
- **3D Elements**: Three.js, @react-three/fiber  
- **Form Handling**: EmailJS (for contact form)  
- **Deployment**: Vercel / Netlify  

## **📂 Project Structure**  
```bash
src/
├── components/          # Reusable UI components
│   ├── HeroSection.tsx  # Landing section with animations
│   ├── Navbar.tsx       # Responsive navigation bar
│   ├── AboutSection.tsx # Skills & bio section
│   ├── ProjectsSection.tsx # Project showcase
│   ├── ContactSection.tsx  # Contact form
│   └── ThemeToggle.tsx  # Dark/light mode switch
├── context/             # Theme context provider
├── assets/              # Images, icons, 3D models
├── App.tsx              # Main app component
└── index.tsx            # Entry point
```

## **🚀 Installation & Setup**  
1. **Clone the repository**  
   ```bash
   git clone https://github.com/mohamedsamy911/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**  
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables** (for EmailJS)  
   Create a `.env.local` file:  
   ```env
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
   ```

4. **Run the development server**  
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open in browser**  
   Visit `http://localhost:3000`  

## **🔧 Customization**  
- **Change content**: Modify text in `AboutSection`, `ProjectsSection`, etc.  
- **Add projects**: Update the `projects` array in `ProjectsSection.tsx`  
- **Update theme colors**: Edit `tailwind.config.js`  
- **Replace 3D model**: Add your own GLTF model in `/public`  

## **🌐 Deployment**  
Deploy on **Vercel**, **Netlify**, or any static host:  
```bash
npm run build && npm run start
```

## **📜 License**  
MIT License – Free to use and modify.  

---

### **📬 Contact**  
📧 **Email**: [mohamedadel74@gmail.com](mailto:mohamedadel74@gmail.com)  
🔗 **LinkedIn**: [Mohamed Samy](https://www.linkedin.com/in/mohamed-samy-ba0107141/)  
💻 **GitHub**: [mohamedsamy911](https://github.com/mohamedsamy911)  

---