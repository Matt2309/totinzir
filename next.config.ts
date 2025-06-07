import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'media.istockphoto.com',
            port: '',
            pathname: '/**'
        },
            {
                protocol: 'https',
                hostname: 'cdn.worldvectorlogo.com',
                port: '',
                pathname: '/**'
            }
        ]
    },
};

export default nextConfig;
