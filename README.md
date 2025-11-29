<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JeQa Powe | Quantitative Analyst</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <style>
        /* CSS Variables */
        :root {
            --accent-1: #667eea;
            --accent-2: #764ba2;
            --nav-bg: rgba(10, 14, 39, 0.95);
        }

        /* General Styles */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%);
            color: #e2e8f0;
            line-height: 1.6;
            overflow-x: hidden;
            transition: background 1s ease, color 1s ease;
            cursor: auto; /* Default, overridden by JS */
        }
        
        /* Scroll Progress Bar */
        #scroll-progress {
            position: fixed;
            top: 0;
            left: 0;
            width: 5px;
            height: 0%;
            background: linear-gradient(180deg, var(--accent-1) 0%, var(--accent-2) 100%);
            z-index: 1001;
            transition: height 0.1s ease-out;
        }
        
        /* Network Background Canvas */
        #network-canvas {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 0;
            opacity: 0.15;
        }
        
        /* Main Container */
        .container {
            position: relative;
            z-index: 1;
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 2rem;
        }
        
        /* Navigation (Left Sidebar - Fixed for Desktop & Mobile per Req #4) */
        nav {
            position: fixed;
            left: 0;
            top: 0;
            height: 100vh;
            width: 200px;
            background: var(--nav-bg);
            backdrop-filter: blur(10px);
            padding: 2rem 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            border-right: 1px solid rgba(102, 126, 234, 0.2);
            z-index: 100;
            transition: width 0.3s ease, background 0.5s ease;
        }
        
        .logo {
            font-size: 1.5rem;
            font-weight: 700;
            background: linear-gradient(135deg, var(--accent-1) 0%, var(--accent-2) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 2rem;
        }
        
        .nav-links {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            list-style: none;
            width: 100%;
            align-items: center;
        }
        
        .nav-links a {
            color: #a0aec0;
            text-decoration: none;
            transition: color 0.3s ease;
            font-weight: 500;
            font-size: 1.1rem;
            padding: 0.5rem 1rem;
            width: 90%;
            text-align: center;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: flex-start; /* Changed for consistent alignment */
            gap: 15px;
        }

        .nav-links a:hover {
            color: #fff;
            background: rgba(102, 126, 234, 0.2);
        }
        
        .nav-links li {
            display: flex;
            align-items: center;
            width: 100%;
            justify-content: center;
        }
        
        /* Nav Icons */
        .nav-icon {
            font-size: 1.3em; 
        }

        /* Adjust content for left nav */
        .hero, .content-section, footer, #about {
            margin-left: 200px;
        }
        
        .theme-controls-container {
            width: 100%; 
            display: flex; 
            flex-direction: column; 
            align-items: center; 
            margin-top: auto;
            margin-bottom: 2rem;
        }
        
        /* Mobile-Specific Styles (Req #4: Keep Left Nav) */
        @media (max-width: 968px) {
            nav {
                width: 70px; /* Narrow width for icons only */
                padding: 1rem 0;
            }
            
            .logo {
                display: none; /* Hide logo on mobile */
            }
            
            .nav-text {
                display: none; /* Hide text, show only icons */
            }
            
            .nav-links {
                gap: 2rem;
            }

            .nav-links a {
                justify-content: center;
                padding: 0.5rem;
            }
            
            .theme-selector label {
                display: none;
            }
            
            .theme-selector select {
                width: 50px;
                padding: 0.2rem;
                font-size: 0.8rem;
            }

            /* Adjust content margins for narrow nav */
            .hero, .content-section, footer, #about {
                margin-left: 70px;
            }
            
            .container {
                padding: 0 1rem;
            }
            
            .hero h1 {
                font-size: 2rem !important;
            }
        }

        /* Ensure viewport is properly configured */
        @media (max-width: 480px) {
            body {
                font-size: 14px;
            }
            
            .hero h1 {
                font-size: 1.75rem !important;
            }
        }
        
        /* Theme Selector */
        .theme-selector {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            padding: 1rem;
            width: 90%;
            justify-content: center;
            background: rgba(10, 14, 39, 0.5);
            border-radius: 12px;
            margin-bottom: 1rem;
            align-items: center;
        }

        /* Hero Section */
        .hero {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 4rem 2rem;
        }
        
        .hero h1 {
            font-size: clamp(3rem, 8vw, 5rem);
            font-weight: 800;
            margin-bottom: 1rem;
            background: linear-gradient(135deg, var(--accent-1) 0%, var(--accent-2) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: fadeInUp 1s ease;
        }
        
        .hero-subtitle {
            font-size: clamp(1.2rem, 3vw, 1.8rem);
            color: #a0aec0;
            margin-bottom: 2rem;
            animation: fadeInUp 1s ease 0.2s both;
        }
        
        .rotating-stats {
            height: 3rem;
            margin-bottom: 3rem;
            position: relative;
            width: 100%;
            max-width: 800px;
        }
        
        .stat-item {
            position: absolute;
            width: 100%;
            text-align: center;
            font-size: 1.2rem;
            color: #e2e8f0;
            opacity: 0;
            transition: opacity 0.5s ease;
        }
        
        .stat-item.active {
            opacity: 1;
        }
        
        .stat-number {
            color: var(--accent-1);
            font-weight: 700;
            font-size: 1.5rem;
        }
        
        /* Path Selection Buttons */
        .path-selection {
            display: flex;
            gap: 2rem;
            flex-wrap: wrap;
            justify-content: center;
            animation: fadeInUp 1s ease 0.4s both;
            margin-bottom: 4rem;
        }
        
        .path-btn {
            padding: 1.5rem 3rem;
            font-size: 1.2rem;
            border: 2px solid transparent;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.3s ease;
            background: rgba(255, 255, 255, 0.05);
            color: #fff;
            backdrop-filter: blur(10px);
            font-weight: 600;
            position: relative;
            overflow: hidden;
        }
        
        .path-btn::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(102, 126, 234, 0.3);
            transform: translate(-50%, -50%);
            transition: width 0.6s ease, height 0.6s ease;
        }
        
        .path-btn:hover::before {
            width: 300px;
            height: 300px;
        }
        
        .path-btn span {
            position: relative;
            z-index: 1;
        }
        
        .path-btn:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
        }
        
        .path-btn.academic:hover {
            border-color: var(--accent-1);
        }
        
        .path-btn.professional:hover {
            border-color: #f56565;
        }
        
        /* Content Section */
        .content-section, #about {
            min-height: 100vh;
            padding: 4rem 0;
        }
        
        .section-title {
            font-size: 2.5rem;
            font-weight: 700;
            text-align: center;
            margin-bottom: 3rem;
            background: linear-gradient(135deg, var(--accent-1) 0%, var(--accent-2) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        /* Tab System */
        .tab-container {
            margin-bottom: 3rem;
        }
        
        .tab-nav {
            display: flex;
            gap: 1rem;
            border-bottom: 2px solid rgba(102, 126, 234, 0.2);
            margin-bottom: 2rem;
            flex-wrap: wrap;
            justify-content: center;
        }
        
        .tab-btn {
            background: none;
            border: none;
            color: #a0aec0;
            padding: 1rem 2rem;
            cursor: pointer;
            font-size: 1.1rem;
            font-weight: 600;
            position: relative;
            transition: color 0.3s ease;
        }
        
        .tab-btn::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 0;
            height: 2px;
            background: linear-gradient(135deg, var(--accent-1) 0%, var(--accent-2) 100%);
            transition: width 0.3s ease;
        }
        
        .tab-btn:hover {
            color: var(--accent-1);
        }
        
        .tab-btn.active {
            color: var(--accent-1);
        }
        
        .tab-btn.active::after {
            width: 100%;
        }
        
        .tab-content {
            display: none;
            animation: fadeIn 0.5s ease;
        }
        
        .tab-content.active {
            display: block;
        }
        
        /* Project Grid */
        .project-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 2rem;
            margin-top: 2rem;
        }
        
        .project-card {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 12px;
            overflow: hidden;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(102, 126, 234, 0.1);
            cursor: pointer;
        }
        
        .project-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(102, 126, 234, 0.2);
            border-color: rgba(102, 126, 234, 0.4);
        }
        
        .project-image {
            width: 100%;
            height: 250px;
            object-fit: cover;
            transition: transform 0.3s ease;
        }
        
        .project-card:hover .project-image {
            transform: scale(1.05);
        }
        
        .project-info {
            padding: 1.5rem;
        }
        
        .project-title {
            font-size: 1.4rem;
            font-weight: 700;
            color: #fff;
            margin-bottom: 0.5rem;
        }
        
        .project-description {
            color: #a0aec0;
            margin-bottom: 1rem;
            line-height: 1.6;
        }
        
        .tech-tags {
            display: flex;
            gap: 0.5rem;
            flex-wrap: wrap;
            margin-bottom: 1rem;
        }
        
        .tech-tag {
            background: rgba(102, 126, 234, 0.2);
            color: var(--accent-1);
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 600;
        }
        
        .project-links {
            display: flex;
            gap: 1rem;
        }
        
        .project-link {
            color: var(--accent-1);
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        
        .project-link:hover {
            color: #5a67d8;
            text-decoration: underline;
        }
        
        /* Skills Section */
        .skills-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-top: 2rem;
        }
        
        .skill-category {
            background: rgba(255, 255, 255, 0.05);
            padding: 2rem;
            border-radius: 12px;
            border: 1px solid rgba(102, 126, 234, 0.1);
            transition: all 0.3s ease;
        }
        
        .skill-category:hover {
            border-color: rgba(102, 126, 234, 0.4);
            transform: translateY(-5px);
        }
        
        .skill-category h3 {
            color: var(--accent-1);
            margin-bottom: 1.5rem;
            font-size: 1.3rem;
        }
        
        .skill-list {
            list-style: none;
            padding-left: 0;
            color: #cbd5e0;
        }
        
        .skill-list li {
            margin-bottom: 0.75rem;
            font-size: 1rem;
        }
        
        /* About Section (Home) */
        .about-content {
            display: grid;
            grid-template-columns: 1fr;
            gap: 3rem;
            align-items: center;
            max-width: 900px;
            margin: 0 auto;
        }
        
        .about-text {
            font-size: 1.1rem;
            line-height: 1.8;
            color: #cbd5e0;
            text-align: left;
        }
        
        .about-text p {
            margin-bottom: 1rem;
        }
        
        .about-stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 1rem;
            margin-top: 2rem;
        }
        
        .stat-box {
            text-align: center;
            padding: 1.5rem;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 12px;
            border: 1px solid rgba(102, 126, 234, 0.1);
            overflow: hidden;
        }
        
        .stat-box-number {
            font-size: 2.5rem;
            font-weight: 700;
            color: var(--accent-1);
            margin-bottom: 0.5rem;
            transition: opacity 0.3s ease-out, transform 0.3s ease-out;
            display: inline-block;
        }
        
        .stat-box-label {
            color: #a0aec0;
            font-size: 0.9rem;
            transition: opacity 0.3s ease-out, transform 0.3s ease-out;
            display: block;
        }

        .stat-box .is-fading {
            opacity: 0;
            transform: translateY(-10px);
        }
        
        /* Contact Section & Split Forms (M-GIMMY-007 Req #7) */
        #contact {
            display: none;
        }

        .contact-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
            margin-top: 2rem;
        }

        @media (max-width: 968px) {
            .contact-grid {
                grid-template-columns: 1fr;
            }
        }
        
        .contact-form-container {
            background: rgba(255, 255, 255, 0.05);
            padding: 2rem;
            border-radius: 12px;
            border: 1px solid rgba(102, 126, 234, 0.1);
        }
        
        .form-group {
            margin-bottom: 1.5rem;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            color: #a0aec0;
            font-weight: 500;
        }
        
        .form-group input,
        .form-group select,
        .form-group textarea {
            width: 100%;
            padding: 0.75rem 1rem;
            background: rgba(0, 0, 0, 0.2);
            border: 1px solid rgba(102, 126, 234, 0.2);
            border-radius: 8px;
            color: #e2e8f0;
            font-family: inherit;
            font-size: 1rem;
            transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: var(--accent-1);
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.3);
        }
        
        /* Site Feedback Specifics */
        .star-rating {
            display: flex;
            justify-content: center;
            gap: 0.5rem;
            margin: 1rem 0;
        }
        
        .star {
            font-size: 2.5rem;
            cursor: pointer;
            color: #4a5568;
            transition: color 0.2s, transform 0.2s;
        }
        
        .star:hover, .star.selected {
            color: #fbbf24;
            transform: scale(1.1);
        }
        
        .checkbox-group {
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
            margin-top: 0.5rem;
        }
        
        .checkbox-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: #a0aec0;
        }
        
        .btn-primary {
            padding: 0.75rem 2rem;
            border-radius: 8px;
            text-decoration: none;
            transition: all 0.3s ease;
            background: var(--accent-1);
            color: white;
            font-weight: 600;
            border: none;
            cursor: pointer;
            width: 100%;
        }
        
        .btn-primary:hover {
            background: #5a67d8;
        }
        
        /* Meme Container */
        #feedback-meme {
            display: none;
            text-align: center;
            margin-top: 1rem;
            animation: fadeInUp 0.5s ease;
        }
        
        #feedback-meme img {
            width: 100%;
            border-radius: 8px;
            border: 2px solid #fbbf24;
        }
        
        /* Availability Box */
        .availability-status {
            background: rgba(102, 126, 234, 0.1);
            border: 2px solid var(--accent-1);
            border-radius: 12px;
            padding: 2rem;
            margin-top: 2rem;
        }
        
        .status-indicator {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1rem;
        }
        
        .status-dot {
            width: 12px;
            height: 12px;
            background: #48bb78;
            border-radius: 50%;
            animation: pulse 2s infinite;
        }
        
        .status-text {
            font-size: 1.2rem;
            font-weight: 700;
            color: #48bb78;
        }
        
        /* Career Timeline (Academic) */
        .timeline-container {
            position: relative;
            padding: 2rem 0;
            margin: 3rem 0;
            max-width: 900px;
            margin: 0 auto;
        }
        
        .timeline-line {
            position: absolute;
            left: 50%;
            top: 0;
            bottom: 0;
            width: 2px;
            background: linear-gradient(180deg, var(--accent-1) 0%, var(--accent-2) 100%);
            transform: translateX(-50%);
        }
        
        /* Node Timeline (M-039) */
        .timeline-node {
            transition: all 0.5s ease;
        }
        
        .node-circle {
            background: linear-gradient(135deg, var(--accent-1), var(--accent-2)); 
        }

        /* Back to Top Button */
        .back-to-top {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            background: linear-gradient(135deg, var(--accent-1) 0%, var(--accent-2) 100%);
            color: white;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: none;
            cursor: pointer;
            font-size: 1.5rem;
            opacity: 0;
            transform: scale(0);
            transition: all 0.3s ease;
            z-index: 99;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }
        
        .back-to-top.visible {
            opacity: 1;
            transform: scale(1);
        }
        
        .back-to-top:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
        }
        
        /* Footer */
        footer {
            text-align: center;
            padding: 3rem 0;
            border-top: 1px solid rgba(102, 126, 234, 0.2);
            margin-top: 4rem;
        }
        
        footer p {
            color: #a0aec0;
            margin-bottom: 1rem;
        }
        
        .social-links {
            display: flex;
            justify-content: center;
            gap: 2rem;
            margin-top: 1rem;
        }
        
        .social-link {
            color: var(--accent-1);
            font-size: 1.5rem;
            transition: all 0.3s ease;
        }
        
        .social-link:hover {
            color: #5a67d8;
            transform: translateY(-3px);
        }
        
        /* Modal Styles */
        .demo-modal {
            display: none;
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            backdrop-filter: blur(5px);
        }
        
        .demo-modal.active {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .modal-content {
            background: #1a202c;
            padding: 2rem;
            border-radius: 12px;
            width: 90%;
            max-width: 1200px;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
        }
        
        .close-modal {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: none;
            border: none;
            color: #fff;
            font-size: 2rem;
            cursor: pointer;
            z-index: 1001;
        }
        
        .modal-footer {
            display: flex;
            gap: 1rem;
            margin-top: 1.5rem;
            justify-content: center;
        }
        
        .btn-secondary {
            padding: 0.75rem 2rem;
            border-radius: 8px;
            text-decoration: none;
            transition: all 0.3s ease;
            background: rgba(255, 255, 255, 0.1);
            color: white;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        /* Animations */
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(1.1); }
        }
        
        @keyframes pulse-node {
            0%, 100% { box-shadow: 0 0 0 0 rgba(102, 126, 234, 0.7); }
            50% { box-shadow: 0 0 0 20px rgba(102, 126, 234, 0); }
        }
        
        /* --- LIGHT THEME --- */
        body.light-theme {
            background: linear-gradient(135deg, #f0f4f8 0%, #e2e8f0 100%);
            color: #1a202c;
            transition: all 1s ease;
        }
        
        body.light-theme nav {
            background: rgba(255, 255, 255, 0.95);
            border-color: rgba(102, 126, 234, 0.3);
        }
        
        body.light-theme .nav-links a { color: #2d3748; }
        body.light-theme .nav-links a:hover {
            color: var(--accent-1);
            background: rgba(102, 126, 234, 0.1);
        }
        
        body.light-theme .hero-subtitle,
        body.light-theme .project-description,
        body.light-theme .about-text p,
        body.light-theme .skill-list,
        body.light-theme .contact-details,
        body.light-theme .node-label p,
        body.light-theme .form-group label { 
            color: #2d3748;
        }
        
        body.light-theme .project-card,
        body.light-theme .skill-category,
        body.light-theme .stat-box,
        body.light-theme .contact-form-container,
        body.light-theme .node-label {
            background: #ffffff;
            border: 1px solid rgba(102, 126, 234, 0.2);
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        }

        body.light-theme .project-title,
        body.light-theme .skill-name,
        body.light-theme .node-label strong {
            color: #1a202c;
        }
        
        body.light-theme .form-group input,
        body.light-theme .form-group select,
        body.light-theme .form-group textarea {
            background: #f8fafc;
            color: #2d3748;
            border-color: rgba(102, 126, 234, 0.3);
        }

        body.light-theme .theme-selector {
            background: #fff;
        }
    </style>
</head>
<body>
    <div id="scroll-progress"></div>
    
    <canvas id="network-canvas"></canvas>
    <audio id="secret-sound" src="https://www.myinstants.com/media/sounds/zelda-secret-sound.mp3" preload="auto"></audio>
    
    <nav>
        <div class="logo">JeQa Powe</div>
        <ul class="nav-links">
            <li><a href="#home" onclick="showHome(event)"><i class="fas fa-home nav-icon"></i><span class="nav-text">Home</span></a></li>
            <li><a href="#content-area" data-trigger="academic"><i class="fas fa-graduation-cap nav-icon"></i><span class="nav-text">Academic</span></a></li>
            <li><a href="#content-area" data-trigger="professional"><i class="fas fa-briefcase nav-icon"></i><span class="nav-text">Professional</span></a></li>
            <li><a href="#about" onclick="showAbout(event)"><i class="fas fa-user nav-icon"></i><span class="nav-text">About</span></a></li>
            <li><a href="#" onclick="showContact(event)"><i class="fas fa-crow nav-icon"></i><span class="nav-text">Contact</span></a></li>
        </ul>
        
        <div class="theme-controls-container">
            <div class="theme-selector">
                <label for="theme-dropdown" style="color: #a0aec0; margin-right: 1rem; font-weight: 600;">Theme:</label>
                <select id="theme-dropdown" onchange="setTheme(this.value)" style="background: rgba(10, 14, 39, 0.95); border: 1px solid rgba(102, 126, 234, 0.5); border-radius: 8px; color: #e2e8f0; padding: 0.5rem 1rem; font-size: 1rem; cursor: pointer;">
                    <option value="network">NET</option>
                    <option value="okc-thunder">OKC</option>
                    <option value="pittsburgh-dark">PIT</option>
                    <option value="detroit-light">DET</option>
                    <option value="anime-space">ANM</option>
                </select>
            </div>
        </div>
    </nav>
    
    <section class="hero" id="home">
        <div class="container">
            <h1>JeQa Powe</h1>
            <p class="hero-subtitle">Quantitative Analyst | Operations Research | ML/AI & Geospatial Intelligence</p>
            
            <div class="rotating-stats">
                <div class="stat-item active">
                    <span class="stat-number">5+</span> years building ML pipelines for operational targeting
                </div>
                <div class="stat-item">
                    <span class="stat-number">40%</span> improvement in network mapping accuracy
                </div>
                <div class="stat-item">
                    <span class="stat-number">$2M+</span> cost savings identified through predictive analytics
                </div>
                <div class="stat-item">
                    TS/SCI cleared • <span class="stat-number">Transferable through 2027</span>
                </div>
            </div>
            
            <div class="about-content" style="max-width: 800px; margin: 0 auto 3rem auto;">
                <div class="about-text" style="text-align: center; border: 1px solid rgba(102, 126, 234, 0.2); padding: 1.5rem; border-radius: 12px; background: rgba(255, 255, 255, 0.05);">
                    <h2 class="section-title" style="font-size: 2rem; margin-top: 0; margin-bottom: 1rem;">Professional Summary</h2>
                    <p style="color: #cbd5e0; margin-bottom: 1rem;">
                        TS/SCI-cleared Quantitative Analyst with 5+ years of experience blending operations research, economics, and machine learning to solve complex intelligence problems. Proven ability to deliver actionable insights, identifying over $2M in cost savings and improving network analysis accuracy by 40%.
                    </p>
                </div>
            </div>

            <div class="path-selection">
                <button class="path-btn academic" onclick="loadContent('academic')">
                    <span>🎓 Academic</span>
                </button>
                <button class="path-btn professional" onclick="loadContent('professional')">
                    <span>💼 Professional</span>
                </button>
            </div>
        </div>
    </section>

    <section class="content-section" id="about" style="display: none;">
        <div class="container">
            <div class="about-content">
                <h2 class="section-title" style="color: var(--accent-1); margin-bottom: 2rem;">Background</h2>
                
                <div class="about-intro" style="font-size: 1.2rem; line-height: 1.8; color: #e2e8f0; margin-bottom: 3rem; max-width: 900px; margin: 0 auto 3rem auto;">
                    <p style="margin-bottom: 1rem;">
                        Growing up in the midwest, I believe the value of hard work and community service. 
                        I enjoy reading and new experiences, basketball, and walks with my dog in down time.
                        At Penn State Beaver, I walked onto a basketball team and was elected student government President at Penn State Beaver (CCSG). 
                        I enjoyed my Summer as a colporteur in Wisconsin, mentoring kids at Big Bend Boys & Girls Club, and refereeing youth basketball. I've served my country and now I serve communities through research and small business.
                    </p>
                    <p style="margin-bottom: 1rem;">
                        Today I use economics and data to understand why food deserts persist, why housing discrimination still shapes cities, and how we build wealth pipelines for Black communities. The work is technical, but the goal is simple: create opportunity where it's been denied. That's it.
                    </p>
                </div>
                
                <div class="quick-facts" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-bottom: 3rem; max-width: 900px; margin: 0 auto 3rem auto;">
                    <div class="fact-card" style="background: rgba(255, 255, 255, 0.05); padding: 1.5rem; border-radius: 12px; border: 1px solid rgba(102, 126, 234, 0.2);">
                        <div style="font-size: 2rem; margin-bottom: 0.5rem;">🎖️</div>
                        <h3 style="color: var(--accent-1); margin-bottom: 0.5rem;">Service</h3>
                        <p style="color: #a0aec0;">Army National Guard, 2014-2018</p>
                    </div>
                    <div class="fact-card" style="background: rgba(255, 255, 255, 0.05); padding: 1.5rem; border-radius: 12px; border: 1px solid rgba(102, 126, 234, 0.2);">
                        <div style="font-size: 2rem; margin-bottom: 0.5rem;">🏀</div>
                        <h3 style="color: var(--accent-1); margin-bottom: 0.5rem;">Sports</h3>
                        <p style="color: #a0aec0;">Basketball Walk-On, Penn State Beaver</p>
                    </div>
                    <div class="fact-card" style="background: rgba(255, 255, 255, 0.05); padding: 1.5rem; border-radius: 12px; border: 1px solid rgba(102, 126, 234, 0.2);">
                        <div style="font-size: 2rem; margin-bottom: 0.5rem;">👥</div>
                        <h3 style="color: var(--accent-1); margin-bottom: 0.5rem;">Leadership</h3>
                        <p style="color: #a0aec0;">Penn State Student Government President</p>
                    </div>
                    <div class="fact-card" style="background: rgba(255, 255, 255, 0.05); padding: 1.5rem; border-radius: 12px; border: 1px solid rgba(102, 126, 234, 0.2);">
                        <div style="font-size: 2rem; margin-bottom: 0.5rem;">📚</div>
                        <h3 style="color: var(--accent-1); margin-bottom: 0.5rem;">Community</h3>
                        <p style="color: #a0aec0;">Big Bend Boys & Girls Club Mentor</p>
                    </div>
                </div>
            </div>
            
            <div class="timeline-section" style="margin: 4rem auto 0 auto; max-width: 1000px;">
                <h3 style="color: var(--accent-1); text-align: center; margin-bottom: 3rem; font-size: 2rem;">Journey</h3>
                
                <div class="timeline-container" style="position: relative; max-width: 1000px; margin: 0 auto;">
                    <svg class="timeline-path" style="position: absolute; width: 100%; height: 350px; top: 0; left: 0; z-index: 0;" viewBox="0 0 1000 350" xmlns="http://www.w3.org/2000/svg">
                        <path d="M 100 100 Q 250 150, 400 100 T 700 100 Q 850 150, 900 200" 
                            stroke="var(--accent-1)" 
                            stroke-width="3" 
                            fill="none" 
                            opacity="0.3"/>
                    </svg>
                    
                    <div class="timeline-nodes" style="position: relative; z-index: 1;">
                        <div class="timeline-node" style="position: absolute; left: 8%; top: 10%; text-align: center;">
                            <div class="node-circle" style="width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; cursor: pointer; transition: transform 0.3s ease; font-size: 1.5rem;">🏙️</div>
                            <div class="node-label" style="background: rgba(255, 255, 255, 0.05); padding: 1rem; border-radius: 8px; backdrop-filter: blur(10px); border: 1px solid rgba(102, 126, 234, 0.2); max-width: 180px;">
                                <strong style="color: var(--accent-1); display: block; margin-bottom: 0.5rem;">Pittsburgh</strong>
                                <p style="font-size: 0.9rem; color: #a0aec0; margin: 0;">ROTC, High School</p>
                            </div>
                        </div>
                        
                        <div class="timeline-node" style="position: absolute; left: 25%; top: 18%; text-align: center;">
                            <div class="node-circle" style="width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; cursor: pointer; transition: transform 0.3s ease; font-size: 1.5rem;">🦁</div>
                            <div class="node-label" style="background: rgba(255, 255, 255, 0.05); padding: 1rem; border-radius: 8px; backdrop-filter: blur(10px); border: 1px solid rgba(102, 126, 234, 0.2); max-width: 180px;">
                                <strong style="color: var(--accent-1); display: block; margin-bottom: 0.5rem;">Penn State</strong>
                                <p style="font-size: 0.9rem; color: #a0aec0; margin: 0;">CCSG President, Basketball</p>
                            </div>
                        </div>
                        
                        <div class="timeline-node" style="position: absolute; left: 42%; top: 10%; text-align: center;">
                            <div class="node-circle" style="width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; cursor: pointer; transition: transform 0.3s ease; font-size: 1.5rem;">🎖️</div>
                            <div class="node-label" style="background: rgba(255, 255, 255, 0.05); padding: 1rem; border-radius: 8px; backdrop-filter: blur(10px); border: 1px solid rgba(102, 126, 234, 0.2); max-width: 180px;">
                                <strong style="color: var(--accent-1); display: block; margin-bottom: 0.5rem;">National Guard</strong>
                                <p style="font-size: 0.9rem; color: #a0aec0; margin: 0;">2014-2018</p>
                            </div>
                        </div>
                        
                        <div class="timeline-node" style="position: absolute; left: 59%; top: 10%; text-align: center;">
                            <div class="node-circle" style="width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; cursor: pointer; transition: transform 0.3s ease; font-size: 1.5rem;">🐊</div>
                            <div class="node-label" style="background: rgba(255, 255, 255, 0.05); padding: 1rem; border-radius: 8px; backdrop-filter: blur(10px); border: 1px solid rgba(102, 126, 234, 0.2); max-width: 180px;">
                                <strong style="color: var(--accent-1); display: block; margin-bottom: 0.5rem;">University of Florida</strong>
                                <p style="font-size: 0.9rem; color: #a0aec0; margin: 0;">B.S. Food & Resource Economics, 2020</p>
                            </div>
                        </div>
                        
                        <div class="timeline-node" style="position: absolute; left: 76%; top: 18%; text-align: center;">
                            <div class="node-circle" style="width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; cursor: pointer; transition: transform 0.3s ease; font-size: 1.5rem;">📚</div>
                            <div class="node-label" style="background: rgba(255, 255, 255, 0.05); padding: 1rem; border-radius: 8px; backdrop-filter: blur(10px); border: 1px solid rgba(102, 126, 234, 0.2); max-width: 180px;">
                                <strong style="color: var(--accent-1); display: block; margin-bottom: 0.5rem;">Community Work</strong>
                                <p style="font-size: 0.9rem; color: #a0aec0; margin: 0;">Big Bend Boys & Girls Club Mentor</p>
                            </div>
                        </div>
                        
                        <div class="timeline-node" style="position: absolute; left: 90%; top: 26%; text-align: center;">
                            <div class="node-circle" style="width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; cursor: pointer; transition: transform 0.3s ease; font-size: 1.5rem; animation: pulse-node 2s infinite;">🚀</div>
                            <div class="node-label" style="background: rgba(255, 255, 255, 0.05); padding: 1rem; border-radius: 8px; backdrop-filter: blur(10px); border: 1px solid rgba(102, 126, 234, 0.2); max-width: 180px;">
                                <strong style="color: var(--accent-1); display: block; margin-bottom: 0.5rem;">Today</strong>
                                <p style="font-size: 0.9rem; color: #a0aec0; margin: 0;">Small Business Owner, PhD Applicant</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <section class="content-section" id="content-area" style="display: none;">
        <div class="container">
        </div>
    </section>
                            
    <section class="content-section" id="contact" style="display: none;"> 
        <div class="container">
            <h2 class="section-title">Get In Touch</h2>
            <div class="contact-grid">
                
                <div>
                    <div class="contact-form-container">
                        <h3 style="color: #fff; margin-bottom: 1.5rem;">Send a Message</h3>
                        <form id="contact-form">
                            <div class="form-group">
                                <label for="form-name">Name *</label>
                                <input type="text" id="form-name" name="name" required placeholder="Your Name">
                            </div>
                            
                            <div class="form-group">
                                <label for="contact-type">Contact Preference *</label>
                                <select id="contact-type" required onchange="toggleContactFields()">
                                    <option value="">Select contact type</option>
                                    <option value="email">Email</option>
                                    <option value="phone">Phone</option>
                                </select>
                            </div>
                            
                            <div id="email-fields" style="display:none;">
                                <div class="form-group">
                                    <label for="form-email">Email Address</label>
                                    <input type="email" name="email" id="form-email" placeholder="you@example.com">
                                </div>
                                <div class="form-group">
                                    <label for="form-inquiry">Inquiry Reason</label>
                                    <textarea name="inquiry" id="form-inquiry" rows="4" placeholder="How can I help you?"></textarea>
                                </div>
                            </div>
                            
                            <div id="phone-fields" style="display:none;">
                                <div class="form-group">
                                    <label for="form-phone">Phone Number</label>
                                    <input type="tel" name="phone" id="form-phone" placeholder="555-0199">
                                </div>
                                <div class="form-group">
                                    <label for="form-reason">Reason</label>
                                    <textarea name="reason" id="form-reason" rows="2" placeholder="Brief reason for call"></textarea>
                                </div>
                                
                                <div class="form-group">
                                    <label>Best time to reach out:</label>
                                    <div class="checkbox-group">
                                        <label class="checkbox-item"><input type="checkbox" name="time" value="morning"> Morning</label>
                                        <label class="checkbox-item"><input type="checkbox" name="time" value="afternoon"> Afternoon</label>
                                        <label class="checkbox-item"><input type="checkbox" name="time" value="evening"> Evening</label>
                                    </div>
                                    <div class="checkbox-group" style="margin-top: 1rem;">
                                        <label class="checkbox-item"><input type="checkbox" name="day" value="Mon"> Mon</label>
                                        <label class="checkbox-item"><input type="checkbox" name="day" value="Tue"> Tue</label>
                                        <label class="checkbox-item"><input type="checkbox" name="day" value="Wed"> Wed</label>
                                        <label class="checkbox-item"><input type="checkbox" name="day" value="Thu"> Thu</label>
                                        <label class="checkbox-item"><input type="checkbox" name="day" value="Fri"> Fri</label>
                                    </div>
                                </div>
                            </div>
                            
                            <button type="submit" class="btn-primary" style="margin-top: 1rem;">Send Message</button>
                        </form>
                    </div>

                    <div class="availability-status">
                        <div class="status-indicator">
                            <span class="status-dot"></span>
                            <span class="status-text">OPEN TO OPPORTUNITIES</span>
                        </div>
                        <p style="color: #cbd5e0; margin-bottom: 1rem;">Currently seeking: Cleared intelligence analyst or economics research roles</p>
                        <p style="color: #a0aec0; font-size: 0.9rem;">🔒 TS/SCI: Transferable through 2027</p>
                        <p style="color: #a0aec0; font-size: 0.9rem;">📅 Available: Immediate</p>
                    </div>
                </div>
                
                <div style="display: flex; flex-direction: column; justify-content: space-between;">
                    
                    <div class="contact-form-container" style="text-align: center; margin-bottom: 2rem;">
                        <div style="font-size: 3rem; margin-bottom: 0.5rem;">🐇</div> <h3 style="color: #fff; margin-bottom: 1rem;">Rate this Website</h3>
                        <p style="color: #a0aec0; font-size: 0.9rem;">Did you find the easter egg?</p>
                        
                        <div class="star-rating" id="star-rating">
                            <span class="star" data-rating="1">★</span>
                            <span class="star" data-rating="2">★</span>
                            <span class="star" data-rating="3">★</span>
                            <span class="star" data-rating="4">★</span>
                            <span class="star" data-rating="5">★</span>
                        </div>
                        
                        <button id="submit-rating" class="btn-primary">Submit Rating</button>
                        
                        <div id="feedback-meme">
                            <h4 style="color: #fbbf24; margin: 1rem 0;">GODS I WAS STRONG THEN!</h4>
                            <img src="https://media1.tenor.com/m/K1s-JqA_iQIAAAAd/robert-baratheon-game-of-thrones.gif" alt="Victory Meme">
                        </div>
                    </div>
                    
                    <div class="contact-info">
                        <div class="contact-item">
                            <span class="contact-icon"><i class="fab fa-linkedin"></i></span>
                            <div class="contact-details">
                                <strong>LinkedIn</strong><br>
                                <a href="https://linkedin.com/in/jeqapowe" target="_blank">linkedin.com/in/jeqapowe</a>
                            </div>
                        </div>
                        <div class="contact-item">
                            <span class="contact-icon">📍</span>
                            <div class="contact-details">
                                <strong>Location</strong><br>
                                Washington, DC Metro Area
                            </div>
                        </div>
                    </div>
                    
                    <div style="margin-top: 2rem; border-top: 1px solid rgba(102, 126, 234, 0.2); padding-top: 1rem;">
                        <p style="color: #a0aec0; font-size: 0.9rem;">
                            
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
                                                                    
    <button class="back-to-top" onclick="window.scrollTo({top: 0, behavior: 'smooth'})" aria-label="Back to top">
        ↑
    </button>
                                                                        
    <div class="demo-modal" id="network-analysis-demo-modal">
        <div class="modal-content">
            <button class="close-modal">&times;</button>
            <h2>Network Analysis Tool - Live Demo</h2>
            <iframe 
                src="https://your-demo-url.com/network-tool"
                width="100%"
                height="600px"
                frameborder="0"
                loading="lazy">
            </iframe>
            <div class="modal-footer">
                <a href="https://github.com/..." class="btn-secondary">View Source Code</a>
                <a href="/case-studies/network-analysis" class="btn-primary">Read Case Study</a>
            </div>
        </div>
    </div>
                                                                                
    <footer>
        <div class="container">
            <p id="catchphrase">&copy; 2025 JeQa Powe | Version <span id="version">0.8.5</span> - <span id="version-date"></span></p>
            
            <p id="rotating-quote" style="height: 30px; transition: opacity 0.5s ease; color: var(--accent-1); font-weight: 500;">
                Economics is my tool. Food access is my lens.
            </p>

            <p style="color: #4a5568; font-size: 0.8rem; font-style: italic; margin-top: 0.5rem;">
                Hint: Try the Konami Code (↑↑↓↓←→←→BA) 🎮
            </p>
            <div class="social-links">
                <a href="https://www.linkedin.com/in/jeqa-powe" target="_blank" class="social-link"><i class="fab fa-linkedin"></i></a>
                <a href="https://github.com/Tenken73/anime-analysis" class="social-link" target="_blank"><i class="fab fa-github"></i></a>
                <a href="mailto:JeQa.Powe@outlook.com" class="social-link" style="color: var(--accent-1);"><i class="fas fa-envelope"></i></a>
            </div>
        </div>
    </footer>
                                                                                
    <script>
        // Network Background Animation
        class NetworkBackground {
            constructor() {
                this.canvas = document.getElementById('network-canvas');
                this.ctx = this.canvas.getContext('2d');
                this.particles = [];
                this.particleCount = 50;
                this.maxDistance = 150;
                this.isActive = true;
                this.fps = 30;
                this.fpsInterval = 1000 / this.fps;
                this.then = Date.now();
                
                this.resize();
                this.init();
                this.animate();
                
                window.addEventListener('resize', () => this.resize());
                
                document.addEventListener('visibilitychange', () => {
                    this.isActive = !document.hidden;
                });
            }
            
            resize() {
                this.canvas.width = window.innerWidth;
                this.canvas.height = window.innerHeight;
            }
            
            init() {
                this.particles = [];
                for (let i = 0; i < this.particleCount; i++) {
                    this.particles.push({
                        x: Math.random() * this.canvas.width,
                        y: Math.random() * this.canvas.height,
                        vx: (Math.random() - 0.5) * 0.5,
                        vy: (Math.random() - 0.5) * 0.5,
                        radius: Math.random() * 2 + 1
                    });
                }
            }
            
            animate() {
                requestAnimationFrame(() => this.animate());
                if (!this.isActive) return;
                
                const now = Date.now();
                const elapsed = now - this.then;
                if (elapsed <= this.fpsInterval) return;
                
                this.then = now - (elapsed % this.fpsInterval);
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                
                this.particles.forEach(p => {
                    p.x += p.vx;
                    p.y += p.vy;
                    if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
                    if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;
                    
                    this.ctx.fillStyle = 'rgba(102, 126, 234, 0.6)';
                    this.ctx.beginPath();
                    this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                    this.ctx.fill();
                });
                
                for (let i = 0; i < this.particles.length; i++) {
                    for (let j = i + 1; j < this.particles.length; j++) {
                        const dx = this.particles[i].x - this.particles[j].x;
                        const dy = this.particles[i].y - this.particles[j].y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        
                        if (distance < this.maxDistance) {
                            const opacity = (1 - distance / this.maxDistance) * 0.3;
                            this.ctx.strokeStyle = `rgba(102, 126, 234, ${opacity})`;
                            this.ctx.lineWidth = 1;
                            this.ctx.beginPath();
                            this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                            this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                            this.ctx.stroke();
                        }
                    }
                }
            }
        }
        new NetworkBackground();
        
        // Rotating Statistics
        let currentStatIndex = 0;
        const statItems = document.querySelectorAll('.stat-item');
        function rotateStats() {
            statItems[currentStatIndex].classList.remove('active');
            currentStatIndex = (currentStatIndex + 1) % statItems.length;
            statItems[currentStatIndex].classList.add('active');
        }
        setInterval(rotateStats, 3000);
        
        // Theme System Logic (Req #1: Cursors, Req #4: Nav BG)
        function setTheme(theme) {
            const body = document.body;
            localStorage.setItem('selectedTheme', theme);
            
            const themes = {
                network: {
                    bg1: '#0a0e27', bg2: '#1a1f3a', accent1: '#667eea', accent2: '#764ba2', navBg: 'rgba(10, 14, 39, 0.95)',
                    cursor: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" style=\"font-size:20px\"><text y=\"20\">🌐</text></svg>'), auto"
                },
                'okc-thunder': {
                    bg1: '#002D62', bg2: '#003D82', accent1: '#007AC1', accent2: '#EF3B24', navBg: 'rgba(0, 45, 98, 0.95)',
                    cursor: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" style=\"font-size:20px\"><text y=\"20\">⚡</text></svg>'), auto"
                },
                'pittsburgh-dark': {
                    bg1: '#000000', bg2: '#1A1A1A', accent1: '#FFB81C', accent2: '#A5ACAF', navBg: 'rgba(0, 0, 0, 0.95)',
                    cursor: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" style=\"font-size:20px\"><text y=\"20\">🔩</text></svg>'), auto"
                },
                'detroit-light': {
                    bg1: '#0076B6', bg2: '#2A8FBD', accent1: '#B0B7BC', accent2: '#0076B6', navBg: 'rgba(0, 118, 182, 0.95)',
                    cursor: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" style=\"font-size:20px\"><text y=\"20\">🚘</text></svg>'), auto"
                },
                'anime-space': {
                    bg1: '#2D1B4E', bg2: '#3E2A5E', accent1: '#00D9FF', accent2: '#FF6B35', navBg: 'rgba(45, 27, 78, 0.95)',
                    cursor: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" style=\"font-size:20px\"><text y=\"20\">🚀</text></svg>'), auto"
                }
            };
            
            const selected = themes[theme];
            body.style.background = `linear-gradient(135deg, ${selected.bg1} 0%, ${selected.bg2} 100%)`;
            body.style.cursor = selected.cursor;
            
            document.documentElement.style.setProperty('--accent-1', selected.accent1);
            document.documentElement.style.setProperty('--accent-2', selected.accent2);
            document.documentElement.style.setProperty('--nav-bg', selected.navBg);

            document.querySelectorAll('.node-circle').forEach(circle => {
                circle.style.background = `linear-gradient(135deg, ${selected.accent1}, ${selected.accent2})`;
            });

            document.getElementById('scroll-progress').style.background = `linear-gradient(180deg, ${selected.accent1} 0%, ${selected.accent2} 100%)`;
        }
        
        let professionalStatInterval;
        
        function showHome(event) {
            event.preventDefault();
            document.getElementById('content-area').style.display = 'none';
            document.getElementById('contact').style.display = 'none';
            document.getElementById('about').style.display = 'none';
            document.getElementById('home').style.display = 'flex';
            document.getElementById('home').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        function showAbout(event) {
            event.preventDefault();
            document.getElementById('content-area').style.display = 'none';
            document.getElementById('contact').style.display = 'none';
            document.getElementById('home').style.display = 'none';
            const aboutSection = document.getElementById('about');
            aboutSection.style.display = 'block';
            aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        
        function showContact(event) {
            event.preventDefault();
            document.getElementById('content-area').style.display = 'none';
            document.getElementById('home').style.display = 'none';
            document.getElementById('about').style.display = 'none';
            const contactSection = document.getElementById('contact');
            contactSection.style.display = 'block';
            contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        
        // Req #7: Contact Form Logic
        function toggleContactFields() {
            const type = document.getElementById('contact-type').value;
            const emailFields = document.getElementById('email-fields');
            const phoneFields = document.getElementById('phone-fields');
            
            if (type === 'email') {
                emailFields.style.display = 'block';
                phoneFields.style.display = 'none';
            } else if (type === 'phone') {
                emailFields.style.display = 'none';
                phoneFields.style.display = 'block';
            } else {
                emailFields.style.display = 'none';
                phoneFields.style.display = 'none';
            }
        }

        // Req #7: Star Rating & Meme Logic
        document.querySelectorAll('.star').forEach(star => {
            star.addEventListener('click', function() {
                const rating = this.dataset.rating;
                document.querySelectorAll('.star').forEach(s => {
                    s.classList.remove('selected');
                    if (s.dataset.rating <= rating) s.classList.add('selected');
                });
            });
        });

        document.getElementById('submit-rating').addEventListener('click', function() {
            document.getElementById('feedback-meme').style.display = 'block';
            this.textContent = 'Rating Submitted!';
            this.disabled = true;
            this.style.background = '#48bb78';
        });
        
        function loadContent(path) {
            const contentArea = document.getElementById('content-area');
            const container = contentArea.querySelector('.container');
            
            if (professionalStatInterval) clearInterval(professionalStatInterval);

            document.getElementById('contact').style.display = 'none';
            document.getElementById('home').style.display = 'none';
            document.getElementById('about').style.display = 'none';
            contentArea.style.display = 'block';
            
            if (path === 'academic') {
                container.innerHTML = `
                <h2 class="section-title">Academic</h2>
                    <div style="max-width: 900px; margin: 0 auto;">
                        <h3 style="color: #667eea; margin-bottom: 1rem; text-align: center;">Mission Statement</h3>
                        <p style="color: #cbd5e0; line-height: 1.8; margin-bottom: 2rem; text-align: center;">
                            My goal is to create economic opportunities for Black Americans, veterans, and marginalized communities disproportionately affected by policies that constrain access to housing, agriculture, and technology. My research examines how spatial economic analysis and computational methods can reduce food insecurity and expand economic opportunity.
                        </p>
                    </div>
                    
                    <div class="tab-container">
                    <div class="tab-nav">
                        <button class="tab-btn active" onclick="switchTab('overview-academic')">Overview</button>
                        <button class="tab-btn" onclick="switchTab('research-projects')">Research & Projects</button>
                    </div>
                        
                    <div id="overview-academic" class="tab-content active">
                        
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; max-width: 800px; margin: 0 auto 3rem auto;">
                            <div>
                            <h4 style="color: #e2e8f0; margin-bottom: 1rem;">Methodological Interests</h4>
                            <ul style="color: #a0aec0; line-height: 2;">
                                <li>Spatial Econometrics & GIS Integration</li>
                                <li>Causal Inference (DiD, RDD, IV)</li>
                                <li>Network Science & Graph Theory</li>
                                <li>Machine Learning for Social Science</li>
                                <li>Geospatial Analysis & Hotspot Detection</li>
                                <li>Time-Series & Panel Data Methods</li>
                                <li>Natural Language Processing</li>
                            </ul>
                                </div>
                                <div>
                                <h4 style="color: #e2e8f0; margin-bottom: 1rem;">Substantive Interests</h4>
                                    <ul style="color: #a0aec0; line-height: 2;">
                                    <li>Urban & Regional Economics</li>
                                    <li>Agricultural & Food Systems</li>
                                    <li>Environmental Justice & Equity</li>
                                    <li>Economic Geography & Spatial Development</li>
                                    <li>Labor Economics</li>
                                    <li>Public Economics</li>
                                    <li>Development Economics</li>
                                    </ul>
                                    </div>
                                    </div>

                        <div style="text-align: center; margin-bottom: 2rem;">
                            <a href="https://Tenken73.github.io/JeQa Powe cv.pdf" target="_blank" style="display: inline-block; padding: 1rem 3rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: 600; transition: all 0.3s ease;">
                            📄 Download Full Academic CV (PDF)
                            </a>
                        </div>
                        
                        <h3 style="color: #667eea; margin-bottom: 1rem;">Research Experience</h3>
                        <div class="project-card" style="margin-bottom: 1.5rem;">
                            <div class="project-info">
                            <h3 class="project-title">Research Operations Analyst</h3>
                                <p style="color: #a0aec0; margin-bottom: 1rem;">Joint Warfare Analysis Center (JWAC), DoD | June 2022 – March 2023</p>
                                <p class="project-description">
                                    Conducted advanced quantitative analysis and research combining econometrics, machine learning, and network analysis in classified environment to support operational targeting. Used Food & Resource Economics principles to structure complex analysis.
                                    Collaborated with MIT Lincoln Laboratory data scientists on large language models for entity extraction. 
                                    Applied spatial econometric methods using ArcGIS Pro and developed predictive models integrating multi-source data.
                                    <br><br>
                                    *Supplemented experience with Federal Reserve data regressions and advanced coding practice while attending Howard University.*
                                </p>
                                <div class="tech-tags">
                                <span class="tech-tag">Python</span>
                                <span class="tech-tag">R</span>
                                <span class="tech-tag">ArcGIS</span>
                                <span class="tech-tag">Machine Learning</span>
                                <span class="tech-tag">Network Analysis</span>
                                </div>
                                </div>
                                </div>

                        <h3 style="color: #667eea; margin-bottom: 1rem; text-align: center;">Academic Timeline</h3>
                        <div class="timeline-container">
                            <div class="timeline-line"></div>
                            <div class="timeline-item"><div class="timeline-year">2011-2014</div><div class="timeline-dot school"></div><div class="timeline-content school"><h4 style="color: #fff; margin-bottom: 0.5rem;">Penn State University</h4><p style="color: #a0aec0;">Engineering/Finance (77 Credits)</p></div></div>
                            <div class="timeline-item"><div class="timeline-year">2014-2018</div><div class="timeline-dot military"></div><div class="timeline-content military"><h4 style="color: #fff; margin-bottom: 0.5rem;">Army National Guard</h4><p style="color: #a0aec0;">Infantryman & Platoon Leader (PA/FL)</p></div></div>
                            <div class="timeline-item"><div class="timeline-year">2015-2017</div><div class="timeline-dot school"></div><div class="timeline-content school"><h4 style="color: #fff; margin-bottom: 0.5rem;">Santa Fe College</h4><p style="color: #a0aec0;">A.A. Economics</p></div></div>
                            <div class="timeline-item"><div class="timeline-year">2017-2020</div><div class="timeline-dot school"></div><div class="timeline-content school"><h4 style="color: #fff; margin-bottom: 0.5rem;">University of Florida</h4><p style="color: #a0aec0;">B.S. Food & Resource Economics</p></div></div>
                            <div class="timeline-item"><div class="timeline-year">2021-2022</div><div class="timeline-dot school"></div><div class="timeline-content school"><h4 style="color: #fff; margin-bottom: 0.5rem;">Howard University</h4><p style="color: #a0aec0;">M.A. Economics (Master's Thesis)</p></div></div>
                            <div class="timeline-item"><div class="timeline-year">Feb 2022</div><div class="timeline-dot conference"></div><div class="timeline-content conference"><h4 style="color: #fff; margin-bottom: 0.5rem;">ESRI Federal GIS Conference</h4><p style="color: #a0aec0;">Participant</p></div></div>
                            <div class="timeline-item"><div class="timeline-year">2022-2023</div><div class="timeline-dot fellowship"></div><div class="timeline-content fellowship"><h4 style="color: #fff; margin-bottom: 0.5rem;">Frederic Basquiat Fellowship</h4><p style="color: #a0aec0;">Fellow, Mercatus Center at GMU</p></div></div>
                            <div class="timeline-item"><div class="timeline-year">Jul 2024</div><div class="timeline-dot conference"></div><div class="timeline-content conference"><h4 style="color: #fff; margin-bottom: 0.5rem;">Special Libraries Association (SLA)</h4><p style="color: #a0aec0;">Speaker</p></div></div>
                        </div>
                    </div>
                        
                    <div id="research-projects" class="tab-content">
                        <h3 style="color: #667eea; margin-bottom: 1.5rem;">Peer-Reviewed & Conference Presentations</h3>
                    
                        <div class="project-card" style="margin-bottom: 1.5rem;">
                            <div class="project-info">
                                <h3 class="project-title">"Economic Changes & Small Farmers: An Analysis on America's Hidden Lifeline"</h3>
                                <p style="color: #a0aec0; margin-bottom: 0.5rem;">2023</p>
                                <p class="project-description">
                                    Quantitative analysis examining how economic pressures, land consolidation, and climate change threaten America's remaining small-scale family agricultural producers.
                                    Research presented to the National Economic Council to inform rural development policy.
                                </p>
                                <p style="color: #667eea; font-weight: 600;">Presented to: National Economic Council</p>
                            </div>
                        </div>
                    
                        <div class="project-card" style="margin-bottom: 1.5rem;">
                            <div class="project-info">
                                <h3 class="project-title">"Coal Power Plants and Housing Discrimination: Environmental Injustice in Appalachia"</h3>
                                <p style="color: #a0aec0; margin-bottom: 0.5rem;">2022</p>
                                <p class="project-description">
                                    Spatial econometric analysis examining how proximity to coal-fired power plants correlates with discriminatory housing patterns in West Virginia. 
                                    Combined environmental data with Fair Housing Act enforcement records to identify systemic inequities.
                                </p>
                                <p style="color: #667eea; font-weight: 600;">Presented to: Federal Reserve Board</p>
                                <div class="project-links" style="margin-top: 1rem;">
                                    <a href="https://Tenken73.github.io/Coal Power Plants and Housing Discrimination.pptx" target="_blank" class="project-link">→ View Presentation (PPTX)</a>
                                </div>
                            </div>
                        </div>
                        
                        <div class="project-card" style="margin-bottom: 2.5rem;">
                            <div class="project-info">
                                <h3 class="project-title">"Examining Food Deserts & Urban Agriculture Impact"</h3>
                                <p style="color: #a0aec0; margin-bottom: 0.5rem;">Master's Thesis, Howard University | 2022</p>
                                <p class="project-description">
                                    Original research utilizing difference-in-differences and spatial econometrics to analyze food access and property value impacts. 
                                    Employed GIS network analysis and spatial autocorrelation methods.
                                </p>
                                <div class="project-links" style="margin-top: 1rem;">
                                    <a href="https://Tenken73.github.io/Examining Food Deserts - Jpowe.pdf" target="_blank" class="project-link">→ View Full Thesis (PDF)</a>
                                </div>
                            </div>
                        </div>

                        <h3 style="color: #667eea; margin-bottom: 1.5rem;">Research Portfolio & Code Samples</h3>
                        <p style="color: #a0aec0; margin-bottom: 2rem;">Interactive demonstrations of methodological approaches</p>
                        
                        <div class="project-grid">
                        <div class="project-card" data-project="bebop-protocol">
    <img src="https://inomics.com/sites/default/files/styles/article_full_responsive/public/pictures/picture/economists-on-a-date-meme.jpeg?itok=G4-n3cna" alt="Bebop Protocol interface" class="project-image">
    <div class="project-info">
        <h3 class="project-title">Bebop Protocol</h3>
        <p class="project-description">
            Interactive dashboard for anime analysis, community sentiment, and trend visualization. Built with modern data architecture.
        </p>
        <div class="tech-tags">
            <span class="tech-tag">Data Viz</span>
            <span class="tech-tag">Analytics</span>
            <span class="tech-tag">EDA</span>
            <span class="tech-tag">Interactive</span>
        </div>
        <div class="project-links">
            <a href="https://tenken73.github.io/Bebop-Protocol_V0.html" class="project-link" target="_blank">Live Dashboard</a>
            <a href="https://github.com/tenken73/Bebop-Protocol" class="project-link" target="_blank">Code</a>
        </div>
    </div>
</div>
                            
                            <div class="project-card">
                                <img src="https://inomics.com/sites/default/files/styles/article_full_responsive/public/pictures/picture/economist-girlfriend-wants-to-talk-meme.jpeg?itok=uC-jYFh4" alt="Economist girlfriend meme" class="project-image">
                                <div class="project-info">
                                    <h3 class="project-title">Black & Veteran Impact Zones (Coming Soon)</h3>
                                    <p class="project-description">
                                        Spatial model examining economic disparities near military bases in Detroit, Baltimore, and Pittsburgh.
                                    </p>
                                    <div class="tech-tags">
                                        <span class="tech-tag">ArcGIS Pro</span>
                                        <span class="tech-tag">R</span>
                                        <span class="tech-tag">Spatial Econometrics</span>
                                    </div>
                                    <div class="project-links">
                                        <a href="#" class="project-link">Live Tool</a>
                                        <a href="#" class="project-link">Paper</a>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="project-card">
                                <img src="https://inomics.com/sites/default/files/styles/article_full_responsive/public/pictures/picture/what-my-friends-think-i-do-economist-meme.jpeg?itok=9cIe-Ggq" alt="What economists do meme" class="project-image">
                                <div class="project-info">
                                    <h3 class="project-title">NBA Network Dashboard</h3>
                                    <p class="project-description">
                                        Graph analysis visualizing player movement, team trade centrality, and competitive network structures.
                                    </p>
                                    <div class="tech-tags">
                                        <span class="tech-tag">Python</span>
                                        <span class="tech-tag">NetworkX</span>
                                        <span class="tech-tag">Plotly</span>
                                    </div>
                                    <div class="project-links">
                                        <a href="#" class="project-link">Interactive Demo</a>
                                        <a href="#" class="project-link">GitHub</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `;
            }
            else if (path === 'professional') {
                container.innerHTML = `
                    <h2 class="section-title">Professional</h2>
                        
                        <div class="tab-container">
                        <div class="tab-nav">
                            <button class="tab-btn active" onclick="switchTab('overview-pro')">Overview</button>
                            <button class="tab-btn" onclick="switchTab('skills-exp-pro')">Skills</button>
                        </div>
                            
                        <div id="overview-pro" class="tab-content active">
                            <div class="about-content" style="margin-bottom: 3rem;">
                                <div>
                                    <div class="about-text" style="max-width: 800px; margin: 0 auto; text-align: center;">
                                        <h2 class="section-title" style="font-size: 2rem; margin-bottom: 1.5rem;">About Me</h2>
                                        <p>I build data-driven solutions at the intersection of economics, intelligence analysis, and advanced computational methods. With an M.A. in Economics from Howard University and 5+ years deploying machine learning systems in defense and intelligence environments, I translate complex problems into actionable insights.</p>
                                    </div>
                                </div>
                            </div>
                        
                            <div style="background: rgba(255, 255, 255, 0.05); padding: 2rem; border-radius: 12px; border: 1px solid rgba(102, 126, 234, 0.2); margin-bottom: 3rem;">
                                <h3 style="color: #667eea; margin-bottom: 1.5rem;">Background</h3>
                                <p style="color: #cbd5e0; line-height: 1.8; margin-bottom: 2rem;">
                                    Adaptable veteran with more than a decade in information technology support, team leadership, and analysis. 
                                </p>
                                
                                <h4 style="color: #e2e8f0; margin: 1.5rem 0 1rem;">Core Competencies</h4>
                                <div class="tech-tags" style="margin-bottom: 2rem;">
                                    <span class="tech-tag" style="font-size: 1rem;">Operations Research</span>
                                    <span class="tech-tag" style="font-size: 1rem;">ML/AI</span>
                                    <span class="tech-tag" style="font-size: 1rem;">Geospatial Intelligence</span>
                                    <span class="tech-tag" style="font-size: 1rem;">Network Analysis</span>
                                    <span class="tech-tag" style="font-size: 1rem;">Econometrics</span>
                                    <span class="tech-tag" style="font-size: 1rem;">Python</span>
                                    <span class="tech-tag" style="font-size: 1rem;">R</span>
                                    <span class="tech-tag" style="font-size: 1rem;">ArcGIS</span>
                                </div>
                                
                                <h4 style="color: #e2e8f0; margin: 1.5rem 0 1rem;">Security Clearance</h4>
                                <p style="color: #a0aec0; line-height: 1.8;">
                                    <strong>Top Secret / SCI</strong> (Transferable through 2027)
                                </p>
                            </div>

                            <div style="text-align: center; margin-bottom: 3rem; display: flex; justify-content: center; gap: 1rem;">
                                <a href="https://Tenken73.github.io/Jpowe Resume Nov.pdf" target="_blank" style="display: inline-block; padding: 1rem 1.5rem; background: #667eea; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; transition: all 0.3s ease;">
                                    📄 Download IT Resume
                                </a>
                                <a href="https://Tenken73.github.io/Jpowe Skills Resume.pdf" target="_blank" style="display: inline-block; padding: 1rem 1.5rem; background: #764ba2; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; transition: all 0.3s ease;">
                                    📄 Download Skills Resume
                                </a>
                            </div>
                                                                                            
                            <h3 style="color: #667eea; margin: 3rem 0 1.5rem;">Key Experience</h3>
                                                                                            
                            <div class="project-card" style="margin-bottom: 1.5rem;">
                                <div class="project-info">
                                    <h3 class="project-title">Research Operations Analyst</h3>
                                    <p style="color: #a0aec0; margin-bottom: 1rem;">Joint Warfare Analysis Center (JWAC), DoD | June 2022 – March 2023</p>
                                    <p class="project-description" style="margin-bottom: 1rem;">
                                        Built machine learning systems and conducted advanced network analysis in TS/SCI environment to support operational targeting and strategic intelligence.
                                    </p>
                                    <ul style="color: #cbd5e0; line-height: 1.8; margin-bottom: 1rem;">
                                        <li>Designed and deployed LLM for target network analysis, collaborating with MIT Lincoln Laboratory</li>
                                        <li><strong style="color: #667eea;">40% improvement</strong> in network mapping accuracy through multi-modal ML pipeline</li>
                                        <li><strong style="color: #667eea;">75% reduction</strong> in manual data transfer time via cross-domain automation</li>
                                        <li>Created social network analysis models identifying high-value targets</li>
                                        <li>Briefed senior DoD leadership on research findings</li>
                                    </ul>
                                    <div class="tech-tags">
                                        <span class="tech-tag">Python</span>
                                        <span class="tech-tag">ML/AI</span>
                                        <span class="tech-tag">ArcGIS</span>
                                        <span class="tech-tag">TS/SCI</span>
                                        <span class="tech-tag">Power BI</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="project-card" style="margin-bottom: 1.5rem;">
                                <div class="project-info">
                                    <h3 class="project-title">Data Analyst III</h3>
                                    <p style="color: #a0aec0; margin-bottom: 1rem;">Naval Surface Warfare Center Dahlgren Division | March 2025 – May 2025</p>
                                    <ul style="color: #cbd5e0; line-height: 1.8;">
                                        <li>Identified <strong style="color: #667eea;">$2M in potential cost savings</strong> through predictive maintenance modeling</li>
                                        <li>Conducted regression analysis on fleet maintenance data</li>
                                        <li>Applied statistical methods supporting naval research programs</li>
                                    </ul>
                                </div>
                            </div>
                            
                            <div class="project-card">
                                <div class="project-info">
                                    <h3 class="project-title">Principal Consultant</h3>
                                    <p style="color: #a0aec0; margin-bottom: 1rem;">Black Winter, LLC | January 2021 – Present</p>
                                    <ul style="color: #cbd5e0; line-height: 1.8;">
                                        <li>Identified <strong style="color: #667eea;">$100K+ in cost reduction opportunities</strong> for SMBs</li>
                                        <li>Developed network analysis frameworks and economic impact studies</li>
                                        <li>Provided strategic consulting for 20+ professionals</li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                            
                        <div id="skills-exp-pro" class="tab-content">
                            <div class="about-stats" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; max-width: 900px; margin: 0 auto 3rem auto;">
                                <div class="stat-box" style="background: rgba(102, 126, 234, 0.1); padding: 2rem; border-radius: 12px; text-align: center; border: 1px solid rgba(102, 126, 234, 0.2);">
                                    <div class="stat-box-number" id="stat-num-1" style="font-size: 2.5rem; font-weight: 700; color: #667eea; margin-bottom: 0.5rem;">5+</div>
                                    <div class="stat-box-label" id="stat-label-1" style="color: #a0aec0; font-size: 0.9rem;">Years Analyst Experience</div>
                                </div>
                                <div class="stat-box" style="background: rgba(102, 126, 234, 0.1); padding: 2rem; border-radius: 12px; text-align: center; border: 1px solid rgba(102, 126, 234, 0.2);">
                                    <div class="stat-box-number" id="stat-num-2" style="font-size: 2.5rem; font-weight: 700; color: #667eea; margin-bottom: 0.5rem;">$2M+</div>
                                    <div class="stat-box-label" id="stat-label-2" style="color: #a0aec0; font-size: 0.9rem;">Cost Savings ID'd</div>
                                </div>
                            </div>
                            
                            <div style="background: rgba(255, 255, 255, 0.05); padding: 2rem; border-radius: 12px; border: 1px solid rgba(102, 126, 234, 0.2); margin-bottom: 3rem;">
                                <h3 style="color: #667eea; margin-bottom: 1.5rem;">Professional Profile</h3>
                                <p style="color: #cbd5e0; line-height: 1.8;">
                                    Quantitative analyst combining advanced econometric methods with machine learning to solve complex defense and business challenges. Experienced in building systems that translate technical analysis into strategic decisions. Specialized in spatial analysis, network science, and causal inference applied to real-world operations.
                                </p>
                            </div>
                            
                            <h3 style="color: #667eea; margin-bottom: 1.5rem;">Core Competencies</h3>
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
                                <div style="background: rgba(102, 126, 234, 0.1); padding: 1rem; border-radius: 8px; border-left: 4px solid #667eea;">
                                    <strong style="color: #e2e8f0;">Operations Research</strong>
                                </div>
                                <div style="background: rgba(102, 126, 234, 0.1); padding: 1rem; border-radius: 8px; border-left: 4px solid #667eea;">
                                    <strong style="color: #e2e8f0;">Intelligence Analysis</strong>
                                </div>
                                <div style="background: rgba(102, 126, 234, 0.1); padding: 1rem; border-radius: 8px; border-left: 4px solid #667eea;">
                                    <strong style="color: #e2e8f0;">Machine Learning & AI</strong>
                                </div>
                                <div style="background: rgba(102, 126, 234, 0.1); padding: 1rem; border-radius: 8px; border-left: 4px solid #667eea;">
                                    <strong style="color: #e2e8f0;">Network Analysis</strong>
                                </div>
                                <div style="background: rgba(102, 126, 234, 0.1); padding: 1rem; border-radius: 8px; border-left: 4px solid #667eea;">
                                    <strong style="color: #e2e8f0;">Geospatial Intelligence</strong>
                                </div>
                                <div style="background: rgba(102, 126, 234, 0.1); padding: 1rem; border-radius: 8px; border-left: 4px solid #667eea;">
                                    <strong style="color: #e2e8f0;">Cross-Domain Solutions</strong>
                                </div>
                                <div style="background: rgba(102, 126, 234, 0.1); padding: 1rem; border-radius: 8px; border-left: 4px solid #667eea;">
                                    <strong style="color: #e2e8f0;">IT Support & Admin</strong>
                                </div>
                                <div style="background: rgba(102, 126, 234, 0.1); padding: 1rem; border-radius: 8px; border-left: 4px solid #667eea;">
                                    <strong style="color: #e2e8f0;">Team Leadership</strong>
                                </div>
                            </div>
                            
                            <h3 style="color: #667eea; margin: 3rem 0 1.5rem;">Technical Capabilities</h3>
                            <div class="skills-grid">
                                <div class="skill-category">
                                    <h3>Programming & Analysis</h3>
                                    <ul class="skill-list">
                                        <li>✓ Python (pandas, scikit-learn, numpy)</li>
                                        <li>✓ R (tidyverse, ggplot2, Shiny)</li>
                                        <li>✓ SQL (complex queries, DB2, PostgreSQL)</li>
                                        <li>✓ PowerShell scripting</li>
                                    </ul>
                                </div>
                                
                                <div class="skill-category">
                                    <h3>Machine Learning & Geospatial</h3>
                                    <ul class="skill-list">
                                        <li>✓ ArcGIS (spatial analysis, ArcGIS Pro)</li>
                                        <li>✓ LLM fine-tuning & NLP</li>
                                        <li>✓ Network Analysis (NetworkX)</li>
                                        <li>✓ QGIS & Spatial Statistics</li>
                                        <li>✓ Causal Inference & Econometrics</li>
                                    </ul>
                                </div>
                                
                                <div class="skill-category">
                                    <h3>Infrastructure & Domain</h3>
                                    <ul class="skill-list">
                                        <li>✓ Social network analysis</li>
                                        <li>✓ Cross-domain automation</li>
                                        <li>✓ Power BI / Tableau</li>
                                        <li>✓ Operational Targeting</li>
                                        <li>✓ IT Support & Administration</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                
                // Start the stat rotator for professional page
                const stats = [
                    { num: '5+', label: 'Years Analyst Experience' },
                    { num: '10+', label: 'Years IT Support' }
                ];
                const stats2 = [
                    { num: '$2M+', label: "Cost Savings ID'd" },
                    { num: '$100K+', label: "Opps. ID'd" }
                ];
                const stats3 = [
                    { num: '40%', label: 'Accuracy Improvement' },
                    { num: '200+', label: 'Daily Hours Saved' }
                ];
                const stats4 = [
                    { num: '85%', label: 'Global Workstation Upgrade' },
                    { num: '150+', label: 'Sites Supported' }
                ];
                let statIndex = 0;

                function updateStatBox(numId, labelId, statArray) {
                    const numEl = document.getElementById(numId);
                    const lblEl = document.getElementById(labelId);
                    if (numEl && lblEl) {
                        numEl.classList.add('is-fading');
                        lblEl.classList.add('is-fading');
                        
                        setTimeout(() => {
                            const currentStat = statArray[statIndex % statArray.length];
                            numEl.textContent = currentStat.num;
                            lblEl.textContent = currentStat.label;
                            numEl.classList.remove('is-fading');
                            lblEl.classList.remove('is-fading');
                        }, 300);
                    }
                }

                professionalStatInterval = setInterval(() => {
                    updateStatBox('stat-num-1', 'stat-label-1', stats);
                    statIndex++;
                    setTimeout(() => updateStatBox('stat-num-2', 'stat-label-2', stats2), 1500);
                    setTimeout(() => { statIndex++; }, 3000);
                }, 6000);
            }
            
            document.getElementById('content-area').scrollIntoView({ behavior: 'smooth', block: 'start' });
            addModalListeners();
        }
        
         function switchTab(tabId) {
      document.querySelectorAll('.tab-content').forEach(content => {
          content.classList.remove('active');
      });
      document.querySelectorAll('.tab-btn').forEach(btn => {
          btn.classList.remove('active');
      });
      
      const newTabContent = document.getElementById(tabId);
      const newTabBtn = document.querySelector(`.tab-btn[onclick="switchTab('${tabId}')"]`);
      
      if(newTabContent) newTabContent.classList.add('active');
      if(newTabBtn) newTabBtn.classList.add('active');
      
      if (tabId === 'skills-pro' || tabId === 'projects-pro' || tabId === 'research-projects') {
          addModalListeners();
      }
  }
  
  // Modal Functionality (Unchanged, relies on project-card changes)
  function addModalListeners() {
      document.querySelectorAll('.view-demo-btn, .project-link').forEach(btn => {
          btn.replaceWith(btn.cloneNode(true));
      });
      
      document.querySelectorAll('.view-demo-btn, .project-link').forEach(btn => {
          btn.addEventListener('click', function(e) {
              if (this.textContent.includes('Live Demo') || this.classList.contains('view-demo-btn')) {
                  e.preventDefault();
                  const projectCard = this.closest('.project-card');
                  if (projectCard && projectCard.dataset.project) {
                      const project = projectCard.dataset.project;
                      const modal = document.getElementById(`${project}-demo-modal`);
                      if (modal) {
                          modal.classList.add('active');
                          document.body.style.overflow = 'hidden';
                      }
                  }
              }
          });
      });
  }
  
  document.querySelectorAll('.close-modal').forEach(btn => {
      btn.addEventListener('click', function() {
          this.closest('.demo-modal').classList.remove('active');
          document.body.style.overflow = 'auto';
      });
  });
  
  document.querySelectorAll('.demo-modal').forEach(modal => {
      modal.addEventListener('click', function(e) {
          if (e.target === this) {
              this.classList.remove('active');
              document.body.style.overflow = 'auto';
          }
      });
  });
  
  addModalListeners();
        
        function addModalListeners() {
            document.querySelectorAll('.close-modal').forEach(btn => {
                btn.addEventListener('click', function() {
                    this.closest('.demo-modal').classList.remove('active');
                    document.body.style.overflow = 'auto';
                });
            });
        }
        
        // Req #2: Auto-Update Version
        const today = new Date();
        const formattedDate = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear().toString().slice(-2);
        const versionEl = document.getElementById('version');
        const dateEl = document.getElementById('version-date');
        if (versionEl) versionEl.textContent = "0.8.5.1"; 
        if (dateEl) dateEl.textContent = formattedDate;

        // Req #6: Rotating Quotes
        const quotes = [
            "Economics is my tool. Food access is my lens.",
            "The same tools that map threats can map solutions.",
            "Built ML models for DoD targeting. Now applying them to food deserts.",
            "Data without context is just noise.",
            "Progress over perfection."
        ];
        let quoteIndex = 0;
        const quoteEl = document.getElementById('rotating-quote');
        if(quoteEl) {
            setInterval(() => {
                quoteIndex = (quoteIndex + 1) % quotes.length;
                quoteEl.style.opacity = 0;
                setTimeout(() => {
                    quoteEl.textContent = quotes[quoteIndex];
                    quoteEl.style.opacity = 1;
                }, 500);
            }, 5000);
        }

        document.addEventListener('DOMContentLoaded', () => {
            const savedTheme = localStorage.getItem('selectedTheme') || 'network';
            setTheme(savedTheme);
            document.getElementById('theme-dropdown').value = savedTheme;

            // Simple Nav Handler for Mobile
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', function(e) {
                    if (this.dataset.trigger || this.textContent.includes('Contact') || this.getAttribute('href') === '#about') return;
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetSection = document.querySelector(targetId);
                    if (targetSection) {
                        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        document.getElementById('content-area').style.display = 'none';
                        document.getElementById('contact').style.display = 'none';
                        document.getElementById('about').style.display = 'none';
                    }
                });
            });

            document.querySelectorAll('.nav-links a[data-trigger]').forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    loadContent(this.dataset.trigger);
                });
            });
            
            // Konami Code
            let konamiCode = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
            let konamiIndex = 0;
            document.addEventListener('keydown', (e) => {
                const key = e.key.toLowerCase();
                const codeKey = konamiCode[konamiIndex].toLowerCase().replace('arrow', '');
                if (key === codeKey || (key === 'b' && codeKey === 'b') || (key === 'a' && codeKey === 'a')) {
                    konamiIndex++;
                    if (konamiIndex === konamiCode.length) {
                        alert("Secret Found! 🐇");
                        konamiIndex = 0;
                    }
                } else {
                    konamiIndex = 0;
                }
            });
        });
    </script>
</body>
</html>
