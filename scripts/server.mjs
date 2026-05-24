import { createServer } from 'node:http';
import { access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import handler from 'serve-handler';

const port = Number(process.env.PORT || 3000);
const dist = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');

try {
    await access(path.join(dist, 'index.html'));
} catch {
    console.error('ERROR: dist/index.html not found. Run npm run build first.');
    process.exit(1);
}

createServer((request, response) =>
    handler(request, response, {
        public: dist,
        rewrites: [{ source: '**', destination: '/index.html' }],
    }),
).listen(port, '0.0.0.0', () => {
    console.log(`CyberMate frontend listening on http://0.0.0.0:${port}`);
});
