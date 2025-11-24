import fs from 'fs';
import path from 'path';
import http from 'http';

const sitemapFiles = [
    'public/sitemap-india.xml',
    'public/sitemap-locations.xml',
    'public/sitemap-services.xml'
];

const extractUrls = (content) => {
    const regex = /<loc>(.*?)<\/loc>/g;
    const urls = [];
    let match;
    while ((match = regex.exec(content)) !== null) {
        urls.push(match[1]);
    }
    return urls;
};

const checkUrl = (url) => {
    return new Promise((resolve) => {
        const localUrl = url.replace('https://whycreatives.in', 'http://localhost:8080');
        http.get(localUrl, (res) => {
            resolve({ url: localUrl, status: res.statusCode });
        }).on('error', (e) => {
            resolve({ url: localUrl, status: 'ERROR', error: e.message });
        });
    });
};

const verifySitemaps = async () => {
    let allUrls = [];

    for (const file of sitemapFiles) {
        const content = fs.readFileSync(path.resolve(file), 'utf-8');
        const urls = extractUrls(content);
        console.log(`Found ${urls.length} URLs in ${file}`);
        allUrls = [...allUrls, ...urls];
    }

    // Check a random sample of 20 URLs + specific critical ones
    const criticalUrls = [
        'https://whycreatives.in/creative-agency-mumbai',
        'https://whycreatives.in/creative-agency-agartala',
        'https://whycreatives.in/video-production-india',
        'https://whycreatives.in/web-development-delhi'
    ];

    const sampleUrls = allUrls
        .filter(u => !criticalUrls.includes(u))
        .sort(() => 0.5 - Math.random())
        .slice(0, 20);

    const urlsToCheck = [...criticalUrls, ...sampleUrls];

    console.log(`Checking ${urlsToCheck.length} URLs...`);

    for (const url of urlsToCheck) {
        const result = await checkUrl(url);
        if (result.status !== 200) {
            console.error(`[FAIL] ${result.url} returned ${result.status}`);
        } else {
            console.log(`[OK] ${result.url}`);
        }
    }
};

verifySitemaps();
