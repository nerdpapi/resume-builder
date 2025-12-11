# 📝 Resume Builder – Capstone Project

**Live Likn:** https://resume-builder-41af.onrender.com/ <br>
A fully responsive, template-based **Resume Builder** built using **React** and **Material UI**, with **Redux** for global state management, **React Hook Form** for form handling and validation, **React Router** for navigation, and **jsPDF** for exporting resumes as PDF.

This project is part of the Full Stack Web Development Capstone, integrating concepts from multiple modules into a real-world, production-style application.

---

## 📚 Table of Contents

- [Overview](#-overview)
- [Key Objectives](#-key-objectives)
- [Features](#-features)
- [Tech Stack & Libraries](#-tech-stack--libraries)
- [Project Structure](#-project-structure)
- [Pages & Flow](#-pages--flow)
- [State Management (Redux)](#-state-management-redux)
- [Forms & Validation](#-forms--validation)
- [PDF Export (jsPDF)](#-pdf-export-jspdf)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [Unit Testing](#-unit-testing)
- [Future Enhancements](#-future-enhancements)
- [License](#-license)

---

## 🔍 Overview

The **Resume Builder Capstone Project** is designed to consolidate all the core concepts learned in the Full Stack Web Development program. It simulates a real-world scenario where users can:

- Choose from pre-defined resume templates  
- Fill in their personal, professional, and educational details  
- Preview the final resume  
- Download the resume as a **PDF**

The project promotes:

- Hands-on experience with **React ecosystem**  
- **Team collaboration** (if built in a group)  
- A **holistic understanding** of frontend architecture, state management, form handling, routing, and testing.

---

## 🎯 Key Objectives

1. **Team Collaboration (if done in group)**  
   - Work in a team of up to **3 members**  
   - Share responsibilities while understanding the **entire project flow**  
   - Learn from peers’ strengths, approaches, and problem-solving styles  

2. **Hands-on Work Experience**  
   - Apply concepts from **React, Redux, forms, routing, UI libraries, and testing**  
   - Build a project that closely resembles a real-world application  

3. **Holistic Understanding**  
   - Integrate multiple topics into a single codebase  
   - Improve understanding of **UI, UX, logic, data flow, and validations**  
   - Gain confidence to work on production-style applications

---

## ✨ Features

- 📄 **Home Page** with:
  - Header (Logo + Navigation Links)
  - Intro section explaining the product
  - Grid of **pre-defined resume templates**
  - Hover effect on templates showing **“Use Template”** button

- 🧾 **Details Filling Page** with:
  - Tabbed layout on the left/right (depending on design)
  - Sections:
    - Personal Info
    - Work Experience
    - Education
    - Key Skills
  - **Back** and **Next** buttons in each section
  - **Form validation** for all fields

- 👀 **Preview Page**:
  - Displays the selected template with filled details (live preview)
  - Input for **Resume Name**
  - **Back** button (go back to Key Skills section)
  - **Save / Download** button to generate **PDF** using jsPDF

- 📥 **Download Success Modal**:
  - Shown after successful PDF download
  - Displays success message and next steps

- ℹ️ **About Us Page**:
  - Information about the website / team / capstone project
  - Simple, clean layout with content

- ✅ **Unit Tests** using **React Testing Library**

---

## 🧰 Tech Stack & Libraries

- **Core**
  - React
  - JavaScript / TypeScript (choose as per implementation)

- **UI & Layout**
  - [Material UI (MUI)](https://mui.com/material-ui/getting-started/overview/)  
    - Pre-built responsive components (Grid, Buttons, TextFields, Cards, AppBar, etc.)
  - [Material UI Icons](https://mui.com/material-ui/material-icons/)

- **State Management**
  - Redux / Redux Toolkit (for template & resume data)

- **Forms & Validation**
  - [React Hook Form](https://react-hook-form.com/)

- **Routing**
  - React Router

- **PDF Generation**
  - jsPDF

- **Testing**
  - Jest
  - React Testing Library

---
