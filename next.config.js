module.exports = {
    // ...existing code...
    async redirects() {
        return [
            {
                source: '/old-path',
                destination: '/new-path',
                permanent: true,
            },
        ];
    },
    // Ensure middleware is recognized
    experimental: {
        middleware: true,
    },
    // ...existing code...
};
