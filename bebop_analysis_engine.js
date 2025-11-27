// ═══════════════════════════════════════════════════════════════════
// BEBOP PROTOCOL - ANIME ANALYSIS ENGINE V1.0
// Purpose: Bridge Google Sheets data to website display
// Last Updated: 2025-11-27
// ═══════════════════════════════════════════════════════════════════

// Global data store
window.animeData = [];

// ═══════════════════════════════════════════════════════════════════
// SECTION 1: DATA FETCHING & PARSING
// ═══════════════════════════════════════════════════════════════════

/**
 * Fetch anime data from GitHub CSV
 * Try multiple paths in case of structure changes
 */
async function fetchAnimeData() {
    const possiblePaths = [
        'https://raw.githubusercontent.com/Tenken73/tenken73.github.io/main/data/anime_final.csv',
        'https://raw.githubusercontent.com/Tenken73/tenken73.github.io/main/data/anime_processed.csv',
        'https://raw.githubusercontent.com/Tenken73/tenken73.github.io/Data-Images/data/anime_final.csv',
        'https://raw.githubusercontent.com/Tenken73/tenken73.github.io/Data-Images/anime_final.csv'
    ];
    
    for (const path of possiblePaths) {
        try {
            console.log(`Trying to fetch from: ${path}`);
            const response = await fetch(path);
            
            if (response.ok) {
                const csvText = await response.text();
                console.log(`✅ Successfully loaded from: ${path}`);
                console.log(`📊 CSV size: ${csvText.length} characters`);
                
                const data = parseCSV(csvText);
                console.log(`📊 Parsed ${data.length} anime records`);
                
                if (data.length > 0) {
                    console.log('📋 Sample record:', data[0]);
                    console.log('📋 Available columns:', Object.keys(data[0]));
                    window.animeData = data;
                    return data;
                }
            }
        } catch (error) {
            console.warn(`Failed to fetch from ${path}:`, error.message);
        }
    }
    
    console.error('❌ All CSV paths failed. Check GitHub repository structure.');
    return [];
}

/**
 * Parse CSV string into array of objects
 * Handles quoted fields and various delimiters
 */
function parseCSV(csvText) {
    const lines = csvText.trim().split('\n');
    if (lines.length < 2) return [];
    
    // Parse header row
    const headers = parseCSVLine(lines[0]);
    
    // Parse data rows
    const data = [];
    for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim() === '') continue;
        
        const values = parseCSVLine(lines[i]);
        const record = {};
        
        headers.forEach((header, index) => {
            let value = values[index] || '';
            
            // Clean header name
            const cleanHeader = header.trim().toLowerCase().replace(/[^a-z0-9_]/g, '_');
            
            // Type conversion
            if (cleanHeader.includes('score') || cleanHeader.includes('rating')) {
                record[cleanHeader] = parseFloat(value) || 0;
            } else if (cleanHeader.includes('episode') || cleanHeader.includes('year') || cleanHeader.includes('rank') || cleanHeader.includes('popularity') || cleanHeader.includes('members') || cleanHeader.includes('favorites')) {
                record[cleanHeader] = parseInt(value) || 0;
            } else {
                record[cleanHeader] = value;
            }
        });
        
        // Normalize common field names
        record.title = record.title || record.mal_title || record.title_english || record.title_romaji || record.search_title || 'Unknown';
        record.score = record.weighted_score || record.mal_score || record.anilist_score || 0;
        record.episodes = record.episodes || record.mal_episodes || 0;
        record.year = record.start_year || record.year || 0;
        
        data.push(record);
    }
    
    return data;
}

/**
 * Parse a single CSV line handling quoted fields
 */
function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            result.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    result.push(current.trim());
    
    return result;
}

// ═══════════════════════════════════════════════════════════════════
// SECTION 2: STATISTICS CALCULATION
// ═══════════════════════════════════════════════════════════════════

/**
 * Calculate and display statistics from anime data
 */
