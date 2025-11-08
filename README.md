#awesum
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JeQa Powe | Quantitative Analyst</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
    <style>
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
            right: 0;
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
        
        /* Navigation */
        nav {
            position: fixed;
            left: 0;
            top: 0;
            height: 100vh;
            width: 80px;
            background: rgba(10, 14, 39, 0.95);
            backdrop-filter: blur(10px);
            padding: 2rem 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 3rem;
            border-right: 1px solid rgba(102, 126, 234, 0.2);
            z-index: 100;
            transition: width 0.3s ease;
        }
        
        nav:hover {
            width: 200px;
        }
        
        .logo {
            font-size: 1.5rem;
            font-weight: 700;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            writing-mode: vertical-rl;
            transform: rotate(180deg);
        }
        
        nav:hover .logo {
            writing-mode: horizontal-tb;
            transform: rotate(0deg);
        }
        
        .nav-links {
            display: flex;
            flex-direction: column;
            gap: 2rem;
            list-style: none;
        }
        
        .nav-links a {
            color: #a0aec0;
            text-decoration: none;
            transition: color 0.3s ease;
            font-weight: 500;
            white-space: nowrap;
            overflow: hidden;
            width: 0;
            opacity: 0;
            transition: all 0.3s ease;
        }
        
        nav:hover .nav-links a {
            width: auto;
            opacity: 1;
        }
        
        .nav-links li {
            display: flex;
            align-items: center;
        }
        
        .nav-links li::before {
            content: '▸';
            color: #667eea;
            margin-right: 0.5rem;
        }

        /* Adjust content for left nav */
        .hero, .content-section, footer {
            margin-left: 80px;
        }
        
        @media (max-width: 768px) {
            .hero, .content-section, footer {
                margin-left: 0;
            }
        }
        
        .theme-toggle {
            background: rgba(255, 255, 255, 0.1);
            border: none;
            color: #fff;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .theme-toggle:hover {
            background: rgba(102, 126, 234, 0.3);
        }
        
        /* Hamburger Menu */
        .hamburger {
            display: none;
            flex-direction: column;
            gap: 4px;
            cursor: pointer;
            padding: 0.5rem;
            background: none;
            border: none;
        }
        
        .hamburger span {
            width: 25px;
            height: 3px;
            background: #667eea;
            transition: all 0.3s ease;
            display: block;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        /* Theme Selector */
        .theme-selector {
            position: fixed;
            top: 50%;
            right: 2rem;
            transform: translateY(-50%);
            background: rgba(10, 14, 39, 0.95);
            backdrop-filter: blur(10px);
            padding: 1rem;
            border-radius: 12px;
            border: 1px solid rgba(102, 126, 234, 0.2);
            z-index: 99;
        }
        
        .theme-option {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin: 0.5rem 0;
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
        
        /* Theme: Default Intelligence */
        .theme-intelligence { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
        
        /* Theme: OKC Thunder */
        .theme-thunder { background: linear-gradient(135deg, #007ac1 0%, #ef3b24 100%); }
        
        /* Theme: Destiny 2 */
        .theme-destiny { background: linear-gradient(135deg, #1c3b54 0%, #f4a21d 100%); }
        
        /* Theme: Samurai */
        .theme-samurai { background: linear-gradient(135deg, #2d1b00 0%, #8b0000 100%); }
        
        /* Theme: Tech Green */
        .theme-tech { background: linear-gradient(135deg, #10b981 0%, #059669 100%); }
        
        /* Theme: Hip Hop */
        .theme-hiphop { background: linear-gradient(135deg, #1f1f1f 0%, #fbbf24 100%); }
        
        /* Apply active theme to body */
        body.theme-thunder { background: linear-gradient(135deg, #001f3f 0%, #1a1f3a 100%); }
        body.theme-thunder .stat-number, body.theme-thunder .nav-links a:hover { color: #007ac1; }
        
        body.theme-destiny { background: linear-gradient(135deg, #0a1628 0%, #1a2332 100%); }
        body.theme-destiny .stat-number { color: #f4a21d; }
        
        body.theme-samurai { background: linear-gradient(135deg, #1a0a00 0%, #2d1b0a 100%); }
        body.theme-samurai .stat-number { color: #dc2626; }
        
        body.theme-tech { background: linear-gradient(135deg, #064e3b 0%, #1a3a2e 100%); }
        body.theme-tech .stat-number { color: #10b981; }
        
        body.theme-hiphop { background: linear-gradient(135deg, #000000 0%, #1f1f1f 100%); }
        body.theme-hiphop .stat-number { color: #fbbf24; }

        /* Hero Section */
        .hero {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 4rem 0;
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
        
        .skill-item {
            margin-bottom: 1rem;
        }
        
        .skill-name {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.5rem;
            color: #e2e8f0;
            font-size: 0.95rem;
        }
        
        .skill-bar {
            height: 8px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            overflow: hidden;
        }
        
        .skill-progress {
            height: 100%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 10px;
            transition: width 1s ease;
            width: 0;
        }
        
        .skill-progress.animate {
            width: var(--progress);
        }
        
        /* About Section */
        .about-content {
            display: grid;
            grid-template-columns: 1fr 2fr;
            gap: 3rem;
            align-items: center;
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
        }
        
        .about-text p {
            margin-bottom: 1rem;
        }
        
        .about-stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 2rem;
            margin-top: 2rem;
        }
        
        .stat-box {
            text-align: center;
            padding: 1.5rem;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 12px;
            border: 1px solid rgba(102, 126, 234, 0.1);
        }
        
        .stat-box-number {
            font-size: 2.5rem;
            font-weight: 700;
            color: #667eea;
            margin-bottom: 0.5rem;
        }
        
        .stat-box-label {
            color: #a0aec0;
            font-size: 0.9rem;
        }
        
        /* Contact Section */
        .contact-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
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
            border: 3px solid #0a0e27;
            z-index: 2;
        }
        
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
            .hamburger {
                display: flex;
            }
            
            .nav-links {
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                width: 100%;
                background: rgba(10, 14, 39, 0.98);
                flex-direction: column;
                padding: 2rem;
                gap: 1rem;
                border-top: 1px solid rgba(102, 126, 234, 0.2);
            }
            
            .nav-links.active {
                display: flex;
            }
            
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
                grid-template-columns: 1fr;
            }
            
            .tab-nav {
                overflow-x: auto;
                justify-content: flex-start;
            }
            
            .modal-content {
                width: 95%;
                padding: 1rem;
            }
            
            .modal-content iframe {
                height: 400px;
            }
        }
        
        /* Light Theme */
        body.light-theme {
            background: linear-gradient(135deg, #f0f4f8 0%, #e2e8f0 100%);
            color: #2d3748;
            transition: all 1s ease; /* ADD THIS LINE */
        }
        
        body.light-theme nav {
            background: rgba(255, 255, 255, 0.95);
            border-bottom: 1px solid rgba(102, 126, 234, 0.2);
        }
        
        body.light-theme .nav-links a {
            color: #4a5568;
        }
        
        body.light-theme .nav-links a:hover {
            color: #667eea;
        }
        
        body.light-theme .hero-subtitle,
        body.light-theme .project-description,
        body.light-theme .about-text {
            color: #4a5568;
        }
        
        body.light-theme .project-card,
        body.light-theme .skill-category,
        body.light-theme .contact-item,
        body.light-theme .contact-form {
            background: rgba(255, 255, 255, 0.8);
            border: 1px solid rgba(102, 126, 234, 0.2);
        }
        
        body.light-theme .project-title,
        body.light-theme .skill-name {
            color: #2d3748;
        }
        
        body.light-theme .form-group input,
        body.light-theme .form-group textarea {
            background: rgba(255, 255, 255, 0.5);
            color: #2d3748;
            border-color: rgba(102, 126, 234, 0.3);
        }
    </style>
</head>
<body>
    <div id="scroll-progress"></div>
    
    <canvas id="network-canvas"></canvas>
    
    <nav>
        <div class="logo">JeQa Powe</div>
        <ul class="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#content-area" data-trigger="academic">Academic</a></li>
            <li><a href="#content-area" data-trigger="professional">Professional</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
        <button class="hamburger" onclick="toggleMobileMenu()" aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
        </button>
        <button class="theme-toggle" onclick="toggleTheme()">🌙 Theme</button>
    </nav>
    
    <div class="theme-selector">
        <div class="theme-option theme-intelligence active" onclick="changeTheme('intelligence')" title="Intelligence (Default)"></div>
        <div class="theme-option theme-thunder" onclick="changeTheme('thunder')" title="OKC Thunder"></div>
        <div class="theme-option theme-destiny" onclick="changeTheme('destiny')" title="Destiny 2"></div>
        <div class="theme-option theme-samurai" onclick="changeTheme('samurai')" title="Samurai"></div>
        <div class="theme-option theme-tech" onclick="changeTheme('tech')" title="Tech Green"></div>
        <div class="theme-option theme-hiphop" onclick="changeTheme('hiphop')" title="Hip Hop"></div>
    </div>
    
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
            
            <div class="path-selection">
                <button class="path-btn academic" onclick="loadContent('academic')">
                    <span>🎓 Academic Research & CV</span>
                </button>
                <button class="path-btn professional" onclick="loadContent('professional')">
                    <span>💼 Professional Projects & Resume</span>
                </button>
            </div>
        </div>
    </section>
    
    <section class="content-section" id="content-area" style="display: none;">
        <div class="container">
        </div>
    </section>
    
    <section class="content-section" id="about">
        <div class="container">
            <h2 class="section-title">About Me</h2>
            <div class="about-content">
                <div>
                    <img src="https://via.placeholder.com/400x500" alt="JeQa Powe" class="profile-image">
                </div>
                <div>
                    <div class="about-text">
                        <p>I build data-driven solutions at the intersection of economics, intelligence analysis, and advanced computational methods. With an M.A. in Economics from Howard University and 5+ years deploying machine learning systems in defense and intelligence environments, I translate complex problems into actionable insights.</p>
  <p>Former DoD Research Operations Analyst (TS/SCI) specializing in network analysis, spatial econometrics, and cross-domain data integration. Expert in ArcGIS, Python, R, and geospatial intelligence applications.</p>
  <p>Economics researcher with presentations to National Economic Council and Federal Reserve Board.</p>
  </div>
  <div class="about-stats">
    <div class="stat-box">
      <div class="stat-box-number">5+</div>
        <div class="stat-box-label">Years Experience</div>
          </div>
          <div class="stat-box">
            <div class="stat-box-number">7</div>
              <div class="stat-box-label">Live Projects</div>
                </div>
                <div class="stat-box">
                  <div class="stat-box-number">$2M+</div>
                    <div class="stat-box-label">Impact Generated</div>
                      </div>
                      <div class="stat-box">
                        <div class="stat-box-number">40%</div>
                          <div class="stat-box-label">Accuracy Gain</div>
                            </div>
                            </div>
                            </div>
                            </div>
                            </div>
                            </section>
                            
                            <section class="content-section" id="contact">
                              <div class="container">
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
                                                                                                                          
                                                                                                                          // Rotating Statistics
                                                                                                                          let currentStatIndex = 0;
                                                                                                                          const statItems = document.querySelectorAll('.stat-item');
                                                                                                                          
                                                                                                                          function rotateStats() {
                                                                                                                            statItems[currentStatIndex].classList.remove('active');
                                                                                                                            currentStatIndex = (currentStatIndex + 1) % statItems.length;
                                                                                                                            statItems[currentStatIndex].classList.add('active');
                                                                                                                          }
                                                                                                                          
                                                                                                                          setInterval(rotateStats, 3000);
                                                                                                                          
                                                                                                                          // Theme Toggle
                                                                                                                          function toggleTheme() {
                                                                                                                            document.body.classList.toggle('light-theme');
                                                                                                                            const themeBtn = document.querySelector('.theme-toggle');
                                                                                                                            if (document.body.classList.contains('light-theme')) {
                                                                                                                              themeBtn.textContent = '☀️ Theme';
                                                                                                                            } else {
                                                                                                                              themeBtn.textContent = '🌙 Theme';
                                                                                                                            }
                                                                                                                          }
                                                                                                                          
                                                                                                                          // Theme Selector
                                                                                                                          function changeTheme(theme) {
                                                                                                                              // Remove all theme classes
                                                                                                                              document.body.classList.remove('theme-thunder', 'theme-destiny', 'theme-samurai', 'theme-tech', 'theme-hiphop');
                                                                                                                              
                                                                                                                              // Add new theme if not default
                                                                                                                              if (theme !== 'intelligence') {
                                                                                                                                  document.body.classList.add(`theme-${theme}`);
                                                                                                                              }
                                                                                                                              
                                                                                                                              // Update active indicator
                                                                                                                              document.querySelectorAll('.theme-option').forEach(opt => opt.classList.remove('active'));
                                                                                                                              document.querySelector(`.theme-${theme}`).classList.add('active');
                                                                                                                              
                                                                                                                              // Save preference
                                                                                                                              localStorage.setItem('preferredTheme', theme);
                                                                                                                          }
                                                                                                                          
                                                                                                                          // Mobile Menu Toggle
                                                                                                                          function toggleMobileMenu() {
                                                                                                                            document.querySelector('.nav-links').classList.toggle('active');
                                                                                                                            document.querySelector('.hamburger').classList.toggle('active');
                                                                                                                          }
                                                                                                                          
                                                                                                                          // Load Content Based on Path Selection
                                                                                                                          function loadContent(path) {
                                                                                                                            const contentArea = document.getElementById('content-area');
                                                                                                                            const container = contentArea.querySelector('.container');
                                                                                                                            
                                                                                                                            contentArea.style.display = 'block';
                                                                                                                            
                                                                                                                            if (path === 'academic') {
                                                                                                                              container.innerHTML = `
                                                                                                                              <h2 class="section-title">Academic Portfolio</h2>
                                                                                                                                
                                                                                                                                <div class="tab-container">
                                                                                                                                  <div class="tab-nav">
                                                                                                                                    <button class="tab-btn active" onclick="switchTab('research')">Research</button>
                                                                                                                                      <button class="tab-btn" onclick="switchTab('publications')">Publications</button>
                                                                                                                                        <button class="tab-btn" onclick="switchTab('projects-academic')">Projects</button>
                                                                                                                                          <button class="tab-btn" onclick="switchTab('cv')">CV</button>
                                                                                                                                            </div>
                                                                                                                                            
                                                                                                                                            <div id="research" class="tab-content active">
                                                                                                                                              <h3 style="color: #667eea; margin-bottom: 1.5rem;">Research Interests</h3>
                                                                                                                                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 2rem;">
                                                                                                                                                  <div>
                                                                                                                                                  <h4 style="color: #e2e8f0; margin-bottom: 1rem;">Methodological</h4>
                                                                                                                                                  <ul style="color: #a0aec0; line-height: 2;">
                                                                                                                                                      <li>Spatial Econometrics & GIS Integration</li>
                                                                                                                                                      <li>Causal Inference (DiD, RDD, IV)</li>
                                                                                                                                                      <li>Network Science & Graph Theory</li>
                                                                                                                                                      <li>Machine Learning for Social Science</li>
                                                                                                                                                      <li>Geospatial Analysis & Hotspot Detection</li>
                                                                                                                                                      <li>Time-Series & Panel Data Methods</li>
                                                                                                                                                      <li>Natural Language Processing</li>
                                                                                                                                                      <li>Agent-Based Modeling</li>
                                                                                                                                                  </ul>
                                                                                                                                                      </div>
                                                                                                                                                      <div>
                                                                                                                                                      <h4 style="color: #e2e8f0; margin-bottom: 1rem;">Substantive</h4>
                                                                                                                                                        <ul style="color: #a0aec0; line-height: 2;">
                                                                                                                                                          <li>Urban & Regional Economics</li>
                                                                                                                                                          <li>Agricultural & Food Systems</li>
                                                                                                                                                          <li>Environmental Justice & Equity</li>
                                                                                                                                                          <li>Economic Geography & Spatial Development</li>
                                                                                                                                                          <li>Defense & Intelligence Economics</li>
                                                                                                                                                          <li>Network Effects & Social Capital</li>
                                                                                                                                                          <li>Development Economics</li>
                                                                                                                                                        </ul>
                                                                                                                                                          </div>
                                                                                                                                                          </div>
                                                                                                                                                          
                                                                                                                                                          <h3 style="color: #667eea; margin-bottom: 1.5rem;">Research Experience</h3>
                                                                                                                                                            <div class="project-card" style="margin-bottom: 1.5rem;">
                                                                                                                                                              <div class="project-info">
                                                                                                                                                                <h3 class="project-title">Research Operations Analyst</h3>
                                                                                                                                                                  <p style="color: #a0aec0; margin-bottom: 1rem;">Joint Warfare Analysis Center (JWAC), DoD | June 2022 – March 2023</p>
                                                                                                                                                                    <p class="project-description">
                                                                                                                                                                      Conducted advanced quantitative research combining econometrics, machine learning, and network analysis in classified environment. 
                                                                                                                                                                    Collaborated with MIT Lincoln Laboratory data scientists on large language models for entity extraction. 
                                                                                                                                                                    Applied spatial econometric methods using ArcGIS Pro and developed predictive models integrating multi-source data.
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
                                                                                                                                                                      </div>
                                                                                                                                                                      
                                                                                                                                                                      <div id="publications" class="tab-content">
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
                                                                                                                                                                      </div>
                                                                                                                                                                      </div>
                                                                                                                                                                      
                                                                                                                                                                      <div class="project-card" style="margin-bottom: 1.5rem;">
                                                                                                                                                                      <div class="project-info">
                                                                                                                                                                      <h3 class="project-title">"Who Lives Near Powerplants?"</h3>
                                                                                                                                                                      <p style="color: #a0aec0; margin-bottom: 0.5rem;">2022</p>
                                                                                                                                                                      <p class="project-description">
                                                                                                                                                                      Spatial econometric analysis examining demographic patterns and environmental justice. 
                                                                                                                                                                    Applied hedonic pricing models and spatial regression techniques. 
                                                                                                                                                                    Utilized ArcGIS for spatial data visualization and kernel density estimation.
                                                                                                                                                                    </p>
                                                                                                                                                                      <p style="color: #667eea; font-weight: 600;">Presented to: Federal Reserve Board</p>
                                                                                                                                                                      <div class="project-links" style="margin-top: 1rem;">
                                                                                                                                                                      <a href="#" class="project-link">→ Interactive Dashboard</a>
                                                                                                                                                                      </div>
                                                                                                                                                                      </div>
                                                                                                                                                                      </div>
                                                                                                                                                                      
                                                                                                                                                                      <div class="project-card">
                                                                                                                                                                      <div class="project-info">
                                                                                                                                                                      <h3 class="project-title">"Economic Benefits of Urban Agriculture"</h3>
                                                                                                                                                                      <p style="color: #a0aec0; margin-bottom: 0.5rem;">Master's Thesis, Howard University | 2022</p>
                                    <p class="project-description">
                                        Original research utilizing difference-in-differences and spatial econometrics. 
                                        Analyzed property value impacts and community economic development. 
                                        Employed GIS network analysis and spatial autocorrelation methods.
                                    </p>
                                    <div class="project-links" style="margin-top: 1rem;">
                                        <a href="#" class="project-link">→ Impact Calculator</a>
                                        <a href="#" class="project-link">→ Full Thesis</a>
                                    </div>
                                </div>
                            </div>
                            
                            <h3 style="color: #667eea; margin: 2rem 0 1.5rem;">Conference Participation</h3>
                            <ul style="color: #a0aec0; line-height: 2;">
                                <li>Allied Social Sciences Association Conference (ASSA) | January 2025 | San Francisco, CA</li>
                                <li>Special Libraries Association (SLA) - Presenter | 2024 | Kingston, RI</li>
                                <li>American Economic Association Summer Pipeline - Presenter | 2022, 2023 | Washington, DC</li>
                                <li>Association for Public Policy Analysis & Management (APPAM) | 2022 | Washington, DC</li>
                                <li>ESRI Federal GIS Conference (FEDGIS) | 2022 | Washington, DC</li>
                            </ul>
                        </div>
                        
                        <div id="projects-academic" class="tab-content">
                            <h3 style="color: #667eea; margin-bottom: 1.5rem;">Research Portfolio & Code Samples</h3>
                            <p style="color: #a0aec0; margin-bottom: 2rem;">Interactive demonstrations of methodological approaches</p>
                            
                            <div class="project-grid">
                                <div class="project-card">
                                    <img src="https://via.placeholder.com/400x250" alt="Spatial Econometrics Dashboard" class="project-image">
                                    <div class="project-info">
                                        <h3 class="project-title">Spatial Econometrics Dashboard</h3>
                                        <p class="project-description">
                                            Interactive map with regression results, Moran's I statistics, and spatial autocorrelation visualization.
                                                                                                                                                                    </p>
                                                                                                                                                                      <div class="tech-tags">
                                                                                                                                                                      <span class="tech-tag">R Shiny</span>
                                                                                                                                                                      <span class="tech-tag">sf</span>
                                                                                                                                                                      <span class="tech-tag">spdep</span>
                                                                                                                                                                      <span class="tech-tag">leaflet</span>
                                                                                                                                                                      </div>
                                                                                                                                                                      <div class="project-links">
                                                                                                                                                                      <a href="#" class="project-link">Live Demo</a>
                                                                                                                                                                      <a href="#" class="project-link">Code</a>
                                                                                                                                                                      <a href="#" class="project-link">Methodology</a>
                                                                                                                                                                      </div>
                                                                                                                                                                      </div>
                                                                                                                                                                      </div>
                                                                                                                                                                      
                                                                                                                                                                      <div class="project-card">
                                                                                                                                                                      <img src="https://via.placeholder.com/400x250" alt="Urban Agriculture Calculator" class="project-image">
                                                                                                                                                                      <div class="project-info">
                                                                                                                                                                      <h3 class="project-title">Urban Agriculture Impact Calculator</h3>
                                                                                                                                                                      <p class="project-description">
                                                                                                                                                                      Economic impact estimator based on thesis research. Input city parameters, see predicted property value impacts.
                                                                                                                                                                    </p>
                                                                                                                                                                      <div class="tech-tags">
                                                                                                                                                                      <span class="tech-tag">R Shiny</span>
                                                                                                                                                                      <span class="tech-tag">Econometrics</span>
                                                                                                                                                                      <span class="tech-tag">ggplot2</span>
                                                                                                                                                                      </div>
                                                                                                                                                                      <div class="project-links">
                                                                                                                                                                      <a href="#" class="project-link">Live Tool</a>
                                                                                                                                                                      <a href="#" class="project-link">Paper</a>
                                                                                                                                                                      </div>
                                                                                                                                                                      </div>
                                                                                                                                                                      </div>
                                                                                                                                                                      
                                                                                                                                                                      <div class="project-card">
                                                                                                                                                                      <img src="https://via.placeholder.com/400x250" alt="DiD Simulator" class="project-image">
                                                                                                                                                                      <div class="project-info">
                                                                                                                                                                      <h3 class="project-title">Difference-in-Differences Simulator</h3>
                                                                                                                                                                      <p class="project-description">
                                                                                                                                                                      Educational tool showing parallel trends assumption, treatment effects, and statistical inference.
                                                                                                                                                                    </p>
                                                                                                                                                                      <div class="tech-tags">
                                                                                                                                                                      <span class="tech-tag">R</span>
                                                                                                                                                                      <span class="tech-tag">Causal Inference</span>
                                                                                                                                                                      <span class="tech-tag">Interactive</span>
                                                                                                                                                                      </div>
                                                                                                                                                                      <div class="project-links">
                                                                                                                                                                      <a href="#" class="project-link">Try It</a>
                                                                                                                                                                      <a href="#" class="project-link">Learn More</a>
                                                                                                                                                                      </div>
                                                                                                                                                                      </div>
                                                                                                                                                                      </div>
                                                                                                                                                                      
                                                                                                                                                                      <div class="project-card">
                                                                                                                                                                      <img src="https://via.placeholder.com/400x250" alt="Network Visualization" class="project-image">
                                                                                                                                                                      <div class="project-info">
                                                                                                                                                                      <h3 class="project-title">Network Analysis Visualizations</h3>
                                                                                                                                                                      <p class="project-description">
                                                                                                                                                                      Graph theory demonstrations with centrality calculations and community detection algorithms.
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
                                                                                                                                                                      
                                                                                                                                                                      <div class="project-card">
                                                                                                                                                                      <img src="https://via.placeholder.com/400x250" alt="Report Generation" class="project-image">
                                                                                                                                                                      <div class="project-info">
                                                                                                                                                                      <h3 class="project-title">Automated Report Generation</h3>
                                                                                                                                                                      <p class="project-description">
                                                                                                                                                                      R Markdown templates for reproducible research reports with parameterized outputs.
                                                                                                                                                                    </p>
                                                                                                                                                                      <div class="tech-tags">
                                                                                                                                                                      <span class="tech-tag">R Markdown</span>
                                                                                                                                                                      <span class="tech-tag">knitr</span>
                                                                                                                                                                      <span class="tech-tag">LaTeX</span>
                                                                                                                                                                      </div>
                                                                                                                                                                      <div class="project-links">
                                                                                                                                                                      <a href="#" class="project-link">Templates</a>
                                                                                                                                                                      <a href="#" class="project-link">Examples</a>
                                                                                                                                                                      </div>
                                                                                                                                                                      </div>
                                                                                                                                                                      </div>
                                                                                                                                                                      
                                                                                                                                                                      <div class="project-card">
                                                                                                                                                                      <img src="https://via.placeholder.com/400x250" alt="Literature Network" class="project-image">
                                                                                                                                                                      <div class="project-info">
                                                                                                                                                                      <h3 class="project-title">Literature Review Network Map</h3>
                                                                                                                                                                      <p class="project-description">
                                                                                                                                                                      Citation network visualization showing connections between economic research papers.
                                                                                                                                                                    </p>
                                                                                                                                                                      <div class="tech-tags">
                                                                                                                                                                      <span class="tech-tag">D3.js</span>
                                                                                                                                                                      <span class="tech-tag">Bibliometrics</span>
                                                                                                                                                                      <span class="tech-tag">Interactive</span>
                                                                                                                                                                      </div>
                                                                                                                                                                      <div class="project-links">
                                                                                                                                                                      <a href="#" class="project-link">Explore</a>
                                                                                                                                                                      </div>
                                                                                                                                                                      </div>
                                                                                                                                                                      </div>
                                                                                                                                                                      </div>
                                                                                                                                                                      </div>
                                                                                                                                                                      
                                                                                                                                                                      <div id="cv" class="tab-content">
                                                                                                                                                                      <div style="text-align: center; margin-bottom: 2rem;">
                                                                                                                                                                      <a href="JeQa Powe cv.pdf" target="_blank" style="display: inline-block; padding: 1rem 3rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: 600; transition: all 0.3s ease;">
                                                                                                                                                                      📄 Download Full Academic CV (PDF)
                                                                                                                                                                    </a>
                                                                                                                                                                      </div>
                                                                                                                                                                      
                                                                                                                                                                      <div style="background: rgba(255, 255, 255, 0.05); padding: 2rem; border-radius: 12px; border: 1px solid rgba(102, 126, 234, 0.2);">
                                                                                                                                                                      <h3 style="color: #667eea; margin-bottom: 1.5rem;">Curriculum Vitae Summary</h3>
                                                                                                                                                                      
                                                                                                                                                                      <h4 style="color: #e2e8f0; margin: 1.5rem 0 1rem;">Education</h4>
                                                                                                                                                                      <p style="color: #a0aec0; line-height: 1.8;">
                                                                                                                                                                      <strong>M.A. Economics</strong> | Howard University | December 2022<br>
                                                                                                                                                                      Thesis: Economic Benefits of Urban Agriculture<br><br>
                                                                                                                                                                      <strong>Post-Graduate Coursework</strong> | UC San Diego | Spring 2025<br>
                                                                                                                                                                      Linear Algebra, Multivariate Calculus<br><br>
                                                                                                                                                                      <strong>B.S. Food & Resource Economics</strong> | University of Florida | December 2020<br>
                                                                                                                                                                      Minor: International Disaster Development
                                                                                                                                                                    </p>
                                                                                                                                                                      
                                                                                                                                                                      <h4 style="color: #e2e8f0; margin: 1.5rem 0 1rem;">Fellowships & Honors</h4>
                                                                                                                                                                      <p style="color: #a0aec0; line-height: 1.8;">
                                                                                                                                                                      <strong>Frederic Basquiat Fellowship</strong> | Mercatus Center at George Mason University | 2022-2023<br>
                                                                                                                                                                      Competitive fellowship supporting emerging scholars in economics and public policy research
                                                                                                                                                                    </p>
                                                                                                                                                                      
                                                                                                                                                                      <h4 style="color: #e2e8f0; margin: 1.5rem 0 1rem;">Professional Affiliations</h4>
                                                                                                                                                                      <p style="color: #a0aec0; line-height: 1.8;">
                                                                                                                                                                      American Economic Association (AEA)<br>
                                                                                                                                                                      Graduate Economic Student Association (GESA), Howard University<br>
                                                                                                                                                                      Howard University Economic Development & Data Analysis (HUEDDA)
                                                                                                                                                                    </p>
                                                                                                                                                                      </div>
                                                                                                                                                                      </div>
                                                                                                                                                                      </div>
                                                                                                                                                                      `;
                                                                                                                            } else if (path === 'professional') {
                                                                                                                              container.innerHTML = `
                                                                                                                              <h2 class="section-title">Professional Portfolio</h2>
                                                                                                                                
                                                                                                                                <div class="tab-container">
                                                                                                                                  <div class="tab-nav">
                                                                                                                                    <button class="tab-btn active" onclick="switchTab('overview')">Overview</button>
                                                                                                                                      <button class="tab-btn" onclick="switchTab('projects-pro')">Projects</button>
                                                                                                                                        <button class="tab-btn" onclick="switchTab('skills')">Skills</button>
                                                                                                                                          <button class="tab-btn" onclick="switchTab('resume')">Resume</button>
                                                                                                                                            </div>
                                                                                                                                            
                                                                                                                                            <div id="overview" class="tab-content active">
                                                                                                                                              <div class="about-stats" style="margin-bottom: 3rem;">
                                                                                                                                                <div class="stat-box">
                                                                                                                                                  <div class="stat-box-number">5+</div>
                                                                                                                                                    <div class="stat-box-label">Years Experience</div>
                                                                                                                                                      </div>
                                                                                                                                                      <div class="stat-box">
                                                                                                                                                        <div class="stat-box-number">40%</div>
                                                                                                                                                          <div class="stat-box-label">Accuracy Improvement</div>
                                                                                                                                                            </div>
                                                                                                                                                            <div class="stat-box">
                                                                                                                                                              <div class="stat-box-number">$2M+</div>
                                                                                                                                                                <div class="stat-box-label">Cost Savings ID'd</div>
                                </div>
                                <div class="stat-box">
                                    <div class="stat-box-number">75%</div>
                                    <div class="stat-box-label">Process Reduction</div>
                                </div>
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
                            </div>
                            
                            <h3 style="color: #667eea; margin-bottom: 1.5rem;">Key Experience</h3>
                            
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

                            <h3 style="color: #667eea; margin: 3rem 0 1.5rem;">Career Timeline</h3>
                            <div class="timeline-container">
                                <div class="timeline-line"></div>
                                
                                <div class="timeline-item">
                                    <div class="timeline-year">2025</div>
                                    <div class="timeline-dot"></div>
                                    <div class="timeline-content">
                                        <h4 style="color: #fff; margin-bottom: 0.5rem;">Data Analyst III</h4>
                                        <p style="color: #a0aec0;">Naval Surface Warfare Center</p>
                                    </div>
                                </div>
                                
                                <div class="timeline-item">
                                    <div class="timeline-year">2023</div>
                                    <div class="timeline-dot"></div>
                                    <div class="timeline-content">
                                        <h4 style="color: #fff; margin-bottom: 0.5rem;">Research Operations Analyst</h4>
                                        <p style="color: #a0aec0;">JWAC, Department of Defense</p>
                                    </div>
                                </div>
                                
                                <div class="timeline-item">
                                    <div class="timeline-year">2022</div>
                                    <div class="timeline-dot"></div>
                                    <div class="timeline-content">
                                        <h4 style="color: #fff; margin-bottom: 0.5rem;">M.A. Economics</h4>
                                        <p style="color: #a0aec0;">Howard University</p>
                                    </div>
                                </div>
                                
                                <div class="timeline-item">
                                    <div class="timeline-year">2021</div>
                                    <div class="timeline-dot"></div>
                                    <div class="timeline-content">
                                        <h4 style="color: #fff; margin-bottom: 0.5rem;">Principal Consultant</h4>
                                        <p style="color: #a0aec0;">Black Winter, LLC (Founded)</p>
                                    </div>
                                </div>
                                
                                <div class="timeline-item">
                                    <div class="timeline-year">2020</div>
                                    <div class="timeline-dot"></div>
                                    <div class="timeline-content">
                                        <h4 style="color: #fff; margin-bottom: 0.5rem;">B.S. Food & Resource Economics</h4>
                                        <p style="color: #a0aec0;">University of Florida</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div id="projects-pro" class="tab-content">
                            <h3 style="color: #667eea; margin-bottom: 1.5rem;">Portfolio Highlights</h3>
                            <p style="color: #a0aec0; margin-bottom: 2rem;">Interactive demonstrations of deployed solutions</p>
                            
                            <div class="project-grid">
                                <div class="project-card" data-project="network-analysis">
                                    <img src="https://via.placeholder.com/400x250" alt="Network Analysis Tool" class="project-image">
                                    <div class="project-info">
                                        <h3 class="project-title">Network Analysis Tool</h3>
                                        <p class="project-description">
                                            Real-time graph visualization with centrality measures and community detection. 40% accuracy improvement in operational targeting.
                                        </p>
                                        <div class="tech-tags">
                                            <span class="tech-tag">Python</span>
                                            <span class="tech-tag">NetworkX</span>
                                            <span class="tech-tag">Plotly</span>
                                            <span class="tech-tag">Real-time</span>
                                        </div>
                                        <div class="project-links">
                                            <a href="#" class="project-link">Live Demo</a>
                                            <a href="#" class="project-link">Case Study</a>
                                            <a href="#" class="project-link">GitHub</a>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="project-card">
                                    <img src="https://via.placeholder.com/400x250" alt="Geospatial Hotspot Analyzer" class="project-image">
                                    <div class="project-info">
                                        <h3 class="project-title">Geospatial Hotspot Analyzer</h3>
                                        <p class="project-description">
                                            Upload location data, visualize kernel density and clustering analysis for intelligence and operational planning.
                                        </p>
                                        <div class="tech-tags">
                                            <span class="tech-tag">ArcGIS API</span>
                                            <span class="tech-tag">Python</span>
                                            <span class="tech-tag">Folium</span>
                                            <span class="tech-tag">Spatial Stats</span>
                                        </div>
                                        <div class="project-links">
                                            <a href="#" class="project-link">Try It</a>
                                            <a href="#" class="project-link">Documentation</a>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="project-card">
                                    <img src="https://via.placeholder.com/400x250" alt="Cross-Domain Pipeline" class="project-image">
                                    <div class="project-info">
                                        <h3 class="project-title">Cross-Domain ML Pipeline</h3>
                                        <p class="project-description">
                                            Simulated workflow demonstrating secure data transfer between classification levels. 75% reduction in manual processes.
                                        </p>
                                        <div class="tech-tags">
                                            <span class="tech-tag">Python</span>
                                            <span class="tech-tag">Power BI</span>
                                            <span class="tech-tag">Automation</span>
                                            <span class="tech-tag">Security</span>
                                        </div>
                                        <div class="project-links">
                                            <a href="#" class="project-link">View Demo</a>
                                            <a href="#" class="project-link">Methodology</a>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="project-card">
                                    <img src="https://via.placeholder.com/400x250" alt="Predictive Maintenance" class="project-image">
                                    <div class="project-info">
                                        <h3 class="project-title">Predictive Maintenance Model</h3>
                                        <p class="project-description">
                                            Fleet analytics identifying $2M in potential cost savings through optimization of maintenance scheduling.
                                        </p>
                                        <div class="tech-tags">
                                            <span class="tech-tag">Python</span>
                                            <span class="tech-tag">scikit-learn</span>
                                            <span class="tech-tag">Regression</span>
                                            <span class="tech-tag">Optimization</span>
                                        </div>
                                        <div class="project-links">
                                            <a href="#" class="project-link">Methodology</a>
                                            <a href="#" class="project-link">Results</a>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="project-card">
                                    <img src="https://via.placeholder.com/400x250" alt="Automated Reports" class="project-image">
                                    <div class="project-info">
                                        <h3 class="project-title">Automated Report Generation</h3>
                                        <p class="project-description">
                                            Template system for professional analytical reports with PDF/HTML output. Reduces report time from hours to minutes.
                                        </p>
                                        <div class="tech-tags">
                                            <span class="tech-tag">R Markdown</span>
                                            <span class="tech-tag">Python</span>
                                            <span class="tech-tag">Automation</span>
                                            <span class="tech-tag">Reporting</span>
                                        </div>
                                        <div class="project-links">
                                            <a href="#" class="project-link">Templates</a>
                                            <a href="#" class="project-link">Examples</a>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="project-card">
                                    <img src="https://via.placeholder.com/400x250" alt="Data Cleaning Pipeline" class="project-image">
                                    <div class="project-info">
                                        <h3 class="project-title">Data Cleaning Pipeline Showcase</h3>
                                        <p class="project-description">
                                            Before/after transformations of messy datasets with comprehensive documentation and quality checks.
                                        </p>
                                        <div class="tech-tags">
                                            <span class="tech-tag">Python</span>
                                            <span class="tech-tag">pandas</span>
                                            <span class="tech-tag">Quality Assurance</span>
                                        </div>
                                        <div class="project-links">
                                            <a href="#" class="project-link">View Examples</a>
                                            <a href="#" class="project-link">GitHub</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div id="skills" class="tab-content">
                            <h3 style="color: #667eea; margin-bottom: 1.5rem;">Technical Capabilities</h3>
                            <div style="max-width: 800px; margin: 0 auto;">
                                <canvas id="skillsChart"></canvas>
                            </div>
                        </div>
                        
                        <div id="resume" class="tab-content">
                            <div style="text-align: center; margin-bottom: 2rem;">
                                <a href="Analyst Resume JeQa Powe.pdf" target="_blank" style="display: inline-block; padding: 1rem 3rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: 600; transition: all 0.3s ease;">
                                    📄 Download Full Resume (PDF)
                                </a>
                            </div>
                            
                            <div style="background: rgba(255, 255, 255, 0.05); padding: 2rem; border-radius: 12px; border: 1px solid rgba(102, 126, 234, 0.2);">
                                <h3 style="color: #667eea; margin-bottom: 1.5rem;">Professional Summary</h3>
                                <p style="color: #cbd5e0; line-height: 1.8; margin-bottom: 2rem;">
                                    TS/SCI-cleared Quantitative Analyst with 5+ years of experience blending operations research, economics, and machine learning to solve complex intelligence problems. Proven ability to deliver actionable insights, identifying over $2M in cost savings and improving network analysis accuracy by 40%.
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
                        </div>
                    </div>
                `;
            }
            
            document.getElementById('content-area').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
            
            addModalListeners();
            
            setTimeout(() => {
                if(document.getElementById('skills')) {
                    // This function is now replaced by chart logic
                }
            }, 200);
        }
        
        // Tab Switching Logic
        function switchTab(tabId) {
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            document.getElementById(tabId).classList.add('active');
            document.querySelector(`.tab-btn[onclick="switchTab('${tabId}')"]`).classList.add('active');
            
            if (tabId === 'skills') {
                setTimeout(() => {
                    const ctx = document.getElementById('skillsChart');
                    if (ctx && !ctx.chart) {
                        ctx.chart = new Chart(ctx, {
                            type: 'radar',
                            data: {
                                labels: ['Python', 'R', 'SQL', 'ArcGIS', 'ML/AI', 'Network Analysis', 'Cross-Domain', 'Power BI'],
                                datasets: [{
                                    label: 'Proficiency Level',
                                    data: [95, 90, 85, 95, 90, 95, 90, 85],
                                    fill: true,
                                    backgroundColor: 'rgba(102, 126, 234, 0.2)',
                                    borderColor: '#667eea',
                                    pointBackgroundColor: '#667eea',
                                    pointBorderColor: '#fff',
                                    pointHoverBackgroundColor: '#fff',
                                    pointHoverBorderColor: '#667eea'
                                }]
                            },
                            options: {
                                scales: {
                                    r: {
                                        beginAtZero: true,
                                        max: 100,
                                        ticks: { color: '#a0aec0' },
                                        grid: { color: 'rgba(102, 126, 234, 0.2)' },
                                        pointLabels: { color: '#e2e8f0', font: { size: 14 } }
                                    }
                                },
                                plugins: {
                                    legend: { labels: { color: '#e2e8f0' } }
                                }
                            }
                        });
                    }
                }, 300);
            }
            if (tabId === 'projects-pro' || tabId === 'projects-academic') {
                addModalListeners();
            }
        }
        
        // Animate Skills
        function animateSkills() {
            document.querySelectorAll('.skill-progress').forEach(skill => {
                skill.style.width = '0';
                setTimeout(() => {
                    skill.classList.add('animate');
                }, 100);
            });
        }
        
        // Modal Functionality
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
        
        // Contact Form Handler
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

            // Rotating Catchphrase
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
            
            // Scroll Progress Bar
            const progressBar = document.getElementById('scroll-progress');
            window.addEventListener('scroll', () => {
                const scrollTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrollPercent = (window.scrollY / scrollTotal) * 100;
                progressBar.style.height = `${scrollPercent}%`;
            });
            
            // Smooth scroll for nav links
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetSection = document.querySelector(targetId);
                    if (targetSection) {
                        targetSection.scrollIntoView({ 
                            behavior: 'smooth',
                            block: 'start'
                        });
                        // This part for mobile menu is no longer needed with side nav
                        // document.querySelector('.nav-links').classList.remove('active');
                        // document.querySelector('.hamburger').classList.remove('active');
                    }
                });
            });

            // Handle Academic/Professional nav clicks
            document.querySelectorAll('.nav-links a[data-trigger]').forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const path = this.dataset.trigger;
                    loadContent(path);
                });
            });
            
            // Back to top button visibility
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

            // Contact Form
            const contactForm = document.getElementById('feedback-form');
            if (contactForm) {
                contactForm.addEventListener('submit', handleContactSubmit);
            }
            
            // ENTP Easter Egg: Konami Code
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
                document.body.style.animation = 'rainbow 3s ease-in-out';
                
                if (!document.getElementById('konami-style')) {
                    const style = document.createElement('style');
                    style.id = 'konami-style';
                    style.textContent = `
                        @keyframes rainbow {
                            0% { filter: hue-rotate(0deg); }
                            100% { filter: hue-rotate(360deg); }
                        }
                    `;
                    document.head.appendChild(style);
                }
                
                const msg = document.createElement('div');
                msg.textContent = '🎮 SECRET MODE ACTIVATED! 🎮';
                msg.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 2rem 4rem;
                    border-radius: 12px;
                    font-size: 2rem;
                    font-weight: 700;
                    z-index: 10000;
                    animation: fadeInUp 0.5s ease;
                    box-shadow: 0 20px 60px rgba(102, 126, 234, 0.8);
                    text-align: center;
                `;
                document.body.appendChild(msg);
                
                setTimeout(() => {
                    msg.remove();
                    document.body.style.animation = '';
                }, 3000);
            }
        });
        
        // Skill Animation Observer
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // This function is no longer needed with chart
                    // animateSkills(); 
                    skillObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        setTimeout(() => {
            const skillsSection = document.getElementById('skills');
            if (skillsSection) {
                skillObserver.observe(skillsSection);
            }
        }, 500);
        
    </script>
</body>
</html>
```
