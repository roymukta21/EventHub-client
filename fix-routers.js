const fs = require('fs');
const path = require('path');

const filesToFix = [
    'src/components/Navbar.tsx',
    'src/app/Landing.tsx',
    'src/app/dashboard/DashboardLayout.tsx',
    'src/app/dashboard/admin/AdminLayout.tsx',
    'src/app/blog/page.tsx',
    'src/app/blog/[id]/page.tsx'
];

filesToFix.forEach(relPath => {
    const f = path.join('c:\\assignment\\EventHub full\\EventHub', relPath);
    if (fs.existsSync(f)) {
        let content = fs.readFileSync(f, 'utf8');

        // Fix imports
        content = content.replace(/import\s+\{\s*Link\s*,\s*useNavigate\s*\}\s+from\s+"@tanstack\/react-router";/g,
            'import Link from "next/link";\nimport { useRouter } from "next/navigation";');
        content = content.replace(/import\s+\{\s*Link\s*\}\s+from\s+"@tanstack\/react-router";/g,
            'import Link from "next/link";');

        // Fix hooks
        content = content.replace(/const navigate = useNavigate\(\);/g, 'const router = useRouter();');
        content = content.replace(/navigate\(\{\s*to:\s*(.*?)\s*\}\)/g, 'router.push($1)');

        // For Landing & Navbar specifically, replace 'to=' with 'href=' globally
        // We only replace 'to=' inside <Link tags or <NavLink tags (for Navbar).
        // Actually, simple replace of `to=` with `href=` is mostly safe in these UI components.
        content = content.replace(/<Link([^>]*?)to=/g, '<Link$1href=');
        content = content.replace(/<NavLink([^>]*?)to=/g, '<NavLink$1href=');

        // Handle specific cases like EventCard/Landing params routing
        // e.g., <Link href="/blog/$id" params={{ id: String(post.id) }}>
        content = content.replace(/href="\/blog\/\$id"\s*params=\{\{\s*id:\s*String\((.*?)\)\s*\}\}/g, 'href={`/blog/${$1}`}');

        fs.writeFileSync(f, content);
        console.log(`Fixed ${relPath}`);
    }
});