function updateStatistics(data) {
    if (!data || data.length === 0) {
        console.warn('No data available for statistics');
        return;
    }
    
    const stats = {
        total: data.length,
        avgScore: (data.reduce((sum, a) => sum + (a.score || 0), 0) / data.length).toFixed(1),
        topRated: data.filter(a => a.score >= 85).length,
        totalEpisodes: data.reduce((sum, a) => sum + (a.episodes || 0), 0),
        avgEpisodes: Math.round(data.reduce((sum, a) => sum + (a.episodes || 0), 0) / data.length),
        decades: {
            '2000s': data.filter(a => a.year >= 2000 && a.year < 2010).length,
            '2010s': data.filter(a => a.year >= 2010 && a.year < 2020).length,
            '2020s': data.filter(a => a.year >= 2020).length
        }
    };
    
    // Update DOM elements if they exist
    const updateElement = (selector, value) => {
        const el = document.querySelector(selector);
        if (el) el.textContent = value;
    };
    
    updateElement('[data-stat="total"]', stats.total);
    updateElement('[data-stat="avgScore"]', stats.avgScore);
    updateElement('[data-stat="topRated"]', stats.topRated);
    updateElement('[data-stat="totalEpisodes"]', stats.totalEpisodes.toLocaleString());
    
    console.log('📊 Statistics calculated:', stats);
    return stats;
}

// ═══════════════════════════════════════════════════════════════════
// SECTION 3: DATA TABLE DISPLAY
// ═══════════════════════════════════════════════════════════════════

/**
 * Display anime data in a sortable table
 */
