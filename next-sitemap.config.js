/** @type {import('next-sitemap').IConfig} */
const fs = require('fs');
const path = require('path');

module.exports = {
    siteUrl: 'https://area36.az',
    generateRobotsTxt: true,
    sitemapSize: 50000,
    changefreq: 'daily',
    priority: 0.8,

    transform: async (config, pagePath) => {
        const priority = pagePath === '/' ? 1.0 : 0.8;
        let lastmod = new Date().toISOString().split('T')[0];
        const images = [];

        const blogFolder = path.join(process.cwd(), 'public/images/blog');

        if (fs.existsSync(blogFolder)) {
            const folders = fs.readdirSync(blogFolder);

            for (const folder of folders) {
                const folderPath = path.join(blogFolder, folder);

                const pageSlug = `/area36-${folder.toLowerCase().replace(/\s+/g, '-')}`;

                if (pagePath === pageSlug && fs.existsSync(folderPath)) {
                    const files = fs.readdirSync(folderPath);

                    files.forEach((file) => {
                        if (/\.(webp|jpg|jpeg|png)$/.test(file)) {
                            const filePath = path.join(folderPath, file);
                            const stats = fs.statSync(filePath);

                            const fileLastMod = stats.mtime.toISOString();
                            if (!lastmod || new Date(fileLastMod) > new Date(lastmod)) {
                                lastmod = fileLastMod;
                            }

                            images.push({
                                url: `https://area36.az/images/blog/${folder}/${file}`,
                                title: folder,
                            });
                        }
                    });
                }
            }
        }

        return {
            loc: pagePath,
            changefreq: 'daily',
            priority,
            lastmod,
            images,
        };
    },
};
