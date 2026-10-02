const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'components');
const destDir = path.join(__dirname, 'src', 'components-alt');

if (!fs.existsSync(destDir)){
    fs.mkdirSync(destDir);
}

const files = fs.readdirSync(srcDir);

files.forEach(file => {
    if (file.endsWith('.js')) {
        let content = fs.readFileSync(path.join(srcDir, file), 'utf8');
        
        // Tailwind Color Swaps for Warm Sand & Espresso Palette
        content = content.replace(/bg-white/g, 'bg-[#F5EFE6]');
        content = content.replace(/text-neutral-900/g, 'text-[#3A3228]');
        content = content.replace(/text-black/g, 'text-[#3A3228]');
        content = content.replace(/bg-black\/40/g, 'bg-[#2A241F]/60'); // Darken overlay for contrast
        content = content.replace(/bg-black/g, 'bg-[#2A241F]');
        content = content.replace(/bg-\[\#1a1a1a\]/g, 'bg-[#2A241F]');
        content = content.replace(/text-white/g, 'text-[#F5EFE6]');
        content = content.replace(/border-white/g, 'border-[#F5EFE6]');
        content = content.replace(/border-neutral-900/g, 'border-[#3A3228]');
        content = content.replace(/border-black/g, 'border-[#3A3228]');
        content = content.replace(/text-neutral-800/g, 'text-[#5C5146]');
        content = content.replace(/text-neutral-700/g, 'text-[#786B5D]');
        content = content.replace(/text-gray-600/g, 'text-[#786B5D]');
        content = content.replace(/text-orange-500/g, 'text-[#B06D53]');
        content = content.replace(/text-orange-600/g, 'text-[#B06D53]');
        content = content.replace(/border-gray-100/g, 'border-[#D6CEC3]');
        content = content.replace(/border-gray-300/g, 'border-[#D6CEC3]');
        content = content.replace(/bg-gray-300/g, 'bg-[#D6CEC3]');
        content = content.replace(/bg-\[\#fff\]/g, 'bg-[#F5EFE6]'); // Loader curtains
        
        // Clean up Navbar specifically to ensure proper text color
        content = content.replace(/text-\[\#3A3228\] absolute top-0 w-full z-40  text-\[\#F5EFE6\]/g, 'absolute top-0 w-full z-40 text-[#F5EFE6]');
        
        // Font & Typography Swaps
        content = content.replace(/tracking-\[-0\.4rem\]/g, 'tracking-normal');
        content = content.replace(/tracking-tighter/g, 'tracking-normal');
        content = content.replace(/font-normal/g, 'font-medium'); // Make text slightly bolder for luxury feel
        content = content.replace(/font-light/g, 'font-medium');
        
        // Add font-serif to all major headings
        content = content.replace(/<h1(.*?)className="(.*?)"/g, '<h1$1className="$2 font-serif"');
        content = content.replace(/<h2(.*?)className="(.*?)"/g, '<h2$1className="$2 font-serif"');
        content = content.replace(/<h3(.*?)className="(.*?)"/g, '<h3$1className="$2 font-serif"');
        
        // Founder grayscale image update
        content = content.replace(/grayscale contrast-125/g, 'grayscale contrast-110 brightness-95');
        
        fs.writeFileSync(path.join(destDir, file), content);
    }
});

console.log('Successfully created components-alt with updated luxury colors and fonts.');