function displayAnimeTable(data, containerId = 'animeTable', limit = 50) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.warn(`Container #${containerId} not found`);
        return;
    }
    
    if (!data || data.length === 0) {
        container.innerHTML = '<p style="color: #a0aec0;">No data available</p>';
        return;
    }
    
    // Sort by score descending
    const sortedData = [...data].sort((a, b) => (b.score || 0) - (a.score || 0));
    
    let html = `
        <table class="anime-data-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Score</th>
                    <th>Episodes</th>
                    <th>Year</th>
                    <th>Type</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    sortedData.slice(0, limit).forEach((anime, index) => {
        html += `
            <tr>
                <td>${index + 1}</td>
                <td class="title-cell">${escapeHtml(anime.title)}</td>
                <td class="score-cell">${anime.score ? anime.score.toFixed(1) : 'N/A'}</td>
                <td>${anime.episodes || 'N/A'}</td>
                <td>${anime.year || 'N/A'}</td>
                <td>${anime.mal_type || anime.format || 'N/A'}</td>
            </tr>
        `;
    });
    
    html += '</tbody></table>';
    
    if (data.length > limit) {
        html += `<p style="color: #a0aec0; text-align: center; margin-top: 1rem;">Showing ${limit} of ${data.length} anime</p>`;
    }
    
    container.innerHTML = html;
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ═══════════════════════════════════════════════════════════════════
// SECTION 4: ANALYSIS FUNCTIONS
// ═══════════════════════════════════════════════════════════════════

/**
 * Run analysis based on type selection
 */
async function updateAnalysis(type) {
    const resultsContainer = document.getElementById('analysisResults');
    if (!resultsContainer) {
        console.warn('Analysis results container not found');
        return;
    }
    
    resultsContainer.innerHTML = '<p style="color: #a0aec0;">Loading analysis...</p>';
    
    // Ensure data is loaded
    let data = window.animeData;
    if (!data || data.length === 0) {
        data = await fetchAnimeData();
    }
    
    if (!data || data.length === 0) {
        resultsContainer.innerHTML = '<p style="color: #ff6b6b;">Error: Could not load anime data. Check console for details.</p>';
        return;
    }
    
    let filtered = [];
    let title = '';
    let description = '';
    
    switch(type) {
        case 'short-bangers':
            filtered = data
                .filter(a => a.episodes > 0 && a.episodes <= 26 && a.score >= 80)
                .sort((a, b) => b.score - a.score)
                .slice(0, 20);
            title = '🔥 Short Bangers';
            description = '≤26 episodes, score ≥80 — Maximum impact, minimal time investment';
            break;
            
        case 'hidden-gems':
            // High score but lower popularity (popularity rank > 500 or low member count)
            filtered = data
                .filter(a => a.score >= 80 && (a.mal_popularity > 500 || a.anilist_popularity < 50000))
                .sort((a, b) => b.score - a.score)
                .slice(0, 20);
            title = '💎 Hidden Gems';
            description = 'High scores, low mainstream visibility — The underrated masterpieces';
            break;
            
        case 'award-winners':
            filtered = data
                .filter(a => a.award_score > 0 || a.anilist_favorites > 10000)
                .sort((a, b) => (b.award_score || b.anilist_favorites || 0) - (a.award_score || a.anilist_favorites || 0))
                .slice(0, 20);
            title = '🏆 Award Winners & Fan Favorites';
            description = 'Recognized excellence — Award winners and community favorites';
            break;
            
        case 'quick-watches':
            filtered = data
                .filter(a => a.episodes > 0 && a.episodes <= 13 && a.score >= 75)
                .sort((a, b) => b.score - a.score)
                .slice(0, 20);
            title = '⚡ Quick Watches';
            description = '≤13 episodes, score ≥75 — Perfect for a weekend binge';
            break;
            
        case 'classics':
            filtered = data
                .filter(a => a.year > 0 && a.year < 2010 && a.score >= 80)
                .sort((a, b) => b.score - a.score)
                .slice(0, 20);
            title = '📺 Classics';
            description = 'Pre-2010, score ≥80 — The foundational works';
            break;
            
        case 'modern-hits':
            filtered = data
                .filter(a => a.year >= 2020 && a.score >= 80)
                .sort((a, b) => b.score - a.score)
                .slice(0, 20);
            title = '🌟 Modern Hits';
            description = '2020+, score ≥80 — The new generation of excellence';
            break;
            
        case 'long-runners':
            filtered = data
                .filter(a => a.episodes >= 50 && a.score >= 75)
                .sort((a, b) => b.episodes - a.episodes)
                .slice(0, 20);
            title = '📚 Long Runners';
            description = '50+ episodes, score ≥75 — Epic journeys worth the commitment';
            break;
            
        default:
            filtered = data.slice(0, 20);
            title = '📋 All Anime';
            description = 'Full database view';
    }
    
    // Render results
    resultsContainer.innerHTML = renderAnalysisResults(filtered, title, description);
}

/**
 * Render analysis results as HTML
 */
function renderAnalysisResults(data, title, description) {
    if (!data || data.length === 0) {
        return `
            <div class="analysis-empty">
                <h3>${title}</h3>
                <p style="color: #a0aec0;">No anime found matching these criteria. Try adjusting filters or check data source.</p>
            </div>
        `;
    }
    
    let html = `
        <div class="analysis-header">
            <h3>${title}</h3>
            <p class="analysis-description">${description}</p>
            <p class="analysis-count">Found ${data.length} anime</p>
        </div>
        <div class="analysis-grid">
    `;
    
    data.forEach((anime, index) => {
        html += `
            <div class="analysis-card">
                <div class="card-rank">#${index + 1}</div>
                <h4 class="card-title">${escapeHtml(anime.title)}</h4>
                <div class="card-stats">
                    <span class="stat-badge score">⭐ ${anime.score ? anime.score.toFixed(1) : 'N/A'}</span>
                    <span class="stat-badge episodes">📺 ${anime.episodes || '?'} eps</span>
                    ${anime.year ? `<span class="stat-badge year">📅 ${anime.year}</span>` : ''}
                </div>
                ${anime.genres ? `<p class="card-genres">${anime.genres}</p>` : ''}
            </div>
        `;
    });
    
    html += '</div>';
    return html;
}

// ═══════════════════════════════════════════════════════════════════
// SECTION 5: CHART UPDATES
// ═══════════════════════════════════════════════════════════════════

/**
 * Initialize/update charts with real data
 */
function initChartsWithData(data) {
    if (!data || data.length === 0) {
        console.warn('No data available for charts');
        return;
    }
    
    // Decade distribution
    const decadeData = {
        '1990s': data.filter(a => a.year >= 1990 && a.year < 2000).length,
        '2000s': data.filter(a => a.year >= 2000 && a.year < 2010).length,
        '2010s': data.filter(a => a.year >= 2010 && a.year < 2020).length,
        '2020s': data.filter(a => a.year >= 2020).length
    };
    
    // Average score by decade
    const decadeScores = {};
    Object.keys(decadeData).forEach(decade => {
        const startYear = parseInt(decade);
        const endYear = startYear + 10;
        const decadeAnime = data.filter(a => a.year >= startYear && a.year < endYear);
        if (decadeAnime.length > 0) {
            decadeScores[decade] = (decadeAnime.reduce((sum, a) => sum + a.score, 0) / decadeAnime.length).toFixed(1);
        }
    });
    
    console.log('📊 Decade distribution:', decadeData);
    console.log('📊 Decade average scores:', decadeScores);
    
    // Update Chart.js if available
    if (typeof Chart !== 'undefined') {
        updateDecadeChart(decadeData, decadeScores);
    }
    
    return { decadeData, decadeScores };
}

/**
 * Update decade distribution chart
 */
function updateDecadeChart(distribution, scores) {
    const ctx = document.getElementById('decadeChart');
    if (!ctx) return;
    
    // Destroy existing chart
    if (window.decadeChartInstance) {
        window.decadeChartInstance.destroy();
    }
    
    window.decadeChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(distribution),
            datasets: [{
                label: 'Anime Count',
                data: Object.values(distribution),
                backgroundColor: 'rgba(102, 126, 234, 0.8)',
                borderColor: 'rgba(102, 126, 234, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false },
                title: {
                    display: true,
                    text: 'Anime by Decade',
                    color: '#e2e8f0'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { color: '#a0aec0' },
                    grid: { color: 'rgba(255,255,255,0.1)' }
                },
                x: {
                    ticks: { color: '#a0aec0' },
                    grid: { display: false }
                }
            }
        }
    });
}

// ═══════════════════════════════════════════════════════════════════
// SECTION 6: FEATURED ANIME DISPLAY
// ═══════════════════════════════════════════════════════════════════

/**
 * Load and display featured anime section
 */
async function loadFeaturedAnime() {
    const container = document.getElementById('featuredAnime') || document.querySelector('.featured-grid');
    if (!container) {
        console.warn('Featured anime container not found');
        return;
    }
    
    container.innerHTML = '<p style="color: #a0aec0;">Loading featured anime...</p>';
    
    let data = window.animeData;
    if (!data || data.length === 0) {
        data = await fetchAnimeData();
    }
    
    if (!data || data.length === 0) {
        container.innerHTML = '<p style="color: #ff6b6b;">Could not load featured anime</p>';
        return;
    }
    
    // Get top 6 by score
    const featured = [...data]
        .filter(a => a.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 6);
    
    let html = '';
    featured.forEach(anime => {
        html += `
            <div class="featured-card">
                <div class="featured-score">${anime.score.toFixed(1)}</div>
                <h3 class="featured-title">${escapeHtml(anime.title)}</h3>
                <div class="featured-meta">
                    <span>${anime.episodes || '?'} episodes</span>
                    <span>${anime.year || 'N/A'}</span>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// ═══════════════════════════════════════════════════════════════════
