import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  typescript: {
    ignoreBuildErrors: true,
  },
  turbopack: {
    resolveAlias: {
      'node:module': './empty.js',
      'node:worker_threads': './empty.js',
    }
  },
  ...(process.env.NODE_ENV === 'production' ? {
    webpack: (config, { webpack }) => {
      config.plugins.push(
        new webpack.NormalModuleReplacementPlugin(/^node:/, (resource: any) => {
          resource.request = resource.request.replace(/^node:/, '');
        })
      );
      config.resolve.fallback = {
        ...config.resolve.fallback,
        module: false,
        worker_threads: false,
      };
      return config;
    }
  } : {})
};

export default nextConfig;
