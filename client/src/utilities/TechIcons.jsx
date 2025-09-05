import {
    // Frontend
    FaReact,
    FaVuejs,
    FaAngular,
    FaHtml5,
    FaCss3Alt,
    FaSass,
    FaJs,
    FaBootstrap,
    // Backend
    FaNodeJs,
    FaPython,
    FaPhp,
    FaJava,
    FaLaravel,
    // Databases
    FaDatabase,
    // Tools & Others
    FaGitAlt,
    FaDocker,
    FaAws,
    FaGithub,
    FaNpm,
    FaYarn,
} from 'react-icons/fa';

import {
    // Modern Frontend
    SiNextdotjs,
    SiNuxtdotjs,
    SiTypescript,
    SiTailwindcss,
    SiVite,
    SiWebpack,
    SiEslint,
    SiPrettier,
    // Backend & Frameworks
    SiExpress,
    SiFastapi,
    SiDjango,
    SiFlask,
    SiSpring,
    SiNestjs,
    // Databases
    SiMongodb,
    SiMysql,
    SiPostgresql,
    SiRedis,
    SiSqlite,
    SiFirebase,
    SiSupabase,
    // Cloud & DevOps
    SiVercel,
    SiNetlify,
    SiHeroku,
    SiDigitalocean,
    SiGooglecloud,
    SiKubernetes,
    // Testing
    SiJest,
    SiCypress,
    SiTestinglibrary,
    // State Management
    SiRedux,
    // Mobile
    SiFlutter,
    SiIonic,
    // CMS
    SiWordpress,
    SiStrapi,
    SiContentful,
    // Other
    SiGraphql,
    SiApollographql,
    SiSocketdotio,
    SiPrisma,
} from 'react-icons/si';

import {
    // Additional Tech
    TbBrandCpp,
    TbBrandCSharp,
    TbBrandKotlin,
    TbBrandSwift,
    TbBrandGolang,
    TbBrandRust,
} from 'react-icons/tb';

import {
    DiRuby,
    DiMsqlServer,
} from 'react-icons/di';