// SECTION 7: SEARCH & FILTER
// ═══════════════════════════════════════════════════════════════════

/**
 * Search anime by title
 */
function searchAnime(query) {
    if (!window.animeData || window.animeData.length === 0) {
        console.warn('No data available for search');
        return [];
    }
    
    const searchTerm = query.toLowerCase().trim();
    if (!searchTerm) return window.animeData;
    
    return window.animeData.filter(anime => 
        anime.title.toLowerCase().includes(searchTerm) ||
        (anime.genres && anime.genres.toLowerCase().includes(searchTerm))
    );
}

/**
 * Filter anime by criteria
 */
function filterAnime(criteria) {
    if (!window.animeData) return [];
    
    return window.animeData.filter(anime => {
        if (criteria.minScore && anime.score < criteria.minScore) return false;
        if (criteria.maxEpisodes && anime.episodes > criteria.maxEpisodes) return false;
        if (criteria.minYear && anime.year < criteria.minYear) return false;
        if (criteria.maxYear && anime.year > criteria.maxYear) return false;
        if (criteria.type && anime.mal_type !== criteria.type) return false;
        return true;
    });
}

// ═══════════════════════════════════════════════════════════════════
// SECTION 8: INITIALIZATION
// ═══════════════════════════════════════════════════════════════════

