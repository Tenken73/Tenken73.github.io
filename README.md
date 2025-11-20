<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JeQa Powe | Quantitative Analyst</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
    <style>
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
        }
        
        /* Scroll Progress Bar */
        #scroll-progress {
            position: fixed;
            top: 0;
            left: 0;
            width: 5px;
            height: 0%;
            background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
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
        
        /* Navigation (Left Sidebar on Desktop, Bottom Bar on Mobile) */
        nav {
            position: fixed;
            left: 0;
            top: 0;
            height: 100vh;
            width: 200px;
            background: rgba(10, 14, 39, 0.95);
            backdrop-filter: blur(10px);
            padding: 2rem 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            border-right: 1px solid rgba(102, 126, 234, 0.2);
            z-index: 100;
            transition: width 0.3s ease;
        }
        
        .logo {
            font-size: 1.5rem;
            font-weight: 700;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
            justify-content: center;
            gap: 10px;
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
        .hero, .content-section, footer {
            margin-left: 200px;
        }
        
        .theme-controls-container {
            width: 100%; 
            display: flex; 
            flex-direction: column; 
            align-items: center; 
            margin-top: auto;
        }
        
        @media (max-width: 768px) {
            /* Mobile-Specific Styles */
            
            /* Content shifts */
            .hero, .content-section, footer {
                margin-left: 0;
                padding-bottom: 80px; /* Space for bottom nav */
            }
            
            /* Nav becomes fixed bottom bar */
            nav {
                width: 100%;
                height: auto;
                flex-direction: row;
                justify-content: space-around;
                bottom: 0;
                top: auto;
                border-right: none;
                border-top: 1px solid rgba(102, 126, 234, 0.2);
                padding: 0.5rem 0;
            }
            .nav-links {
                flex-direction: row;
                gap: 0.5rem;
                width: auto;
            }
            /* Nav links reduce size on mobile */
            .nav-links a {
                font-size: 0.9rem;
                padding: 0.5rem;
                flex-direction: column;
            }
            /* Show only icon on mobile, hide text label */
            .nav-links .nav-text {
                display: none;
            }
            .nav-links a {
                width: auto; /* Auto width for bottom buttons */
            }

            .logo {
                display: none;
            }
            .theme-controls-container {
                display: none; /* Hide theme controls on mobile for space */
            }
        }
        
        .theme-toggle {
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(102, 126, 234, 0.2);
            color: #fff;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            width: 90%;
        }
        
        .theme-toggle:hover {
            background: rgba(102, 126, 234, 0.3);
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
        }
        
        .theme-option {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            cursor: pointer;
            border: 2px solid transparent;
            transition: all 0.3s ease;
        }
        
        .theme-option:hover {
            transform: scale(1.1);
            border-color: #667eea;
        }
        
        .theme-option.active {
            border-color: #48bb78;
            box-shadow: 0 0 10px rgba(72, 187, 120, 0.5);
        }
        
        /* --- THEME DEFINITIONS (Updated) --- */
        
        /* 1. Default (Current Blue/Purple) */
        .theme-intelligence { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
        /* 2. OKC Thunder */
        .theme-thunder { background: linear-gradient(135deg, #007ac1 0%, #ef3b24 100%); }
        /* 3. Retro Alien (Green/Black) */
        .theme-retro { background: linear-gradient(135deg, #10b981 0%, #000000 100%); }
        /* 4. Pittsburgh Steelers */
        .theme-steelers { background: linear-gradient(135deg, #000000 0%, #ffb600 100%); }
        /* 5. Lakers */
        .theme-lakers { background: linear-gradient(135deg, #552583 0%, #fdb927 100%); }
        /* 6. Sunny Yellow */
        .theme-sunny { background: linear-gradient(135deg, #ffc107 0%, #ff8f00 100%); }

        /* --- THEME ACTIVATION (Updated) --- */
        
        body.theme-thunder { background: linear-gradient(135deg, #001f3f 0%, #1a1f3a 100%); }
        body.theme-thunder .stat-number, body.theme-thunder .nav-links a:hover { color: #007ac1; }
        
        body.theme-retro { background: linear-gradient(135deg, #000000 0%, #1a3a2e 100%); }
        body.theme-retro .stat-number { color: #10b981; }
        
        body.theme-steelers { background: linear-gradient(135deg, #000000 0%, #1f1f1f 100%); }
        body.theme-steelers .stat-number { color: #ffb600; }
        
        body.theme-lakers { background: linear-gradient(135deg, #2c164a 0%, #1c0a2d 100%); }
        body.theme-lakers .stat-number { color: #fdb927; }
        
        body.theme-sunny { background: linear-gradient(135deg, #1a1a1a 0%, #2f2f2f 100%); } /* Dark base for contrast */
        body.theme-sunny .stat-number { color: #ffc107; }


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
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
            color: #667eea;
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
            margin-bottom: 4rem; /* Added margin */
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
            border-color: #667eea;
        }
        
        .path-btn.professional:hover {
            border-color: #f56565;
        }
        
        /* Content Section */
        .content-section {
            min-height: 100vh;
            padding: 4rem 0;
        }
        
        .section-title {
            font-size: 2.5rem;
            font-weight: 700;
            text-align: center;
            margin-bottom: 3rem;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            transition: width 0.3s ease;
        }
        
        .tab-btn:hover {
            color: #667eea;
        }
        
        .tab-btn.active {
            color: #667eea;
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
            color: #667eea;
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
            color: #667eea;
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
            color: #667eea;
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
            margin: 0 auto; /* Center the new about section */
        }
        
        .profile-image {
            width: 100%;
            max-width: 400px;
            border-radius: 12px;
            border: 3px solid rgba(102, 126, 234, 0.3);
            transition: all 0.3s ease;
        }
        
        .profile-image:hover {
            border-color: rgba(102, 126, 234, 0.8);
            transform: scale(1.02);
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
            overflow: hidden; /* For smooth transition */
        }
        
        .stat-box-number {
            font-size: 2.5rem;
            font-weight: 700;
            color: #667eea;
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
        
        /* Contact Section */
        #contact {
            display: none; /* Hidden until clicked */
        }

        .contact-grid {
            display: grid;
            grid-template-columns: 0.7fr 1fr; /* Form is 30% smaller */
            gap: 3rem;
            margin-top: 2rem;
        }
        
        .contact-info {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }
        
        .contact-item {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1rem;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 8px;
            transition: all 0.3s ease;
        }
        
        .contact-item:hover {
            background: rgba(102, 126, 234, 0.1);
            transform: translateX(10px);
        }
        
        .contact-icon {
            font-size: 1.5rem;
        }
        
        .contact-details a {
            color: #667eea;
            text-decoration: none;
        }
        
        .contact-details a:hover {
            text-decoration: underline;
        }
        
        .availability-status {
            background: rgba(102, 126, 234, 0.1);
            border: 2px solid #667eea;
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
        
        /* Career Timeline */
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
            background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
            transform: translateX(-50%);
        }
        
        .timeline-item {
            display: flex;
            align-items: center;
            margin: 2rem 0;
            position: relative;
        }
        
        .timeline-item:nth-child(odd) {
            flex-direction: row;
        }
        
        .timeline-item:nth-child(even) {
            flex-direction: row-reverse;
        }
        
        .timeline-content {
            flex: 1;
            background: rgba(255, 255, 255, 0.05);
            padding: 1.5rem;
            border-radius: 12px;
            border: 1px solid rgba(102, 126, 234, 0.2);
            margin: 0 2rem;
            transition: all 0.3s ease;
        }

        /* Timeline Event Types */
        .timeline-content.school { border-left: 4px solid #667eea; } /* Blue/Purple */
        .timeline-content.military { border-left: 4px solid #f56565; } /* Red/Military */
        .timeline-content.conference { border-left: 4px solid #fbbf24; } /* Yellow/Orange */
        .timeline-content.professional { border-left: 4px solid #48bb78; } /* Green/Professional */
        .timeline-content.fellowship { border-left: 4px solid #a0aec0; } /* Grey/Fellowship */

        
        .timeline-content:hover {
            border-color: rgba(102, 126, 234, 0.6);
            transform: scale(1.02);
        }
        
        .timeline-dot {
            position: absolute;
            left: 50%;
            width: 16px;
            height: 16px;
            background: #667eea;
            border-radius: 50%;
            transform: translateX(-50%);
            border: 3px solid var(--dot-border-color, #0a0e27); /* Use CSS variable for dot border */
            z-index: 2;
        }

        .timeline-dot.school { background: #667eea; }
        .timeline-dot.military { background: #f56565; }
        .timeline-dot.conference { background: #fbbf24; }
        .timeline-dot.professional { background: #48bb78; }
        .timeline-dot.fellowship { background: #a0aec0; }

        
        .timeline-year {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: -30px;
            color: #667eea;
            font-weight: 700;
            font-size: 0.9rem;
        }
        
        @media (max-width: 768px) {
            .timeline-container {
                max-width: 100%;
            }

            .timeline-line {
                left: 20px;
            }
            
            .timeline-item {
                flex-direction: row !important;
            }
            
            .timeline-dot {
                left: 20px;
            }
            
            .timeline-content {
                margin-left: 50px;
                margin-right: 0;
            }
        }

        /* Back to Top Button */
        .back-to-top {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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

        @media (max-width: 768px) {
            .back-to-top {
                bottom: 90px; /* Adjust for bottom nav */
            }
        }
        
        /* Contact Form Styles */
        .contact-form {
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
        .form-group textarea:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.3);
        }
        
        .star-rating {
            display: flex;
            flex-direction: row-reverse;
            justify-content: flex-end;
        }
        
        .star-rating input[type="radio"] {
            display: none;
        }
        
        .star-rating label {
            font-size: 2.5rem;
            color: #a0aec0;
            cursor: pointer;
            transition: color 0.2s ease;
            padding: 0 0.15rem;
        }
        
        .star-rating input[type="radio"]:checked ~ label {
            color: #667eea;
        }
        
        .star-rating label:hover,
        .star-rating label:hover ~ label {
            color: #667eea;
        }
        
        .btn-primary {
            padding: 0.75rem 2rem;
            border-radius: 8px;
            text-decoration: none;
            transition: all 0.3s ease;
            background: #667eea;
            color: white;
            font-weight: 600;
        }
        
        .btn-primary:hover {
            background: #5a67d8;
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
            color: #667eea;
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
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes pulse {
            0%, 100% {
                opacity: 1;
                transform: scale(1);
            }
            50% {
                opacity: 0.5;
                transform: scale(1.1);
            }
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
            
            .hero h1 {
                font-size: 2.5rem;
            }
            
            .path-selection {
                flex-direction: column;
                width: 100%;
            }
            
            .path-btn {
                width: 100%;
            }
            
            .project-grid {
                grid-template-columns: 1fr;
            }
            
            .skills-grid {
                grid-template-columns: 1fr;
            }
            
            .about-content {
                grid-template-columns: 1fr;
            }
            
            .contact-grid {
                grid-template-columns: 1fr; /* Stack on mobile */
            }
            
            .tab-nav {
                overflow-x: auto;
                justify-content: flex-start;
                flex-wrap: nowrap;
            }
            
            .modal-content {
                width: 95%;
                padding: 1rem;
            }
            
            .modal-content iframe {
                height: 400px;
            }
        }
        
        /* --- LIGHT THEME (Improved Visibility) --- */
        body.light-theme {
            background: linear-gradient(135deg, #f0f4f8 0%, #e2e8f0 100%);
            color: #1a202c; /* Darker primary text */
            transition: all 1s ease;
        }
        
        body.light-theme nav {
            background: rgba(255, 255, 255, 0.95);
            border-color: rgba(102, 126, 234, 0.3);
        }
        
        body.light-theme .nav-links a {
            color: #2d3748; /* Darker link text */
        }
        
        body.light-theme .nav-links a:hover {
            color: #667eea;
            background: rgba(102, 126, 234, 0.1);
        }
        
        body.light-theme .hero-subtitle,
        body.light-theme .project-description,
        body.light-theme .about-text p, /* Target P tags for better visibility */
        body.light-theme .skill-list,
        body.light-theme .contact-details { 
            color: #2d3748; /* Ensure body text is very visible */
        }
        
        body.light-theme .project-card,
        body.light-theme .skill-category,
        body.light-theme .contact-item,
        body.light-theme .contact-form,
        body.light-theme .stat-box,
        body.light-theme .timeline-content {
            background: #ffffff; /* Pure white background for cards */
            border: 1px solid rgba(102, 126, 234, 0.2);
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        }

        body.light-theme .timeline-dot {
            border-color: #f0f4f8;
        }
        
        body.light-theme .project-title,
        body.light-theme .skill-name {
            color: #1a202c;
        }
        
        body.light-theme .form-group input,
        body.light-theme .form-group textarea {
            background: #f8fafc; /* Very light gray input */
            color: #2d3748;
            border-color: rgba(102, 126, 234, 0.3);
        }

        body.light-theme .theme-toggle {
            background: rgba(0, 0, 0, 0.05);
            color: #2d3748;
            border-color: rgba(0, 0, 0, 0.1);
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
            <li><a href="#home" onclick="showHome(event)"><span class="nav-icon">🏠</span><span class="nav-text">Home</span></a></li>
            <li><a href="#content-area" data-trigger="academic"><span class="nav-icon">🎓</span><span class="nav-text">Academic</span></a></li>
            <li><a href="#content-area" data-trigger="professional"><span class="nav-icon">💼</span><span class="nav-text">Professional</span></a></li>
            <li><a href="#" onclick="showContact(event)"><span class="nav-icon">📧</span><span class="nav-text">Contact</span></a></li>
        </ul>
        
        <div class="theme-controls-container">
            <div class="theme-selector">
                <div class="theme-option theme-intelligence active" onclick="changeTheme('intelligence')" title="Current Colors"></div>
                <div class="theme-option theme-thunder" onclick="changeTheme('thunder')" title="OKC Thunder"></div>
                <div class="theme-option theme-retro" onclick="changeTheme('retro')" title="Retro Alien (Green/Black)"></div>
                <div class="theme-option theme-steelers" onclick="changeTheme('steelers')" title="Pittsburgh Steelers"></div>
                <div class="theme-option theme-lakers" onclick="changeTheme('lakers')" title="Lakers"></div>
                <div class="theme-option theme-sunny" onclick="changeTheme('sunny')" title="Lighter Sunny Yellow"></div>
            </div>
            <button class="theme-toggle" onclick="toggleTheme()">🌙 Dark Mode</button>
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
    
    <section class="content-section" id="content-area" style="display: none;">
        <div class="container">
        </div>
    </section>
                            
    <section class="content-section" id="contact" style="display: none;"> <div class="container">
        <h2 class="section-title">Get In Touch</h2>
            <div class="contact-grid">
            <div>
            <div class="contact-form">
                <h3 style="color: #fff; margin-bottom: 1.5rem;">Send a Message</h3>
                <form id="feedback-form">
                    <div class="form-group">
                    <label for="name">Name</label>
                        <input type="text" id="name" name="name" required>
                        </div>
                        <div class="form-group">
                            <label for="contact-info">Email or Phone</label>
                            <input type="text" id="contact-info" name="contact-info" required>
                        </div>
                        <div class="form-group">
                        <label for="reason">Reason for Inquiry</label>
                            <textarea id="reason" name="reason" rows="4" required></textarea>
                            </div>
                            
                            <h4 style="color: #fff; margin-top: 2rem; margin-bottom: 1rem;">Site Feedback (Optional)</h4>
                                <div class="star-rating">
                                <input type="radio" id="5-stars" name="rating" value="5" /><label for="5-stars">☆</label>
                                <input type="radio" id="4-stars" name="rating" value="4" /><label for="4-stars">☆</label>
                                    <input type="radio" id="3-stars" name="rating" value="3" /><label for="3-stars">☆</label>
                                    <input type="radio" id="2-stars" name="rating" value="2" /><label for="2-stars">☆</label>
                                    <input type="radio" id="1-star" name="rating" value="1" /><label for="1-star">☆</label>
                                    </div>
                                    <div class="form-group" style="margin-top: 1rem;">
                                        <label for="notes">Notes</label>
                                        <textarea id="notes" name="notes" rows="3"></textarea>
                                        </div>
                                        
                                        <button type="submit" class="btn-primary" style="width: 100%; margin-top: 1.5rem; border: none; cursor: pointer;">Submit Inquiry</button>
                                    </form>
                                    </div>
                                    </div>
                                    
                                    <div>
                                    <div class="availability-status">
                                        <div class="status-indicator">
                                        <span class="status-dot"></span>
                                            <span class="status-text">OPEN TO OPPORTUNITIES</span>
                                            </div>
                                            <p style="color: #cbd5e0; margin-bottom: 1rem;">Currently seeking: Cleared intelligence analyst or economics research roles</p>
                                            <p style="color: #a0aec0; font-size: 0.9rem;">📧 Response time: < 24 hours</p>
                                                <p style="color: #a0aec0; font-size: 0.9rem;">🔒 TS/SCI: Transferable through 2027</p>
                                                <p style="color: #a0aec0; font-size: 0.9rem;">📅 Available: Immediate</p>
                                                    <p style="color: #a0aec0; font-size: 0.9rem; margin-top: 1rem;">Last updated: January 2025</p>
                                                    </div>
                                                    
                                                    <div class="contact-info" style="margin-top: 2rem;">
                                                        <div class="contact-item">
                                                        <span class="contact-icon">🔗</span>
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
                                                                                <p id="catchphrase">&copy; 2025 JeQa Powe | Built with passion and precision</p>
                                                                                <p style="color: #4a5568; font-size: 0.8rem; font-style: italic; margin-top: 0.5rem;">
                                                                                    Hint: Try the Konami Code (↑↑↓↓←→←→BA) 🎮
                                                                                </p>
                                                                                <div class="social-links">
                                                                                <a href="https://linkedin.com/in/jeqapowe" class="social-link" target="_blank">💼</a>
                                                                                <a href="https://github.com/your-username" class="social-link" target="_blank">💻</a>
                                                                                <a href="mailto:JeQa.Powe@outlook.com" class="social-link">📧</a>
                                                                                </div>
                                                                                <p style="margin-top: 1rem; font-size: 0.9rem;">Last updated: January 2025</p>
                                                                                </div>
                                                                                </footer>
                                                                                
    <script>
        // Network Background Animation (Unchanged)
        class NetworkBackground {
            // ... (rest of the class code is unchanged)
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
                
                // Pause animation when tab not visible
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
                
                if (!this.isActive) {
                    return;
                }
                
                const now = Date.now();
                const elapsed = now - this.then;
                
                if (elapsed <= this.fpsInterval) {
                    return;
                }
                
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
        
        // Initialize network background
        new NetworkBackground();
        
        // Rotating Statistics (Unchanged)
        let currentStatIndex = 0;
        const statItems = document.querySelectorAll('.stat-item');
        
        function rotateStats() {
            statItems[currentStatIndex].classList.remove('active');
            currentStatIndex = (currentStatIndex + 1) % statItems.length;
            statItems[currentStatIndex].classList.add('active');
        }
        
        setInterval(rotateStats, 3000);
        
        // Theme Toggle (Unchanged)
        function toggleTheme() {
            document.body.classList.toggle('light-theme');
            const themeBtn = document.querySelector('.theme-toggle');
            if (document.body.classList.contains('light-theme')) {
                themeBtn.textContent = '☀️ Light Mode';
            } else {
                themeBtn.textContent = '🌙 Dark Mode';
            }
        }
        
        // Theme Selector (Updated Theme Names/Colors)
        function changeTheme(theme) {
            // Remove all theme classes
            document.body.classList.remove('theme-thunder', 'theme-retro', 'theme-steelers', 'theme-lakers', 'theme-sunny');
            
            // Add new theme if not default ('intelligence')
            if (theme !== 'intelligence') {
                document.body.classList.add(`theme-${theme}`);
            }
            
            // Update active indicator
            document.querySelectorAll('.theme-option').forEach(opt => opt.classList.remove('active'));
            document.querySelector(`.theme-${theme}`).classList.add('active');
            
            // Save preference
            localStorage.setItem('preferredTheme', theme);
        }
        
        // Global var for stat rotator
        let professionalStatInterval;
        
        // Custom function to show Home Section (Updated to ensure content re-displays)
        function showHome(event) {
            event.preventDefault();
            // Hide content and contact
            document.getElementById('content-area').style.display = 'none';
            document.getElementById('contact').style.display = 'none';
            // Show home
            document.getElementById('home').style.display = 'flex';
            
            // Scroll to top of home
            document.getElementById('home').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
        
        // Custom function to show Contact Section
        function showContact(event) {
            event.preventDefault();
            
            // Hide all other sections
            document.getElementById('content-area').style.display = 'none';
            document.getElementById('home').style.display = 'none';

            // Show contact section
            const contactSection = document.getElementById('contact');
            contactSection.style.display = 'block';
            
            contactSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
        
        // Load Content Based on Path Selection (MODIFIED CONTENT)
        function loadContent(path) {
            const contentArea = document.getElementById('content-area');
            const container = contentArea.querySelector('.container');
            
            // Clear previous interval if it exists
            if (professionalStatInterval) {
                clearInterval(professionalStatInterval);
            }

            // Hide contact section and home
            document.getElementById('contact').style.display = 'none';
            document.getElementById('home').style.display = 'none';

            contentArea.style.display = 'block';
            
            // --- ACADEMIC CONTENT ---
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
                                Quantitative analysis of economic pressures facing small-scale agricultural producers. 
                                Utilized panel data regression and time-series analysis. Policy recommendations for supporting agricultural economic development.
                                </p>
                                <p style="color: #667eea; font-weight: 600;">Presented to: National Economic Council, American Economic Association</p>
                                <div class="project-links" style="margin-top: 1rem;">
                                    <a href="https://Tenken73.github.io/Powe JeQa Economy v small Farmers aeasp 2023.pdf" target="_blank" class="project-link">→ View Full Paper</a>
                                </div>
                            </div>
                        </div>
                        
                        <div class="project-card" style="margin-bottom: 1.5rem;">
                            <div class="project-info">
                                <h3 class="project-title">"Who Lives Near Powerplants? (Environmental Justice Analysis)"</h3>
                                <p style="color: #a0aec0; margin-bottom: 0.5rem;">2022</p>
                                <p class="project-description">
                                Spatial econometric analysis examining demographic patterns and environmental justice related to coal power plant locations. 
                                Applied hedonic pricing models and spatial regression techniques. 
                                Utilized ArcGIS for spatial data visualization and kernel density estimation.
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
                            <div class="project-card">
                                <img src="https://inomics.com/sites/default/files/styles/article_full_responsive/public/pictures/picture/economists-on-a-date-meme.jpeg?itok=G4-n3cna" alt="Economists on a date meme" classclass="project-image">
                                <div class="project-info">
                                    <h3 class="project-title">Anime Analysis Dashboard (Coming Soon)</h3>
                                    <p class="project-description">
                                        Exploratory data analysis using R Shiny to visualize community ratings, genre trends, and sentiment.
                                    </p>
                                    <div class="tech-tags">
                                        <span class="tech-tag">R Shiny</span>
                                        <span class="tech-tag">RPostgres</span>
                                        <span class="tech-tag">Data Viz</span>
                                        <span class="tech-tag">pytrends</span>
                                    </div>
                                    <div class="project-links">
                                        <a href="#" class="project-link">Live Demo</a>
                                        <a href="#" class="project-link">Code</a>
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
            
            // --- PROFESSIONAL CONTENT ---
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
                                    Adaptable veteran with more than a decade in information technology support, team leadership, and anaylsis. 
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
                            
                            <div class="about-stats" style="margin-bottom: 3rem;">
                                <div class="stat-box">
                                    <div class="stat-box-number" id="stat-num-1">5+</div>
                                    <div class="stat-box-label" id="stat-label-1">Years Analyst Experience</div>
                                </div>
                                <div class="stat-box">
                                    <div class="stat-box-number" id="stat-num-2">$2M+</div>
                                    <div class="stat-box-label" id="stat-label-2">Cost Savings ID'd</div>
                                </div>
                                <div class="stat-box">
                                    <div class="stat-box-number" id="stat-num-3">40%</div>
                                    <div class="stat-box-label" id="stat-label-3">Accuracy Improvement</div>
                                </div>
                                <div class="stat-box">
                                    <div class="stat-box-number" id="stat-num-4">85%</div>
                                    <div class="stat-box-label" id="stat-label-4">Global Workstation Upgrade</div>
                                </div>
                            </div>

                            <div class="about-text" style="max-width: 900px; margin: 0 auto 3rem auto; text-align: left;">
                                <h3 style="color: #667eea; margin-bottom: 1rem;">Professional Profile</h3>
                                <p>With over 10 years of combined experience in IT support, military leadership, and quantitative analysis, I bring a unique blend of technical expertise and strategic problem-solving. My background as an IT professional and veteran supporting federal environments provides a robust foundation for my analytical work.</p>
                                <p>My core technical skills are in Python, R, SQL, and geospatial tools like ArcGIS, which I've used to build and deploy machine learning pipelines. I am focused on leveraging these skills to tackle complex challenges in intelligence and economics, with a goal of driving operational efficiency and uncovering actionable insights from complex data.</p>
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
                    statIndex++;
                    updateStatBox('stat-num-1', 'stat-label-1', stats);
                    updateStatBox('stat-num-2', 'stat-label-2', stats2);
                    updateStatBox('stat-num-3', 'stat-label-3', stats3);
                    updateStatBox('stat-num-4', 'stat-label-4', stats4);
                }, 3000);
            }
            
            document.getElementById('content-area').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
            
            addModalListeners();
        }
        
        // Tab Switching Logic (Unchanged)
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
        
        // Contact Form Handler (Unchanged)
        function handleContactSubmit(event) {
            event.preventDefault();
            const form = event.target;
            const name = form.name.value;
            const contact = form['contact-info'].value;
            const reason = form.reason.value;
            
            let rating = "No rating";
            if (form.rating.value) {
                rating = `${form.rating.value} stars`;
            }
            const notes = form.notes.value || "No notes";
            
            const subject = `Portfolio Inquiry from ${name}`;
            const body = `
        Name: ${name}
        Contact: ${contact}
        Reason: ${reason}

        --- Feedback ---
        Rating: ${rating}
        Notes: ${notes}
                    `;
            
            const mailtoLink = `mailto:JeQa.Powe@outlook.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            window.location.href = mailtoLink;
        }

        // DOMContentLoaded
        document.addEventListener('DOMContentLoaded', () => {
            // Load saved theme
            const savedTheme = localStorage.getItem('preferredTheme') || 'intelligence';
            changeTheme(savedTheme);

            // Rotating Catchphrase (Unchanged)
            const catchphrases = [
                "Positivity & Purpose", "Progress over perfection", "The work is the reward", 
                "Small steps, big impact", "Stay planted, keep growing", "Purpose fuels persistence",
                "Gratitude unlocks clarity", "Listen more, assume less", "Questions reveal truth",
                "Patterns tell stories", "Context changes everything", "Numbers need narratives",
                "History informs futures", "Build don't critique", "Iterate, don't hesitate",
                "Curiosity compounds", "Ideas need execution", "Create what you need",
                "Make space for new thoughts", "Setbacks sharpen skills",
                "Your story isn't over", "Rest, don't quit", "Struggle reveals strength",
                "The mission is bigger than me"
            ];
            const catchphraseEl = document.getElementById('catchphrase');
            if (catchphraseEl) {
                const randomPhrase = catchphrases[Math.floor(Math.random() * catchphrases.length)];
                catchphraseEl.textContent = `© 2025 JeQa Powe | ${randomPhrase}`;
            }
            
            // Scroll Progress Bar (Unchanged)
            const progressBar = document.getElementById('scroll-progress');
            window.addEventListener('scroll', () => {
                const scrollTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrollPercent = (window.scrollY / scrollTotal) * 100;
                progressBar.style.height = `${scrollPercent}%`;
            });
            
            // Smooth scroll for nav links
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', function(e) {
                    if (this.dataset.trigger || this.textContent.includes('Contact')) return; // Handled by Academic/Pro/Contact click
                    
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetSection = document.querySelector(targetId);
                    if (targetSection) {
                        targetSection.scrollIntoView({ 
                            behavior: 'smooth',
                            block: 'start'
                        });
                        
                        // Ensure other sections are hidden if returning to home
                        document.getElementById('content-area').style.display = 'none';
                        document.getElementById('contact').style.display = 'none';

                    }
                });
            });

            // Handle Academic/Professional nav clicks (Unchanged)
            document.querySelectorAll('.nav-links a[data-trigger]').forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const path = this.dataset.trigger;
                    loadContent(path);
                });
            });
            
            // Back to top button visibility (Unchanged)
            window.addEventListener('scroll', () => {
                const backToTop = document.querySelector('.back-to-top');
                if (backToTop) {
                    if (window.scrollY > 500) {
                        backToTop.classList.add('visible');
                    } else {
                        backToTop.classList.remove('visible');
                    }
                }
            });

            // Contact Form (Unchanged)
            const contactForm = document.getElementById('feedback-form');
            if (contactForm) {
                contactForm.addEventListener('submit', handleContactSubmit);
            }
            
            // ENTP Easter Egg: Konami Code (Unchanged)
            let konamiCode = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
            let konamiIndex = 0;
            
            document.addEventListener('keydown', (e) => {
                if (e.key === konamiCode[konamiIndex]) {
                    konamiIndex++;
                    if (konamiIndex === konamiCode.length) {
                        activateSecretMode();
                        konamiIndex = 0;
                    }
                } else {
                    konamiIndex = 0;
                }
            });
            
            function activateSecretMode() {
                try {
                    document.getElementById('secret-sound').play();
                } catch (e) {
                    console.log("Audio play failed (user interaction needed)");
                }
                
                const msg = document.createElement('div');
                msg.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: linear-gradient(135deg, #1a202c 0%, #0a0e27 100%);
                    color: white;
                    padding: 2rem 2rem;
                    border-radius: 12px;
                    font-size: 1.5rem;
                    font-weight: 700;
                    z-index: 10000;
                    animation: fadeInUp 0.5s ease;
                    box-shadow: 0 20px 60px rgba(102, 126, 234, 0.8);
                    text-align: center;
                    border: 1px solid #667eea;
                `;
                
                msg.innerHTML = `
                    <h2 style="color: #667eea; margin-bottom: 1rem;">SECRET FOUND!</h2>
                    <img src="https://inomics.com/sites/default/files/styles/article_full_responsive/public/pictures/picture/economists-on-a-date-meme.jpeg?itok=G4-n3cna" style="width: 100%; max-width: 500px; border-radius: 8px;">
                `;
                document.body.appendChild(msg);
                
                setTimeout(() => {
                    msg.remove();
                }, 3500);
            }
        });
        
    </script>
</body>
</html>