// Tech icon mapping with colors
export const techIconMap = {
    // Frontend Technologies
    'react': { icon: FaReact, color: '#61DAFB', name: 'React' },
    'reactjs': { icon: FaReact, color: '#61DAFB', name: 'React' },
    'vue': { icon: FaVuejs, color: '#4FC08D', name: 'Vue.js' },
    'vuejs': { icon: FaVuejs, color: '#4FC08D', name: 'Vue.js' },
    'angular': { icon: FaAngular, color: '#DD0031', name: 'Angular' },
    'angularjs': { icon: FaAngular, color: '#DD0031', name: 'Angular' },
    'html': { icon: FaHtml5, color: '#E34F26', name: 'HTML5' },
    'html5': { icon: FaHtml5, color: '#E34F26', name: 'HTML5' },
    'css': { icon: FaCss3Alt, color: '#1572B6', name: 'CSS3' },
    'css3': { icon: FaCss3Alt, color: '#1572B6', name: 'CSS3' },
    'javascript': { icon: FaJs, color: '#F7DF1E', name: 'JavaScript' },
    'js': { icon: FaJs, color: '#F7DF1E', name: 'JavaScript' },
    'typescript': { icon: SiTypescript, color: '#3178C6', name: 'TypeScript' },
    'ts': { icon: SiTypescript, color: '#3178C6', name: 'TypeScript' },
    'next': { icon: SiNextdotjs, color: '#000000', name: 'Next.js' },
    'nextjs': { icon: SiNextdotjs, color: '#000000', name: 'Next.js' },
    'nuxt': { icon: SiNuxtdotjs, color: '#00DC82', name: 'Nuxt.js' },
    'nuxtjs': { icon: SiNuxtdotjs, color: '#00DC82', name: 'Nuxt.js' },
    'sass': { icon: FaSass, color: '#CC6699', name: 'Sass' },
    'scss': { icon: FaSass, color: '#CC6699', name: 'Sass' },
    'tailwind': { icon: SiTailwindcss, color: '#06B6D4', name: 'Tailwind CSS' },
    'tailwindcss': { icon: SiTailwindcss, color: '#06B6D4', name: 'Tailwind CSS' },
    'bootstrap': { icon: FaBootstrap, color: '#7952B3', name: 'Bootstrap' },
    'vite': { icon: SiVite, color: '#646CFF', name: 'Vite' },
    'webpack': { icon: SiWebpack, color: '#8DD6F9', name: 'Webpack' },

    // Backend Technologies
    'node': { icon: FaNodeJs, color: '#339933', name: 'Node.js' },
    'nodejs': { icon: FaNodeJs, color: '#339933', name: 'Node.js' },
    'express': { icon: SiExpress, color: '#000000', name: 'Express.js' },
    'expressjs': { icon: SiExpress, color: '#000000', name: 'Express.js' },
    'nestjs': { icon: SiNestjs, color: '#E0234E', name: 'NestJS' },
    'python': { icon: FaPython, color: '#3776AB', name: 'Python' },
    'django': { icon: SiDjango, color: '#092E20', name: 'Django' },
    'flask': { icon: SiFlask, color: '#000000', name: 'Flask' },
    'fastapi': { icon: SiFastapi, color: '#009688', name: 'FastAPI' },
    'php': { icon: FaPhp, color: '#777BB4', name: 'PHP' },
    'laravel': { icon: FaLaravel, color: '#FF2D20', name: 'Laravel' },
    'java': { icon: FaJava, color: '#ED8B00', name: 'Java' },
    'spring': { icon: SiSpring, color: '#6DB33F', name: 'Spring' },
    'ruby': { icon: DiRuby, color: '#CC342D', name: 'Ruby' },
    'go': { icon: TbBrandGolang, color: '#00ADD8', name: 'Go' },
    'golang': { icon: TbBrandGolang, color: '#00ADD8', name: 'Go' },
    'rust': { icon: TbBrandRust, color: '#000000', name: 'Rust' },
    'c++': { icon: TbBrandCpp, color: '#00599C', name: 'C++' },
    'cpp': { icon: TbBrandCpp, color: '#00599C', name: 'C++' },
    'c#': { icon: TbBrandCSharp, color: '#239120', name: 'C#' },
    'csharp': { icon: TbBrandCSharp, color: '#239120', name: 'C#' },
    'kotlin': { icon: TbBrandKotlin, color: '#0095D5', name: 'Kotlin' },
    'swift': { icon: TbBrandSwift, color: '#FA7343', name: 'Swift' },

    // Databases
    'mongodb': { icon: SiMongodb, color: '#47A248', name: 'MongoDB' },
    'mysql': { icon: SiMysql, color: '#4479A1', name: 'MySQL' },
    'postgresql': { icon: SiPostgresql, color: '#336791', name: 'PostgreSQL' },
    'postgres': { icon: SiPostgresql, color: '#336791', name: 'PostgreSQL' },
    'redis': { icon: SiRedis, color: '#DC382D', name: 'Redis' },
    'sqlite': { icon: SiSqlite, color: '#003B57', name: 'SQLite' },
    'sqlserver': { icon: DiMsqlServer, color: '#CC2927', name: 'SQL Server' },
    'firebase': { icon: SiFirebase, color: '#FFCA28', name: 'Firebase' },
    'supabase': { icon: SiSupabase, color: '#3ECF8E', name: 'Supabase' },

    // Cloud & DevOps
    'aws': { icon: FaAws, color: '#232F3E', name: 'AWS' },
    'gcp': { icon: SiGooglecloud, color: '#4285F4', name: 'Google Cloud' },
    'azure': { icon: SiGooglecloud, color: '#0078D4', name: 'Azure' },
    'docker': { icon: FaDocker, color: '#2496ED', name: 'Docker' },
    'kubernetes': { icon: SiKubernetes, color: '#326CE5', name: 'Kubernetes' },
    'vercel': { icon: SiVercel, color: '#000000', name: 'Vercel' },
    'netlify': { icon: SiNetlify, color: '#00C7B7', name: 'Netlify' },
    'heroku': { icon: SiHeroku, color: '#430098', name: 'Heroku' },
    'digitalocean': { icon: SiDigitalocean, color: '#0080FF', name: 'DigitalOcean' },

    // Mobile
    'react-native': { icon: FaReact, color: '#61DAFB', name: 'React Native' },
    'reactnative': { icon: FaReact, color: '#61DAFB', name: 'React Native' },
    'flutter': { icon: SiFlutter, color: '#02569B', name: 'Flutter' },
    'ionic': { icon: SiIonic, color: '#3880FF', name: 'Ionic' },

    // State Management & Libraries
    'redux': { icon: SiRedux, color: '#764ABC', name: 'Redux' },
    'graphql': { icon: SiGraphql, color: '#E10098', name: 'GraphQL' },
    'apollo': { icon: SiApollographql, color: '#311C87', name: 'Apollo GraphQL' },
    'prisma': { icon: SiPrisma, color: '#2D3748', name: 'Prisma' },
    'socketio': { icon: SiSocketdotio, color: '#010101', name: 'Socket.IO' },

    // Testing
    'jest': { icon: SiJest, color: '#C21325', name: 'Jest' },
    'cypress': { icon: SiCypress, color: '#17202C', name: 'Cypress' },
    'testing-library': { icon: SiTestinglibrary, color: '#E33332', name: 'Testing Library' },

    // Tools
    'git': { icon: FaGitAlt, color: '#F05032', name: 'Git' },
    'github': { icon: FaGithub, color: '#181717', name: 'GitHub' },
    'npm': { icon: FaNpm, color: '#CB3837', name: 'npm' },
    'yarn': { icon: FaYarn, color: '#2C8EBB', name: 'Yarn' },
    'eslint': { icon: SiEslint, color: '#4B32C3', name: 'ESLint' },
    'prettier': { icon: SiPrettier, color: '#F7B93E', name: 'Prettier' },

    // CMS
    'wordpress': { icon: SiWordpress, color: '#21759B', name: 'WordPress' },
    'strapi': { icon: SiStrapi, color: '#2E7EEA', name: 'Strapi' },
    'contentful': { icon: SiContentful, color: '#2478CC', name: 'Contentful' },

    // Default fallback
    'default': { icon: FaDatabase, color: '#6B7280', name: 'Technology' }
};

// Function to get tech icon
export const getTechIcon = (techName) => {
    if (!techName) return techIconMap.default;
    
    const normalizedName = techName.toLowerCase()
        .replace(/\s+/g, '')
        .replace(/[-.]/g, '');
    
    return techIconMap[normalizedName] || techIconMap.default;
};

// Component to render tech icon with name
export const TechIcon = ({ tech, showName = true, size = 'sm' }) => {
    const techInfo = getTechIcon(tech);
    const IconComponent = techInfo.icon;
    
    const sizeClasses = {
        xs: 'w-3 h-3',
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6',
        xl: 'w-8 h-8'
    };

    const textSizes = {
        xs: 'text-xs',
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
        xl: 'text-lg'
    };

    return (
        <div className="flex items-center gap-2 px-2 py-1 bg-white/60 backdrop-blur-sm rounded-md border border-gray-200/50 transition-all duration-200 hover:bg-white/80 hover:border-gray-300/70">
            <IconComponent 
                className={sizeClasses[size]} 
                style={{ color: techInfo.color }}
            />
            {showName && (
                <span className={`font-medium text-gray-700 ${textSizes[size]}`}>
                    {techInfo.name}
                </span>
            )}
        </div>
    );
};

export default TechIcon;