/**
 * Initialize all anime data functionality
 */
async function initAnimeAnalysis() {
    console.log('🚀 Initializing Bebop Protocol Anime Analysis...');
    
    try {
        // Fetch data
        const data = await fetchAnimeData();
        
        if (data && data.length > 0) {
            // Update statistics
            updateStatistics(data);
            
            // Load featured anime
            loadFeaturedAnime();
            
            // Initialize charts
            initChartsWithData(data);
            
            // Display data table if container exists
            displayAnimeTable(data);
            
            console.log('✅ Anime analysis initialization complete');
        } else {
            console.error('❌ Failed to initialize: No data loaded');
        }
    } catch (error) {
        console.error('❌ Initialization error:', error);
    }
}

// ═══════════════════════════════════════════════════════════════════
// SECTION 9: EVENT LISTENERS & EXPORTS
// ═══════════════════════════════════════════════════════════════════

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimeAnalysis);
} else {
    initAnimeAnalysis();
}

// Export functions for external use
window.BebopAnalysis = {
    fetchData: fetchAnimeData,
    updateStats: updateStatistics,
    displayTable: displayAnimeTable,
    runAnalysis: updateAnalysis,
    search: searchAnime,
    filter: filterAnime,
    refresh: initAnimeAnalysis
};

// ═══════════════════════════════════════════════════════════════════
// SECTION 10: CSS STYLES (Add to your stylesheet)
// ═══════════════════════════════════════════════════════════════════
/*
Add these styles to your CSS:

.anime-data-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
}

.anime-data-table th,
.anime-data-table td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid rgba(255,255,255,0.1);
}

.anime-data-table th {
    background: rgba(102, 126, 234, 0.2);
    color: #e2e8f0;
    font-weight: 600;
}

.anime-data-table tr:hover {
    background: rgba(255,255,255,0.05);
}

.title-cell {
    max-width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.score-cell {
    color: #667eea;
    font-weight: bold;
}

.analysis-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1rem;
    margin-top: 1.5rem;
}

.analysis-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(102, 126, 234, 0.2);
    border-radius: 12px;
    padding: 1.25rem;
    transition: all 0.3s ease;
}

.analysis-card:hover {
    border-color: #667eea;
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.15);
}

.card-rank {
    color: #667eea;
    font-size: 1.1rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
}

.card-title {
    color: #e2e8f0;
    font-size: 1rem;
    margin: 0.5rem 0;
    line-height: 1.3;
}

.card-stats {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.75rem;
}

.stat-badge {
    background: rgba(102, 126, 234, 0.15);
    color: #a0aec0;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.85rem;
}

.stat-badge.score {
    color: #667eea;
    font-weight: 600;
}

.card-genres {
    color: #718096;
    font-size: 0.8rem;
    margin-top: 0.5rem;
}

.analysis-header {
    margin-bottom: 1.5rem;
}

.analysis-header h3 {
    color: #e2e8f0;
    margin-bottom: 0.5rem;
}

.analysis-description {
    color: #a0aec0;
    margin-bottom: 0.25rem;
}

.analysis-count {
    color: #667eea;
    font-size: 0.9rem;
}

.featured-card {
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
    border: 1px solid rgba(102, 126, 234, 0.3);
    border-radius: 12px;
    padding: 1.5rem;
    text-align: center;
    transition: all 0.3s ease;
}

.featured-card:hover {
    transform: translateY(-5px);
    border-color: #667eea;
}

.featured-score {
    font-size: 2rem;
    font-weight: bold;
    color: #667eea;
}

.featured-title {
    color: #e2e8f0;
    margin: 0.75rem 0;
    font-size: 1.1rem;
}

.featured-meta {
    color: #a0aec0;
    font-size: 0.85rem;
    display: flex;
    justify-content: center;
    gap: 1rem;
}
*/
